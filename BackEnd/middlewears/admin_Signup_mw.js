const zod = require('zod');
const jwt = require('jsonwebtoken');
// const {JWT_SECRET} = require('./config');

const admin_Signup_mw = async (req, res, next) => {
    const schema = zod.object({
        email: zod.string().email(),
        firstname: zod.string(),
        lastname: zod.string(),
        password: zod.string().min(8),
        Mobile_NO: zod.string()
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return res.json({
            msg: "enter correct credentials",
            success: false
        });
    }
    next();
};

module.exports = admin_Signup_mw;