import React from 'react';
import { useParams, Link } from 'react-router-dom';

const StudentTopics = () => {
    const { subjectId } = useParams();
    
    // Sample topics based on subjectId (Replace with dynamic data)
    const topics = subjectId === '1' ? ['Module 1', 'Module 2'] : [];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-5">Topics</h1>
            <ul className="list-none space-y-4">
                {topics.map((topic, index) => (
                    <li key={index} className="bg-white p-4 rounded shadow-md">
                        <Link to={`/notes/${topic}`} className="text-blue-600 hover:underline">
                            {topic}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/subjects">
                <button className="mt-5 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                    Back to Subjects
                </button>
            </Link>
        </div>
    );
};

export default StudentTopics;