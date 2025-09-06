import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const AlumniLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, demoLogin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Clear form data on component mount to ensure fresh login form
  useEffect(() => {
    setFormData({
      email: '',
      password: ''
    });
    setError('');
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleDemoLogin = () => {
    demoLogin();
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 alumni-theme transition-all duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-indigo-100'
    }`}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Alumni Portal Login
          </h2>
          <p className={`mt-2 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Welcome back to your professional network
          </p>
          <p className={`mt-1 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Student?{' '}
            <Link to="/student-login" className="font-medium text-green-600 hover:text-green-500">
              Login here
            </Link>
            {' '}or{' '}
            <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
              create new account
            </Link>
          </p>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            {error && (
              <div className="mb-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                  Alumni Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                    theme === 'dark' 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}
                  placeholder="Enter your alumni email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                    theme === 'dark' 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-200"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-purple-300 group-hover:text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {loading ? 'Signing in...' : 'Sign in to Alumni Portal'}
              </button>
            </div>

            <div className="mt-4 text-center">
              <Link to="/" className={`text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-500'}`}>
                ← Back to main page
              </Link>
            </div>
          </div>
        </form>

        {/* Demo Login Section */}
        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow'}`}>
          <div className="text-center">
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Try it out!
            </h3>
            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Explore the alumni portal without creating an account
            </p>
            <button
              onClick={handleDemoLogin}
              className={`w-full flex justify-center items-center py-3 px-4 border-2 text-sm font-medium rounded-md transition-all duration-200 ${
                theme === 'dark'
                  ? 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white'
                  : 'border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Continue as Demo User
            </button>
          </div>
        </div>

        {/* Alumni Features Preview */}
        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow'}`}>
          <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Alumni Portal Features
          </h3>
          <ul className="space-y-2 text-sm">
            <li className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <svg className="w-4 h-4 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Professional networking directory
            </li>
            <li className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <svg className="w-4 h-4 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Mentor students and new graduates
            </li>
            <li className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <svg className="w-4 h-4 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Exclusive alumni events and reunions
            </li>
            <li className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <svg className="w-4 h-4 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Job posting and career opportunities
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlumniLogin;
