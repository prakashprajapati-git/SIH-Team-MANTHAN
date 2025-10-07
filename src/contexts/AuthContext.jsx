import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock user data
  const mockUser = {
    id: 1,
    name: 'Admin User',
    email: 'admin@mineguard.com',
    role: 'Safety Manager',
    avatar: null,
    department: 'Safety & Security',
    phone: '+91 98765 43210',
    lastLogin: new Date().toISOString(),
    permissions: ['dashboard', 'analytics', 'reports', 'settings', 'alerts', 'users']
  };

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('mineguard_user');
    console.log('Checking saved user:', savedUser);
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      console.log('Found saved user, setting authenticated:', userData);
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      console.log('No saved user found');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    console.log('Login attempt:', { email, password });
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    if (email === 'admin@mineguard.com' && password === 'admin123') {
      const userData = { ...mockUser, lastLogin: new Date().toISOString() };
      console.log('Login successful, setting user:', userData);
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('mineguard_user', JSON.stringify(userData));
      setLoading(false);
      return { success: true, message: 'Login successful' };
    } else {
      console.log('Login failed: Invalid credentials');
      setLoading(false);
      return { success: false, message: 'Invalid email or password' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('mineguard_user');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('mineguard_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
