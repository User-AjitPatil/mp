const Router = require('express').Router();
const authMiddleware = require('../middlewears/auth_Middleware'); // Ensure this middleware checks for student role
const { submit_Test } = require('../controllers/submit_Test');

// Submit answers for a test
Router.post('/tests/:testId/submit', authMiddleware, submit_Test);

module.exports = Router;