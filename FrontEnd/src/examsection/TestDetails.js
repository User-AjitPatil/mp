import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TestDetails = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [viewMode, setViewMode] = useState('questions'); // 'questions' or 'responses'

    useEffect(() => {
        const fetchQuestions = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://mp-4-cr8p.onrender.com/api/v1/admin/routes/tests/${testId}/get-questions`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                setQuestions(response.data.questions);
            }
        };

        const fetchResponses = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://mp-4-cr8p.onrender.com/api/v1/admin/routes/tests/${testId}/get-responses`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                setResponses(response.data.responses);
            }
        };

        fetchQuestions();
        fetchResponses();
    }, [testId]);

    const handleViewToggle = (mode) => {
        setViewMode(mode);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Test Details</h1>
            <div className="mb-4">
                <button onClick={() => handleViewToggle('questions')} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                    Questions
                </button>
                <button onClick={() => handleViewToggle('responses')} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Responses
                </button>
            </div>

            {viewMode === 'questions' && (
                <div>
                    {questions.length > 0 ? (
                        questions.map((question, index) => (
                            <div key={index} className="mb-4 p-4 border rounded">
                                <p className="font-semibold">{question.question_text}</p>
                                <div className="mt-2">
                                    {question.answer_options.map((option, optionIndex) => (
                                        <p
                                            key={optionIndex}
                                            className={`p-2 rounded ${option === question.correct_answer ? 'bg-green-200' : 'bg-gray-100'}`}
                                        >
                                            {option}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No questions found for this test.</p>
                    )}
                </div>
            )}

            {viewMode === 'responses' && (
                <div>
                    <h2 className="text-xl font-bold">Student Responses</h2>
                    {responses.length > 0 ? (
                        responses.map((response, index) => (
                            <div key={index} className="flex justify-between p-2 border-b">
                                <span>{response.studentPRN}</span>
                                <span>{response.score}</span>
                            </div>
                        ))
                    ) : (
                        <p>No responses found for this test.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TestDetails;
