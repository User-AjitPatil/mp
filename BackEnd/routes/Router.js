const Router = require('express').Router();
const student = require('./studentAuth');
const admin = require('./adminAuth');
const admin_Routes = require('./admin_Routes');
const student_Routes = require('./student_Routes');

Router.use('/admin/auth', admin);
Router.use('/student/auth', student);

Router.use('/admin/routes', admin_Routes);
Router.use('/student/routes', student_Routes);
module.exports = Router;