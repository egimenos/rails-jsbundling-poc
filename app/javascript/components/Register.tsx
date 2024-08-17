import React, { useState } from 'react';

function Register() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    interface FormData {
      login: string;
      password: string;
      'password-confirm': string;
    }

    const data: FormData = {
      login,
      password,
      'password-confirm': passwordConfirm,
    };

    try {
      const response = await fetch('http://127.0.0.1:3000/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
