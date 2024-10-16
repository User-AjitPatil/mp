//controllers/testController.js
const Test = require('../models/Test');

// Create a new test
exports.createTest = async (req, res) => {
    try {
        // Validate the request body
        console.log("I am ajit patil");
        console.log(req.body);
        if (!req.body || !req.body.name || !req.body.subject) { // Replace with actual required fields
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const newTest = new Test(req.body);
        await newTest.save();
        res.status(201).json({
            message: 'Test created successfully',
            test: newTest
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all tests
exports.getAllTests = async (req, res) => {
    try {
        const tests = await Test.find();
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

