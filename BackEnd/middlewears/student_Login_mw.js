const zod = require('zod');

const student_Login_mw = async (req,res,next) => {
    const schema = zod.object({
        email : zod.string().email(),
        password: zod.string().min(8)
    });
    const parsed = schema.safeParse(req.body);
    if(!parsed.success) {
        return res.json({
            msg:"enter correct credentials",
            success: false
        });
    }
    next();
}

module.exports = student_Login_mw;