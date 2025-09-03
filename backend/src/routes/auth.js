const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('firstName').trim().isLength({ min: 1 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 1 }).withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('graduationYear').isInt({ min: 1900, max: new Date().getFullYear() + 10 }).withMessage('Valid graduation year is required'),
  body('department').trim().isLength({ min: 1 }).withMessage('Department is required')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').exists().withMessage('Password is required')
];

const profileValidation = [
  body('firstName').optional().trim().isLength({ min: 1 }).withMessage('First name cannot be empty'),
  body('lastName').optional().trim().isLength({ min: 1 }).withMessage('Last name cannot be empty'),
  body('graduationYear').optional().isInt({ min: 1900, max: new Date().getFullYear() + 10 }).withMessage('Valid graduation year is required'),
  body('department').optional().trim().isLength({ min: 1 }).withMessage('Department cannot be empty')
];

// Routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, profileValidation, authController.updateProfile);

module.exports = router;
