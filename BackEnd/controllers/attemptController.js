// controllers/attemptController.js
const Attempt = require('../models/Attempt');

exports.createAttempt = async (req, res) => {
    try {
        const attempt = new Attempt(req.body);
        await attempt.save();
        res.status(201).json(attempt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getRecentAttempts = async (req, res) => {
    try {
        const attempts = await Attempt.find().populate('test');
        res.json(attempts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

