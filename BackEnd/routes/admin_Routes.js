const Router = require('express').Router();
// const { test, question } = require('../db'); // Import the necessary models
const authMiddleware = require('../middlewears/auth_Middleware'); // Ensure this middleware checks for admin role
const { create_Test } = require('../controllers/create_Test'); 
const { get_Test } = require('../controllers/get_Test_Admin');
const { add_Questions } = require('../controllers/add_Questions');
const { get_Questions } = require('../controllers/get_Questions');
const {getStudentResults} = require('../controllers/Get_Results_admin');

// Create a new test
Router.post('/create-tests', authMiddleware, create_Test);
Router.get('/get-tests', authMiddleware, get_Test);
Router.post('/tests/:testId/add-questions', authMiddleware, add_Questions);
Router.get('/tests/:testId/get-questions', authMiddleware, get_Questions);
Router.get('/get-results', authMiddleware, getStudentResults);


module.exports = Router;