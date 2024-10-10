//models/Test.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswerIndex: { type: Number, required: true }
});

const testSchema = new mongoose.Schema({
    name: { type: String, required: true },
    questions: { type: [questionSchema], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Test', testSchema);