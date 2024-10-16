//models/Attempt.js
const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
    rollNumber: { type: String, required: true },
    marks: { type: Number, required: true },
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true }
}, { timestamps: true });

const submission_Schema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
    test_id: { type: mongoose.Schema.Types.ObjectId, ref: 'test', required: true },
    marks: { type: Number, required: true },
    submitted_at: { type: Date, default: Date.now },
}, { timestamps: true });

//module.exports = mongoose.model('Attempt', attemptSchema);
module.exports = mongoose.model('Submission', submission_Schema);


