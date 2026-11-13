import { useState, useEffect } from 'react';
import { FileText, Download } from 'lucide-react';
import api from '../services/api';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ eventId: '', amount: '' });

  const fetchData = async () => {
    const invRes = await api.get('/invoices');
    const evtRes = await api.get('/events');
    setInvoices(invRes.data);
    setEvents(evtRes.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    await api.post('/invoices', formData);
    setFormData({ eventId: '', amount: '' });
    fetchData();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Invoices & Billing</h1>
      
      {/* Generate Invoice Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
        <h2 className="text-lg font-bold mb-4">Generate New Invoice</h2>
        <form onSubmit={handleGenerate} className="flex flex-wrap gap-4">
          <select required value={formData.eventId} onChange={e => setFormData({...formData, eventId: e.target.value})} className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">-- Select Event --</option>
            {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
          </select>
          <input type="number" placeholder="Amount (KSH)" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium">Generate Invoice</button>
        </form>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm border-b">
            <tr><th className="px-6 py-4">Invoice #</th><th className="px-6 py-4">Event</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium flex items-center gap-2"><FileText size={16} className="text-slate-400" /> INV-{inv.id}</td>
                <td className="px-6 py-4">{inv.event.title}</td>
                <td className="px-6 py-4 font-medium">KSH {inv.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{inv.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}