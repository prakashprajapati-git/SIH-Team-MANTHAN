import React, { useState, useRef } from 'react';
import { Upload, Camera, AlertTriangle, CheckCircle, Eye, Download } from 'lucide-react';

const ImageUploadAnalysis = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage({
          file: file,
          url: e.target.result,
          name: file.name,
          size: file.size
        });
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        overallRisk: Math.random() > 0.5 ? 'high' : 'medium',
        riskProbability: 0.65 + Math.random() * 0.3,
        detectedFeatures: [
          { feature: 'Loose Rock Formations', confidence: 0.89, risk: 'high', location: { x: 45, y: 30 } },
          { feature: 'Crack Patterns', confidence: 0.76, risk: 'medium', location: { x: 65, y: 45 } },
          { feature: 'Weathered Surface', confidence: 0.82, risk: 'medium', location: { x: 30, y: 60 } },
          { feature: 'Unstable Slope Angle', confidence: 0.91, risk: 'high', location: { x: 55, y: 25 } }
        ],
        recommendations: [
          'तत्काल भूवैज्ञानिक सर्वेक्षण की आवश्यकता (Immediate geological survey required)',
          'ढीली चट्टानों को हटाने के लिए नियंत्रित विस्फोट (Controlled blasting to remove loose rocks)',
          'अतिरिक्त सहायक संरचनाओं की स्थापना (Installation of additional support structures)',
          'कर्मचारियों के लिए वैकल्पिक मार्ग (Alternative routes for workers)'
        ],
        safetyScore: 35, // out of 100
        analysisTime: '2.3 seconds',
        imageQuality: 'Good'
      };
      
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
    }, 2500);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Mine Image Analysis</h2>
        <div className="flex items-center space-x-2">
          <Camera className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-gray-600">AI-Powered Risk Detection</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Upload Section */}
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Upload Mine Image</h3>
            
            {!uploadedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload mine image</p>
                <p className="text-sm text-gray-500">Supports JPG, PNG, WebP (Max 10MB)</p>
                <p className="text-xs text-gray-400 mt-2">
                  खान की तस्वीर अपलोड करें (Upload mine image)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={uploadedImage.url}
                    alt="Uploaded mine"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  {analysisResult && (
                    <div className="absolute inset-0">
                      {analysisResult.detectedFeatures.map((feature, index) => (
                        <div
                          key={index}
                          className={`absolute w-4 h-4 rounded-full border-2 ${
                            feature.risk === 'high' ? 'bg-red-500 border-red-600' :
                            feature.risk === 'medium' ? 'bg-yellow-500 border-yellow-600' :
                            'bg-green-500 border-green-600'
                          }`}
                          style={{
                            left: `${feature.location.x}%`,
                            top: `${feature.location.y}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          title={feature.feature}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{uploadedImage.name}</span>
                  <span>{(uploadedImage.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>विश्लेषण कर रहे हैं... (Analyzing...)</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        <span>Analyze Risk</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Change Image
                  </button>
                </div>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Quick Analysis Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Analysis Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Clear, high-resolution images work best</li>
              <li>• Include rock faces and slope areas</li>
              <li>• Avoid shadows and poor lighting</li>
              <li>• Multiple angles provide better analysis</li>
              <li>• साफ और उच्च गुणवत्ता की तस्वीरें बेहतर परिणाम देती हैं</li>
            </ul>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="space-y-4">
          {analysisResult ? (
            <>
              {/* Overall Risk Assessment */}
              <div className="bg-white border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Risk Assessment Results</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-1 ${
                      analysisResult.overallRisk === 'high' ? 'text-red-600' :
                      analysisResult.overallRisk === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {(analysisResult.riskProbability * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Risk Probability</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-1 ${
                      analysisResult.safetyScore < 40 ? 'text-red-600' :
                      analysisResult.safetyScore < 70 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {analysisResult.safetyScore}
                    </div>
                    <div className="text-sm text-gray-600">Safety Score</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Analysis Time: {analysisResult.analysisTime}</span>
                  <span>Image Quality: {analysisResult.imageQuality}</span>
                </div>
              </div>

              {/* Detected Features */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3">Detected Risk Features</h4>
                <div className="space-y-2">
                  {analysisResult.detectedFeatures.map((feature, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getRiskColor(feature.risk)}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{feature.feature}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-white">
                          {(feature.confidence * 100).toFixed(0)}% confident
                        </span>
                      </div>
                      <div className="text-sm opacity-80">
                        Risk Level: {feature.risk.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3">
                  Safety Recommendations / सुरक्षा सिफारिशें
                </h4>
                <ul className="space-y-2">
                  {analysisResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Download Report</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Send Alert</span>
                </button>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-8 text-center">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">Upload an image to start AI analysis</p>
              <p className="text-sm text-gray-500">
                विश्लेषण शुरू करने के लिए एक तस्वीर अपलोड करें
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sample Images for Testing */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Sample Test Images</h3>
        <p className="text-sm text-gray-600 mb-3">
          You can use these sample descriptions to test the system:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-3">
            <h4 className="font-medium text-gray-700">High Risk Scenario</h4>
            <p className="text-xs text-gray-600">Loose rocks, visible cracks, steep slopes</p>
          </div>
          <div className="border rounded-lg p-3">
            <h4 className="font-medium text-gray-700">Medium Risk Scenario</h4>
            <p className="text-xs text-gray-600">Some weathering, moderate slope angles</p>
          </div>
          <div className="border rounded-lg p-3">
            <h4 className="font-medium text-gray-700">Low Risk Scenario</h4>
            <p className="text-xs text-gray-600">Stable rock face, proper support structures</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadAnalysis;