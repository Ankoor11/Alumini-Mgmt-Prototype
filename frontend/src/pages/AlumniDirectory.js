import React, { useState, useEffect } from 'react';

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    graduationYear: ''
  });

  // Dummy alumni data
  const dummyAlumni = [
    {
      _id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      graduationYear: 2020,
      department: 'Computer Science',
      currentPosition: 'Senior Software Engineer',
      company: 'Google',
      location: 'San Francisco, CA',
      bio: 'Passionate about AI and machine learning. Love helping junior developers.',
      linkedin: 'https://linkedin.com/in/johnsmith'
    },
    {
      _id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      graduationYear: 2019,
      department: 'Business Administration',
      currentPosition: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      bio: 'Product strategy expert with 5+ years in tech.',
      linkedin: 'https://linkedin.com/in/sarahjohnson'
    },
    {
      _id: '3',
      firstName: 'Michael',
      lastName: 'Davis',
      email: 'michael.davis@example.com',
      graduationYear: 2018,
      department: 'Electrical Engineering',
      currentPosition: 'Lead Engineer',
      company: 'Tesla',
      location: 'Austin, TX',
      bio: 'Working on sustainable energy solutions and electric vehicles.',
      linkedin: 'https://linkedin.com/in/michaeldavis'
    },
    {
      _id: '4',
      firstName: 'Emily',
      lastName: 'Brown',
      email: 'emily.brown@example.com',
      graduationYear: 2021,
      department: 'Computer Science',
      currentPosition: 'Frontend Developer',
      company: 'Netflix',
      location: 'Los Angeles, CA',
      bio: 'UI/UX enthusiast specializing in React and modern web technologies.',
      linkedin: 'https://linkedin.com/in/emilybrown'
    },
    {
      _id: '5',
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@example.com',
      graduationYear: 2017,
      department: 'Mechanical Engineering',
      currentPosition: 'Engineering Director',
      company: 'SpaceX',
      location: 'Hawthorne, CA',
      bio: 'Aerospace engineer working on next-gen spacecraft systems.',
      linkedin: 'https://linkedin.com/in/davidwilson'
    },
    {
      _id: '6',
      firstName: 'Lisa',
      lastName: 'Anderson',
      email: 'lisa.anderson@example.com',
      graduationYear: 2019,
      department: 'Marketing',
      currentPosition: 'Marketing Director',
      company: 'Airbnb',
      location: 'San Francisco, CA',
      bio: 'Digital marketing strategist with expertise in growth marketing.',
      linkedin: 'https://linkedin.com/in/lisaanderson'
    },
    {
      _id: '7',
      firstName: 'Robert',
      lastName: 'Martinez',
      email: 'robert.martinez@example.com',
      graduationYear: 2016,
      department: 'Finance',
      currentPosition: 'Senior Financial Analyst',
      company: 'Goldman Sachs',
      location: 'New York, NY',
      bio: 'Investment banking professional with focus on tech sector.',
      linkedin: 'https://linkedin.com/in/robertmartinez'
    },
    {
      _id: '8',
      firstName: 'Jennifer',
      lastName: 'Taylor',
      email: 'jennifer.taylor@example.com',
      graduationYear: 2020,
      department: 'Biomedical Engineering',
      currentPosition: 'Research Scientist',
      company: 'Pfizer',
      location: 'Boston, MA',
      bio: 'Biomedical researcher working on innovative drug delivery systems.',
      linkedin: 'https://linkedin.com/in/jennifertaylor'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAlumni(dummyAlumni);
      setFilteredAlumni(dummyAlumni);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterAlumni();
  }, [filters, alumni]);

  const filterAlumni = () => {
    let filtered = [...alumni];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(person => 
        person.firstName.toLowerCase().includes(searchLower) ||
        person.lastName.toLowerCase().includes(searchLower) ||
        person.company.toLowerCase().includes(searchLower) ||
        person.currentPosition.toLowerCase().includes(searchLower) ||
        person.department.toLowerCase().includes(searchLower)
      );
    }

    if (filters.department) {
      filtered = filtered.filter(person => person.department === filters.department);
    }

    if (filters.graduationYear) {
      filtered = filtered.filter(person => person.graduationYear.toString() === filters.graduationYear);
    }

    setFilteredAlumni(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({ search: '', department: '', graduationYear: '' });
  };

  // Get unique departments and years from alumni data
  const departments = [...new Set(alumni.map(a => a.department))];
  const graduationYears = [...new Set(alumni.map(a => a.graduationYear))].sort((a, b) => b - a);

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
        <h1 className="text-3xl font-bold text-gray-900">Alumni Directory</h1>
        <p className="mt-2 text-gray-600">
          Connect with {alumni.length} fellow alumni from your institution
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Name, company, position..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              name="department"
              id="department"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
              Graduation Year
            </label>
            <select
              name="graduationYear"
              id="graduationYear"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={filters.graduationYear}
              onChange={handleFilterChange}
            >
              <option value="">All Years</option>
              {graduationYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAlumni.length} of {alumni.length} alumni
        </div>
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((person) => (
          <div key={person._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {person.firstName[0]}{person.lastName[0]}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {person.firstName} {person.lastName}
                </h3>
                <p className="text-gray-600">Class of {person.graduationYear}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Department:</span> {person.department}</p>
              {person.currentPosition && (
                <p><span className="font-medium">Position:</span> {person.currentPosition}</p>
              )}
              {person.company && (
                <p><span className="font-medium">Company:</span> {person.company}</p>
              )}
              {person.location && (
                <p><span className="font-medium">Location:</span> {person.location}</p>
              )}
            </div>

            {person.bio && (
              <div className="mt-3">
                <p className="text-gray-600 text-sm italic">"{person.bio}"</p>
              </div>
            )}

            <div className="mt-4 flex space-x-2">
              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
                >
                  LinkedIn
                </a>
              )}
              <a
                href={`mailto:${person.email}`}
                className="flex-1 text-center bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700 text-sm font-medium transition-colors"
              >
                Email
              </a>
              <button
                onClick={() => alert(`🤝 Connect with ${person.firstName}\\n\\nSend a mentorship request or start a conversation!\\n\\n(Messaging feature coming soon)`)}
                className="flex-1 text-center bg-purple-600 text-white py-2 px-3 rounded-md hover:bg-purple-700 text-sm font-medium transition-colors"
              >
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAlumni.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or clearing filters.</p>
        </div>
      )}
    </div>
  );
};

export default AlumniDirectory;
