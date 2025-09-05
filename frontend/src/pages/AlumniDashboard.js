import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AlumniDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalAlumni: 0,
    upcomingEvents: 0,
    mentorshipRequests: 0,
    studentsConnected: 0,
    networkConnections: 0
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {user.firstName}!
        </h1>
        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Alumni ID: {user.alumniId} | {user.currentPosition} at {user.company} | Graduated: {user.graduationYear}
        </p>
      </div>

      {/* Alumni Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Alumni Network</h3>
              <p className="text-2xl font-bold text-purple-600">{stats.totalAlumni}</p>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Alumni Events</h3>
              <p className="text-2xl font-bold text-indigo-600">{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2A5 5 0 0011 9H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Students Connected</h3>
              <p className="text-2xl font-bold text-green-600">{stats.studentsConnected || 0}</p>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 002 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Mentorship Requests</h3>
              <p className="text-2xl font-bold text-yellow-600">{stats.mentorshipRequests}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions for Alumni */}
      <div className={`rounded-lg shadow p-6 mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Alumni Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            to="/profile"
            className="flex items-center p-3 border border-purple-200 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors group"
          >
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-700">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium">My Profile</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Update info</p>
            </div>
          </Link>

          <button
            onClick={() => alert('👥 Alumni Directory\\n\\nConnect with fellow alumni:\\n• Search by graduation year\\n• Filter by industry\\n• View career paths\\n• Professional networking\\n\\n(Coming in next update!)')}
            className="flex items-center p-3 border border-indigo-200 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors group"
          >
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-800 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-700">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium">Alumni Network</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Connect & network</p>
            </div>
          </button>

          <button
            onClick={() => alert('🎓 Mentorship Hub\\n\\nMentor current students:\\n• Share industry experience\\n• Career guidance sessions\\n• Resume reviews\\n• Interview preparation\\n• Professional development\\n\\n(Coming in next update!)')}
            className="flex items-center p-3 border border-green-200 rounded-lg hover:bg-green-50 dark:hover:bg-green-900 transition-colors group"
          >
            <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-700">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197V9a3 3 0 00-6 0v4.967" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium">Mentor Students</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Guide future professionals</p>
            </div>
          </button>

          <button
            onClick={() => alert('📅 Events & Reunions\\n\\nAlumni events:\\n• Class reunions\\n• Industry meetups\\n• Networking events\\n• Career workshops\\n• Guest lectures\\n\\nHost or attend events\\n\\n(Coming in next update!)')}
            className="flex items-center p-3 border border-orange-200 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900 transition-colors group"
          >
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-800 rounded-lg flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-700">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium">Events & Reunions</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Host & attend</p>
            </div>
          </button>
        </div>
      </div>

      {/* Alumni Engagement Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Professional Profile</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm">{profileCompletion}%</span>
              </div>
              <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    profileCompletion < 50 ? 'bg-red-500' :
                    profileCompletion < 80 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Network Engagement</span>
                <span className="text-sm">85%</span>
              </div>
              <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <Link 
              to="/profile"
              className="text-purple-600 hover:text-purple-800 text-sm font-medium inline-block"
            >
              {profileCompletion < 100 ? 'Complete Profile →' : 'Update Profile →'}
            </Link>
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className="font-medium text-sm">Welcome to the Alumni Network!</h3>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Start mentoring students and expand your professional network
              </p>
            </div>
            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className="font-medium text-sm">Alumni ID Generated</h3>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Your unique alumni ID: {user.alumniId}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className="font-medium text-sm">Professional Profile Added</h3>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {user.currentPosition} at {user.company}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message for Alumni */}
      <div className={`mt-6 rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Welcome to Your Alumni Portal</h2>
        <div className="space-y-4">
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Welcome to the alumni network! As a valued member of our community, you can connect with fellow alumni, 
            mentor current students, and stay engaged with your alma mater.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`border rounded-lg p-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className="font-medium mb-2">🤝 Mentor Students</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Share your professional experience and guide the next generation of professionals.
              </p>
            </div>
            <div className={`border rounded-lg p-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className="font-medium mb-2">🌐 Build Your Network</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Connect with alumni across different industries and graduation years.
              </p>
            </div>
            <div className={`border rounded-lg p-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className="font-medium mb-2">🎓 Stay Connected</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Participate in alumni events, reunions, and professional development opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard;
