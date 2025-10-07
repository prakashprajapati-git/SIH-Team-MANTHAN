import React, { useState } from 'react';
import { MapPin, Layers, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { indianMineZones } from '../data/indianMinesData';

const RiskMap = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [mapView, setMapView] = useState('2d');
  const [showLabels, setShowLabels] = useState(true);

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getRiskSize = (probability) => {
    return Math.max(8, probability * 20);
  };

  const getMineTypeColor = (mineType) => {
    const colors = {
      'Coal': '#1f2937',
      'Iron Ore': '#dc2626',
      'Gold': '#fbbf24',
      'Bauxite': '#f97316',
      'Marble': '#e5e7eb',
      'Limestone': '#6b7280'
    };
    return colors[mineType] || '#6b7280';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Interactive Indian Mine Risk Map</h2>
          <p className="text-sm text-gray-600">भारतीय खान जोखिम मानचित्र</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMapView(mapView === '2d' ? '3d' : '2d')}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Layers className="h-4 w-4" />
            <span>{mapView === '2d' ? '3D View' : '2D View'}</span>
          </button>
          <button
            onClick={() => setShowLabels(!showLabels)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <MapPin className="h-4 w-4" />
            <span>{showLabels ? 'Hide Labels' : 'Show Labels'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-gray-100 rounded-lg p-4 h-96 relative border-2 border-gray-200">
            <div className="absolute top-2 left-2 bg-white rounded-lg p-2 shadow-md z-10">
              <div className="flex items-center space-x-2">
                <ZoomIn className="h-4 w-4 text-gray-600 cursor-pointer hover:text-blue-600" />
                <ZoomOut className="h-4 w-4 text-gray-600 cursor-pointer hover:text-blue-600" />
                <RotateCcw className="h-4 w-4 text-gray-600 cursor-pointer hover:text-blue-600" />
              </div>
            </div>

            {/* Mine Site Visualization */}
            <svg className="w-full h-full" viewBox="0 0 400 300">
              {/* Background terrain */}
              <defs>
                <pattern id="terrain" patternUnits="userSpaceOnUse" width="20" height="20">
                  <rect width="20" height="20" fill="#f3f4f6" />
                  <circle cx="10" cy="10" r="1" fill="#d1d5db" />
                </pattern>
              </defs>
              <rect width="400" height="300" fill="url(#terrain)" />
              
              {/* Indian map outline (simplified) */}
              <path 
                d="M80 80 L320 80 L340 120 L320 200 L280 240 L120 240 L80 200 Z" 
                fill="none" 
                stroke="#8b5cf6" 
                strokeWidth="2" 
                strokeDasharray="5,5" 
              />
              
              {/* Risk zones */}
              {indianMineZones.map(zone => (
                <g key={zone.id}>
                  <circle
                    cx={zone.x}
                    cy={zone.y}
                    r={getRiskSize(zone.probability)}
                    fill={getRiskColor(zone.riskLevel)}
                    fillOpacity="0.7"
                    stroke={getMineTypeColor(zone.mineType)}
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-opacity-90 transition-all"
                    onClick={() => setSelectedZone(zone)}
                  />
                  {showLabels && (
                    <text
                      x={zone.x}
                      y={zone.y - getRiskSize(zone.probability) - 5}
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-700"
                    >
                      {zone.name.split(' - ')[0]}
                    </text>
                  )}
                  <text
                    x={zone.x}
                    y={zone.y + 3}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white"
                  >
                    {(zone.probability * 100).toFixed(0)}%
                  </text>
                </g>
              ))}
              
              {/* Scale indicator */}
              <g transform="translate(20, 260)">
                <text x="0" y="0" className="text-xs fill-gray-600">Scale: 500km</text>
                <line x1="0" y1="5" x2="50" y2="5" stroke="#6b7280" strokeWidth="2" />
              </g>
            </svg>

            {/* Legend */}
            <div className="absolute bottom-2 right-2 bg-white rounded-lg p-3 shadow-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Risk Levels</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-gray-600">High (&gt;70%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-gray-600">Medium (30-70%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-600">Low (&lt;30%)</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t">
                <h5 className="text-xs font-semibold text-gray-700 mb-1">Mine Types</h5>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                    <span>Coal</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                    <span>Iron</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span>Gold</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span>Bauxite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Details Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Zone Details / क्षेत्र विवरण</h3>
          {selectedZone ? (
            <div className="bg-white border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">{selectedZone.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedZone.riskLevel === 'high' ? 'text-red-600 bg-red-100' :
                  selectedZone.riskLevel === 'medium' ? 'text-yellow-600 bg-yellow-100' :
                  'text-green-600 bg-green-100'
                }`}>
                  {selectedZone.riskLevel.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">State / राज्य:</span>
                  <span className="font-medium">{selectedZone.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mine Type / खान प्रकार:</span>
                  <span className="font-medium">{selectedZone.mineType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Probability:</span>
                  <span className="font-medium">{(selectedZone.probability * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Incident:</span>
                  <span className="font-medium">{selectedZone.lastIncident || 'None'}</span>
                </div>
              </div>

              <div className="pt-3 border-t">
                <h5 className="font-medium text-gray-700 mb-2">Recommended Actions / सुझावित कार्य:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {selectedZone.riskLevel === 'high' && (
                    <>
                      <li>• तत्काल कर्मचारियों की निकासी (Immediate evacuation of personnel)</li>
                      <li>• निगरानी आवृत्ति बढ़ाएं (Increase monitoring frequency)</li>
                      <li>• अतिरिक्त सेंसर तैनात करें (Deploy additional sensors)</li>
                      <li>• ढलान स्थिरीकरण पर विचार करें (Consider slope stabilization)</li>
                    </>
                  )}
                  {selectedZone.riskLevel === 'medium' && (
                    <>
                      <li>• उन्नत निगरानी प्रोटोकॉल (Enhanced monitoring protocol)</li>
                      <li>• भारी उपकरण पहुंच प्रतिबंधित करें (Restrict heavy equipment access)</li>
                      <li>• दैनिक दृश्य निरीक्षण (Daily visual inspections)</li>
                      <li>• आकस्मिक योजना तैयार करें (Prepare contingency plans)</li>
                    </>
                  )}
                  {selectedZone.riskLevel === 'low' && (
                    <>
                      <li>• नियमित निगरानी जारी रखें (Continue routine monitoring)</li>
                      <li>• साप्ताहिक दृश्य निरीक्षण (Weekly visual inspections)</li>
                      <li>• वर्तमान प्रोटोकॉल बनाए रखें (Maintain current protocols)</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-4 text-center text-gray-500">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>Click on a zone in the map to view details</p>
              <p className="text-xs">विवरण देखने के लिए मानचित्र पर एक क्षेत्र पर क्लिक करें</p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3">Indian Mine Statistics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Zones:</span>
                <span className="font-medium">{indianMineZones.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">High Risk:</span>
                <span className="font-medium text-red-600">
                  {indianMineZones.filter(z => z.riskLevel === 'high').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Coal Mines:</span>
                <span className="font-medium text-gray-800">
                  {indianMineZones.filter(z => z.mineType === 'Coal').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">States Covered:</span>
                <span className="font-medium text-blue-600">
                  {new Set(indianMineZones.map(z => z.state)).size}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMap;