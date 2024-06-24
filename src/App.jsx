import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import AdminCalendar from './components/AdminCalendar';
import TeacherCalendar from './components/TeacherCalendar';
import StudentCalendar from './components/StudentCalendar';
// import AdminProfile from './components/AdminProfile';
import StudentProfile from './components/StudentProfile';
import TeacherProfile from './components/TeacherProfile';
import Cookies from 'js-cookie';

function App() {
  const [accessLevel, setAccessLevel] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      fetch('/api/user', { 
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
          throw new Error('Ошибка при получении данных пользователя');
        }
      })
      .then(data => {
        setAccessLevel(data.accessLevel);
        const navigate = useNavigate();
        if (data.accessLevel === 0) {
          navigate('/admin');
        } else if (data.accessLevel === 1) {
          navigate('/teacher');
        } else if (data.accessLevel === 2) {
          navigate('/student');
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
        const navigate = useNavigate();
        navigate('/login'); 
      });
    }
  }, [accessLevel]); 

  return (
    <Router> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/admin" element={<AdminCalendar />} />
        <Route path="/teacher" element={<TeacherCalendar />} />
        <Route path="/student" element={<StudentCalendar />} />
        <Route path="/" element={<Login />} /> 
        <Route path="/teacher/profile" element={<TeacherProfile />} /> 
        <Route path="/student/profile" element={<StudentProfile />} />
      </Routes>
    </Router>
  );
}

export default App;