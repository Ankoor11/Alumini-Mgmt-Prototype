import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAlumni: 0,
    upcomingEvents: 0,
    mentorshipRequests: 0
  });
  const [loading, setLoading] = useState(true);

  // Calculate profile completion percentage
  const getProfileCompletionPercentage = () => {
    if (!user) return 0;
    const fields = [
      user.firstName, user.lastName, user.email, user.graduationYear, 
      user.department, user.currentPosition, user.company, user.bio, 
      user.linkedin, user.phone, user.location
    ];
    const completedFields = fields.filter(field => field && field.toString().trim() !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const profileCompletion = getProfileCompletionPercentage();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.firstName}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's what's happening in your alumni network.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Total Alumni</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.totalAlumni}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
              <p className="text-2xl font-bold text-green-600">{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 002 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Mentorship Requests</h3>
              <p className="text-2xl font-bold text-purple-600">{stats.mentorshipRequests}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            to="/profile"
            className="flex items-center p-3 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors group"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">My Profile</h3>
              <p className="text-sm text-gray-500">Update info</p>
            </div>
          </Link>

          <button
            onClick={() => alert('🎯 Alumni Directory\n\nSearch and connect with fellow alumni by:\n• Graduation year\n• Department\n• Industry\n• Location\n\n(Coming in next update!)')}
            className="flex items-center p-3 border border-green-200 rounded-lg hover:bg-green-50 transition-colors group"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">Alumni Directory</h3>
              <p className="text-sm text-gray-500">Find alumni</p>
            </div>
          </button>

          <button
            onClick={() => alert('📅 Event Management\n\nCreate and manage events:\n• Alumni reunions\n• Networking events\n• Career workshops\n• Social gatherings\n\nRSVP and track attendance\n\n(Coming in next update!)')}
            className="flex items-center p-3 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors group"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">Events</h3>
              <p className="text-sm text-gray-500">Manage events</p>
            </div>
          </button>

          <button
            onClick={() => alert('🤝 Mentorship Program\n\nConnect with experienced alumni:\n• Find mentors in your field\n• Share your expertise\n• Career guidance\n• Professional development\n\nRequest or offer mentorship\n\n(Coming in next update!)')}
            className="flex items-center p-3 border border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors group"
          >
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197V9a3 3 0 00-6 0v4.967" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">Mentorship</h3>
              <p className="text-sm text-gray-500">Find mentors</p>
            </div>
          </button>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            Welcome to AlumniConnect! This platform helps you stay connected with your fellow alumni,
            participate in events, and grow your professional network.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Complete Your Profile</h3>
              <p className="text-gray-600 text-sm mb-3">
                Add more details to your profile to help other alumni find and connect with you.
              </p>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                  <span className="text-sm text-gray-600">{profileCompletion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      profileCompletion < 50 ? 'bg-red-500' :
                      profileCompletion < 80 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
              </div>
              <Link 
                to="/profile"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-block"
              >
                {profileCompletion < 100 ? 'Complete Profile →' : 'Update Profile →'}
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Explore Features</h3>
              <p className="text-gray-600 text-sm mb-3">
                Discover events, connect with mentors, and explore the alumni directory.
              </p>
              <div className="space-y-2">
                <div>
                  <button 
                    onClick={() => alert('🎉 Features Overview:\n\n✅ Profile Management - Update your personal and professional information\n✅ Authentication System - Secure login with JWT tokens\n✅ Dashboard Analytics - View system statistics\n✅ Responsive Design - Works on all devices\n\n🔜 Coming Soon:\n📅 Event Management\n👥 Alumni Directory\n🤝 Mentorship Program\n⚙️ Admin Dashboard')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Features →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
