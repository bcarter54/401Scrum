import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://localhost:7077/api/auth/login',
        {
          username,
          password,
        }
      );

      alert(response.data); // Will say "Login successful!"
      setError('');
      // You can also redirect the user or save a token here if you add one later
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError(err.response.data); // will show "Invalid username or password."
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-content">
      <div className="auth-content-inner">
        <form
          onSubmit={handleLogin}
          className="ion-form o-form o-form-edit-mode"
        >
          <h2>Sign In</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <label htmlFor="username">Username</label>
            <br />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
