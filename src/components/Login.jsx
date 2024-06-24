import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const response = await fetch('http://localhost:8081/api/authservice/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('refresh_token', data.refresh_token);
        Cookies.set('access_token', data.access_token);
        // Установка accessLevel 
        Cookies.set('access_level', data.access_level); 
        if (data.access_level === 0) {
          navigate('/admin');
        } else if (data.access_level === 1) {
          navigate('/teacher');
        } else if (data.access_level === 2) {
          navigate('/student');
        }
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Ошибка сервера');
    }
  };

  return (
    <div className="container">
      <div className="button-container">
        <a href="/registration" className="btn btn-secondary">
          Регистрация
        </a>
      </div>
      <h2>Войти</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Логин:</label>
          <input
            type="text"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        <button type="submit" className="btn btn-primary" disabled={!email || !password}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;