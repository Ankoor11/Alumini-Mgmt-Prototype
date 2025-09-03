import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [alumni, setAlumni] = useState([]);
  const [events, setEvents] = useState([]);
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy admin stats
  const dummyStats = {
    totalUsers: 156,
    activeUsers: 142,
    totalEvents: 28,
    upcomingEvents: 5,
    mentorshipRequests: 23,
    departmentStats: [
      { _id: 'Computer Science', count: 45 },
      { _id: 'Business Administration', count: 32 },
      { _id: 'Electrical Engineering', count: 28 },
      { _id: 'Mechanical Engineering', count: 25 },
      { _id: 'Marketing', count: 15 },
      { _id: 'Finance', count: 11 }
    ]
  };

  // Dummy recent alumni
  const dummyAlumni = [
    {
      _id: '1',
      firstName: 'Alex',
      lastName: 'Thompson',
      department: 'Computer Science',
      graduationYear: 2023,
      isActive: true,
      createdAt: '2024-05-15T10:00:00Z',
      lastLogin: '2024-05-20T14:30:00Z'
    },
    {
      _id: '2',
      firstName: 'Maria',
      lastName: 'Rodriguez',
      department: 'Marketing',
      graduationYear: 2022,
      isActive: true,
      createdAt: '2024-05-12T09:15:00Z',
      lastLogin: '2024-05-19T11:20:00Z'
    },
    {
      _id: '3',
      firstName: 'James',
      lastName: 'Wilson',
      department: 'Finance',
      graduationYear: 2021,
      isActive: false,
      createdAt: '2024-05-10T16:45:00Z',
      lastLogin: '2024-05-15T08:10:00Z'
    }
  ];

  // Dummy recent events
  const dummyEvents = [
    {
      _id: '1',
      title: 'Tech Career Fair 2024',
      description: 'Annual career fair for tech professionals',
      date: '2024-06-20',
      category: 'Career',
      attendees: [{ _id: '1' }, { _id: '2' }, { _id: '3' }],
      organizer: { firstName: 'Admin', lastName: 'User' },
      isActive: true
    },
    {
      _id: '2',
      title: 'Summer Networking Mixer',
      description: 'Casual summer networking event',
      date: '2024-07-15',
      category: 'Networking',
      attendees: [{ _id: '1' }, { _id: '4' }],
      organizer: { firstName: 'Sarah', lastName: 'Johnson' },
      isActive: true
    }
  ];

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setStats(dummyStats);
      setAlumni(dummyAlumni);
      setEvents(dummyEvents);
      setMentorshipRequests([]);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleUserStatus = (userId) => {
    setAlumni(prev => prev.map(person => {
      if (person._id === userId) {
        return { ...person, isActive: !person.isActive };
      }
      return person;
    }));
    alert('✅ User status updated successfully!');
  };

  const deleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event._id !== eventId));
      alert('✅ Event deleted successfully!');
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
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage alumni, events, and system statistics
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.totalUsers || 0}</p>
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
              <h3 className="text-lg font-medium text-gray-900">Active Users</h3>
              <p className="text-2xl font-bold text-green-600">{stats.activeUsers || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Total Events</h3>
              <p className="text-2xl font-bold text-purple-600">{stats.totalEvents || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 002 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Mentorship Requests</h3>
              <p className="text-2xl font-bold text-yellow-600">{stats.mentorshipRequests || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Alumni */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Alumni</h2>
            <button
              onClick={() => alert('📊 User Management\\n\\n• View all users\\n• Activate/deactivate accounts\\n• Edit user profiles\\n• Export user data\\n\\n(Full admin features coming soon!)')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Manage All →
            </button>
          </div>
          <div className="space-y-4">
            {alumni.map((person) => (
              <div key={person._id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {person.firstName[0]}{person.lastName[0]}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">
                      {person.firstName} {person.lastName}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {person.department} • Class of {person.graduationYear}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Joined: {new Date(person.createdAt).toLocaleDateString()} • 
                      Last login: {new Date(person.lastLogin).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    person.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {person.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => toggleUserStatus(person._id)}
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      person.isActive 
                        ? 'text-red-600 hover:text-red-800' 
                        : 'text-green-600 hover:text-green-800'
                    }`}
                  >
                    {person.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Events</h2>
            <button
              onClick={() => alert('📅 Event Management\\n\\n• View all events\\n• Edit event details\\n• Monitor attendance\\n• Send announcements\\n\\n(Full admin features coming soon!)')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Manage All →
            </button>
          </div>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event._id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-gray-600 text-sm">{event.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-gray-500 text-xs">
                        {new Date(event.date).toLocaleDateString()} • {event.attendees?.length || 0} attendees
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.category === 'Reunion' ? 'bg-blue-100 text-blue-800' :
                        event.category === 'Networking' ? 'bg-green-100 text-green-800' :
                        event.category === 'Career' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteEvent(event._id)}
                    className="text-red-600 hover:text-red-800 text-xs font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Statistics */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Department Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.departmentStats?.map((dept) => (
            <div key={dept._id} className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{dept.count}</div>
              <div className="text-gray-600 font-medium">{dept._id}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(dept.count / Math.max(...stats.departmentStats.map(d => d.count))) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900">Database</h3>
            <p className="text-green-600 text-sm">Connected</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900">Server</h3>
            <p className="text-green-600 text-sm">Running</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900">Security</h3>
            <p className="text-green-600 text-sm">Secured</p>
          </div>
        </div>
      </div>

      {/* Quick Admin Actions */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => alert('📧 Send Announcement\\n\\nBroadcast important updates to all alumni:\\n• System announcements\\n• Event reminders\\n• Newsletter updates\\n\\n(Feature coming soon!)')}
            className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center transition-colors"
          >
            <div className="w-8 h-8 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 text-sm">Send Announcement</h3>
          </button>

          <button
            onClick={() => alert('📊 Generate Reports\\n\\nCreate comprehensive reports:\\n• Alumni engagement metrics\\n• Event attendance statistics\\n• User growth analytics\\n\\n(Feature coming soon!)')}
            className="p-4 border border-green-200 rounded-lg hover:bg-green-50 text-center transition-colors"
          >
            <div className="w-8 h-8 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 text-sm">Generate Reports</h3>
          </button>

          <button
            onClick={() => alert('💾 Backup System\\n\\nCreate system backups:\\n• User data export\\n• Event data backup\\n• Configuration export\\n\\n(Feature coming soon!)')}
            className="p-4 border border-purple-200 rounded-lg hover:bg-purple-50 text-center transition-colors"
          >
            <div className="w-8 h-8 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 text-sm">Backup System</h3>
          </button>

          <button
            onClick={() => alert('⚙️ System Settings\\n\\nManage system configuration:\\n• Email settings\\n• Security policies\\n• Feature toggles\\n\\n(Feature coming soon!)')}
            className="p-4 border border-orange-200 rounded-lg hover:bg-orange-50 text-center transition-colors"
          >
            <div className="w-8 h-8 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 text-sm">Settings</h3>
          </button>
        </div>
      </div>

      {/* Activity Log */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">New user registered: Alex Thompson</span>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">Event created: Tech Career Fair 2024</span>
            </div>
            <span className="text-xs text-gray-500">5 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">Mentorship request accepted by Sarah Johnson</span>
            </div>
            <span className="text-xs text-gray-500">1 day ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">Profile updated by Maria Rodriguez</span>
            </div>
            <span className="text-xs text-gray-500">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
