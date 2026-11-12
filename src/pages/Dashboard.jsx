import { useState, useEffect } from 'react';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [userName, setUserName] = useState('Admin'); // Default to Admin

  useEffect(() => {
    // 1. Safely get user from local storage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.name) {
          setUserName(parsedUser.name);
        }
      }
    } catch (error) {
      console.error("Corrupted user data in localStorage");
    }

    // 2. Fetch events safely
    api.get('/events')
      .then(res => setEvents(res.data))
      .catch(err => console.log("No events found or API error:", err));
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back, {userName}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            {userName.charAt(0)}
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-emerald-100"><DollarSign className="text-emerald-500" /></div>
          <div><p className="text-sm text-slate-500 font-medium">Total Revenue</p><h3 className="text-2xl font-bold text-slate-800">KSH 2.4M</h3></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-100"><Calendar className="text-blue-500" /></div>
          <div><p className="text-sm text-slate-500 font-medium">Active Events</p><h3 className="text-2xl font-bold text-slate-800">{events.length}</h3></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-indigo-100"><Users className="text-indigo-500" /></div>
          <div><p className="text-sm text-slate-500 font-medium">Total Clients</p><h3 className="text-2xl font-bold text-slate-800">45</h3></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-purple-100"><TrendingUp className="text-purple-500" /></div>
          <div><p className="text-sm text-slate-500 font-medium">Growth</p><h3 className="text-2xl font-bold text-slate-800">+15%</h3></div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Recent Events</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-medium">Event Title</th>
              <th className="px-6 py-4 font-medium">Venue</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.length === 0 ? (
              <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">No events found. Add some in the database!</td></tr>
            ) : (
              events.map((event) => (
                <tr key={event.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{event.title}</td>
                  <td className="px-6 py-4 text-slate-600">{event.venue}</td>
                  <td className="px-6 py-4 text-slate-600">{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      event.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>{event.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}