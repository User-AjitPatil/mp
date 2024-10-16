import React, { useEffect, useState } from 'react';
import StudentDetails from './StudentDetails';
const StudentData = () => {
    const [students, setStudents] = useState([]); // Store all students
    const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student data
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/students'); // API endpoint for fetching students
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = async (prn) => {
        const response = await fetch(`/api/tests/${prn}`); // API to fetch tests based on PRN
        const data = await response.json();
        setSelectedStudent(data);
    };

    return (
        <div className='mt-16 '>
            <div className='flex justify-center items-center '>
            <h1 className='flex justify-center text-4xl items-center font-bold'>Student Data</h1>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {students.map(student => (
                        <li key={student.prn} onClick={() => handleClick(student.prn)}>
                            {student.name} - {student.prn}
                        </li>
                    ))}
                </ul>
            )}
            {selectedStudent && <StudentDetails student={selectedStudent} />}
        </div>
    );
};
export default StudentData;