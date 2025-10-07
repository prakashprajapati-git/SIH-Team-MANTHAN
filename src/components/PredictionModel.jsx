import React, { useState } from 'react';
import { Brain, TrendingUp, Database, Settings, Play, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { predictionHistory, riskTrendData } from '../data/rockfallData';

const PredictionModel = () => {
  const [selectedModel, setSelectedModel] = useState('neural_network');
  const [isTraining, setIsTraining] = useState(false);
  const [predictionInput, setPredictionInput] = useState({
    displacement: '',
    strain: '',
    porePressure: '',
    rainfall: '',
    temperature: '',
    vibration: ''
  });
  const [predictionResult, setPredictionResult] = useState(null);

  const modelTypes = [
    { id: 'neural_network', name: 'Deep Neural Network', accuracy: 92.5, description: 'Multi-layer perceptron with temporal features' },
    { id: 'random_forest', name: 'Random Forest', accuracy: 88.3, description: 'Ensemble method with geological features' },
    { id: 'svm', name: 'Support Vector Machine', accuracy: 85.7, description: 'Non-linear SVM with RBF kernel' },
    { id: 'lstm', name: 'LSTM Network', accuracy: 94.1, description: 'Long Short-Term Memory for time series' }
  ];

  const handlePrediction = () => {
    setIsTraining(true);
    
    // Simulate AI prediction calculation
    setTimeout(() => {
      const displacement = parseFloat(predictionInput.displacement) || 0;
      const strain = parseFloat(predictionInput.strain) || 0;
      const porePressure = parseFloat(predictionInput.porePressure) || 0;
      const rainfall = parseFloat(predictionInput.rainfall) || 0;
      const vibration = parseFloat(predictionInput.vibration) || 0;
      
      // Mock prediction algorithm
      let riskScore = 0;
      riskScore += displacement * 0.3;
      riskScore += strain * 100;
      riskScore += porePressure * 0.002;
      riskScore += rainfall * 0.05;
      riskScore += vibration * 0.08;
      
      // Normalize to 0-1 range
      riskScore = Math.min(Math.max(riskScore / 10, 0), 1);
      
      const confidence = 0.85 + Math.random() * 0.1;
      const timeToFailure = riskScore > 0.7 ? Math.random() * 24 : Math.random() * 168;
      
      setPredictionResult({
        riskProbability: riskScore,
        confidence: confidence,
        timeToFailure: timeToFailure,
        riskLevel: riskScore > 0.7 ? 'high' : riskScore > 0.3 ? 'medium' : 'low',
        recommendations: generateRecommendations(riskScore)
      });
      
      setIsTraining(false);
    }, 2000);
  };

  const generateRecommendations = (riskScore) => {
    if (riskScore > 0.7) {
      return [
        'Immediate evacuation of personnel from affected area',
        'Deploy emergency response team',
        'Increase sensor monitoring frequency to real-time',
        'Consider controlled blasting to reduce slope stress'
      ];
    } else if (riskScore > 0.3) {
      return [
        'Enhanced monitoring protocol activation',
        'Restrict heavy equipment in the area',
        'Schedule additional geotechnical assessment',
        'Prepare evacuation contingency plans'
      ];
    } else {
      return [
        'Continue routine monitoring',
        'Maintain current safety protocols',
        'Schedule regular visual inspections',
        'Monitor weather conditions closely'
      ];
    }
  };

  const handleInputChange = (field, value) => {
    setPredictionInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">AI Prediction Model</h2>
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-gray-600">Machine Learning Engine</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Model Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Model Selection</h3>
          <div className="space-y-3">
            {modelTypes.map(model => (
              <div
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedModel === model.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{model.name}</h4>
                  <span className="text-sm font-medium text-green-600">{model.accuracy}%</span>
                </div>
                <p className="text-xs text-gray-600">{model.description}</p>
              </div>
            ))}
          </div>

          {/* Input Parameters */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3">Input Parameters</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Displacement (mm)</label>
                <input
                  type="number"
                  value={predictionInput.displacement}
                  onChange={(e) => handleInputChange('displacement', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Strain (με)</label>
                <input
                  type="number"
                  value={predictionInput.strain}
                  onChange={(e) => handleInputChange('strain', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Pore Pressure (kPa)</label>
                <input
                  type="number"
                  value={predictionInput.porePressure}
                  onChange={(e) => handleInputChange('porePressure', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Rainfall (mm)</label>
                <input
                  type="number"
                  value={predictionInput.rainfall}
                  onChange={(e) => handleInputChange('rainfall', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Vibration (mm/s)</label>
                <input
                  type="number"
                  value={predictionInput.vibration}
                  onChange={(e) => handleInputChange('vibration', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="0.0"
                />
              </div>
            </div>

            <button
              onClick={handlePrediction}
              disabled={isTraining}
              className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isTraining ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Run Prediction</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Prediction Results */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Prediction Results</h3>
          
          {predictionResult ? (
            <div className="space-y-4">
              {/* Risk Assessment */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3">Risk Assessment</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-1 ${
                      predictionResult.riskLevel === 'high' ? 'text-red-600' :
                      predictionResult.riskLevel === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {(predictionResult.riskProbability * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Risk Probability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {(predictionResult.confidence * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Model Confidence</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Estimated Time to Failure:</span>
                    <span className="font-medium">
                      {predictionResult.timeToFailure < 24 
                        ? `${predictionResult.timeToFailure.toFixed(1)} hours`
                        : `${(predictionResult.timeToFailure / 24).toFixed(1)} days`
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3">AI Recommendations</h4>
                <ul className="space-y-2">
                  {predictionResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-8 text-center">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Enter sensor data and run prediction to see AI analysis</p>
            </div>
          )}

          {/* Model Performance */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3">Model Performance History</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictionHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} name="Predicted Risk" />
                  <Line type="monotone" dataKey="actual" stroke="#ef4444" strokeWidth={2} name="Actual Risk" />
                  <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} name="Accuracy" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Trend Analysis */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Risk Trend Analysis</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="northSlope" stroke="#ef4444" strokeWidth={2} name="North Slope A" />
              <Line type="monotone" dataKey="southBench" stroke="#f59e0b" strokeWidth={2} name="South Bench B" />
              <Line type="monotone" dataKey="eastWall" stroke="#10b981" strokeWidth={2} name="East Wall C" />
              <Line type="monotone" dataKey="westTerrace" stroke="#8b5cf6" strokeWidth={2} name="West Terrace D" />
              <Line type="monotone" dataKey="centralPit" stroke="#06b6d4" strokeWidth={2} name="Central Pit E" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PredictionModel;