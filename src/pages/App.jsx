import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    // Connect to the backend URL
    axios.get('http://localhost:5000/api/test')
      .then(response => {
        // If successful, update the state with the backend's message
        setMessage(response.data.message);
      })
      .catch(error => {
        // If there's an error, show it
        console.error(error);
        setMessage('Error connecting to backend. Is it running?');
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Eventage Solutions EMS</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Backend Status:</h2>
        <p className="text-green-600 font-bold">{message}</p>
      </div>
    </div>
  );
}

export default App;