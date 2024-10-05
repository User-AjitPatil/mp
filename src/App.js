import logo from './logo.svg';
import './App.css';
import Subjects from './dashboard/Subjects';
import { BrowserRouter,Route , Routes } from 'react-router-dom';
import Header from "./components/header/Header";
import Home from "./components/home/Home"
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import { useState } from 'react';
import StudentDashboard from './dashboard/StudentDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import Profile from './Profile';
import StudentExamHandler from './examsection/StudentExamHandler';
import AdminExamHandler from './examsection/AdminExamHandler';
import StudentsData from './dashboard/StudentsData';
import NotesPage from "./dashboard/NotesPage";
import TopicPage from './dashboard/TopicPage';
import CreateTest from './examsection/CreateTest';
import StudentNotes from './dashboard/StudentNotes';
import StudentSubjects from './dashboard/StudentSubjects';
import StudentTopics from './dashboard/StudentTopics';
function App() {
  const [type, setType] = useState(null);
  return (
    <div>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignupForm setType={setType} />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/dashboard' element={type === "student" ? <StudentDashboard /> : <AdminDashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/exam' element={type === "student" ? <StudentExamHandler/> : <AdminExamHandler/>} />
        <Route path='/subjects' element={<Subjects />} />
        <Route path='/studentsdata' element={<StudentsData />} />
        <Route path="/subjects/topics/:subject" element={<TopicPage />} />
        <Route path="/subjects/notes/:subject/:topic" element={<NotesPage />} />
        <Route path="/createtest" element={<CreateTest />} />
        <Route path="/studentsubjects" element={<StudentSubjects />} />
        <Route path="/topics/:subjectId" element={<StudentTopics />} />
        <Route path="/notes/:topic" element={<StudentNotes />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
