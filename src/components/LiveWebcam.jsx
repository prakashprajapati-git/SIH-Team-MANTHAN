import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Video, VideoOff, Play, Pause, RotateCcw, AlertTriangle, Shield, Eye, Settings, Download, Maximize2, Minimize2, Wifi, WifiOff } from 'lucide-react';

const LiveWebcam = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const processingIntervalRef = useRef(null);
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [availableCameras, setAvailableCameras] = useState([]);
  const [detectionEnabled, setDetectionEnabled] = useState(true);
  const [riskLevel, setRiskLevel] = useState('low');
  const [detectedRisks, setDetectedRisks] = useState([]);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [error, setError] = useState('');
  const [backendConnected, setBackendConnected] = useState(false);
  const [processingFrame, setProcessingFrame] = useState(false);
  const [annotatedFrame, setAnnotatedFrame] = useState(null);

  // Backend API configuration
  const BACKEND_URL = 'http://localhost:5000';
  
  // Check backend connection
  const checkBackendConnection = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/health`);
      if (response.ok) {
        setBackendConnected(true);
        setError('');
      } else {
        setBackendConnected(false);
        setError('Backend server not responding');
      }
    } catch (err) {
      setBackendConnected(false);
      setError('Cannot connect to AI backend server. Please start the Python backend.');
    }
  }, []);

  // Send frame to backend for AI processing
  const processFrameWithAI = useCallback(async (frame) => {
    if (!backendConnected || !detectionEnabled || processingFrame) return;
    
    setProcessingFrame(true);
    
    try {
      // Convert frame to base64
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = frame.videoWidth;
      canvas.height = frame.videoHeight;
      ctx.drawImage(frame, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      
      // Send to backend
      const response = await fetch(`${BACKEND_URL}/api/process_frame`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData })
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.detections) {
          setDetectedRisks(result.detections);
          setRiskLevel(result.risk_level);
          if (result.annotated_image) {
            setAnnotatedFrame(result.annotated_image);
          }
        }
      }
    } catch (err) {
      console.error('Error processing frame:', err);
    } finally {
      setProcessingFrame(false);
    }
  }, [backendConnected, detectionEnabled, processingFrame]);

  // Start/stop AI detection on backend
  const toggleBackendDetection = useCallback(async (enable) => {
    try {
      const endpoint = enable ? 'start_detection' : 'stop_detection';
      const response = await fetch(`${BACKEND_URL}/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        console.log(`AI detection ${enable ? 'started' : 'stopped'}`);
      }
    } catch (err) {
      console.error('Error toggling detection:', err);
    }
  }, []);

  // Get available cameras
  const getCameras = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === 'videoinput');
      setAvailableCameras(cameras);
      if (cameras.length > 0 && !selectedCamera) {
        setSelectedCamera(cameras[0].deviceId);
      }
    } catch (err) {
      console.error('Error getting cameras:', err);
      setError('Failed to access camera devices');
    }
  }, [selectedCamera]);

  // Start camera stream
  const startStream = useCallback(async () => {
    try {
      setError('');
      const constraints = {
        video: {
          deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
      }

      // Start real AI detection with backend
      if (detectionEnabled && backendConnected) {
        await toggleBackendDetection(true);
        startRealAIDetection();
      }

    } catch (err) {
      console.error('Error starting stream:', err);
      setError('Failed to access camera. Please check permissions.');
    }
  }, [selectedCamera, detectionEnabled, backendConnected, toggleBackendDetection]);

  // Stop camera stream
  const stopStream = useCallback(async () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    // Stop AI detection
    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current);
      processingIntervalRef.current = null;
    }
    
    if (backendConnected) {
      await toggleBackendDetection(false);
    }
    
    setIsStreaming(false);
    setDetectedRisks([]);
    setRiskLevel('low');
    setAnnotatedFrame(null);
  }, [backendConnected, toggleBackendDetection]);

  // Start real AI detection with backend
  const startRealAIDetection = useCallback(() => {
    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current);
    }
    
    processingIntervalRef.current = setInterval(() => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        processFrameWithAI(videoRef.current);
      }
    }, 1000); // Process every second
  }, [processFrameWithAI]);

  // Simulate AI detection
  const startAIDetection = useCallback(() => {
    const detectionInterval = setInterval(() => {
      if (!isStreaming) {
        clearInterval(detectionInterval);
        return;
      }

      // Simulate random detections
      if (Math.random() > 0.7) {
        const randomDetection = mockDetections[Math.floor(Math.random() * mockDetections.length)];
        setDetectedRisks(prev => [...prev.slice(-4), {
          ...randomDetection,
          id: Date.now(),
          timestamp: new Date()
        }]);

        // Update risk level based on detection
        if (randomDetection.severity === 'critical') {
          setRiskLevel('critical');
        } else if (randomDetection.severity === 'high' && riskLevel !== 'critical') {
          setRiskLevel('high');
        } else if (randomDetection.severity === 'medium' && riskLevel === 'low') {
          setRiskLevel('medium');
        }
      }
    }, 3000);

    return () => clearInterval(detectionInterval);
  }, [isStreaming, riskLevel]);

  // Start/stop recording
  const toggleRecording = useCallback(() => {
    if (!isStreaming) return;

    if (!recording) {
      const chunks = [];
      setRecordedChunks(chunks);
      
      const recorder = new MediaRecorder(streamRef.current, {
        mimeType: 'video/webm;codecs=vp9'
      });
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mine-recording-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
      };
      
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop();
        setMediaRecorder(null);
        setRecording(false);
      }
    }
  }, [isStreaming, recording, mediaRecorder]);

  // Capture screenshot
  const captureScreenshot = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    // Download screenshot
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mine-screenshot-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Initialize cameras and check backend connection on component mount
  useEffect(() => {
    getCameras();
    checkBackendConnection();
    
    // Check backend connection every 30 seconds
    const connectionInterval = setInterval(checkBackendConnection, 30000);
    
    return () => {
      clearInterval(connectionInterval);
    };
  }, [getCameras, checkBackendConnection]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopStream();
    };
  }, [stopStream]);

  const getRiskColor = (level) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDetectionColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Live Webcam Monitoring
          </h1>
          <p className="text-gray-600 mt-2">AI-powered mine risk detection with live camera feed</p>
        </div>
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(riskLevel)}`}>
              Risk Level: {riskLevel.toUpperCase()}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${
              backendConnected 
                ? 'bg-green-100 text-green-600' 
                : 'bg-red-100 text-red-600'
            }`}>
              {backendConnected ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
              <span>Backend: {backendConnected ? 'CONNECTED' : 'DISCONNECTED'}</span>
            </div>
            <button
              onClick={() => setDetectionEnabled(!detectionEnabled)}
              disabled={!backendConnected}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                detectionEnabled && backendConnected
                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Eye className="h-4 w-4" />
              <span>AI Detection: {detectionEnabled && backendConnected ? 'ON' : 'OFF'}</span>
            </button>
          </div>
      </div>

      {/* Camera Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Camera Controls</h3>
          <div className="flex items-center space-x-3">
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {availableCameras.map((camera) => (
                <option key={camera.deviceId} value={camera.deviceId}>
                  {camera.label || `Camera ${camera.deviceId.slice(0, 8)}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={isStreaming ? stopStream : startStream}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
              isStreaming 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            {isStreaming ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            <span>{isStreaming ? 'Stop Camera' : 'Start Camera'}</span>
          </button>

          <button
            onClick={captureScreenshot}
            disabled={!isStreaming}
            className="px-6 py-3 bg-blue-100 text-blue-600 rounded-xl font-medium hover:bg-blue-200 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Camera className="h-5 w-5" />
            <span>Capture</span>
          </button>

          <button
            onClick={toggleRecording}
            disabled={!isStreaming}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              recording 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {recording ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            <span>{recording ? 'Stop Recording' : 'Start Recording'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            disabled={!isStreaming}
            className="px-6 py-3 bg-purple-100 text-purple-600 rounded-xl font-medium hover:bg-purple-200 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            <span>Fullscreen</span>
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm">{error}</p>
            {!backendConnected && (
              <div className="mt-2">
                <p className="text-red-600 text-xs">
                  To start the Python backend server, run:
                </p>
                <code className="block mt-1 p-2 bg-gray-100 rounded text-xs">
                  cd backend && pip install -r requirements.txt && python app.py
                </code>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Video Display */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Live Camera Feed</h3>
            </div>
            
            <div className="relative bg-black">
              {annotatedFrame ? (
                <img
                  src={annotatedFrame}
                  alt="AI Annotated Video Feed"
                  className="w-full h-auto max-h-96 object-cover"
                />
              ) : (
                <video
                  ref={videoRef}
                  className="w-full h-auto max-h-96 object-cover"
                  playsInline
                  muted
                />
              )}
              
              {/* AI Detection Overlays */}
              {detectionEnabled && detectedRisks.length > 0 && (
                <div className="absolute inset-0 pointer-events-none">
                  {detectedRisks.map((detection) => (
                    <div
                      key={detection.id}
                      className={`absolute border-2 rounded-lg p-2 ${getDetectionColor(detection.severity)}`}
                      style={{
                        left: detection.location.x,
                        top: detection.location.y,
                        width: 100,
                        height: 60
                      }}
                    >
                      <div className="text-xs font-medium">
                        {detection.type.replace('_', ' ').toUpperCase()}
                      </div>
                      <div className="text-xs">
                        {(detection.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Recording Indicator */}
              {recording && (
                <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">REC</span>
                </div>
              )}

              {/* Status Overlay */}
              {!isStreaming && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                  <div className="text-center text-white">
                    <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Camera Not Active</p>
                    <p className="text-sm opacity-75">Click "Start Camera" to begin monitoring</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detection Panel */}
        <div className="space-y-6">
          {/* Risk Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Current Risk Level</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(riskLevel)}`}>
                  {riskLevel.toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">AI Detection</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  detectionEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {detectionEnabled ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Active Detections</span>
                <span className="text-lg font-bold text-gray-900">{detectedRisks.length}</span>
              </div>
            </div>
          </div>

          {/* Recent Detections */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Detections</h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {detectedRisks.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No risks detected</p>
                </div>
              ) : (
                detectedRisks.slice(-5).reverse().map((detection) => (
                  <div key={detection.id} className={`p-3 rounded-lg border ${getDetectionColor(detection.severity)}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium capitalize">
                        {detection.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-500">
                        {detection.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        Confidence: {(detection.confidence * 100).toFixed(0)}%
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        detection.severity === 'critical' ? 'bg-red-200 text-red-800' :
                        detection.severity === 'high' ? 'bg-orange-200 text-orange-800' :
                        detection.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-gray-200 text-gray-800'
                      }`}>
                        {detection.severity}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                Send Alert
              </button>
              <button className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm">
                Generate Report
              </button>
              <button className="w-full px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm">
                Calibrate AI
              </button>
              <button className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm">
                Emergency Stop
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden canvas for screenshots */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default LiveWebcam;
