// import React, { useState } from 'react';
// import Sidebar from '../dashboard/Sidebar';
// import { FaBars } from 'react-icons/fa';
// const StudentExamHandler = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleSidebar = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div className="flex h-screen mt-5">
//             <FaBars onClick={toggleSidebar} className="cursor-pointer fixed text-xl text-white  ml-1 z-10 hover:text-gray-400" />
//             <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
//             <div className="flex-1">
//                 <div className="p-6">
//                     <h1 className="text-2xl mt-2 flex justify-center align-middle items-center font-bold">Student Exam Handler</h1>
//                     {/* Rest of the dashboard content */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StudentExamHandler;


import React, { useState, useEffect } from 'react';
import Sidebar from '../dashboard/Sidebar';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StudentExamHandler = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [availableTests, setAvailableTests] = useState([]);
    const [completedTests, setCompletedTests] = useState([]);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // Mock fetching tests; replace with actual API call
        const fetchTests = async () => {
            const tests = await fetch('/api/tests'); // replace with your actual API endpoint
            const { available, completed } = await tests.json();
            setAvailableTests(available);
            setCompletedTests(completed);
        };

        fetchTests();
    }, []);

    const startTest = (testId) => {
        if (window.confirm('Are you sure you want to start this test?')) {
            navigate(`/test/${testId}`);
        }
    };

    return (
        <div className="flex h-screen mt-5">
            
            <FaBars onClick={toggleSidebar} className="cursor-pointer fixed text-xl text-white ml-1 z-10 hover:text-gray-400" />
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 mt-6 p-6">
                <h1 className="text-2xl font-bold mb-4">Student Exam Handler</h1>
                <h2 className="text-xl mb-2">Available Tests</h2>
                <ul className="list-none space-y-3 mb-6">
                    {availableTests.map(test => (
                        <li key={test.id} className="bg-gray-100 p-4 rounded shadow-md">
                            <div className="flex justify-between">
                                <span>{test.name}</span>
                                <button onClick={() => startTest(test.id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">Start Test</button>
                            </div>
                        </li>
                    ))}
                </ul>

                <h2 className="text-xl mb-2">Completed Tests</h2>
                <ul className="list-none space-y-3">
                    {completedTests.map(test => (
                        <li key={test.id} className="bg-gray-200 p-4 rounded shadow-md">
                            <span>{test.name}</span>
                            <button onClick={() => navigate(`/result/${test.id}`)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700">View Result</button>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
            
    );
};

export default StudentExamHandler;