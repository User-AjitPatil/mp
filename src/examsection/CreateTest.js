import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Update import

const CreateTest = () => {
    const [testName, setTestName] = useState('');
    const [subject, setSubject] = useState('');
    
    const navigate = useNavigate();  // Initialize useNavigate

    const handleTestNameChange = (e) => {
        setTestName(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const testData = { title: testName, description: subject };
    
        const token = localStorage.getItem('token');
    
        try {
            const response = await axios.post('http://localhost:4000/api/v1/admin/routes/create-tests', testData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 201) {
                console.log('Created Test:', response.data);
                // Redirect to the AddQuestions page with the test ID
                navigate(`/add-questions/${response.data.test._id}`);
            } else {
                throw new Error('Failed to create test');
            }
        } catch (error) {
            console.error('Error creating test:', error);
        }
    };
        
    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Create Test</h1>
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
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-200">
                Submit
            </button>
        </form>
    );
};

export default CreateTest;
