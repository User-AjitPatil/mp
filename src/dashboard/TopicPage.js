import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const TopicPage = () => {
  const { subject } = useParams();
  const [topics, setTopics] = useState({
    Mathematics: ['Algebra', 'Geometry'],
    Science: ['Physics', 'Biology'],
    History: ['Modern History', 'Ancient History'],
  });
  const [newTopic, setNewTopic] = useState('');

  const addTopic = () => {
    if (newTopic) {
      setTopics((prevTopics) => ({
        ...prevTopics,
        [subject]: [...(prevTopics[subject] || []), newTopic],
      }));
      setNewTopic(''); // Clear input after adding
    }
  };

  return (
    <div className="p-6 bg-gray-50 mt-9 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Topics for {subject}</h1>
      <ul className="list-disc pl-6 mb-4">
        {(topics[subject] || []).map((topic) => (
          <li key={topic}>
            <Link to={`/subjects/notes/${subject}/${topic}`} className="text-blue-500 cursor-pointer">{topic}</Link>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTopic}
        onChange={(e) => setNewTopic(e.target.value)}
        placeholder="Add new topic"
        className="border border-gray-300 p-2 mb-2 rounded"
      />
      <button onClick={addTopic} className="bg-blue-500 text-white px-4 py-2 rounded">Add Topic</button>
      <br/>
      <Link to="/subjects">
                        <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded shadow-lg transition-transform transform ">
                           Go TO Subjects
                        </button>
      </Link>
    </div>
  );
};

export default TopicPage;