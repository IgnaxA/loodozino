import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const StudentProfile = () => {
  const [login, setLogin] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [course, setCourse] = useState('');
  const [admissionYear, setAdmissionYear] = useState('');
  const [socials, setSocials] = useState('');
  const [studyProgram, setStudyProgram] = useState([]);
  const [studyProgramId, setStudyProgramId] = useState(''); 
  const [degreeLevel, setDegreeLevel] = useState([]);
  const [degreeLevelId, setDegreeLevelId] = useState(''); 
  const [scientificSupervisor, setScientificSupervisor] = useState([]);
  const [scientificSupervisorLogin, setScientificSupervisorLogin] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      fetch('/api/profileservice/students/get', {
        method: 'GET',
        headers: {
          token: `${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных пользователя');
        }
      })
      .then(data => {
        setLogin(data.login);
        setFullName(data.fullName || '');
        setPhoneNumber(data.phoneNumber || '');
        setCourse(data.course || '');
        setAdmissionYear(data.admissionYear || '');
        setSocials(data.socials || '');
        setStudyProgramId(data.studyProgramId);
        setDegreeLevelId(data.degreeLevelId);
        setScientificSupervisorLogin(data.teacherLogin);
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setErrorMessage('Ошибка загрузки данных');
      });

      // Запрос на получение данных для выпадающего списка "образовательная программа"
      fetch('/api/profileservice/study-programs/get-all', {
        method: 'GET',
        headers: {
          token: `${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных образовательных программ');
        }
      })
      .then(data => {
        if (data.length > 0) { // Проверка на пустой массив
          setStudyProgram(data.map(program => program.name));
        } else {
          setStudyProgram(['Нет данных']); // Заменяем на текст
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setErrorMessage('Ошибка загрузки данных образовательных программ');
      });

      // Запрос на получение данных для выпадающего списка "статус обучения"
      fetch('/api/profileservice/degree-levels/get-all', {
        method: 'GET',
        headers: {
          token: `${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных статусов обучения');
        }
      })
      .then(data => {
        setDegreeLevel(data.map(level => level.name));
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setErrorMessage('Ошибка загрузки данных статусов обучения');
      });

      // Запрос на получение данных для выпадающего списка "научный руководитель"
      fetch('/api/profileservice/teachers/get-all', {
        method: 'GET',
        headers: {
          token: `${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных преподавателей');
        }
      })
      .then(data => {
        setScientificSupervisor(data.map(teacher => teacher.fullName));
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setErrorMessage('Ошибка загрузки данных преподавателей');
      });
    }
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const response = await fetch('/api/profileservice/students/edit', {
        method: 'POST',
        headers: {
          token: `${Cookies.get('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName || null, // Установка null, если поле пустое
          phoneNumber: phoneNumber || null,
          studyProgramId: studyProgramId || null, 
          degreeLevelId: degreeLevelId || null, 
          course: course ? parseInt(course, 10) : null, // Преобразование в число, если не пустое
          admissionYear: admissionYear ? parseInt(admissionYear, 10) : null, 
          socials: socials || null,
          teacherLogin: scientificSupervisorLogin || null,
        }),
      });

      if (response.ok) {
        // ... обработка успешного сохранения ...
        navigate('/student'); // Возврат на календарь ученика
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Ошибка сохранения данных');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setErrorMessage('Ошибка сервера');
    }
  };

  return (
    <div className="profile-container">
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
      <form onSubmit={handleSave}>
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
          <label htmlFor="course">Курс:</label>
          <input
            type="number"
            id="course"
            className="form-control"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="admissionYear">Год поступления:</label>
          <input
            type="number"
            id="admissionYear"
            className="form-control"
            value={admissionYear}
            onChange={(e) => setAdmissionYear(e.target.value)}
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
          <label htmlFor="studyProgram">Образовательная программа:</label>
          <select
            id="studyProgram"
            className="form-control"
            value={studyProgramId}
            onChange={(e) => setStudyProgramId(e.target.value)}
          >
            <option value="">Выберите программу</option>
            {studyProgram.map((program, index) => (
              <option key={index} value={program.id}>
                {program.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="degreeLevel">Статус обучения:</label>
          <select
            id="degreeLevel"
            className="form-control"
            value={degreeLevelId}
            onChange={(e) => setDegreeLevelId(e.target.value)}
          >
            <option value="">Выберите статус</option>
            {degreeLevel.map((level, index) => (
              <option key={index} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="scientificSupervisor">Научный руководитель:</label>
          <select
            id="scientificSupervisor"
            className="form-control"
            value={scientificSupervisorLogin}
            onChange={(e) => setScientificSupervisorLogin(e.target.value)}
          >
            <option value="">Выберите руководителя</option>
            {scientificSupervisor.map((supervisor, index) => (
              <option key={index} value={supervisor.login}>
                {supervisor.fullName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success">
          Сохранить изменения
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/student')}>
          Назад
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;