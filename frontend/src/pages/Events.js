import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userRSVPs, setUserRSVPs] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'Other',
    maxAttendees: '',
    isVirtual: false,
    virtualLink: ''
  });

  // Dummy events data
  const dummyEvents = [
    {
      _id: '1',
      title: 'Alumni Reunion 2024',
      description: 'Join us for our annual alumni reunion! Reconnect with classmates, enjoy great food, and share your success stories.',
      date: '2024-06-15',
      time: '18:00',
      location: 'University Campus - Main Auditorium',
      category: 'Reunion',
      organizer: { _id: 'admin', firstName: 'Event', lastName: 'Team' },
      maxAttendees: 200,
      attendees: [
        { user: { _id: '1', firstName: 'John', lastName: 'Smith' }, rsvpStatus: 'attending' },
        { user: { _id: '2', firstName: 'Sarah', lastName: 'Johnson' }, rsvpStatus: 'attending' },
        { user: { _id: '3', firstName: 'Michael', lastName: 'Davis' }, rsvpStatus: 'maybe' }
      ],
      isVirtual: false,
      tags: ['reunion', 'networking', 'food']
    },
    {
      _id: '2',
      title: 'Tech Career Panel Discussion',
      description: 'Panel discussion with successful alumni in the tech industry. Learn about career paths, salary negotiations, and industry trends.',
      date: '2024-07-20',
      time: '19:00',
      location: 'Virtual Event',
      category: 'Career',
      organizer: { _id: '1', firstName: 'John', lastName: 'Smith' },
      maxAttendees: 100,
      attendees: [
        { user: { _id: '2', firstName: 'Sarah', lastName: 'Johnson' }, rsvpStatus: 'attending' },
        { user: { _id: '4', firstName: 'Emily', lastName: 'Brown' }, rsvpStatus: 'attending' }
      ],
      isVirtual: true,
      virtualLink: 'https://zoom.us/meeting/tech-panel',
      tags: ['career', 'tech', 'panel']
    },
    {
      _id: '3',
      title: 'Networking Mixer - Bay Area',
      description: 'Casual networking event for alumni in the San Francisco Bay Area. Come connect with fellow alumni over drinks and appetizers.',
      date: '2024-08-10',
      time: '17:30',
      location: 'Downtown San Francisco - The Rooftop Bar',
      category: 'Networking',
      organizer: { _id: '6', firstName: 'Lisa', lastName: 'Anderson' },
      maxAttendees: 50,
      attendees: [
        { user: { _id: '1', firstName: 'John', lastName: 'Smith' }, rsvpStatus: 'attending' },
        { user: { _id: '4', firstName: 'Emily', lastName: 'Brown' }, rsvpStatus: 'maybe' }
      ],
      isVirtual: false,
      tags: ['networking', 'bay-area', 'social']
    },
    {
      _id: '4',
      title: 'Mentorship Program Launch',
      description: 'Join us for the official launch of our mentorship program! Learn how to become a mentor or find a mentor.',
      date: '2024-09-05',
      time: '16:00',
      location: 'University Campus - Conference Center',
      category: 'Educational',
      organizer: { _id: 'admin', firstName: 'Program', lastName: 'Coordinator' },
      maxAttendees: 150,
      attendees: [],
      isVirtual: false,
      tags: ['mentorship', 'program', 'launch']
    },
    {
      _id: '5',
      title: 'Holiday Social Gathering',
      description: 'End the year with a festive social gathering! Bring your family and friends for a fun evening.',
      date: '2024-12-15',
      time: '19:00',
      location: 'Holiday Inn Downtown - Ballroom',
      category: 'Social',
      organizer: { _id: '2', firstName: 'Sarah', lastName: 'Johnson' },
      maxAttendees: 100,
      attendees: [
        { user: { _id: '5', firstName: 'David', lastName: 'Wilson' }, rsvpStatus: 'attending' }
      ],
      isVirtual: false,
      tags: ['holiday', 'social', 'family']
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(dummyEvents);
      // Initialize user RSVPs
      const rsvps = {};
      dummyEvents.forEach(event => {
        const userAttendee = event.attendees?.find(a => a.user._id === user._id);
        if (userAttendee) {
          rsvps[event._id] = userAttendee.rsvpStatus;
        }
      });
      setUserRSVPs(rsvps);
      setLoading(false);
    }, 800);
  }, [user._id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create new event with dummy data
    const newEvent = {
      _id: Date.now().toString(),
      ...formData,
      organizer: { _id: user._id, firstName: user.firstName, lastName: user.lastName },
      attendees: [],
      tags: []
    };

    setEvents([newEvent, ...events]);
    setShowCreateForm(false);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'Other',
      maxAttendees: '',
      isVirtual: false,
      virtualLink: ''
    });

    alert('✅ Event created successfully!');
  };

  const handleRSVP = (eventId, status) => {
    setUserRSVPs(prev => ({
      ...prev,
      [eventId]: status
    }));

    // Update event attendees
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event._id === eventId) {
          const updatedAttendees = event.attendees.filter(a => a.user._id !== user._id);
          if (status !== 'not_attending') {
            updatedAttendees.push({
              user: { _id: user._id, firstName: user.firstName, lastName: user.lastName },
              rsvpStatus: status,
              rsvpDate: new Date()
            });
          }
          return { ...event, attendees: updatedAttendees };
        }
        return event;
      })
    );

    alert(`✅ RSVP updated to "${status}" successfully!`);
  };

  const getUserRSVPStatus = (event) => {
    return userRSVPs[event._id] || null;
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="mt-2 text-gray-600">
            Stay connected through alumni events and gatherings
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showCreateForm ? 'Cancel' : 'Create Event'}
        </button>
      </div>

      {/* Create Event Form */}
      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Reunion">Reunion</option>
                  <option value="Networking">Networking</option>
                  <option value="Career">Career</option>
                  <option value="Social">Social</option>
                  <option value="Educational">Educational</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.time}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Attendees
                </label>
                <input
                  type="number"
                  name="maxAttendees"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.maxAttendees}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isVirtual"
                id="isVirtual"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.isVirtual}
                onChange={handleInputChange}
              />
              <label htmlFor="isVirtual" className="ml-2 text-sm text-gray-700">
                This is a virtual event
              </label>
            </div>

            {formData.isVirtual && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Virtual Link
                </label>
                <input
                  type="url"
                  name="virtualLink"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.virtualLink}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                <p className="text-gray-600 mt-2">{event.description}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                event.category === 'Reunion' ? 'bg-blue-100 text-blue-800' :
                event.category === 'Networking' ? 'bg-green-100 text-green-800' :
                event.category === 'Career' ? 'bg-purple-100 text-purple-800' :
                event.category === 'Social' ? 'bg-pink-100 text-pink-800' :
                event.category === 'Educational' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {event.category}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium">
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{event.location}</p>
                {event.isVirtual && event.virtualLink && (
                  <a
                    href={event.virtualLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Join Virtual Event →
                  </a>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Organizer</p>
                <p className="font-medium">
                  {event.organizer.firstName} {event.organizer.lastName}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {event.attendees?.length || 0} attending
                {event.maxAttendees && ` / ${event.maxAttendees} max`}
              </div>

              <div className="flex space-x-2">
                {(() => {
                  const userStatus = getUserRSVPStatus(event);
                  return (
                    <>
                      <button
                        onClick={() => handleRSVP(event._id, 'attending')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          userStatus === 'attending'
                            ? 'bg-green-600 text-white'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        ✓ Attending
                      </button>
                      <button
                        onClick={() => handleRSVP(event._id, 'maybe')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          userStatus === 'maybe'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        }`}
                      >
                        ? Maybe
                      </button>
                      <button
                        onClick={() => handleRSVP(event._id, 'not_attending')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          userStatus === 'not_attending'
                            ? 'bg-red-600 text-white'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        ✗ Not Attending
                      </button>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Show attendees */}
            {event.attendees && event.attendees.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Attendees:</h4>
                <div className="flex flex-wrap gap-2">
                  {event.attendees.slice(0, 5).map((attendee) => (
                    <span
                      key={attendee.user._id}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {attendee.user.firstName} {attendee.user.lastName}
                    </span>
                  ))}
                  {event.attendees.length > 5 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{event.attendees.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {events.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">Be the first to create an event for the alumni community!</p>
        </div>
      )}
    </div>
  );
};

export default Events;
