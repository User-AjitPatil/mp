import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddQuestions = () => {
    const { testId } = useParams(); // Get the testId from URL params
    const navigate = useNavigate();
    
    const [questions, setQuestions] = useState([{ question_text: '', answer_options: ['', '', '', ''], correct_answer: '' }]);

    const handleQuestionChange = (index, e) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question_text = e.target.value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, e) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answer_options[optionIndex] = e.target.value;
        setQuestions(updatedQuestions);
    };

    const handleCorrectAnswerChange = (index, e) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].correct_answer = e.target.value;
        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question_text: '', answer_options: ['', '', '', ''], correct_answer: '' }]);
    };

    const handleSubmitQuestions = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(`http://localhost:4000/api/v1/admin/routes/tests/${testId}/add-questions`, {
                questions,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                console.log('Questions added:', response.data);
                navigate('/exam'); // Redirect after successful submission
            } else {
                throw new Error('Failed to add questions');
            }
        } catch (error) {
            console.error('Error adding questions:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Add Questions</h1>
            {questions.map((question, index) => (
                <div key={index} className="mb-6">
                    <label className="block mb-2 text-gray-600" htmlFor={`question_${index}`}>Question:</label>
                    <input
                        type="text"
                        id={`question_${index}`}
                        value={question.question_text}
                        onChange={(e) => handleQuestionChange(index, e)}
                        className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <label className="block mb-2 text-gray-600 mt-4">Answer Options:</label>
                    {question.answer_options.map((option, optionIndex) => (
                        <input
                            key={optionIndex}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, optionIndex, e)}
                            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            placeholder={`Option ${optionIndex + 1}`}
                            required
                        />
                    ))}
                    <label className="block mb-2 text-gray-600">Correct Answer:</label>
                    <input
                        type="text"
                        value={question.correct_answer}
                        onChange={(e) => handleCorrectAnswerChange(index, e)}
                        className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Correct answer (exactly as in options)"
                        required
                    />
                </div>
            ))}
            <button
                type="button"
                onClick={handleAddQuestion}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600 transition duration-200"
            >
                Add Another Question
            </button>
            <button
                type="button"
                onClick={handleSubmitQuestions}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-200"
            >
                Submit Questions
            </button>
        </div>
    );
};

export default AddQuestions;
