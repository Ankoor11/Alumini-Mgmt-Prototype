import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    graduationYear: '',
    department: '',
    // Alumni-specific fields
    currentPosition: '',
    company: '',
    // Student-specific fields
    currentYear: '',
    rollNumber: ''
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.graduationYear) {
      errors.graduationYear = 'Graduation year is required';
    } else {
      const year = parseInt(formData.graduationYear);
      const currentYear = new Date().getFullYear();
      if (year < 1900 || year > currentYear + 10) {
        errors.graduationYear = `Year must be between 1900 and ${currentYear + 10}`;
      }
    }
    if (!formData.department.trim()) errors.department = 'Department is required';
    
    // Role-specific validation
    if (formData.role === 'alumni') {
      if (!formData.currentPosition.trim()) errors.currentPosition = 'Current position is required for alumni';
      if (!formData.company.trim()) errors.company = 'Company is required for alumni';
    } else if (formData.role === 'student') {
      if (!formData.currentYear) errors.currentYear = 'Current year is required for students';
      if (!formData.rollNumber.trim()) errors.rollNumber = 'Roll number is required for students';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setLoading(true);

    // Prepare submission data based on role
    const submissionData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: formData.role,
      graduationYear: parseInt(formData.graduationYear),
      department: formData.department.trim()
    };

    // Add role-specific fields
    if (formData.role === 'alumni') {
      submissionData.currentPosition = formData.currentPosition.trim();
      submissionData.company = formData.company.trim();
    } else if (formData.role === 'student') {
      submissionData.currentYear = parseInt(formData.currentYear);
      submissionData.rollNumber = formData.rollNumber.trim();
    }

    const result = await register(submissionData);

    if (!result.success) {
      // Parse backend validation errors
      if (result.error && typeof result.error === 'object' && result.error.errors) {
        const backendErrors = {};
        result.error.errors.forEach(err => {
          backendErrors[err.param] = err.msg;
        });
        setFieldErrors(backendErrors);
        setError('Please fix the validation errors below');
      } else {
        setError(typeof result.error === 'string' ? result.error : 'Registration failed');
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded text-sm">
            <p className="font-medium">📝 Registration Requirements:</p>
            <ul className="mt-1 list-disc list-inside space-y-1">
              <li>All fields marked with <span className="text-red-500">*</span> are required</li>
              <li>Password must be at least 6 characters</li>
              <li>Graduation year must be realistic (1900-2034)</li>
            </ul>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  fieldErrors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {fieldErrors.firstName && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  fieldErrors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {fieldErrors.lastName && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              I am a <span className="text-red-500">*</span>
            </label>
            <select
              id="role"
              name="role"
              required
              className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                fieldErrors.role ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Current Student</option>
              <option value="alumni">Alumni/Graduate</option>
            </select>
            {fieldErrors.role && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.role}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                fieldErrors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
                Graduation Year <span className="text-red-500">*</span>
              </label>
              <input
                id="graduationYear"
                name="graduationYear"
                type="number"
                required
                min="1900"
                max={new Date().getFullYear() + 10}
                className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  fieldErrors.graduationYear ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g. 2020"
                value={formData.graduationYear}
                onChange={handleChange}
              />
              {fieldErrors.graduationYear && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.graduationYear}</p>
              )}
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <input
                id="department"
                name="department"
                type="text"
                required
                className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  fieldErrors.department ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g. Computer Science"
                value={formData.department}
                onChange={handleChange}
              />
              {fieldErrors.department && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.department}</p>
              )}
            </div>
          </div>

          {/* Role-specific fields */}
          {formData.role === 'alumni' ? (
            <>
              <div>
                <label htmlFor="currentPosition" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Position <span className="text-red-500">*</span>
                </label>
                <input
                  id="currentPosition"
                  name="currentPosition"
                  type="text"
                  required
                  className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    fieldErrors.currentPosition ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g. Software Engineer"
                  value={formData.currentPosition}
                  onChange={handleChange}
                />
                {fieldErrors.currentPosition && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.currentPosition}</p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    fieldErrors.company ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g. Google, Microsoft"
                  value={formData.company}
                  onChange={handleChange}
                />
                {fieldErrors.company && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.company}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="currentYear" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="currentYear"
                    name="currentYear"
                    required
                    className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      fieldErrors.currentYear ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.currentYear}
                    onChange={handleChange}
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">5th Year</option>
                    <option value="6">6th Year</option>
                  </select>
                  {fieldErrors.currentYear && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.currentYear}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Roll Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="rollNumber"
                    name="rollNumber"
                    type="text"
                    required
                    className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      fieldErrors.rollNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g. 2021CS001"
                    value={formData.rollNumber}
                    onChange={handleChange}
                  />
                  {fieldErrors.rollNumber && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.rollNumber}</p>
                  )}
                </div>
              </div>
            </>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength="6"
              className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                fieldErrors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                fieldErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {fieldErrors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.confirmPassword}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
