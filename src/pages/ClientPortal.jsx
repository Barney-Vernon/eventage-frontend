import { LogOut, FileText, CheckCircle2 } from 'lucide-react';

export default function ClientPortal() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Mock data
  const event = { title: 'Corporate Gala 2026', progress: 65, status: 'CONFIRMED' };
  const invoices = [
    { id: 101, amount: 150000, status: 'UNPAID' }
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-8">
      <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-indigo-900">Client Portal</h1>
          <p className="text-slate-500">Welcome, {user.name || 'Client'}</p>
        </div>
        <button onClick={handleLogout} className="text-red-500 font-medium hover:text-red-700 flex items-center gap-2">
          <LogOut size={20} /> Logout
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Progress */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-2">{event.title}</h2>
          <p className="text-slate-500 mb-6">Status: <span className="font-bold text-indigo-600">{event.status}</span></p>
          
          <div className="mb-2 flex justify-between text-sm text-slate-600 font-medium">
            <span>Progress</span>
            <span>{event.progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div className="bg-indigo-600 h-3 rounded-full" style={{ width: `${event.progress}%` }}></div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-emerald-500" /> Venue Booked</div>
            <div className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-emerald-500" /> Equipment Assigned</div>
            <div className="flex items-center gap-2 text-sm text-slate-400"><div className="w-4 h-4 rounded-full border-2 border-slate-300"></div> Catering Setup</div>
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Your Invoices</h2>
          {invoices.map(inv => (
            <div key={inv.id} className="border border-slate-100 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold flex items-center gap-2 text-slate-700"><FileText size={18} /> INV-{inv.id}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">{inv.status}</span>
                </div>
                <p className="text-2xl font-bold text-slate-800 mb-4">KSH {inv.amount.toLocaleString()}</p>
                <button className="w-full bg-emerald-500 text-white font-bold py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                  Pay with M-Pesa
                </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}