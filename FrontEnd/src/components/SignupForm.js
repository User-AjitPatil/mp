import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ setType }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        Mobile_NO: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "student",
        PRN: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateMobileNo = (Mobile_NO) => {
        const regex = /^\+?\d{10,15}$/;
        return regex.test(Mobile_NO);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSignup = async () => {
        let formErrors = {};

        if (!validateMobileNo(formData.Mobile_NO)) {
            formErrors.Mobile_NO = "Invalid mobile number format.";
        }
        if (!validatePassword(formData.password)) {
            formErrors.password = "Password must be at least 6 characters long.";
        }
        if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = "Passwords do not match.";
        }
        if (formData.userType === "student" && !formData.PRN) {
            formErrors.PRN = "PRN number is required for students.";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const endpoint = formData.userType === "student" 
            ? "http://localhost:5000/api/v1/student/auth/signup" 
            : "http://localhost:5000/api/v1/admin/auth/signup";

        try {
            console.log("Form Data:", formData); // Add this line before the fetch call
            console.log("formData.userType=>",formData.userType);
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("data=>",data);
            if (!data.success) {
                throw new Error("Signup failed.");
            }

            if (setType) {
                setType(formData.userType);
            }
            navigate("/login");
        } catch (error) {
            console.error("Error:", error);
            setErrors({ submit: "Signup failed. Please try again." });
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 mt-10">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-5xl flex justify-center items-center text-blue-700 font-bold mb-6">Signup</h1>
                <div className="max-w-md w-full">
                    {/* Input fields */}
                    {["firstname", "lastname", "Mobile_NO", "username", "email"].map((field, index) => (
                        <div className="mb-4" key={index}>
                            <input
                                type="text"
                                name={field}
                                placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
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
                            type={showPassword ? "text" : "password"}
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
                            type={showConfirmPassword ? "text" : "password"}
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

                    {/* PRN Number Input */}
                    {formData.userType === "student" && (
                        <div className="mb-4">
                            <input
                                type="text"
                                name="PRN"
                                placeholder="PRN Number"
                                value={formData.PRN}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded ${errors.PRN ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.PRN && <div className="text-red-500">{errors.PRN}</div>}
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
                        <button 
                            type="button"
                            onClick={handleSignup}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
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
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
