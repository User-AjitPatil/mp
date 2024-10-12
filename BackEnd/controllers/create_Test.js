const { Test } = require('../models/Test'); // Adjust this path if necessary


exports.create_Test = async (req, res) => {
    const { title, description } = req.body;

    console.log('Test model:', Test); // Debugging log

    try {
        const newTest = await Test.create({
            title,
            description,
            created_by: req.userId || req.userID, // Assuming req.userId is set by your authMiddleware
        });

        res.status(201).json({
            msg: "Test created successfully",
            test: newTest,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating test.', success: false });
    }
};
