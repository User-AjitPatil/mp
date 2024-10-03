import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-5xl text-blue-700 flex justify-center items-center font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

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
            onClick={handleSubmit}
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

