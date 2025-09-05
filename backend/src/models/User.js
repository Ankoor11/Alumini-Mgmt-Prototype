const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'alumni', 'admin'],
    default: 'student'
  },
  studentId: {
    type: String,
    unique: true,
    sparse: true // allows null values while maintaining uniqueness for non-null values
  },
  alumniId: {
    type: String,
    unique: true,
    sparse: true // allows null values while maintaining uniqueness for non-null values
  },
  graduationYear: {
    type: Number,
    required: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  // Alumni-specific fields
  currentPosition: {
    type: String,
    trim: true,
    required: function() { return this.role === 'alumni'; }
  },
  company: {
    type: String,
    trim: true,
    required: function() { return this.role === 'alumni'; }
  },
  // Student-specific fields
  currentYear: {
    type: Number,
    min: 1,
    max: 6,
    required: function() { return this.role === 'student'; }
  },
  rollNumber: {
    type: String,
    trim: true,
    required: function() { return this.role === 'student'; }
  },
  bio: {
    type: String,
    trim: true
  },
  linkedin: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search
userSchema.index({ firstName: 'text', lastName: 'text', department: 'text', company: 'text' });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate IDs before saving
userSchema.pre('save', async function(next) {
  // Generate Student ID for students
  if (this.role === 'student' && !this.studentId) {
    const year = new Date().getFullYear();
    const dept = this.department.substring(0, 3).toUpperCase();
    const count = await mongoose.model('User').countDocuments({ role: 'student' });
    this.studentId = `STU${year}${dept}${String(count + 1).padStart(4, '0')}`;
  }
  
  // Generate Alumni ID for alumni
  if (this.role === 'alumni' && !this.alumniId) {
    const gradYear = this.graduationYear;
    const dept = this.department.substring(0, 3).toUpperCase();
    const count = await mongoose.model('User').countDocuments({ role: 'alumni' });
    this.alumniId = `ALU${gradYear}${dept}${String(count + 1).padStart(4, '0')}`;
  }
  
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('User', userSchema);
