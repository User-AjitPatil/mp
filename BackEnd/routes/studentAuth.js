const express = require('express');
const router = express.Router();
const { student_Signup } = require('../controllers/student_Signup');
const student_Signup_mw = require('../middlewears/student_Signup_mw');
const student_Login_mw = require('../middlewears/student_Login_mw');
const {student_Login} = require('../controllers/student_Login');

router.post('/signup', student_Signup_mw, student_Signup);
router.post('/login', student_Login_mw, student_Login);

module.exports = router;
