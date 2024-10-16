const zod = require('zod');
const jwt = require('jsonwebtoken');
// const {JWT_SECRET} = require('./config');

const student_Signup_mw = async (req, res, next) => {
    try {
        const schema = zod.object({
            email: zod.string().email(),
            firstname: zod.string(),
            lastname: zod.string(),
            password: zod.string().min(8),
            PRN: zod.string().optional(),
            Mobile_NO: zod.string()
        });
        
        const parsed = schema.safeParse(req.body);
        
        if (!parsed.success) {
            return res.json({
                msg: "Enter correct credentials",
                success: false,
                errors: parsed.error.format()
            });
        }

        next();
    } catch (error) {
        console.error("An error occurred during validation:", error);
        return res.status(500).json({
            msg: "An internal error occurred",
            success: false
        });
    }
};

module.exports = student_Signup_mw;
