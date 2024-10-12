import React, { useState, useEffect } from 'react';
import Sidebar from '../dashboard/Sidebar';
import { FaBars } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AdminExamHandler = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [createdTests, setCreatedTests] = useState([]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const testResponse = await fetch('http://localhost:4000/api/v1/admin/routes/get-tests', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!testResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const dataTests = await testResponse.json();
                setCreatedTests(dataTests.tests);
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    const handleTestClick = (testId) => {
        navigate(`/test-details/${testId}`); // Navigate to the new TestDetails page
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
                                <div 
                                    key={test._id} 
                                    className="bg-gray-200 p-2 mb-2 rounded cursor-pointer hover:bg-gray-300"
                                    onClick={() => handleTestClick(test._id)} // Handle click to navigate
                                >
                                    <p>Test Name: {test.title}</p>
                                    <p>Date Created: {new Date(test.createdAt).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>No tests created yet.</p>
                        )}
                    </div>

                    <div className="flex justify-center space-x-6 mt-4">
                        <Link to="/createtest">
                            <button 
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
