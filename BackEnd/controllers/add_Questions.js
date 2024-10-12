const { Question } = require('../models/Test'); // Adjust the path if necessary

exports.add_Questions = async (req, res) => {
    const { testId } = req.params;
    const questionsArray = req.body.questions; // Expecting an array of questions

    try {
        const questionsToInsert = questionsArray.map(q => ({
            test_id: testId,
            question_text: q.question_text,
            answer_options: q.answer_options,
            correct_answer: q.correct_answer,
        }));

        // Insert all questions at once
        const newQuestions = await Question.insertMany(questionsToInsert);

        res.status(201).json({
            msg: "Questions added successfully",
            questions: newQuestions,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error adding questions.', success: false });
    }
}
