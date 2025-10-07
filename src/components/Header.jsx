import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Search, Settings, User, LogOut, Shield, Activity } from 'lucide-react';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would trigger search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                MineGuard Pro
              </h1>
              <p className="text-xs text-gray-500 font-medium">Safety Intelligence Platform</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mines, alerts, or reports..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </form>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-200 relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </button>
          </div>

          {/* Settings */}
          <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)} 
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-md">
                <User className="h-4 w-4" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{user?.role || 'Safety Manager'}</p>
              </div>
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'admin@mineguard.com'}</p>
                </div>
                <button 
                  onClick={() => { navigate('/profile'); setIsProfileOpen(false); }}
                  className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                >
                  <User className="h-4 w-4 mr-3" />
                  Your Profile
                </button>
                <button 
                  onClick={() => { navigate('/settings'); setIsProfileOpen(false); }}
                  className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </button>
                <button 
                  onClick={() => { navigate('/activity'); setIsProfileOpen(false); }}
                  className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                >
                  <Activity className="h-4 w-4 mr-3" />
                  Activity Log
                </button>
                <hr className="my-2" />
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;