import { useState } from 'react';
import { LogOut, Clock, Upload } from 'lucide-react';

export default function VendorPortal() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Mock tasks (We will connect this to the database later)
  const [tasks, setTasks] = useState([
    { id: 1, event: 'Corporate Gala', task: 'Deliver Sound System', due: '2026-11-20', status: 'TODO' },
    { id: 2, event: 'ABC Wedding', task: 'Setup Microphones', due: '2026-11-25', status: 'IN_PROGRESS' },
  ]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const updateStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-8">
      <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-indigo-900">Vendor Portal</h1>
          <p className="text-slate-500">Welcome, {user.name || 'Vendor'}</p>
        </div>
        <button onClick={handleLogout} className="text-red-500 font-medium hover:text-red-700 flex items-center gap-2">
          <LogOut size={20} /> Logout
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map(task => (
          <div key={task.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-800">{task.task}</h3>
                <p className="text-indigo-600 font-medium text-sm">Event: {task.event}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                task.status === 'DONE' ? 'bg-emerald-100 text-emerald-700' :
                task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {task.status}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
              <Clock size={16} /> Due: {task.due}
            </div>

            <div className="flex gap-4">
              <select
                value={task.status}
                onChange={(e) => updateStatus(task.id, e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
              <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors">
                <Upload size={18} /> Proof
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}