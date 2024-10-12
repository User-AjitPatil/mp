const admin = require('../models/Admin');
const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.admin_Signup = async (req, res) => {
    try {
        const { email, firstname, lastname, password, Mobile_NO } = req.body;

        // Check if the user already exists
        const existing = await admin.findOne({ email });
        if (existing) {
            return res.status(411).json({
                msg: "User already exists, try signing in.",
                success: false
            });
        }

        // Create a new user
        const newuser = await admin.create({
            email,
            firstname,
            lastname,
            password,
            Mobile_NO
        });

        // Generate JWT token
        const userID = newuser._id;
        const Token = jwt.sign({ userID }, process.env.JWT_SECRET);

        // Respond with success message and token
        res.json({
            msg: "User created successfully.",
            Token: Token,
            success: true
        });
    } catch (error) {
        console.error("Error during admin signup:", error);
        res.status(500).json({
            msg: "Server error. Please try again later.",
            success: false
        });
    }
};
