import React, { useState } from 'react';
import Sidebar from '../dashboard/Sidebar';
import { FaBars } from 'react-icons/fa';
const StudentExamHandler = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen mt-5">
            <FaBars onClick={toggleSidebar} className="cursor-pointer fixed text-xl text-white  ml-1 z-10 hover:text-gray-400" />
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1">
                <div className="p-6">
                    <h1 className="text-2xl mt-2 flex justify-center align-middle items-center font-bold">Student Exam Handler</h1>
                    {/* Rest of the dashboard content */}
                </div>
            </div>
        </div>
    );
};

export default StudentExamHandler;