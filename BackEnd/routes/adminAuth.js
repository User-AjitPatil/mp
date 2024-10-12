const express = require('express');
const router = express.Router();
const  admin_Signup_mw  = require('../middlewears/admin_Signup_mw');
const { admin_Signup } = require('../controllers/admin_Signup');
const  admin_Login_mw  = require('../middlewears/admin_Login_mw');
const { admin_Login } = require('../controllers/admin_Login');

router.post('/signup', admin_Signup_mw, admin_Signup);
router.post('/login', admin_Login_mw, admin_Login);

module.exports = router;
