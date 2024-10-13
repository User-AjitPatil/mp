const { Question } = require("../models/Test");
const Submission = require('../models/Attempt');

exports.completed_Tests = async (req, res) => {
    try {
        // Fetch completed tests for the student
        const completed_Tests = await Submission.find({
            student_id: req.userId
        });

        // Check if any tests were found
        if (!completed_Tests.length) {
            return res.status(404).json({ msg: 'No completed tests found.', success: false });
        }

        res.json({
            completed_Tests,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error fetching completed tests.', success: false });
    }
};
