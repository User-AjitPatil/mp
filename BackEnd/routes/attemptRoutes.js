// routes/attemptRoutes.js
const express = require('express');
const router = express.Router();
const { createAttempt, getRecentAttempts } = require('../controllers/attemptController');

// Create a new attempt
router.post('/createAttempt', createAttempt);

// Get recent attempts
router.get('/getRecentAttempts', getRecentAttempts);

module.exports = router;