//routes/testRoutes.js
const express = require('express');
const { createTest, getAllTests } = require('../controllers/testController');

const router = express.Router();

// Create a test
router.post('/createTest', createTest);

// Get all tests
router.get('/getAllTests', getAllTests);

module.exports = router;