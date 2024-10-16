const admin = require('../models/Admin');

const Router = require('express').Router();
const jwt = require('jsonwebtoken');





exports.admin_Login =  async (req,res)=>{
    const { email, password }  = req.body;
    const existing = await admin.findOne({email});
    if(existing) {
        if(existing.password === password) {
            const Token = jwt.sign({
                existingID : existing._id
            },  process.env.JWT_SECRET);
            return res.json({
                msg:"user signed in successfully",
                Token:Token,
                success: true
            })
        }
    }
    res.json({
        msg:"user does not exists, try signup",
        success: false
    })
}
