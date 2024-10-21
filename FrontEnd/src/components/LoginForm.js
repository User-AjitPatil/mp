import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUserType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // State for role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Define the endpoint based on the role
    const endpoint = role === 'student' 
      ? 'https://mp-4-cr8p.onrender.com/api/v1/student/auth/login' 
      : 'https://mp-4-cr8p.onrender.com/api/v1/admin/auth/login';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log(data);

      if (data.success) {
        // Store the token and user role in localStorage
        localStorage.setItem('token', data.Token); // Store the token
        localStorage.setItem('userRole', role); // Store the user role

        setUserType(role); // Set user type in state
        navigate(role === 'student' ? '/student-dashboard' : '/admin-dashboard');
      } else {
        setError(data.msg || 'Login failed');
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
    } finally {
      setLoading(false);
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

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          New here? 
          <span 
            className="text-blue-500 cursor-pointer" 
            onClick={() => { navigate("/signup"); }}
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
