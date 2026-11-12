import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/events').then(res => setEvents(res.data)).catch(console.error);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">All Events</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm border-b">
            <tr>
              <th className="px-6 py-4">Event Title</th>
              <th className="px-6 py-4">Venue</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">{event.title}</td>
                <td className="px-6 py-4">{event.venue}</td>
                <td className="px-6 py-4">{new Date(event.eventDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">{event.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}