const express = require('express');
const { auth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// All dashboard routes require authentication
router.use(auth);

// Get user dashboard stats
router.get('/stats', (req, res) => {
  res.json({ totalAlumni: 0, upcomingEvents: 0, mentorshipRequests: 0 });
});

// Get admin dashboard stats (admin only)
router.get('/admin/stats', requireAdmin, (req, res) => {
  res.json({ 
    totalUsers: 0, 
    activeUsers: 0, 
    totalEvents: 0, 
    upcomingEvents: 0,
    mentorshipRequests: 0,
    departmentStats: []
  });
});

module.exports = router;
