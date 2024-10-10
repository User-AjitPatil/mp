import React, { useState } from 'react';
import axios from 'axios';

const CreateTest = () => {
    const [testName, setTestName] = useState('');
    const [subject, setSubject] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 }
    ]);

    // Handle input changes for test name
    const handleTestNameChange = (e) => {
        setTestName(e.target.value);
    };

    // Handle input changes for subject
    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    // Handle question change
    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    // Handle option change
    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    // Handle correct answer index change
    const handleCorrectAnswerChange = (questionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].correctAnswerIndex = value;
        setQuestions(newQuestions);
    };

    // Add a new question
    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]);
    };

    // Remove a specific question
    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent page refresh
        const testData = { name: testName, subject, questions };  // Updated to match backend format

        try {
            const response = await axios.post('http://localhost:5000/api/tests/createTest', testData);
            
            if (response.status !== 201) throw new Error('Failed to create test');
        
            const result = response.data;
            console.log('Created Test:', result);
            
            // Reset the form or provide feedback as required
            setTestName('');
            setSubject('');
            setQuestions([{ question: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]);
        } catch (error) {
            console.error('Error creating test:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Create Test</h1>
            
            {/* Test Name Input */}
            <div className="mb-6">
                <label className="block mb-2 text-gray-600" htmlFor="testName">Test Name:</label>
                <input
                    type="text"
                    id="testName"
                    value={testName}
                    onChange={handleTestNameChange}
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {/* Subject Input */}
            <div className="mb-6">
                <label className="block mb-2 text-gray-600" htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={handleSubjectChange}
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            
            {/* Questions Section */}
            {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="mb-6 border border-gray-300 p-4 rounded-lg bg-gray-50 shadow-sm">
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-600" htmlFor={`question${questionIndex}`}>
                            Question {questionIndex + 1}:
                        </label>
                        <input
                            type="text"
                            id={`question${questionIndex}`}
                            value={question.question}
                            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Options Inputs */}
                    {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="mb-4">
                            <label className="block mb-2 text-gray-600" htmlFor={`option${questionIndex}${optionIndex}`}>
                                Option {optionIndex + 1}:
                            </label>
                            <input
                                type="text"
                                id={`option${questionIndex}${optionIndex}`}
                                value={option}
                                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    ))}

                    {/* Correct Answer Selection */}
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-600">Correct Answer:</label>
                        {question.options.map((option, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="radio"
                                    id={`correctOption${questionIndex}${index}`}
                                    name={`correctAnswer${questionIndex}`}
                                    value={index}
                                    checked={question.correctAnswerIndex === index}
                                    onChange={() => handleCorrectAnswerChange(questionIndex, index)}
                                    className="mr-2"
                                />
                                <label className="text-gray-600" htmlFor={`correctOption${questionIndex}${index}`}>
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Button to Remove Question */}
                    <button 
                        type="button" 
                        onClick={() => removeQuestion(questionIndex)} 
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        Remove Question
                    </button>
                </div>
            ))}

            {/* Button to Add Question */}
            <button 
                type="button" 
                onClick={addQuestion} 
                className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600 transition duration-200"
            >
                Add Question
            </button>

            {/* Submit Button */}
            <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-200"
            >
                Submit
            </button>
        </form>
    );
};

export default CreateTest;
