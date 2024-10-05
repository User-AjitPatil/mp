import React from 'react';
import { useParams, Link } from 'react-router-dom';

const StudentNotes = () => {
    const { topic } = useParams();

    // Sample notes data for topics (Replace with dynamic data)
    const notes = `These are notes for ${topic}.` // Replace with actual notes content

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-5">Notes for {topic}</h1>
            <p className="bg-white p-4 rounded shadow-md">{notes}</p>
            <Link to="/topics">
                <button className="mt-5 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700">
                    Back to Topics
                </button>
            </Link>
        </div>
    );
};

export default StudentNotes;