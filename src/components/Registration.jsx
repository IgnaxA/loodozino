import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    // Получаем данные о браузере и IP
    const userAgent = navigator.userAgent;
    const ip = await fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => data.ip);

    try {
      const response = await fetch('/api/authservice/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email, // Логин входа
          password, // Пароль у будущего пользователя
          device: userAgent, // Инфа о браузере
          ip, // IP адрес пользователя
          authorizeDate: new Date().toLocaleDateString(), // Текущая дата
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('refresh_token', data.refresh_token);
        Cookies.set('access_token', data.access_token);
        // Установка access_level 
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
        <a href="/login" className="btn btn-secondary">
          Вход
        </a>
      </div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Логин:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Закончить регистрацию
        </button>
      </form>
    </div>
  );
};

export default Registration;