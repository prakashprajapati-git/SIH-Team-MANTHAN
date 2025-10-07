import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  Settings, 
  Shield, 
  MapPin, 
  Camera, 
  Video,
  TrendingUp, 
  Bell, 
  MessageSquare, 
  Activity,
  ChevronRight,
  Home,
  AlertTriangle
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState('main');

  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'dashboard';
    if (path === '/analytics') return 'analytics';
    if (path === '/reports') return 'reports';
    if (path === '/riskmap') return 'riskmap';
    if (path === '/imageanalysis') return 'imageanalysis';
    if (path === '/livewebcam') return 'livewebcam';
    if (path === '/prediction') return 'prediction';
    if (path === '/pitholealarm') return 'pitholealarm';
    if (path === '/alerts') return 'alerts';
    if (path === '/smsalerts') return 'smsalerts';
    if (path === '/environmental') return 'environmental';
    if (path === '/settings') return 'settings';
    if (path === '/activity') return 'activity';
    return 'rockfall'; // default to rockfall dashboard
  };

  const handleNavigation = (itemId) => {
    const routes = {
      dashboard: '/dashboard',
      analytics: '/analytics',
      reports: '/reports',
      riskmap: '/riskmap',
      imageanalysis: '/imageanalysis',
      livewebcam: '/livewebcam',
      prediction: '/prediction',
      pitholealarm: '/pitholealarm',
      alerts: '/alerts',
      smsalerts: '/smsalerts',
      environmental: '/environmental',
      settings: '/settings',
      activity: '/activity'
    };
    
    if (routes[itemId]) {
      navigate(routes[itemId]);
    }
  };
  
  const mainMenuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, badge: null },
    { id: 'reports', name: 'Reports', icon: FileText, badge: '3' },
  ];

  const safetyMenuItems = [
    { id: 'riskmap', name: 'Risk Map', icon: MapPin, badge: null },
    { id: 'imageanalysis', name: 'Image Analysis', icon: Camera, badge: null },
    { id: 'livewebcam', name: 'Live Webcam', icon: Video, badge: 'Live' },
    { id: 'prediction', name: 'AI Prediction', icon: TrendingUp, badge: 'New' },
    { id: 'pitholealarm', name: 'Pit Hole Alarm', icon: AlertTriangle, badge: '2' },
    { id: 'alerts', name: 'Alert System', icon: Bell, badge: '5' },
    { id: 'smsalerts', name: 'SMS/WhatsApp', icon: MessageSquare, badge: null },
    { id: 'environmental', name: 'Environmental', icon: Shield, badge: null },
  ];

  const systemMenuItems = [
    { id: 'settings', name: 'Settings', icon: Settings, badge: null },
    { id: 'activity', name: 'Activity Log', icon: Activity, badge: null },
  ];

  const MenuSection = ({ title, items, sectionKey }) => (
    <div className="mb-6">
      <button
        onClick={() => setExpandedSection(expandedSection === sectionKey ? null : sectionKey)}
        className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
      >
        <span>{title}</span>
        <ChevronRight 
          className={`h-3 w-3 transition-transform duration-200 ${
            expandedSection === sectionKey ? 'rotate-90' : ''
          }`} 
        />
      </button>
      
      {expandedSection === sectionKey && (
        <ul className="space-y-1 mt-2">
          {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`group w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                    getActiveItem() === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                <div className="flex items-center">
                  <item.icon className={`h-4 w-4 mr-3 ${
                    getActiveItem() === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                  }`} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                    getActiveItem() === item.id 
                      ? 'bg-white/20 text-white' 
                      : item.badge === 'New' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
              </li>
            ))}
          </ul>
      )}
    </div>
  );

  return (
    <aside className="bg-white/95 backdrop-blur-sm border-r border-gray-200/50 w-64 hidden md:block sticky top-0 h-screen overflow-y-auto">
      <div className="p-6">
        {/* Quick Stats */}
        <div className="mb-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Safety Status</h3>
              <p className="text-xs text-gray-600">Real-time monitoring</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">3</div>
              <div className="text-xs text-gray-600">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">47</div>
              <div className="text-xs text-gray-600">Safe</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <MenuSection title="Main" items={mainMenuItems} sectionKey="main" />
          <MenuSection title="Safety & Monitoring" items={safetyMenuItems} sectionKey="safety" />
          <MenuSection title="System" items={systemMenuItems} sectionKey="system" />
        </nav>

        {/* Quick Actions */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-white hover:text-gray-900 rounded-lg transition-colors">
              <Bell className="h-4 w-4 mr-2" />
              Send Alert
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-white hover:text-gray-900 rounded-lg transition-colors">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-white hover:text-gray-900 rounded-lg transition-colors">
              <Camera className="h-4 w-4 mr-2" />
              Upload Image
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;