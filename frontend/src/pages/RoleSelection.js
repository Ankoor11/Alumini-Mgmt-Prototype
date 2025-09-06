import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const RoleSelection = () => {
  const { theme, toggleTheme } = useTheme();
  const { demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    demoLogin();
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-6">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} sm:text-5xl`}>
            AlumniConnect
          </h1>
          <p className={`mt-4 text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Connecting students and alumni for lifelong professional relationships and growth opportunities.
          </p>
          <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Choose your portal to get started
          </p>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-lg transition-colors shadow-lg ${
              theme === 'dark' 
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {theme === 'dark' ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Student Card */}
          <Link to="/student-login" className="group">
            <div className={`p-8 rounded-2xl shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl ${
              theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              <div className="text-center">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mb-6 group-hover:from-green-600 group-hover:to-emerald-700 transition-all">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Current Students
                </h2>
                <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Access your student portal, connect with alumni mentors, and explore career opportunities.
                </p>
                
                <ul className="space-y-3 text-left mb-8">
                  <li className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    View academic progress
                  </li>
                  <li className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Connect with alumni
                  </li>
                  <li className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Join campus events
                  </li>
                </ul>

                <div className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-emerald-600 group-hover:from-green-600 group-hover:to-emerald-700 transition-all">
                  Student Login
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Alumni Card */}
          <Link to="/alumni-login" className="group">
            <div className={`p-8 rounded-2xl shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl ${
              theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              <div className="text-center">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 mb-6 group-hover:from-purple-600 group-hover:to-indigo-700 transition-all">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Alumni
                </h2>
                <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Join your professional alumni network, mentor students, and stay connected with your alma mater.
                </p>
                
                <ul className="space-y-3 text-left mb-8">
                  <li className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-5 h-5 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Professional networking
                  </li>
                  <li className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-5 h-5 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Mentor students
                  </li>
                  <li className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-5 h-5 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Exclusive events
                  </li>
                </ul>

                <div className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-indigo-600 group-hover:from-purple-600 group-hover:to-indigo-700 transition-all">
                  Alumni Login
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Demo Mode Section */}
        <div className={`max-w-2xl mx-auto p-6 rounded-2xl shadow-xl ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'} mt-12`}>
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-4">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Try Before You Register
            </h3>
            <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Explore all the alumni portal features with our interactive demo. No registration required!
            </p>
            <ul className={`text-left space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Browse alumni directory with sample profiles
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Explore upcoming events and activities
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                See mentorship programs in action
              </li>
            </ul>
            <button
              onClick={handleDemoLogin}
              className={`w-full flex justify-center items-center py-3 px-6 border-2 text-lg font-medium rounded-md transition-all duration-200 ${
                theme === 'dark'
                  ? 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white'
                  : 'border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M9 16v-2a3 3 0 013-3h0a3 3 0 013 3v2" />
              </svg>
              Launch Demo Experience
            </button>
          </div>
        </div>

        {/* Registration Link */}
        <div className="text-center mt-12">
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <Link to="/register" className={`font-medium underline ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
