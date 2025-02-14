import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      
      // Redirect to dashboard or login
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 w-96">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Register</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="relative my-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-5 scale-75 top-2 left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100">
              Your Name
            </label>
          </div>
          <div className="relative my-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-5 scale-75 top-2 left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100">
              Your Email
            </label>
          </div>
          <div className="relative my-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-5 scale-75 top-2 left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100">
              Enter Password
            </label>
          </div>
          <div className="relative my-4">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-5 scale-75 top-2 left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100">
              Confirm Password
            </label>
          </div>
          <button
            className="w-full mb-4 mt-6 rounded-full bg-white text-blue-400 hover:bg-blue-600 hover:text-white py-2 transition-colors duration-300"
            type="submit"
          >
            Register
          </button>
          <div>
            <span className="text-white">
              Already have an account?{' '}
              <Link className="text-blue-500" to="/login">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;