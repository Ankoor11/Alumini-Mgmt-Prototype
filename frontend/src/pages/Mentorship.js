import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Mentorship = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [potentialMentors, setPotentialMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [formData, setFormData] = useState({
    requestMessage: '',
    areasOfInterest: '',
    meetingPreferences: ''
  });

  // Dummy mentorship requests data
  const dummyRequests = [
    {
      _id: '1',
      mentee: { _id: user._id, firstName: user.firstName, lastName: user.lastName },
      mentor: { _id: '1', firstName: 'John', lastName: 'Smith', currentPosition: 'Senior Software Engineer', company: 'Google' },
      status: 'pending',
      requestMessage: 'I would love to learn about career progression in software engineering and get guidance on technical leadership.',
      areasOfInterest: 'Career Development, Technical Leadership, Software Architecture',
      meetingPreferences: 'Virtual meetings, bi-weekly',
      requestedAt: '2024-05-01T10:00:00Z'
    },
    {
      _id: '2',
      mentee: { _id: user._id, firstName: user.firstName, lastName: user.lastName },
      mentor: { _id: '2', firstName: 'Sarah', lastName: 'Johnson', currentPosition: 'Product Manager', company: 'Microsoft' },
      status: 'accepted',
      requestMessage: 'I am interested in transitioning to product management and would appreciate your insights.',
      responseMessage: 'I would be happy to help! Let me know your availability for our first call.',
      areasOfInterest: 'Product Management, Strategy, Career Transition',
      meetingPreferences: 'Monthly video calls',
      requestedAt: '2024-04-15T14:00:00Z',
      respondedAt: '2024-04-16T09:00:00Z'
    }
  ];

  // Dummy potential mentors data
  const dummyMentors = [
    {
      _id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      graduationYear: 2015,
      department: 'Computer Science',
      currentPosition: 'Senior Software Engineer',
      company: 'Google',
      bio: 'Passionate about AI and machine learning. Love helping junior developers grow their careers.',
      linkedin: 'https://linkedin.com/in/johnsmith',
      expertise: ['Software Engineering', 'AI/ML', 'Technical Leadership'],
      experience: '8+ years'
    },
    {
      _id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      graduationYear: 2014,
      department: 'Business Administration',
      currentPosition: 'Product Manager',
      company: 'Microsoft',
      bio: 'Product strategy expert with 10+ years in tech. Experienced in leading cross-functional teams.',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      expertise: ['Product Management', 'Strategy', 'Leadership'],
      experience: '10+ years'
    },
    {
      _id: '3',
      firstName: 'Michael',
      lastName: 'Davis',
      email: 'michael.davis@example.com',
      graduationYear: 2012,
      department: 'Electrical Engineering',
      currentPosition: 'Engineering Director',
      company: 'Tesla',
      bio: 'Engineering leader working on sustainable energy solutions. Passionate about clean technology.',
      linkedin: 'https://linkedin.com/in/michaeldavis',
      expertise: ['Engineering Leadership', 'Clean Tech', 'Team Management'],
      experience: '12+ years'
    },
    {
      _id: '4',
      firstName: 'Lisa',
      lastName: 'Anderson',
      email: 'lisa.anderson@example.com',
      graduationYear: 2013,
      department: 'Marketing',
      currentPosition: 'Marketing Director',
      company: 'Airbnb',
      bio: 'Growth marketing expert with proven track record in scaling startups.',
      linkedin: 'https://linkedin.com/in/lisaanderson',
      expertise: ['Digital Marketing', 'Growth Strategy', 'Brand Management'],
      experience: '11+ years'
    },
    {
      _id: '5',
      firstName: 'Robert',
      lastName: 'Martinez',
      email: 'robert.martinez@example.com',
      graduationYear: 2011,
      department: 'Finance',
      currentPosition: 'Senior Financial Analyst',
      company: 'Goldman Sachs',
      bio: 'Investment banking professional with expertise in tech sector analysis.',
      linkedin: 'https://linkedin.com/in/robertmartinez',
      expertise: ['Investment Banking', 'Financial Analysis', 'Tech Sector'],
      experience: '13+ years'
    }
  ];

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setRequests(dummyRequests);
      setPotentialMentors(dummyMentors);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    
    const newRequest = {
      _id: Date.now().toString(),
      mentee: { _id: user._id, firstName: user.firstName, lastName: user.lastName },
      mentor: selectedMentor,
      status: 'pending',
      requestMessage: formData.requestMessage,
      areasOfInterest: formData.areasOfInterest,
      meetingPreferences: formData.meetingPreferences,
      requestedAt: new Date().toISOString()
    };

    setRequests([newRequest, ...requests]);
    setShowRequestForm(false);
    setSelectedMentor(null);
    setFormData({
      requestMessage: '',
      areasOfInterest: '',
      meetingPreferences: ''
    });

    alert(`✅ Mentorship request sent to ${selectedMentor.firstName} ${selectedMentor.lastName}!`);
  };

  const updateRequestStatus = (requestId, status, responseMessage = '') => {
    setRequests(prev => prev.map(req => {
      if (req._id === requestId) {
        return {
          ...req,
          status,
          responseMessage,
          respondedAt: status !== 'pending' ? new Date().toISOString() : req.respondedAt
        };
      }
      return req;
    }));
    alert(`✅ Request ${status} successfully!`);
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
        <h1 className="text-3xl font-bold text-gray-900">Mentorship Program</h1>
        <p className="mt-2 text-gray-600">
          Connect with experienced alumni for guidance and career advice
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Requests */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Mentorship Requests</h2>
          
          {requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">
                      Request to {request.mentor.firstName} {request.mentor.lastName}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{request.requestMessage}</p>
                  {request.responseMessage && (
                    <div className="bg-blue-50 p-3 rounded-md mt-2">
                      <p className="text-blue-800 text-sm"><strong>Response:</strong> {request.responseMessage}</p>
                    </div>
                  )}
                  <div className="mt-2 text-xs text-gray-500">
                    <p>Areas: {request.areasOfInterest}</p>
                    <p>Preferences: {request.meetingPreferences}</p>
                    <p>Requested: {new Date(request.requestedAt).toLocaleDateString()}</p>
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={() => updateRequestStatus(request._id, 'cancelled')}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Cancel Request
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven't sent any mentorship requests yet.</p>
          )}
        </div>

        {/* Find Mentors */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Find a Mentor</h2>
            <button
              onClick={() => setShowRequestForm(!showRequestForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm transition-colors"
            >
              {showRequestForm ? 'Cancel' : 'Request Mentorship'}
            </button>
          </div>

          {/* Request Form */}
          {showRequestForm && (
            <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
              <h3 className="font-medium text-gray-900 mb-3">Send Mentorship Request</h3>
              <form onSubmit={handleSubmitRequest} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Mentor
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                    onChange={(e) => {
                      const mentor = potentialMentors.find(m => m._id === e.target.value);
                      setSelectedMentor(mentor);
                    }}
                  >
                    <option value="">Choose a mentor...</option>
                    {potentialMentors.map((mentor) => (
                      <option key={mentor._id} value={mentor._id}>
                        {mentor.firstName} {mentor.lastName} - {mentor.currentPosition} at {mentor.company}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="requestMessage"
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Introduce yourself and explain what you're looking for..."
                    value={formData.requestMessage}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Areas of Interest
                  </label>
                  <input
                    type="text"
                    name="areasOfInterest"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Career guidance, technical skills, networking..."
                    value={formData.areasOfInterest}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meeting Preferences
                  </label>
                  <input
                    type="text"
                    name="meetingPreferences"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Virtual, in-person, weekly, monthly..."
                    value={formData.meetingPreferences}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRequestForm(false);
                      setSelectedMentor(null);
                    }}
                    className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedMentor}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Potential Mentors */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Available Mentors</h3>
            
            {potentialMentors.length > 0 ? (
              potentialMentors.map((mentor) => (
                <div key={mentor._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {mentor.firstName[0]}{mentor.lastName[0]}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900">
                          {mentor.firstName} {mentor.lastName}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {mentor.currentPosition} at {mentor.company}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Class of {mentor.graduationYear} • {mentor.department} • {mentor.experience}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedMentor(mentor);
                        setShowRequestForm(true);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
                    >
                      Request
                    </button>
                  </div>
                  
                  {mentor.bio && (
                    <p className="text-gray-600 text-sm mt-3 italic">"{mentor.bio}"</p>
                  )}
                  
                  <div className="mt-3">
                    <h5 className="text-xs font-medium text-gray-700 mb-1">Expertise:</h5>
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex space-x-3">
                    {mentor.linkedin && (
                      <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                      >
                        LinkedIn →
                      </a>
                    )}
                    <a
                      href={`mailto:${mentor.email}`}
                      className="text-green-600 hover:text-green-800 text-xs font-medium"
                    >
                      Email →
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No mentors available at the moment.</p>
            )}
          </div>
        </div>
      </div>

      {/* Incoming Requests (if user can be a mentor) */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Incoming Mentorship Requests</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-medium text-blue-900">Become a Mentor</h3>
              <p className="text-blue-800 text-sm">
                Share your experience with junior alumni! Update your profile with your expertise areas to start receiving mentorship requests.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">💡 Mentorship Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">For Mentees:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Be specific about your goals and what you want to learn</li>
              <li>• Come prepared with questions for each session</li>
              <li>• Be respectful of your mentor's time</li>
              <li>• Follow up and provide updates on your progress</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">For Mentors:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Share your experiences, both successes and failures</li>
              <li>• Listen actively and ask thoughtful questions</li>
              <li>• Provide constructive feedback and guidance</li>
              <li>• Connect mentees with other relevant contacts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
