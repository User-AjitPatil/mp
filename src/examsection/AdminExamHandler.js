import React, { useState, useEffect } from 'react';
import Sidebar from '../dashboard/Sidebar';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminExamHandler = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [createdTests, setCreatedTests] = useState([]);
    const [recentAttempts, setRecentAttempts] = useState([]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [testResponse, attemptResponse] = await Promise.all([
                    fetch('http://localhost:5000/api/tests/getAllTests'),
                    fetch('http://localhost:5000/api/recent-attempts/getRecentAttempts')
                ]);
                const dataTests = await testResponse.json();
                const dataAttempts = await attemptResponse.json();
                setCreatedTests(dataTests);
                setRecentAttempts(dataAttempts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const createNewTest = async () => {
        try {
            const testData = { name: "New Test" };  // Replace with relevant test data
            const response = await fetch('/api/create-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testData)
            });

            if (response.ok) {
                const newTest = await response.json();
                setCreatedTests(prev => [...prev, newTest]);
            } else {
                console.error('Error creating new test');
            }
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
                    <div className="mt-4">
                        {createdTests.length > 0 ? (
                            createdTests.map(test => (
                                <div key={test.id} className="bg-gray-200 p-2 mb-2 rounded">
                                    <p>Test Name: {test.name}</p>
                                    <p>Date Created: {new Date(test.createdAt).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>No tests created yet.</p>
                        )}
                    </div>
                    <div className="mt-4">
                        {recentAttempts.length > 0 ? (
                            recentAttempts.map(attempt => (
                                <div key={attempt.rollNo} className="bg-gray-200 p-2 mb-2 rounded">
                                    <p>Roll No: {attempt.rollNo}</p>
                                    <p>Marks Scored: {attempt.marks}</p>
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