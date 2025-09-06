import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Set base URL for axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const isDemo = localStorage.getItem('isDemo');
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        // Only set authorization header for non-demo users
        if (token && !isDemo) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isDemo');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/auth/register', userData);
      const { token, user: newUser } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      
      // Handle validation errors from backend
      if (error.response?.data?.errors) {
        return { 
          success: false, 
          error: {
            message: error.response.data.message || 'Validation failed',
            errors: error.response.data.errors
          }
        };
      }
      
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    // Clear all authentication-related data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isDemo');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    
    // Clear any form data that might be cached in browser
    // Force clear any autofill or stored form data
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      if (form && typeof form.reset === 'function') {
        form.reset();
      }
    });
    
    // Clear any input elements that might have cached values
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
    inputs.forEach(input => {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('/auth/profile', profileData);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Update failed' };
    }
  };

  const demoLogin = () => {
    const demoUser = {
      id: 'demo-user-001',
      name: 'Demo Alumni',
      email: 'demo@alumni.com',
      role: 'alumni',
      isDemo: true,
      graduationYear: '2020',
      department: 'Computer Science',
      company: 'Tech Demo Corp',
      position: 'Senior Software Engineer',
      bio: 'This is a demo alumni account showcasing the platform features.',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      linkedin: 'https://linkedin.com/in/demo-user',
      avatar: null
    };
    
    // Store demo user data without token
    localStorage.setItem('user', JSON.stringify(demoUser));
    localStorage.setItem('isDemo', 'true');
    setUser(demoUser);
    
    return { success: true };
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    demoLogin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
