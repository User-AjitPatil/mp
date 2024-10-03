//profile.js
import React, { useState } from 'react';
import { AiOutlineEdit } from "react-icons/ai"; // Icon for edit
import defaultImage from "../src/components/header/defaultimagepng.png"; // Default image
import Sidebar from './dashboard/Sidebar';
import { FaBars } from 'react-icons/fa';

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(defaultImage);
    const [username, setUsername] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set the uploaded image as the user image
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
        setIsModalOpen(false); // Close modal after uploading
    };

    const openUploadDialog = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = handleImageUpload;
        fileInput.click(); // Open file dialog
    };

    return (
        <div className=" mt-14">
            <FaBars onClick={toggleSidebar} className="cursor-pointer -mt-9 fixed text-xl text-white ml-1 z-10 hover:text-gray-400" />
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className='flex items-center justify-center h-screen   bg-gray-100'>
            <div className="flex flex-col h-screen items-center justify-center  p-6">
                <div className="bg-white rounded-lg shadow-lg p-10 h-12/12 w-12/12 max-h-sm   max-w-sm text-center">
                    <div className="relative flex justify-center items-center">
                        <img
                            src={image}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-gray-200 mb-4 cursor-pointer"
                            onClick={() => setIsModalOpen(true)} // Open modal on image click
                        />
                        <AiOutlineEdit
                            onClick={openUploadDialog}
                            className="absolute right-1 bottom-1 mr-9 mb-5 text-gray-600  cursor-pointer bg-white rounded-full border-2 border-gray-300" // Edit icon with background and border
                            size={24} // Size of the edit icon
                        />
                    </div>

                    <input
                        id="imageUpload"
                        type="file"
                        onChange={handleImageUpload}
                        className="hidden" // Hide the file input
                    />

                    {isEditing ? (
                        <div className="flex flex-col space-y-4">
                            <input
                                type="text"
                                placeholder="Update Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border border-gray-300 rounded-md p-2"
                            />
                            <input
                                type="email"
                                placeholder="Update Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{username}</h2>
                            <p className="text-gray-600 mb-4">{email}</p>
                        </div>
                    )}

                    <button
                        onClick={() => setIsEditing(!isEditing)} // Toggle edit mode
                        className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600"
                    >
                        {isEditing ? 'Save Profile' : 'Update Profile'}
                    </button>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-5 rounded-lg shadow-lg">
                            <img src={image} alt="Preview" className="w-64 h-64 rounded-lg mb-4" />
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-red-600"
                            >
                                Close
                            </button>
                            <button
                                onClick={openUploadDialog}
                                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                            >
                                Upload New Image
                            </button>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
};

export default Profile;



{/* <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
<div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-sm text-center">
<div className="relative flex justify-center items-center">
    <div className='flex flex-row -inset-0 gap-0'>
    <img
        src={image}
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-gray-200 mb-4 cursor-pointer"
        onClick={() => setIsModalOpen(true)} // Open modal on image click
        
    />
    <AiOutlineEdit
        onClick={() => setIsModalOpen(true)}
        className="absolute right-32 bottom-5 text-gray-600 cursor-pointer bg-white rounded-full border-2 border-gray-300" // Added background and border to enhance visibility
        size={24} // Increased size for better visibility
    />
    </div>
    
</div>

    <input
        id="imageUpload"
        type="file"
        onChange={handleImageUpload}
        className="hidden" // Hide the file input
    />

    {isEditing ? (
        <div className="flex flex-col space-y-4">
            <input
                type="text"
                placeholder="Update Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
            />
            <input
                type="email"
                placeholder="Update Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
            />
        </div>
    ) : (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{username}</h2>
            <p className="text-gray-600 mb-4">{email}</p>
        </div>
    )}

    <button
        onClick={() => setIsEditing(!isEditing)} // Toggle edit mode
        className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600"
    >
        {isEditing ? 'Save Profile' : 'Update Profile'}
    </button>
</div>

{isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-5 rounded-lg shadow-lg">
            <img src={image} alt="Preview" className="w-64 h-64 rounded-lg mb-4" />
            <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-red-600"
            >
                Close
            </button>
            <button
                onClick={openUploadDialog}
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
            >
                Upload New Image
            </button>
        </div>
    </div>
)}
</div> */}