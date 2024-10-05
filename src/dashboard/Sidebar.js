// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar}) => {
    return (
        <div className={`${isOpen ? "translate-x-0" : "-translate-x-full"} fixed top-0 left-0 w-64 mt-14 h-full bg-gray-700 transition-transform duration-300 shadow-lg`}>
            {/* <button onClick={toggleSidebar} className="p-2 text-gray-600 hover:text-gray-900">
                Close
            </button> */}
            <ul className="mt-4">
            <li className="p-4 hover:bg-blue-500 text-white">
                    <Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link>
                </li>
                <li className="p-4 hover:bg-blue-500 text-white">
                    <Link to="/profile" onClick={toggleSidebar}>Profile</Link>
                </li>
                <li className="p-4 hover:bg-blue-500 text-white">
                    <Link to="/exam" onClick={toggleSidebar}>Exams</Link>
                </li>
                <li className="p-4 hover:bg-blue-500 text-white">
                    <Link to="/login" onClick={toggleSidebar}>Logout</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;