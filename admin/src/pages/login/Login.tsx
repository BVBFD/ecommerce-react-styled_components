import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/apiCalls';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      login(dispatch, { username, password });
    } catch (error) {
      window.alert(error);
      return;
    }
    navigate('/');
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type='text'
        placeholder='username'
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type='password'
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleClick}
        style={{
          padding: 10,
          width: 100,
          cursor: 'pointer',
          background: 'darkRed',
          color: 'white',
          fontSize: '16px',
          fontWeight: '600',
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
