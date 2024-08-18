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
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Login:
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Confirm Password:
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Create Account</button>
    </form>
  );
}

export default Register;
