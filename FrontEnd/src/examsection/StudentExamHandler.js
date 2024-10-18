import React, { useState, useEffect } from 'react';
import Sidebar from '../dashboard/Sidebar';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const StudentExamHandler = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [availableTests, setAvailableTests] = useState([]);
    const [completedTests, setCompletedTests] = useState([]);
    const [isTestStarted, setIsTestStarted] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/v1/student/routes/get-tests', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch tests');
                }

                const data = await response.json();
                console.log(data); // Log the response for debugging

                // Set available tests based on your needs; for now, assume all are available
                setAvailableTests(data.tests || []); // Ensure availableTests is set correctly

                // You may want to handle completed tests similarly; adjust based on your logic
                // setCompletedTests(data.completedTests || []); // Uncomment and adjust if applicable

            } catch (error) {
                console.error('Error fetching tests:', error);
                navigate('/login');
            }
        };

        fetchTests();
    }, [navigate]);
    const handleStartTest = async () => {
        setIsTestStarted(true);
        toast.info("Test started! Please do not switch tabs.");

        try {
            const response = await axios.post('http://localhost:8000/api/start_proctoring', {}, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                setIsTestStarted(true);
                toast.info("Security features are now active. Please do not switch tabs.");
                console.log("Security features are now active. Please do not switch tabs.");
            } else {
                toast.error(`Error starting test: ${response.data.message}`);
            }
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            toast.error(`An error occurred: ${errorMessage}`);
        }
    };
    const startTest = (testId) => {
        if (window.confirm('Are you sure you want to start this test?')) {
            navigate(`/test/${testId}`);
            handleStartTest();
        }

    };

    return (
        <div className="flex h-screen mt-5">
            <ToastContainer/>
            <FaBars onClick={toggleSidebar} className="cursor-pointer fixed text-xl text-white ml-1 z-10 hover:text-gray-400" />
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 mt-6 p-6">
                <h1 className="text-2xl font-bold mb-4">Student Exam Handler</h1>

                <h2 className="text-xl mb-2">Available Tests</h2>
                <ul className="list-none space-y-3 mb-6">
                    {availableTests.length > 0 ? (
                        availableTests.map(test => (
                            <li key={test._id} className="bg-gray-100 p-4 rounded shadow-md flex justify-between items-center">
                                <span>{test.title}</span>
                                <button 
                                    onClick={() => startTest(test._id)} 
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                    Start Test
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="bg-gray-100 p-4 rounded shadow-md">No available tests</li>
                    )}
                </ul>

                <h2 className="text-xl mb-2">Completed Tests</h2>
                <ul className="list-none space-y-3">
                    {completedTests.length > 0 ? (
                        completedTests.map(test => (
                            <li key={test._id} className="bg-gray-200 p-4 rounded shadow-md flex justify-between items-center">
                                <span>{test.title}</span>
                                <span className="font-semibold">Score: {test.score} / {test.totalMarks}</span>
                            </li>
                        ))
                    ) : (
                        <li className="bg-gray-200 p-4 rounded shadow-md">No completed tests</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default StudentExamHandler;
