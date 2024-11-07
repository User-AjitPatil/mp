// controllers/adminResultsController.js

const Submission = require('../models/Attempt'); // Ensure this is the correct path
const Student = require('../models/Student'); // Ensure this is the correct path
const { Test } = require('../models/Test'); // Import the Test model correctly

exports.getStudentResults = async (req, res) => {
    const adminId = req.userId || req.userID; // Assuming you pass the admin ID in the request
    try {
        console.log(adminId);
        
        // Find all tests created by the admin
        const tests = await Test.find({ created_by: adminId }).select('_id title'); // Include title in the select
        console.log(tests);

        if (!tests.length) {
            return res.status(404).json({ message: 'No tests found for this admin.' });
        }

        // Find all submissions for the tests created by the admin
        const submissions = await Submission.find({ test_id: { $in: tests.map(test => test._id) } })
            .populate('student_id', 'PRN') // Populate PRN from student
            .select('marks student_id test_id'); // Select marks, student_id, and test_id

        // Map submissions to include PRN, marks, and test title
        const results = await Promise.all(submissions.map(async (submission) => {
            const test = tests.find(t => t._id.equals(submission.test_id)); // Find the corresponding test
            return {
                PRN: submission.student_id ? submission.student_id.PRN : null, // Handle potential null
                marks: submission.marks,
                testName: test ? test.title : 'Unknown Test' // Default to 'Unknown Test' if not found
            };
        }));

        return res.status(200).json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while retrieving results.' });
    }
};
