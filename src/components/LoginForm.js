import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // New state for role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Define the endpoint based on the role
    const endpoint = role === 'student' 
      ? 'http://localhost:4000/api/v1/student/auth/login' 
      : 'http://localhost:4000/api/v1/admin/auth/login';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      // Check if the response is ok (status 200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); // Log the response data for debugging

      if (data.success) {
        // Store the token in localStorage
        localStorage.setItem('token', data.Token); // Assuming the token is in data.Token

        // Navigate to the appropriate dashboard based on the role
        navigate(role === 'student' ? '/student-dashboard' : '/admin-dashboard');
      } else {
        // Handle error (e.g., display error message)
        console.error(data.msg);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-5xl text-blue-700 flex justify-center items-center font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          New here? 
          <span 
            className="text-blue-500 cursor-pointer" 
            onClick={() => {navigate("/signup")}}
          >
            Sign Up
          </span>
        </p>

        <p className="text-sm text-center mt-4 cursor-pointer text-blue-500">
          Forgot Password?
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
