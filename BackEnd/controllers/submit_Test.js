const { Question } = require("../models/Test");
const Submission = require('../models/Attempt');

exports.submit_Test = async (req, res) => {
    const { testId } = req.params;
    const { answers } = req.body; // Expecting an array of { questionId, selectedAnswer }

    try {
        // Check if the student has already submitted for this test
        const existingSubmission = await Submission.findOne({
            student_id: req.userId,
            test_id: testId,
        });

        if (existingSubmission) {
            return res.status(400).json({
                msg: "You have already submitted your answers for this test.",
                success: false
            });
        }

        // Fetch all questions for the test
        const questions = await Question.find({ test_id: testId });

        let marks = 0;

        // Calculate marks based on correct answers
        for (const question of questions) {
            const submittedAnswer = answers.find(ans => ans.questionId.toString() === question._id.toString());
            if (submittedAnswer && submittedAnswer.selectedAnswer === question.correct_answer) {
                marks += 1; // Increment marks for each correct answer
            }
        }

        // Save the submission
        const newSubmission = await Submission.create({
            student_id: req.userId, // Assuming req.userId is the student's ID
            test_id: testId,
            marks,
        });

        res.status(201).json({
            msg: "Test submitted successfully",
            marks,
            submission: newSubmission,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error submitting test.', success: false });
    }
}
