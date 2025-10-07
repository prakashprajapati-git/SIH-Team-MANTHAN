import React, { useState } from 'react';
import { Bell, Shield, Palette, Globe, Database, Save, RotateCcw } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      criticalAlerts: true,
      weeklyReports: true
    },
    appearance: {
      theme: 'light',
      language: 'en',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY'
    },
    security: {
      sessionTimeout: 30,
      requirePasswordChange: false,
      twoFactorAuth: false
    },
    system: {
      autoRefresh: true,
      refreshInterval: 30,
      dataRetention: 365
    }
  });

  const handleNotificationChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handleAppearanceChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: value
      }
    }));
  };

  const handleSecurityChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }));
  };

  const handleSystemChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      system: {
        ...prev.system,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    localStorage.setItem('mineguard_settings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        notifications: {
          email: true,
          sms: false,
          push: true,
          criticalAlerts: true,
          weeklyReports: true
        },
        appearance: {
          theme: 'light',
          language: 'en',
          timezone: 'Asia/Kolkata',
          dateFormat: 'DD/MM/YYYY'
        },
        security: {
          sessionTimeout: 30,
          requirePasswordChange: false,
          twoFactorAuth: false
        },
        system: {
          autoRefresh: true,
          refreshInterval: 30,
          dataRetention: 365
        }
      });
    }
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-600 mt-2">Customize your experience and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-600">Manage your notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.email}
                onChange={(value) => handleNotificationChange('email', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">SMS Alerts</h4>
                <p className="text-sm text-gray-600">Get critical alerts via SMS</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.sms}
                onChange={(value) => handleNotificationChange('sms', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Push Notifications</h4>
                <p className="text-sm text-gray-600">Browser push notifications</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.push}
                onChange={(value) => handleNotificationChange('push', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Critical Alerts</h4>
                <p className="text-sm text-gray-600">Immediate alerts for critical issues</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.criticalAlerts}
                onChange={(value) => handleNotificationChange('criticalAlerts', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Weekly Reports</h4>
                <p className="text-sm text-gray-600">Automated weekly summary reports</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.weeklyReports}
                onChange={(value) => handleNotificationChange('weeklyReports', value)}
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Palette className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
              <p className="text-sm text-gray-600">Customize the look and feel</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select
                value={settings.appearance.theme}
                onChange={(e) => handleAppearanceChange('theme', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={settings.appearance.language}
                onChange={(e) => handleAppearanceChange('language', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select
                value={settings.appearance.timezone}
                onChange={(e) => handleAppearanceChange('timezone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
              <select
                value={settings.appearance.dateFormat}
                onChange={(e) => handleAppearanceChange('dateFormat', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Security</h3>
              <p className="text-sm text-gray-600">Manage security settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="5"
                max="480"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Require Password Change</h4>
                <p className="text-sm text-gray-600">Force password change on next login</p>
              </div>
              <ToggleSwitch
                enabled={settings.security.requirePasswordChange}
                onChange={(value) => handleSecurityChange('requirePasswordChange', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Add extra security layer</p>
              </div>
              <ToggleSwitch
                enabled={settings.security.twoFactorAuth}
                onChange={(value) => handleSecurityChange('twoFactorAuth', value)}
              />
            </div>
          </div>
        </div>

        {/* System */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Database className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">System</h3>
              <p className="text-sm text-gray-600">System preferences and data settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Auto Refresh</h4>
                <p className="text-sm text-gray-600">Automatically refresh data</p>
              </div>
              <ToggleSwitch
                enabled={settings.system.autoRefresh}
                onChange={(value) => handleSystemChange('autoRefresh', value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refresh Interval (seconds)
              </label>
              <input
                type="number"
                value={settings.system.refreshInterval}
                onChange={(e) => handleSystemChange('refreshInterval', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="10"
                max="300"
                disabled={!settings.system.autoRefresh}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Retention (days)
              </label>
              <input
                type="number"
                value={settings.system.dataRetention}
                onChange={(e) => handleSystemChange('dataRetention', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="30"
                max="3650"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
