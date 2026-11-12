import { LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full p-4">
      <h2 className="text-xl font-bold mb-6">Eventage EMS</h2>
      <nav className="flex-1 space-y-2">
        <Link to="/dashboard" className="flex items-center gap-2 p-2 bg-indigo-600 rounded">
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link to="/events" className="block p-2 hover:bg-slate-800 rounded">Events</Link>
        <Link to="/clients" className="block p-2 hover:bg-slate-800 rounded">Clients</Link>
      </nav>
      <button onClick={handleLogout} className="mt-auto bg-red-600 p-2 rounded">Logout</button>
    </aside>
  );
}