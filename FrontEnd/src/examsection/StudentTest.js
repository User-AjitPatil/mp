import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Test = () => {
    const [isTestStarted, setIsTestStarted] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
    const [tabSwitchCount, setTabSwitchCount] = useState(0); // Counter for tab switches
    const { testId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]); // Initialize as an empty array
    const [answers, setAnswers] = useState({});
    useEffect(() => {
        if (isTestStarted) {
            const timer = setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime <= 0) {
                        clearInterval(timer);
                        handleSubmit(); // Automatically submit when time runs out
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isTestStarted]);
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/v1/student/routes/test/${testId}/get-Questions`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log('API Response:', response.data); // Log the entire response

                // Ensure that questions is an array
                if (Array.isArray(response.data.questions)) {
                    setQuestions(response.data.questions);
                } else {
                    console.error('Questions is not an array:', response.data.questions);
                    setQuestions([]); // Fallback to empty array if not an array
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
                setQuestions([]); // Ensure questions is an empty array on error
            }
        };

        fetchQuestions();
    }, [testId]);

    const handleOptionChange = (questionId, option) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: option
        }));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
    
        // Transform the answers into the required format
        const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
            questionId,
            selectedAnswer
        }));
        try {
             
            // Stop proctoring first
            await axios.post('http://localhost:4000/api/stop_proctoring', {}, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            toast.error(`An error occurred during submission: ${errorMessage}`);
        }
        try {
            const response = await axios.post(
                `http://localhost:5000/api/v1/student/routes/tests/${testId}/submit`,
                { answers: formattedAnswers }, // Send formatted answers
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            
    
            console.log(response);
            alert('Answers submitted!');
            navigate('/student-exams'); // Redirect after submission
        } catch (error) {
            console.error('Error submitting answers:', error.response ? error.response.data : error.message);
            alert('Failed to submit answers. Please check your credentials or try again later.');
        }

    };
    
    const handleTabSwitch = () => {
        if (document.hidden) {
            setTabSwitchCount(prevCount => {
                const newCount = prevCount + 1;
                toast.warn(`You have switched tabs ${newCount} times during the exam!`);
                logTabSwitch(newCount); // Log tab switch for admin
                return newCount;
            });
        }
    };

    const logTabSwitch = async (switchCount) => {
        try {
            await axios.post('http://localhost:4000/api/tab_switch_count', {
                count: switchCount // Use the correct key here
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } catch (error) {
            console.error("Error logging tab switch:", error);
        }
    };

    useEffect(() => {
        document.addEventListener("visibilitychange", handleTabSwitch);
        return () => {
            document.removeEventListener("visibilitychange", handleTabSwitch);
        };
    }, []);
    return (
        <div className="p-6">
            <ToastContainer/>
            <h1 className="text-2xl font-bold mb-4">Test</h1>
            <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                {questions.length > 0 ? ( // Check if there are questions before mapping
                    questions.map(question => (
                        <div key={question._id} className="mb-4"> {/* Use _id for key */}
                            <h3 className="text-lg">{question.question_text}</h3> {/* Use question_text */}
                            <div className="flex flex-col">
                                {question.answer_options.map((option, index) => ( // Map over answer_options
                                    <label key={`${question._id}-${index}`} className="flex items-center"> {/* Unique key here */}
                                        <input
                                            type="radio"
                                            name={`question-${question._id}`}
                                            value={option}
                                            checked={answers[question._id] === option}
                                            onChange={() => handleOptionChange(question._id, option)}
                                            className="mr-2"
                                        />
                                        {option} {/* Display the option text */}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No questions available.</p> // Fallback if there are no questions
                )}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Answers</button>
            </form>
        </div>
    );
};

export default Test;
