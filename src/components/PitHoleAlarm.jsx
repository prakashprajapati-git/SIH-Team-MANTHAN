import React, { useState, useEffect } from 'react';
import { AlertTriangle, Bell, MapPin, Activity, Shield, Users, Clock, Zap, Eye, Settings, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const PitHoleAlarm = () => {
  const [alarmStatus, setAlarmStatus] = useState('active');
  const [alerts, setAlerts] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [selectedZone, setSelectedZone] = useState('all');

  // Mock sensor data
  const mockSensors = [
    {
      id: 1,
      name: 'Pit A-1 Ground Stability',
      zone: 'Pit A',
      type: 'ground_stability',
      status: 'normal',
      value: 85,
      unit: '%',
      lastUpdate: new Date(Date.now() - 1000 * 60 * 2),
      location: { lat: 23.0225, lng: 72.5714 }
    },
    {
      id: 2,
      name: 'Pit B-2 Gas Monitor',
      zone: 'Pit B',
      type: 'gas_level',
      status: 'warning',
      value: 15,
      unit: 'ppm',
      lastUpdate: new Date(Date.now() - 1000 * 60 * 1),
      location: { lat: 23.0235, lng: 72.5724 }
    },
    {
      id: 3,
      name: 'Pit C-3 Movement Detector',
      zone: 'Pit C',
      type: 'movement',
      status: 'critical',
      value: 95,
      unit: '%',
      lastUpdate: new Date(Date.now() - 1000 * 30),
      location: { lat: 23.0245, lng: 72.5734 }
    },
    {
      id: 4,
      name: 'Pit D-4 Access Control',
      zone: 'Pit D',
      type: 'access',
      status: 'normal',
      value: 0,
      unit: 'persons',
      lastUpdate: new Date(Date.now() - 1000 * 60 * 5),
      location: { lat: 23.0255, lng: 72.5744 }
    }
  ];

  // Mock alerts data
  const mockAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Ground Movement Detected',
      message: 'Rapid ground movement detected in Pit C-3. Immediate evacuation required.',
      zone: 'Pit C',
      timestamp: new Date(Date.now() - 1000 * 30),
      status: 'active',
      sensorId: 3
    },
    {
      id: 2,
      type: 'warning',
      title: 'Gas Level Elevated',
      message: 'Gas concentration above safe levels in Pit B-2. Monitor closely.',
      zone: 'Pit B',
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
      status: 'active',
      sensorId: 2
    },
    {
      id: 3,
      type: 'info',
      title: 'System Check Complete',
      message: 'All pit hole alarm systems functioning normally.',
      zone: 'All Zones',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      status: 'resolved',
      sensorId: null
    }
  ];

  useEffect(() => {
    setSensors(mockSensors);
    setAlerts(mockAlerts);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        lastUpdate: new Date()
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'normal': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'warning': return <Bell className="h-5 w-5 text-yellow-600" />;
      case 'info': return <Activity className="h-5 w-5 text-blue-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSensorIcon = (type) => {
    switch (type) {
      case 'ground_stability': return <MapPin className="h-5 w-5" />;
      case 'gas_level': return <Zap className="h-5 w-5" />;
      case 'movement': return <Activity className="h-5 w-5" />;
      case 'access': return <Users className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      return `${hours}h ago`;
    }
  };

  const filteredSensors = selectedZone === 'all' 
    ? sensors 
    : sensors.filter(sensor => sensor.zone === selectedZone);

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const criticalAlerts = activeAlerts.filter(alert => alert.type === 'critical');

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Pit Hole Alarm System
          </h1>
          <p className="text-gray-600 mt-2">Real-time monitoring and safety alerts for mining pit operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isSoundEnabled 
                ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isSoundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setIsAlarmEnabled(!isAlarmEnabled)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
              isAlarmEnabled 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            {isAlarmEnabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isAlarmEnabled ? 'Disable' : 'Enable'} Alarms</span>
          </button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-600">{criticalAlerts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-yellow-600">{activeAlerts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Sensors Online</p>
              <p className="text-2xl font-bold text-blue-600">{sensors.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">System Status</p>
              <p className="text-lg font-bold text-green-600">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Zone Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Zone Monitoring</h3>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Zones</option>
            <option value="Pit A">Pit A</option>
            <option value="Pit B">Pit B</option>
            <option value="Pit C">Pit C</option>
            <option value="Pit D">Pit D</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSensors.map((sensor) => (
            <div key={sensor.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getSensorIcon(sensor.type)}
                  <span className="font-medium text-gray-900">{sensor.name}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor.status)}`}>
                  {sensor.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Value</span>
                  <span className="font-bold text-gray-900">{sensor.value} {sensor.unit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Zone</span>
                  <span className="text-sm font-medium text-gray-900">{sensor.zone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Update</span>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{formatTime(sensor.lastUpdate)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {activeAlerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getAlertIcon(alert.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(alert.timestamp)}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  
                  <div className="flex items-center space-x-4 mt-3">
                    <span className="text-xs text-gray-500">Zone: {alert.zone}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.type === 'critical' ? 'bg-red-100 text-red-700' :
                      alert.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {alert.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors">
                    Acknowledge
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {activeAlerts.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              <Shield className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No active alerts. All systems operating normally.</p>
            </div>
          )}
        </div>
      </div>

      {/* System Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Controls</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Alarm Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">System Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isAlarmEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {isAlarmEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sound Alerts</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isSoundEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {isSoundEnabled ? 'On' : 'Off'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                Test All Alarms
              </button>
              <button className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm">
                Reset Sensors
              </button>
              <button className="w-full px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm">
                Calibrate System
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Emergency</h4>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm">
                Emergency Stop
              </button>
              <button className="w-full px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm">
                Evacuation Alert
              </button>
              <button className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                Contact Emergency
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitHoleAlarm;
