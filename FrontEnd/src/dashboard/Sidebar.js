import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, role }) => {
    return (
        <div className={`${isOpen ? "translate-x-0" : "-translate-x-full"} fixed top-0 left-0 w-64 mt-14 h-full bg-gray-700 transition-transform duration-300 shadow-lg`}>
            <ul className="mt-4">
                <li className="p-4 hover:bg-blue-500 text-white">
                    <Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link>
                </li>
                <li className="p-4 hover:bg-blue-500 text-white">
                    <Link to="/profile" onClick={toggleSidebar}>Profile</Link>
                </li>

                {/* Render links based on user role */}
                {role === 'student' ? (
                    <>
                        <li className="p-4 hover:bg-blue-500 text-white">
                            <Link to="/student-exams" onClick={toggleSidebar}>Exams</Link>
                        </li>
                        <li className="p-4 hover:bg-blue-500 text-white">
                            <Link to="/student-results" onClick={toggleSidebar}>Results</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="p-4 hover:bg-blue-500 text-white">
                            <Link to="/admin-exams" onClick={toggleSidebar}>Manage Exams</Link>
                        </li>
                        <li className="p-4 hover:bg-blue-500 text-white">
                            <Link to="/admin-results" onClick={toggleSidebar}>View Results</Link>
                        </li>
                    </>
                )}

                <li className="p-4 hover:bg-blue-500 text-white">
                    <Link to="/login" onClick={toggleSidebar}>Logout</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
