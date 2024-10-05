// StudentDashboard.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const StudentDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen mt-5">
            <FaBars onClick={toggleSidebar} className="cursor-pointer fixed text-xl text-white  ml-1 z-10 hover:text-gray-400" />
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}  />
            <div className="flex-1">
                <div className="p-6">
                    <h1 className="text-2xl mt-2 flex justify-center align-middle items-center font-bold">Student Dashboard</h1>
                    <div className="flex justify-center space-x-6 mt-4">
                    <Link to="/studentsubjects">
                        <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded shadow-lg transition-transform transform hover:scale-105">
                            Notes
                        </button>
                    </Link>
                </div>
                    {/* Rest of the dashboard content */}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;