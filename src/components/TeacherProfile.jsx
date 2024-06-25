import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const TeacherProfile = () => {
  const [login, setLogin] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [position, setPosition] = useState('');
  const [socials, setSocials] = useState('');
  const [onlineLocations, setOnlineLocations] = useState([]);
  const [offlineLocations, setOfflineLocations] = useState([]);
  const [students, setStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      // Запрос на получение данных преподавателя
      fetch('/api/profileservice/teachers/get', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных преподавателя');
        }
      })
      .then(data => {
        setLogin(data.login);
        setFullName(data.fullName || '');
        setPhoneNumber(data.phoneNumber || '');
        setPosition(data.position || '');
        setSocials(data.socials || '');
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setErrorMessage('Ошибка загрузки данных преподавателя');
      });

      // Запрос на получение данных для выпадающего списка "онлайн место встречи"
      fetch('/api/profileservice/meeting-places/get-all-by-teacher?offline=false', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

      // Запрос на получение данных для выпадающего списка "оффлайн место встречи"
      fetch('/api/profileservice/meeting-places/get-all-by-teacher?offline=true', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

      // Запрос на получение списка студентов
      fetch('/api/profileservice/students/get-all', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных студентов');
        }
      })
      .then(data => {
        setStudents(data.filter(student => student.teacherLogin === login).map(student => student.fullName));
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setErrorMessage('Ошибка загрузки данных студентов');
      });
    }
  }, []);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isLocationModalType, setIsLocationModalType] = useState(null); // "add" or "delete"
  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [selectedLocationDescription, setSelectedLocationDescription] = useState(''); 
  const [newLocationDescription, setNewLocationDescription] = useState('');

  const handleAddLocation = (offline) => {
    setIsLocationModalOpen(true);
    setIsLocationModalType('add');
    setSelectedLocationId('');
    setNewLocationDescription('');
    setIsLocationModalType(offline); // Устанавливаем тип локации (offline или online)
  };

  const handleDeleteLocation = (locationId, locationDescription) => {
    setIsLocationModalOpen(true);
    setIsLocationModalType('delete');
    setSelectedLocationId(locationId);
    setSelectedLocationDescription(locationDescription); 
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      // Сохранение изменений в профиле преподавателя
      const response = await fetch('/api/profileservice/teachers/edit', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          fullName,
          phoneNumber,
          position,
          socials,
        }),
      });

      if (response.ok) {
        // ... обработка успешного сохранения ...
        navigate('/teacher'); 
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Ошибка сохранения данных');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setErrorMessage('Ошибка сервера');
    }
  };

  const handleConfirmLocation = async (event, type) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      if (type === 'add') {
        // Создание новой локации
        const response = await fetch('/api/profileservice/meeting-places/create', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: newLocationDescription,
            priority: false, 
            offline: isLocationModalType, // Используем isLocationModalType
            teacherLogin: login,
          }),
        });

        if (response.ok) {
          // ... обработка успешного создания ...
          setIsLocationModalOpen(false);
          // Обновить список локаций после создания
          fetch('/api/profileservice/meeting-places/get-all-by-teacher?offline=' + isLocationModalType, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${Cookies.get('access_token')}`,
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
            if (isLocationModalType) {
              setOfflineLocations(data.map(location => location.description));
            } else {
              setOnlineLocations(data.map(location => location.description));
            }
          })
          .catch(error => {
            console.error('Ошибка:', error);
            setErrorMessage('Ошибка загрузки данных онлайн мест встреч');
          });
        } else {
          const data = await response.json();
          setErrorMessage(data.message || 'Ошибка создания локации');
        }
      } else if (type === 'delete') {
        // Удаление локации
        const response = await fetch('/api/profileservice/meeting-places/delete', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: selectedLocationId,
          }),
        });

        if (response.ok) {
          // ... обработка успешного удаления ...
          setIsLocationModalOpen(false);
          // Обновить список локаций после удаления
          fetch('/api/profileservice/meeting-places/get-all-by-teacher?offline=' + (selectedLocationDescription.toLowerCase().includes("оффлайн") ? true : false), {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${Cookies.get('access_token')}`,
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
            if (selectedLocationDescription.toLowerCase().includes("оффлайн")) {
              setOfflineLocations(data.map(location => location.description));
            } else {
              setOnlineLocations(data.map(location => location.description));
            }
          })
          .catch(error => {
            console.error('Ошибка:', error);
            setErrorMessage('Ошибка загрузки данных онлайн мест встреч');
          });
        } else {
          const data = await response.json();
          setErrorMessage(data.message || 'Ошибка удаления локации');
        }
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setErrorMessage('Ошибка сервера');
    }
  };

  const handleCancelLocation = () => {
    setIsLocationModalOpen(false);
  };

  return (
    <div className="profile-container">
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
      <form onSubmit={handleSaveChanges}>
        <div className="form-group">
          <label htmlFor="fullName">ФИО:</label>
          <input
            type="text"
            id="fullName"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Номер телефона:</label>
          <input
            type="tel"
            id="phoneNumber"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Должность:</label>
          <input
            type="text"
            id="position"
            className="form-control"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="socials">Социальные сети:</label>
          <input
            type="text"
            id="socials"
            className="form-control"
            value={socials}
            onChange={(e) => setSocials(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="onlineLocation">Онлайн место встречи:</label>
          <select
            id="onlineLocation"
            className="form-control"
            value={onlineLocations[0]} // Базовый выбор
            onChange={(e) => console.log('Изменен онлайн локация', e.target.value)} // Добавьте обработку
          >
            <option value="">Выберите место</option>
            {onlineLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
          <button onClick={() => handleAddLocation(false)} className="btn btn-success">
            +
          </button>
          <button onClick={() => handleDeleteLocation()} className="btn btn-danger">
            -
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="offlineLocation">Оффлайн место встречи:</label>
          <select
            id="offlineLocation"
            className="form-control"
            value={offlineLocations[0]} // Базовый выбор
            onChange={(e) => console.log('Изменен оффлайн локация', e.target.value)} // Добавьте обработку
          >
            <option value="">Выберите место</option>
            {offlineLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
          <button onClick={() => handleAddLocation(true)} className="btn btn-success">
            +
          </button>
          <button onClick={() => handleDeleteLocation()} className="btn btn-danger">
            -
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="students">Студенты:</label>
          <div className="slider-container">
            {students.length > 0 ? (
              <div className="student-slider">
                {students.map((student, index) => (
                  <span key={index}>{student}</span>
                ))}
              </div>
            ) : (
              <span>Студентов нет</span>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Сохранить изменения
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/teacher')}>
          Назад
        </button>
      </form>
      {isLocationModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancelLocation}>
              ×
            </span>
            {isLocationModalType === 'add' ? (
              <form onSubmit={(event) => handleConfirmLocation(event, 'add')}>
                <div className="form-group">
                  <label htmlFor="newLocationDescription">Описание:</label>
                  <input
                    type="text"
                    id="newLocationDescription"
                    className="form-control"
                    value={newLocationDescription}
                    onChange={(e) => setNewLocationDescription(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Создать
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancelLocation}>
                  Отмена
                </button>
              </form>
            ) : (
              <form onSubmit={(event) => handleConfirmLocation(event, 'delete')}>
                <select
                  id="selectedLocation"
                  className="form-control"
                  value={selectedLocationId}
                  onChange={(e) => setSelectedLocationId(e.target.value)}
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
                <button type="submit" className="btn btn-danger">
                  Удалить
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancelLocation}>
                  Отмена
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;