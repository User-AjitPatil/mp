

// src/components/SignupForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ setType }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobileNo: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "student",
        prnNumber: "", // Added PRN number field
    });

    const [errors, setErrors] = useState({}); // To hold validation error messages
    const [showPassword, setShowPassword] = useState(false); // State to control password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to control confirm password visibility

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateMobileNo = (mobileNo) => {
        const regex = /^\+?\d{10,15}$/; // Adjust length as necessary
        return regex.test(mobileNo);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/; // At least 5 chars: 1 uppercase, 1 lowercase, 1 digit, 1 special character
        return regex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formErrors = {};

        // Mobile number validation
        if (!validateMobileNo(formData.mobileNo)) {
            formErrors.mobileNo = "Invalid mobile number format.";
        }

        // Password validation
        if (!validatePassword(formData.password)) {
            formErrors.password = "Password must be at least 5 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
        }

        if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = "Passwords do not match.";
        }

        // PRN number validation for students
        if (formData.userType === "student" && !formData.prnNumber) {
            formErrors.prnNumber = "PRN number is required for students.";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // If there are no errors, proceed with submission
        setType(formData.userType);
        navigate("/login");
        console.log("Form Submitted", formData);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 mt-10">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-5xl flex justify-center items-center text-blue-700 font-bold mb-6">Signup</h1>
                <form onSubmit={handleSubmit} className="max-w-md w-full">
                    {/* Input fields */}
                    {["firstName", "lastName", "mobileNo", "username", "email"].map((field, index) => (
                        <div className="mb-4" key={index}>
                            <input
                                type="text"
                                name={field}
                                placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} // format field name
                                value={formData[field]}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded ${errors[field] ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors[field] && <div className="text-red-500">{errors[field]}</div>}
                        </div>
                    ))}
                    
                    {/* Password Input */}
                    <div className="mb-4">
                        <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
                            required
                        />
                        <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} cursor-pointer`} onClick={() => setShowPassword(!showPassword)}></i>
                        {errors.password && <div className="text-red-500">{errors.password}</div>}
                    </div>

                    {/* Confirm Password Input */}
                    <div className="mb-4">
                        <input
                            type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            required
                        />
                        <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} cursor-pointer`} onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
                        {errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
                    </div>

                    {/* PRN Number Input (conditional rendering) */}
                    {formData.userType === "student" && (
                        <div className="mb-4">
                            <input
                                type="text"
                                name="prnNumber"
                                placeholder="PRN Number"
                                value={formData.prnNumber}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded ${errors.prnNumber ? 'border-red-500' : ''}`}
                                required // Making it required
                            />
                            {errors.prnNumber && <div className="text-red-500">{errors.prnNumber}</div>}
                        </div>
                    )}

                    <div className="mb-4">
                        <label>
                            User Type:
                            <select
                                name="userType"
                                value={formData.userType}
                                onChange={handleChange}
                                className="ml-2 border rounded"
                            >
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                            </select>
                        </label>
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Signup
                        </button>
                    </div>
                    <div>
                        <p>
                            Already have an account?{" "}
                            <span
                                className="text-blue-500 cursor-pointer"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;