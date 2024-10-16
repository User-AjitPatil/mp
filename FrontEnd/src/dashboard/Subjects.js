import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Subjects = () => {
  const [subjects, setSubjects] = useState(['Mathematics', 'Science', 'History']);
  const [newSubject, setNewSubject] = useState('');

  const addSubject = () => {
    if (newSubject) {
      setSubjects([...subjects, newSubject]);
      setNewSubject(''); // Clear input after adding
    }
  };

  return (
    <div className="p-6 bg-gray-50 mt-9 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Subjects Manager</h1>
      <h2 className="text-xl font-semibold">Subjects</h2>
      <ul className="list-disc pl-6 mb-4">
        {subjects.map((subject) => (
          <li key={subject}>
            <Link to={`/subjects/topics/${subject}`} className="text-blue-500 cursor-pointer">{subject}</Link>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newSubject}
        onChange={(e) => setNewSubject(e.target.value)}
        placeholder="Add new subject"
        className="border border-gray-300 p-2 mb-2 rounded"
      />
      <button onClick={addSubject} className="bg-blue-500 text-white px-4 py-2 rounded">Add Subject</button>
      <br/>
      <Link to="/dashboard">
                        <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded shadow-lg transition-transform transform ">
                           Go TO Dashboard
                        </button>
        </Link>
    </div>
  );
};

export default Subjects;