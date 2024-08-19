import React, { useState } from 'react';
import { getCSRFToken } from '../utils/getCSRFToken';

function Register() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    interface FormData {
      email: string;
      password: string;
      'password-confirm': string;
    }

    const data: FormData = {
      email: login,
      password,
      'password-confirm': passwordConfirm,
    };

    try {
      const response = await fetch(`${window.location.origin}/create-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCSRFToken()
        } as HeadersInit,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Account created:', result);
      } else {
        console.error('Failed to create account:', response.statusText);
      }
    } catch (error) {
      console.error('Error during account creation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Login:
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
        </label>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
        </label>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Confirm Password:
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Create Account
      </button>
    </form>
  );
}

export default Register;

