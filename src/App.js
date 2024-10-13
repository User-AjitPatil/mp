import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import StudentDashboard from './dashboard/StudentDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import Profile from './Profile';
import StudentExamHandler from './examsection/StudentExamHandler';
import AdminExamHandler from './examsection/AdminExamHandler';
import Subjects from './dashboard/Subjects';
import StudentsData from './dashboard/StudentsData';
import TopicPage from './dashboard/TopicPage';
import CreateTest from './examsection/CreateTest';
import StudentTopics from './dashboard/StudentTopics';
import Test from './examsection/StudentTest';
import AddQuestions from './examsection/AddQuestions';
import TestDetails from './examsection/TestDetails';

function App() {
  const [userType, setUserType] = useState(null); // Track user type

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignupForm setUserType={setUserType} />} />
        <Route path='/login' element={<LoginForm setUserType={setUserType} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/student-exams" element={<StudentExamHandler />} />
        <Route path="/admin-exams" element={<AdminExamHandler />} />
        <Route path="/add-questions/:testId" element={<AddQuestions />} />
        <Route path="/test-details/:testId" element={<TestDetails />} />
        <Route path='/subjects' element={<Subjects />} />
        <Route path='/studentsdata' element={<StudentsData />} />
        <Route path="/subjects/topics/:subject" element={<TopicPage />} />
        <Route path="/createtest" element={<CreateTest />} />
        <Route path="/topics/:subjectId" element={<StudentTopics />} />
        <Route path="/test/:testId" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
