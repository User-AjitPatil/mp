const { Test } = require('../models/Test'); // Adjust this path if necessary


exports.get_Test = async (req, res) => {
    try {
        const tests = await Test.find({ created_by: req.userId }).populate('created_by', 'email');
        res.json({ tests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error fetching tests.', success: false });
    }
};
