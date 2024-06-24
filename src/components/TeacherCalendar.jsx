import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const TeacherCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Дата, для которой открыто окно
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(''); // Выбранная локация
  const [additionalInfo, setAdditionalInfo] = useState(''); 
  const [onlineLocations, setOnlineLocations] = useState([]);
  const [offlineLocations, setOfflineLocations] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Выбранное событие для редактирования
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

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

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      // Запрос на получение событий для текущего месяца и года
      fetch('http://localhost:8078/api/calendarservice/appointments/get-all-by-month-for-teacher', {
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

      // Запрос на получение онлайн локаций
      fetch('http://localhost:8079/api/profileservice/meeting-places/get-all-by-teacher?offline=false', {
        method: 'GET',
        headers: {
          Authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных онлайн мест встреч');
        }
      })
      .then(data => {
        setOnlineLocations(data.map(location => location.description));
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setErrorMessage('Ошибка загрузки данных онлайн мест встреч');
      });

      // Запрос на получение оффлайн локаций
      fetch('http://localhost:8079/api/profileservice/meeting-places/get-all-by-teacher?offline=true', {
        method: 'GET',
        headers: {
          Authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных оффлайн мест встреч');
        }
      })
      .then(data => {
        setOfflineLocations(data.map(location => location.description));
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setErrorMessage('Ошибка загрузки данных оффлайн мест встреч');
      });
    }
  }, [currentMonth, currentYear]);

  const handleEventClick = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
    setIsEventModalOpen(true); 
    setSelectedEvent(null); 
    setSelectedLocation('');
    setAdditionalInfo('');
  };

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedDate(null);
  };

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const response = await fetch('http://localhost:8078/api/calendarservice/appointments/create-for-teacher', {
        method: 'POST',
        headers: {
          Authorization: `${Cookies.get('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
          place: selectedLocation,
          additionalInfo: additionalInfo,
        }),
      });

      if (response.ok) {
        // Обновить список событий
        fetch('http://localhost:8078/api/calendarservice/appointments/get-all-by-month-for-teacher', {
          method: 'POST',
          headers: {
            Authorization: `${Cookies.get('access_token')}`,
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
        handleCloseEventModal(); 
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Ошибка создания события');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setErrorMessage('Ошибка сервера');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    setErrorMessage(null);

    try {
      const response = await fetch('http://localhost:8078/api/calendarservice/appointments/edit-for-teacher', {
        method: 'POST',
        headers: {
          Authorization: `${Cookies.get('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: eventId,
        }),
      });

      if (response.ok) {
        // Обновить список событий
        fetch('http://localhost:8078/api/calendarservice/appointments/get-all-by-month-for-teacher', {
          method: 'POST',
          headers: {
            Authorization: `${Cookies.get('access_token')}`,
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
        handleCloseEventModal();
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Ошибка удаления события');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setErrorMessage('Ошибка сервера');
    }
  };

  const handleUpdateEvent = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const response = await fetch('http://localhost:8078/api/calendarservice/appointments/create-for-teacher', {
        method: 'POST',
        headers: {
          Authorization: `${Cookies.get('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedEvent.id,
          date: selectedDate,
          place: selectedLocation,
          additionalInfo: additionalInfo,
        }),
      });

      if (response.ok) {
        // Обновить список событий
        fetch('http://localhost:8078/api/calendarservice/appointments/get-all-by-month-for-teacher', {
          method: 'POST',
          headers: {
            Authorization: `${Cookies.get('access_token')}`,
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
        handleCloseEventModal();
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Ошибка обновления события');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setErrorMessage('Ошибка сервера');
    }
  };

  return (
    <div className="calendar-container">
      <div className="header">
        <Link to="/teacher/profile" className="btn btn-secondary">
          Профиль
        </Link>
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
                onClick={() => handleEventClick(day)}
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
      {isEventModalOpen && (
        <div className="event-modal">
          <div className="event-modal-content">
            <span className="close" onClick={handleCloseEventModal}>
              ×
            </span>
            {selectedEvent ? ( 
              <>
                <div className="event-info">
                  <p>Дата: {new Date(selectedEvent.meetingDate).toLocaleDateString()}</p>
                  <p>Место: {selectedEvent.place}</p>
                  <p>Дополнительная информация: {selectedEvent.additionalInfo}</p>
                </div>
                <button onClick={() => handleDeleteEvent(selectedEvent.id)} className="btn btn-danger">
                  Удалить
                </button>
                <button onClick={() => setSelectedEvent(null)} className="btn btn-secondary">
                  Изменить
                </button>
              </>
            ) : (
              <form onSubmit={handleCreateEvent}>
                <div className="form-group">
                  <label htmlFor="selectedLocation">Место:</label>
                  <select
                    id="selectedLocation"
                    className="form-control"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">Выберите место</option>
                    {onlineLocations.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                    {offlineLocations.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="additionalInfo">Описание:</label>
                  <textarea
                    id="additionalInfo"
                    className="form-control"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Создать
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseEventModal}>
                  Отменить
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCalendar;