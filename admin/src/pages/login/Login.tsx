import React, { useEffect, useState } from 'react';
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '24px',
          fontWeight: 600,
          color: 'white',
          backgroundColor: 'darkgray',
          padding: '16px',
          borderRadius: '8px',
        }}
      >
        <p>단순 방문 구경 목적은</p>
        <p>ID: customer</p>
        <p>Password: customer</p>
        <p>입력해주세요</p>
      </div>
    </div>
  );
};

export default Login;
