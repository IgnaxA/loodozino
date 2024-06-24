import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const StudentCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); 
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

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      // Запрос на получение событий для текущего месяца и года
      fetch('http://localhost:8078/api/calendarservice/appointments/get-all-by-month-for-student', {
        method: 'POST',
        headers: {
          Authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          month: currentMonth,
          year: currentYear,
        }),
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных событий');
        }
      })
      .then(data => {
        setEvents(data);
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setErrorMessage('Ошибка загрузки данных событий');
      });
    }
  }, [currentMonth, currentYear]); 

  const handleCloseEventModal = () => {
    setSelectedEvent(null);
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
            {day !== null && (
              <button
                onClick={() => handleEventClick(events.find(event => event.meetingDate.getDate() === day))}
                className="event-button"
                style={{ backgroundColor: events.some(event => event.meetingDate.getDate() === day) ? '#148C07' : 'transparent' }}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="month-controls">
        <button onClick={handlePrevMonth}></button> 
        <button onClick={handleNextMonth}></button> 
      </div>
      {selectedEvent && (
        <div className="event-modal">
          <div className="event-modal-content">
            <span className="close" onClick={handleCloseEventModal}>
              ×
            </span>
            <div className="event-info">
              <p>Дата: {new Date(selectedEvent.meetingDate).toLocaleDateString()}</p>
              <p>Место: {selectedEvent.place}</p>
              <p>Дополнительная информация: {selectedEvent.additionalInfo}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCalendar;