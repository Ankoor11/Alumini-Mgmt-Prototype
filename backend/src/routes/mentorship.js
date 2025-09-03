const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// All mentorship routes require authentication
router.use(auth);

// Get mentorship requests
router.get('/', (req, res) => {
  res.json({ requests: [], pagination: { page: 1, pages: 0, total: 0, limit: 10 } });
});

// Get potential mentors
router.get('/mentors', (req, res) => {
  res.json({ mentors: [] });
});

// Create mentorship request
router.post('/', (req, res) => {
  res.json({ message: 'Create mentorship request - not implemented yet' });
});

// Update mentorship request
router.put('/:id', (req, res) => {
  res.json({ message: 'Update mentorship request - not implemented yet' });
});

module.exports = router;
