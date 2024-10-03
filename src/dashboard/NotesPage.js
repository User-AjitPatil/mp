import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Ensure you have axios installed
import { Link } from 'react-router-dom';
const NotesPage = () => {
  const { subject, topic } = useParams(); // Get subject and topic from route params
  const [notes, setNotes] = useState({
    Algebra: ['Basic Algebra Notes'],
    Geometry: [],
    Physics: [],
    Biology: [],
    'Modern History': [],
    'Ancient History': [],
  });

  // State to manage new note input
  const [newNote, setNewNote] = useState('');
  const [file, setFile] = useState(null); // State to manage the uploaded file
  const [uploadSuccess, setUploadSuccess] = useState(false); // State to manage upload status

  const addNote = () => {
    // Add new note to the corresponding topic
    if (newNote) {
      setNotes((prevNotes) => ({
        ...prevNotes,
        [topic]: [...(prevNotes[topic] || []), newNote],
      }));
      setNewNote(''); // Clear the input after adding
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file in state
  };

  const handleUpload = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!file) {
      alert('Please select a PDF file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // Append the file to the FormData object

    try {
      // Assuming you have an API endpoint to handle file uploads
      const response = await axios.post('your_api_endpoint/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log(response.data); // Log the response
      setUploadSuccess(true); // Set upload status
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 mt-9 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Notes for {topic} in {subject}</h1>

      {/* <ul className="list-disc pl-6 mb-4">
        {(notes[topic] || []).map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>

      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Add new note"
        className="border border-gray-300 p-2 mb-2 rounded"
      />
      <button onClick={addNote} className="bg-blue-500 text-white px-4 py-2 rounded">Add Note</button> */}

      <div className="mt-6">
        <h2 className="text-xl mb-2">Upload  Notes</h2>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="border border-gray-300 mb-2 p-2 rounded"
        />
        <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">Upload PDF</button>
        
        {uploadSuccess && <p className="text-green-500 mt-2">File uploaded successfully!</p>}
      </div>
      <br/>
      <Link to={`/subjects/topics/${subject}`} >
                        <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded shadow-lg transition-transform transform ">
                           Go Back To Topics
                        </button>
      </Link>
    </div>
  );
};

export default NotesPage;