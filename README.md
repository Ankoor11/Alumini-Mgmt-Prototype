# AlumniConnect - Centralized Alumni Management System

A comprehensive MVP for managing alumni relationships, built with React, Express, and MongoDB.

## 🚀 Features

### Core Functionality
- **User Authentication**: JWT-based secure login with role-based access (alumni, admin)
- **Alumni Profiles**: CRUD operations for personal, academic, and career details
- **Alumni Directory**: Search and filter alumni by batch, department, industry
- **Event Management**: Create events, RSVP functionality, event calendar
- **Mentorship Program**: Connect alumni with mentors for career guidance
- **Admin Dashboard**: Comprehensive admin panel for system management

### Security & Performance
- Password hashing with bcrypt
- JWT token authentication
- Rate limiting and security middleware
- Input validation and sanitization
- Mobile-responsive design

## 🛠 Tech Stack

- **Frontend**: React 18 + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with role-based access control
- **Deployment**: Docker-ready for cloud deployment

## 📁 Project Structure

```
alumni_mgt/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts (Auth)
│   │   ├── services/        # API service functions
│   │   └── utils/           # Utility functions
│   └── package.json
├── backend/                  # Express server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── middleware/      # Custom middleware
│   │   ├── routes/          # API routes
│   │   └── utils/           # Backend utilities
│   ├── package.json
│   └── .env                 # Environment variables
├── database/                # Database setup scripts
├── docs/                    # Documentation
├── docker/                  # Docker configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd alumni_mgt
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cd backend
   # Edit .env with your configuration (MongoDB URI, JWT secret, etc.)
   ```

4. **Start MongoDB**
   ```bash
   # Using local MongoDB
   mongod

   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Install all dependencies**
   ```bash
   npm run install:all
   ```

6. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Sample Login Credentials
After running the system, you can register new users or use these test credentials:
- **Admin**: Create an admin user through the registration form
- **Alumni**: Register as a regular user

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

#### POST /api/auth/login
Authenticate user and return JWT token.

#### GET /api/auth/profile
Get current user profile.

#### PUT /api/auth/profile
Update current user profile.

### Alumni Endpoints

#### GET /api/alumni
Get paginated list of alumni with optional filters.

#### GET /api/alumni/:id
Get specific alumni profile.

### Dashboard Endpoints

#### GET /api/dashboard/stats
Get user dashboard statistics.

#### GET /api/dashboard/admin/stats
Get admin dashboard statistics (admin only).

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/alumni_mgt
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚢 Deployment

### Production Build

```bash
# Build frontend for production
npm run build

# Start production server
npm start
```

### Docker Deployment

```bash
# Build and run with Docker Compose
npm run docker:up
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## 🔄 Future Enhancements

- [ ] Email notifications for events
- [ ] Advanced analytics dashboard
- [ ] Job board integration
- [ ] Fundraising campaign management
- [ ] Alumni success stories showcase
- [ ] Mobile app development
- [ ] Integration with LinkedIn API
