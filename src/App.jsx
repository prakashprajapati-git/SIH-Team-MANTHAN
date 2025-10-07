import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import IndianRockfallDashboard from './components/IndianRockfallDashboard';
import Profile from './components/Profile';
import Settings from './components/Settings';
import ActivityLog from './components/ActivityLog';
import PitHoleAlarm from './components/PitHoleAlarm';
import LiveWebcam from './components/LiveWebcam';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Main Layout Component
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen">
          <div className="animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout>
                <IndianRockfallDashboard />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/analytics" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                  <p className="text-gray-600 mt-2">Advanced analytics and insights coming soon...</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
                  <p className="text-gray-600 mt-2">Report generation and management coming soon...</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/riskmap" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900">Risk Map</h1>
                  <p className="text-gray-600 mt-2">Interactive risk mapping coming soon...</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/imageanalysis" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900">Image Analysis</h1>
                  <p className="text-gray-600 mt-2">AI-powered image analysis coming soon...</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/livewebcam" element={
            <ProtectedRoute>
              <MainLayout>
                <LiveWebcam />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/prediction" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900">AI Prediction</h1>
                  <p className="text-gray-600 mt-2">Machine learning predictions coming soon...</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/pitholealarm" element={
            <ProtectedRoute>
              <MainLayout>
                <PitHoleAlarm />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/alerts" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900">Alert System</h1>
                  <p className="text-gray-600 mt-2">Alert management system coming soon...</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/smsalerts" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900">SMS/WhatsApp Alerts</h1>
                  <p className="text-gray-600 mt-2">Communication alerts coming soon...</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/environmental" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900">Environmental Monitoring</h1>
                  <p className="text-gray-600 mt-2">Environmental data monitoring coming soon...</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <MainLayout>
                <Settings />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/activity" element={
            <ProtectedRoute>
              <MainLayout>
                <ActivityLog />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;