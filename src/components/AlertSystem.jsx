import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, Mail, MessageSquare, Phone } from 'lucide-react';
import { alertHistory } from '../data/rockfallData';

const AlertSystem = () => {
  const [alerts, setAlerts] = useState(alertHistory);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [newAlert, setNewAlert] = useState({
    type: 'warning',
    zone: '',
    message: ''
  });

  const alertTypes = [
    { id: 'critical', name: 'Critical', color: 'red', icon: AlertTriangle },
    { id: 'warning', name: 'Warning', color: 'yellow', icon: Bell },
    { id: 'info', name: 'Info', color: 'blue', icon: CheckCircle }
  ];

  const alertStatuses = [
    { id: 'active', name: 'Active', color: 'red' },
    { id: 'acknowledged', name: 'Acknowledged', color: 'yellow' },
    { id: 'monitoring', name: 'Monitoring', color: 'blue' },
    { id: 'resolved', name: 'Resolved', color: 'green' }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const statusMatch = filterStatus === 'all' || alert.status === filterStatus;
    const typeMatch = filterType === 'all' || alert.type === filterType;
    return statusMatch && typeMatch;
  });

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100';
      case 'acknowledged': return 'text-yellow-600 bg-yellow-100';
      case 'monitoring': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleStatusChange = (alertId, newStatus) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus } : alert
    ));
  };

  const handleCreateAlert = () => {
    if (newAlert.zone && newAlert.message) {
      const alert = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        type: newAlert.type,
        zone: newAlert.zone,
        message: newAlert.message,
        status: 'active'
      };
      setAlerts(prev => [alert, ...prev]);
      setNewAlert({ type: 'warning', zone: '', message: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Alert Management System</h2>
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-gray-600">Real-time Notifications</span>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {alertTypes.map(type => {
          const count = alerts.filter(alert => alert.type === type.id && alert.status === 'active').length;
          const Icon = type.icon;
          return (
            <div key={type.id} className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{type.name} Alerts</p>
                  <p className={`text-2xl font-bold text-${type.color}-600`}>{count}</p>
                </div>
                <Icon className={`h-8 w-8 text-${type.color}-500`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              {alertStatuses.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              <option value="all">All Types</option>
              {alertTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          {/* Alert Cards */}
          <div className="space-y-3">
            {filteredAlerts.map(alert => (
              <div key={alert.id} className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertColor(alert.type)}`}>
                      {alert.type.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{alert.zone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status.toUpperCase()}
                    </span>
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">{alert.message}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <Phone className="h-4 w-4 text-gray-500" />
                  </div>
                  
                  <select
                    value={alert.status}
                    onChange={(e) => handleStatusChange(alert.id, e.target.value)}
                    className="px-2 py-1 border rounded text-xs"
                  >
                    {alertStatuses.map(status => (
                      <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Creation & Settings */}
        <div className="space-y-4">
          {/* Create New Alert */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Create Alert</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Alert Type</label>
                <select
                  value={newAlert.type}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  {alertTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Zone</label>
                <input
                  type="text"
                  value={newAlert.zone}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, zone: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="e.g., North Slope A"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Message</label>
                <textarea
                  value={newAlert.message}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  rows="3"
                  placeholder="Describe the alert condition..."
                />
              </div>
              
              <button
                onClick={handleCreateAlert}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Alert
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Notification Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Email Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">SMS Alerts</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Push Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Sound Alerts</span>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Alert Thresholds</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Critical Risk Level</span>
                  <span className="text-xs font-medium">≥ 70%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Warning Risk Level</span>
                  <span className="text-xs font-medium">≥ 30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Displacement Threshold</span>
                  <span className="text-xs font-medium">≥ 10mm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Emergency Contacts</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Mine Safety Officer</span>
                <span className="font-medium">+1-555-0123</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Emergency Response</span>
                <span className="font-medium">+1-555-0911</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Geotechnical Team</span>
                <span className="font-medium">+1-555-0456</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Operations Manager</span>
                <span className="font-medium">+1-555-0789</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSystem;