const student = require('../models/Student');

const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


exports.student_Signup = async (req, res) => {
    const { email, firstname, lastname, password, PRN, Mobile_NO } = req.body;
    const existing = await student.findOne({ email });
    if (existing) {
        return res.status(411).json({
            msg: "user already exists, try signing in",
            success: false
        });
    }
    const newuser = await student.create({
        email,
        firstname,
        lastname,
        password,
        PRN,
        Mobile_NO
    });
    
    const userID = newuser._id;
    const Token = jwt.sign({userID}, process.env.JWT_SECRET);
    res.json({
        msg: "user created successfully",
        Token: Token,
        success: true
    });
};