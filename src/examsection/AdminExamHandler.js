
import React, { useState, useEffect } from 'react';
import Sidebar from '../dashboard/Sidebar';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminExamHandler = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [createdTests, setCreatedTests] = useState([]); // State for created tests
    const [recentAttempts, setRecentAttempts] = useState([]); // State for recent attempts

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Fetch the list of created tests and recent attempts on component mount
    useEffect(() => {
        const fetchTests = async () => {
            try {
                // Fetch created tests
                const responseTests = await fetch('/api/tests'); // Adjust the URL accordingly
                const dataTests = await responseTests.json();
                setCreatedTests(dataTests);

                // Fetch recent attempts
                const responseAttempts = await fetch('/api/recent-attempts'); // Adjust the URL accordingly
                const dataAttempts = await responseAttempts.json();
                setRecentAttempts(dataAttempts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchTests();
    }, []);

    // Function to create new test
    const createNewTest = async () => {
        try {
            // Logic to create a new test (e.g. POST request)
            await fetch('/api/create-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ /* Your test data - may be replaced with relevant data */ }),
            });

            // After creating new test, clear old attempts
            setRecentAttempts([]);

            // Re-fetch tests after creating a new test
            const response = await fetch('/api/tests');
            const data = await response.json();
            setCreatedTests(data);
        } catch (error) {
            console.error('Error creating new test:', error);
        }
    };

    return (
        <div className="flex h-screen mt-5">
            <FaBars onClick={toggleSidebar} className="cursor-pointer fixed text-xl text-white ml-1 z-10 hover:text-gray-400" />
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1">
                <div className="p-6">
                    <h1 className="text-2xl mt-2 flex justify-center align-middle items-center font-bold">Admin Exam Handler</h1>
                    
                    {/* Display the list of created tests */}
                    <div className="mt-4">
                        {createdTests.length > 0 ? (
                            createdTests.map(test => (
                                <div key={test.id} className="bg-gray-200 p-2 mb-2 rounded">
                                    <p>Test Name: {test.name}</p>
                                    <p>Date Created: {test.createdAt}</p> {/* Adjust accordingly to your data structure */}
                                </div>
                            ))
                        ) : (
                            <p>No tests created yet.</p>
                        )}
                    </div>

                    {/* Display recent test attempts */}
                    <div className="mt-4">
                        {recentAttempts.length > 0 ? (
                            recentAttempts.map(attempt => (
                                <div key={attempt.rollNo} className="bg-gray-200 p-2 mb-2 rounded">
                                    <p>Roll No: {attempt.rollNo}</p>
                                    <p>Marks Scored: {attempt.marks}</p> {/* Adjust according to your data structure */}
                                </div>
                            ))
                        ) : (
                            <p>No recent attempts available.</p>
                        )}
                    </div>

                    <div className="flex justify-center space-x-6 mt-4">
                        <Link to="/createtest">
                            <button 
                                onClick={createNewTest}
                                className="bg-blue-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded shadow-lg transition-transform transform hover:scale-105">
                                Create Test
                            </button>
                            </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminExamHandler;