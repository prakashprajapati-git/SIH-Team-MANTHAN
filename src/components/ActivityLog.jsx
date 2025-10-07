import React, { useState } from 'react';
import { Activity, Clock, User, Shield, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

const ActivityLog = () => {
  const [filter, setFilter] = useState('all');
  
  const activities = [
    {
      id: 1,
      type: 'login',
      user: 'Admin User',
      action: 'Logged in successfully',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      status: 'success',
      details: 'Login from Chrome on Windows'
    },
    {
      id: 2,
      type: 'alert',
      user: 'System',
      action: 'Critical alert triggered',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      status: 'critical',
      details: 'High risk detected in Zone A-3'
    },
    {
      id: 3,
      type: 'report',
      user: 'Admin User',
      action: 'Generated safety report',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: 'info',
      details: 'Weekly safety report for all zones'
    },
    {
      id: 4,
      type: 'settings',
      user: 'Admin User',
      action: 'Updated notification settings',
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      status: 'info',
      details: 'Enabled SMS alerts for critical events'
    },
    {
      id: 5,
      type: 'alert',
      user: 'System',
      action: 'Alert resolved',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      status: 'success',
      details: 'Zone B-2 risk level normalized'
    },
    {
      id: 6,
      type: 'login',
      user: 'Admin User',
      action: 'Failed login attempt',
      timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
      status: 'error',
      details: 'Invalid password from Chrome on Windows'
    }
  ];

  const getActivityIcon = (type, status) => {
    switch (type) {
      case 'login':
        return status === 'success' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4" />;
      case 'report':
        return <Activity className="h-4 w-4" />;
      case 'settings':
        return <Shield className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'info':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Activity Log
          </h1>
          <p className="text-gray-600 mt-2">Monitor system activities and user actions</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Activities</option>
            <option value="login">Login Events</option>
            <option value="alert">Alerts</option>
            <option value="report">Reports</option>
            <option value="settings">Settings</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-gray-900">
                {activities.filter(a => a.status === 'success').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-gray-900">
                {activities.filter(a => a.status === 'critical').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Users Active</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
                  {getActivityIcon(activity.type, activity.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(activity.timestamp)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-1 flex items-center space-x-2">
                    <User className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-gray-600">{activity.user}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{activity.details}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
