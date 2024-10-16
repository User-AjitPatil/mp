const { Question } = require('../models/Test'); // Adjust the path if necessary

exports.get_Questions = async (req, res) => {
    const { testId } = req.params;

    try {
        const questions = await Question.find({ test_id: testId });
        res.json({ questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error fetching questions.', success: false });
    }
}