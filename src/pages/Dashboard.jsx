import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Fetch events from backend
    api.get('/events')
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Eventage EMS</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="text-red-500 font-bold hover:underline">Logout</button>
        </div>
      </nav>

      <div className="p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          {events.length === 0 ? <p className="text-gray-500">No events found in database.</p> : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-3">Event Title</th>
                  <th className="p-3">Venue</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{event.title}</td>
                    <td className="p-3">{event.venue}</td>
                    <td className="p-3">{new Date(event.eventDate).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">{event.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}