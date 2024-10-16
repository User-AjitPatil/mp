const mongoose = require('mongoose');

const question_Schema = new mongoose.Schema({
    test_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true }, // Ensure 'Test' is capitalized
    question_text: { type: String, required: true },
    answer_options: { type: [String], required: true },
    correct_answer: { type: String, required: true },
}, { timestamps: true });

const test_Schema = new mongoose.Schema({
    title: String,
    description: String,
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'admin', required: true },
},{ timestamps: true });

// Create the models
const Test = mongoose.model('Test', test_Schema);
const Question = mongoose.model('Question', question_Schema);

// Export both models
module.exports = { Test, Question };
