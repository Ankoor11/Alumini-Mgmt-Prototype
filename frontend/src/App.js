import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import RoleSelection from './pages/RoleSelection';
import StudentLogin from './pages/StudentLogin';
import AlumniLogin from './pages/AlumniLogin';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AlumniDirectory from './pages/AlumniDirectory';
import Events from './pages/Events';
import Mentorship from './pages/Mentorship';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen theme-container transition-all duration-300 ${
      user?.role === 'student' ? 'student-theme' : user?.role === 'alumni' ? 'alumni-theme' : 'admin-theme'
    }`}>
      {user && <Navbar />}
      {user?.isDemo && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 fixed top-16 left-0 right-0 z-40">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center text-sm text-blue-800">
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              You're viewing the platform in demo mode. All data shown is for demonstration purposes only.
            </div>
          </div>
        </div>
      )}
      <main className={user ? (user?.isDemo ? 'pt-28' : 'pt-16') : ''}}>
        <Routes>
          {/* Role Selection and Login Routes */}
          <Route path="/role-select" element={!user ? <RoleSelection key="role-select" /> : <Navigate to="/dashboard" />} />
          <Route path="/student-login" element={!user ? <StudentLogin key="student-login" /> : <Navigate to="/dashboard" />} />
          <Route path="/alumni-login" element={!user ? <AlumniLogin key="alumni-login" /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!user ? <Login key="login" /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register key="register" /> : <Navigate to="/dashboard" />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/role-select" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/role-select" />} />
          <Route path="/directory" element={user ? <AlumniDirectory /> : <Navigate to="/role-select" />} />
          <Route path="/events" element={user ? <Events /> : <Navigate to="/role-select" />} />
          <Route path="/mentorship" element={user ? <Mentorship /> : <Navigate to="/role-select" />} />
          <Route path="/admin" element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/role-select" />} />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/role-select"} />} />
        </Routes>
      </main>
      
      {/* Chatbot - only show for logged in users */}
      {user && <Chatbot />}
    </div>
  );
}

export default App;
