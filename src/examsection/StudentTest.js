import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Test = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch(`/api/tests/${testId}`); // Fetch questions
            const data = await response.json();
            setQuestions(data.questions);
        };

        fetchQuestions();
    }, [testId]);

    const handleOptionChange = (questionId, option) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: option
        }));
    };

    const handleSubmit = () => {
        // Submit answers here, perhaps send to API
        // Mock submission logic
        alert('Answers submitted!');
        navigate('/dashboard'); // Redirect after submission
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Test</h1>
            <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                {questions.map(question => (
                    <div key={question.id} className="mb-4">
                        <h3 className="text-lg">{question.text}</h3>
                        <div className="flex flex-col">
                            {question.options.map(option => (
                                <label key={option.id} className="flex items-center">
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={option.text}
                                        checked={answers[question.id] === option.text}
                                        onChange={() => handleOptionChange(question.id, option.text)}
                                        className="mr-2"
                                    />
                                    {option.text}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Answers</button>
            </form>
        </div>
    );
};

export default Test;