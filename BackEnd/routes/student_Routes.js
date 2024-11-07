const Router = require('express').Router();
const authMiddleware = require('../middlewears/auth_Middleware'); // Ensure this middleware checks for student role
const { submit_Test } = require('../controllers/submit_Test');
const { get_Test } = require('../controllers/get_Test_Student');
const { get_Questions } = require('../controllers/get_Questions');
const {completed_Tests} = require('../controllers/completed_Tests');
Router.get('/get-Tests', authMiddleware, get_Test);
Router.get('/test/:testId/get-Questions', authMiddleware, get_Questions);
Router.get('/completed-Tests',authMiddleware,completed_Tests);
// Submit answers for a test
Router.post('/tests/:testId/submit', authMiddleware, submit_Test);

module.exports = Router;