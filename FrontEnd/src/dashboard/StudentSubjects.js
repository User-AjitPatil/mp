import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';
const StudentSubjects = () => {
    const Navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await fetch('/api/subjects'); // Replace with actual API endpoint
                const data = await response.json();
                // Add the default subject to the list
                setSubjects([{ name: 'Chemistry', id: 1 }, ...data]);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);
const handleClick = ()=>{
    Navigate("/dashboard");
}
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-5">Subjects</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="list-none space-y-4">
                    {subjects.map(subject => (
                        <li key={subject.id} className="bg-white p-4 rounded shadow-md">
                            <Link to={`/topics/${subject.id}`} className="text-blue-600 hover:underline">
                                {subject.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
          
                <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleClick}>
                    Back to Dashboard
                </button>
        </div>
    );
};

export default StudentSubjects;