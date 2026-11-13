import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const fetchClients = () => {
    api.get('/clients').then(res => setClients(res.data)).catch(console.error);
  };

  useEffect(() => { fetchClients(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clients', formData);
      setFormData({ name: '', email: '', phone: '' }); // Clear form
      fetchClients(); // Refresh list
    } catch (err) {
      alert("Error adding client. Email might already exist.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Clients Directory</h1>
      
      {/* Add Client Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
        <h2 className="text-lg font-bold mb-4">Add New Client</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
          <input type="text" placeholder="Client Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
          <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
          <input type="text" placeholder="Phone Number" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium">Save Client</button>
        </form>
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm border-b">
            <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Email</th><th className="px-6 py-4">Phone</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">{client.name}</td>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">{client.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}