import { LayoutDashboard, Calendar, Users, Box, FileText, Settings, LogOut, PlusCircle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  // Get the user data to check their role
  const userStr = localStorage.getItem('user');
  const user = userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;
  const isAdmin = user?.role === 'ADMIN';

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/'; 
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full">
      <div className="h-16 flex items-center px-6 text-white font-bold text-xl border-b border-slate-800">
        Eventage <span className="text-indigo-400 ml-1">EMS</span>
      </div>
      
      <nav className="flex-1 py-4 px-3 space-y-1">
        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 rounded-lg transition-colors">
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        
        <Link to="/create-event" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 rounded-lg transition-colors">
          <PlusCircle size={20} /> Create Event
        </Link>
        
        <Link to="/events" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 rounded-lg transition-colors">
          <Calendar size={20} /> Events
        </Link>
        
        <Link to="/clients" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 rounded-lg transition-colors">
          <Users size={20} /> Clients
        </Link>
        
        <Link to="/inventory" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 rounded-lg transition-colors">
          <Box size={20} /> Inventory
        </Link>
        
        {/* ONLY ADMIN CAN SEE INVOICES */}
        {isAdmin && (
          <Link to="/invoices" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 rounded-lg transition-colors">
            <FileText size={20} /> Invoices
          </Link>
        )}

        {/* ONLY ADMIN CAN SEE USER MANAGEMENT */}
        {isAdmin && (
          <Link to="/users" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 rounded-lg transition-colors">
            <ShieldAlert size={20} /> User Management
          </Link>
        )}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        {/* ONLY ADMIN CAN SEE SETTINGS */}
        {isAdmin && (
          <Link to="/settings" className="flex items-center gap-3 px-3 py-2 w-full text-left hover:bg-slate-800 rounded-lg transition-colors">
            <Settings size={20} /> Settings
          </Link>
        )}
        
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}