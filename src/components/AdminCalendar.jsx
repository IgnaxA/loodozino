import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleLogout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('access_level'); 
    navigate('/login');
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear); 
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); 

    const calendar = [];
    for (let i = 0; i < daysInMonth + firstDay; i++) {
      const day = i - firstDay + 1;
      calendar.push(day > 0 ? day : null);
    }

    return calendar;
  };

  const handleClick = () => {
    const accessToken = Cookies.get('access_token');
    const accessLevel = parseInt(Cookies.get('access_level'), 10); 
    if (accessToken && accessLevel !== null) {
      if (accessLevel === 0) {
        navigate('/admin/profile');
      } else if (accessLevel === 1) {
        navigate('/teacher/profile');
      } else if (accessLevel === 2) {
        navigate('/student/profile');
      }
    }
  };

  return (
    <div className="calendar-container">
      <div className="header">
        <button onClick={handleClick} className="btn btn-secondary">
          Профиль
        </button>
        <h2>
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={handleLogout} className="btn btn-danger">
          Выход
        </button>
      </div>
      <div className="calendar">
        {getCalendarDays().map((day, index) => (
          <div key={index} className="day">
            {day !== null && day}
          </div>
        ))}
      </div>
      <div className="month-controls">
        <button onClick={handlePrevMonth}></button>
        <button onClick={handleNextMonth}></button>
      </div>
    </div>
  );
};

export default AdminCalendar;