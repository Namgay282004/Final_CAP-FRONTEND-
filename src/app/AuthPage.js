// src/app/AuthPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AuthPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.data.success) {
        // Login successful, redirect to chat page
        router.push('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="p-6 bg-gray-200 rounded shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium">Username</label>
          <input
            type="text"
            id="username"
            className="w-full border rounded px-3 py-2 mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block font-medium">Password</label>
          <input
            type="password"
            id="password"
            className="w-full border rounded px-3 py-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">Login</button>
      </form>
    </div>
  );
};

export default AuthPage;
