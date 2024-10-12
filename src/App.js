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
import Test from './examsection/StudentTest';
import Result from './examsection/StudentResult';
import AddQuestions from './examsection/AddQuestions';
import TestDetails from './examsection/TestDetails'

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
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/exam' element={type === "student" ? <StudentExamHandler/> : <AdminExamHandler/>} />
        <Route path="/add-questions/:testId" element={<AddQuestions />} />
        <Route path="/test-details/:testId" element={<TestDetails />} />
        <Route path='/subjects' element={<Subjects />} />
        <Route path='/studentsdata' element={<StudentsData />} />
        <Route path="/subjects/topics/:subject" element={<TopicPage />} />
        <Route path="/subjects/notes/:subject/:topic" element={<NotesPage />} />
        <Route path="/createtest" element={<CreateTest />} />
        <Route path="/studentsubjects" element={<StudentSubjects />} />
        <Route path="/topics/:subjectId" element={<StudentTopics />} />
        <Route path="/notes/:topic" element={<StudentNotes />} />
        <Route path="/test/:testId" element={<Test />} />
        <Route path="/result/:testId" element={<Result />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
