import React, { useState } from 'react';
import { Cloud, Thermometer, Droplets, Wind, Activity, Sun } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { environmentalData, sensorData } from '../data/rockfallData';

const EnvironmentalMonitor = () => {
  const [selectedMetric, setSelectedMetric] = useState('rainfall');

  const currentWeather = {
    temperature: 19,
    humidity: 78,
    windSpeed: 15,
    rainfall: 8.2,
    pressure: 1013.2,
    visibility: 8.5
  };

  const environmentalMetrics = [
    { id: 'rainfall', name: 'Rainfall', icon: Droplets, unit: 'mm', color: '#3b82f6', current: currentWeather.rainfall },
    { id: 'temperature', name: 'Temperature', icon: Thermometer, unit: '°C', color: '#ef4444', current: currentWeather.temperature },
    { id: 'humidity', name: 'Humidity', icon: Cloud, unit: '%', color: '#10b981', current: currentWeather.humidity },
    { id: 'windSpeed', name: 'Wind Speed', icon: Wind, unit: 'km/h', color: '#f59e0b', current: currentWeather.windSpeed }
  ];

  const getWeatherImpact = (rainfall, windSpeed) => {
    if (rainfall > 10 || windSpeed > 20) {
      return { level: 'high', color: 'red', message: 'Severe weather conditions - High rockfall risk' };
    } else if (rainfall > 5 || windSpeed > 15) {
      return { level: 'medium', color: 'yellow', message: 'Moderate weather impact - Increased monitoring required' };
    } else {
      return { level: 'low', color: 'green', message: 'Favorable weather conditions - Normal operations' };
    }
  };

  const weatherImpact = getWeatherImpact(currentWeather.rainfall, currentWeather.windSpeed);

  const MetricCard = ({ metric }) => {
    const Icon = metric.icon;
    return (
      <div
        onClick={() => setSelectedMetric(metric.id)}
        className={`bg-white border rounded-lg p-4 cursor-pointer transition-all ${
          selectedMetric === metric.id ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{metric.name}</p>
            <p className="text-2xl font-bold" style={{ color: metric.color }}>
              {metric.current} {metric.unit}
            </p>
          </div>
          <Icon className="h-8 w-8" style={{ color: metric.color }} />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Environmental Monitoring</h2>
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-gray-600">Real-time Weather & Sensors</span>
        </div>
      </div>

      {/* Weather Impact Alert */}
      <div className={`border rounded-lg p-4 ${
        weatherImpact.level === 'high' ? 'bg-red-50 border-red-200' :
        weatherImpact.level === 'medium' ? 'bg-yellow-50 border-yellow-200' :
        'bg-green-50 border-green-200'
      }`}>
        <div className="flex items-center space-x-2">
          <Sun className={`h-5 w-5 ${
            weatherImpact.level === 'high' ? 'text-red-600' :
            weatherImpact.level === 'medium' ? 'text-yellow-600' :
            'text-green-600'
          }`} />
          <span className={`font-medium ${
            weatherImpact.level === 'high' ? 'text-red-800' :
            weatherImpact.level === 'medium' ? 'text-yellow-800' :
            'text-green-800'
          }`}>
            {weatherImpact.message}
          </span>
        </div>
      </div>

      {/* Current Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {environmentalMetrics.map(metric => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Environmental Trends */}
        <div className="lg:col-span-2 bg-white border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">24-Hour Environmental Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={environmentalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke={environmentalMetrics.find(m => m.id === selectedMetric)?.color} 
                  fill={environmentalMetrics.find(m => m.id === selectedMetric)?.color}
                  fillOpacity={0.3}
                  name={environmentalMetrics.find(m => m.id === selectedMetric)?.name}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Weather Data */}
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Additional Metrics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Atmospheric Pressure</span>
                <span className="font-medium">{currentWeather.pressure} hPa</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Visibility</span>
                <span className="font-medium">{currentWeather.visibility} km</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">UV Index</span>
                <span className="font-medium">5 (Moderate)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Dew Point</span>
                <span className="font-medium">14°C</span>
              </div>
            </div>
          </div>

          {/* Sensor Status */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Sensor Network Status</h3>
            <div className="space-y-2">
              {sensorData.map(sensor => (
                <div key={sensor.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{sensor.id}</p>
                    <p className="text-xs text-gray-500">{sensor.location}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sensor.status === 'critical' ? 'text-red-600 bg-red-100' :
                    sensor.status === 'warning' ? 'text-yellow-600 bg-yellow-100' :
                    'text-green-600 bg-green-100'
                  }`}>
                    {sensor.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Forecast */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">3-Day Forecast</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cloud className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Today</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">19°C / 12°C</p>
                  <p className="text-xs text-gray-500">Rain: 15mm</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">Tomorrow</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">22°C / 15°C</p>
                  <p className="text-xs text-gray-500">Rain: 2mm</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">Day 3</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">24°C / 17°C</p>
                  <p className="text-xs text-gray-500">Rain: 0mm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact Analysis */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Environmental Impact on Rockfall Risk</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Risk Factors</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Heavy rainfall increases pore pressure and reduces slope stability</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Temperature fluctuations cause freeze-thaw cycles in rock joints</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>High winds can trigger loose rock movement</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Humidity affects rock weathering and joint conditions</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Current Risk Assessment</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rainfall Impact:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  currentWeather.rainfall > 10 ? 'text-red-600 bg-red-100' :
                  currentWeather.rainfall > 5 ? 'text-yellow-600 bg-yellow-100' :
                  'text-green-600 bg-green-100'
                }`}>
                  {currentWeather.rainfall > 10 ? 'High' : currentWeather.rainfall > 5 ? 'Medium' : 'Low'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Wind Impact:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  currentWeather.windSpeed > 20 ? 'text-red-600 bg-red-100' :
                  currentWeather.windSpeed > 15 ? 'text-yellow-600 bg-yellow-100' :
                  'text-green-600 bg-green-100'
                }`}>
                  {currentWeather.windSpeed > 20 ? 'High' : currentWeather.windSpeed > 15 ? 'Medium' : 'Low'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Temperature Stability:</span>
                <span className="px-2 py-1 rounded text-xs font-medium text-green-600 bg-green-100">
                  Stable
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalMonitor;