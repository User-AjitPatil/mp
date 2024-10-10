//models/Attempt.js
const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
    rollNumber: { type: String, required: true },
    marks: { type: Number, required: true },
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Attempt', attemptSchema);