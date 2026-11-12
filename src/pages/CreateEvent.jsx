import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CreateEvent() {
  const navigate = useNavigate();
  
  // Form State
  const [title, setTitle] = useState('');
  const [venue, setVenue] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [clientId, setClientId] = useState('');
  
  // Dropdown Data State
  const [clients, setClients] = useState([]);
  const [availableResources, setAvailableResources] = useState([]);
  
  // Dynamic Resource Selection State
  const [selectedResources, setSelectedResources] = useState([
    { resourceId: '', quantity: 1 }
  ]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch clients and resources when page loads
  useEffect(() => {
    api.get('/clients').then(res => setClients(res.data)).catch(console.error);
    api.get('/resources').then(res => setAvailableResources(res.data)).catch(console.error);
  }, []);

  // Handle adding/removing resources
  const handleResourceChange = (index, field, value) => {
    const updated = [...selectedResources];
    updated[index][field] = value;
    setSelectedResources(updated);
  };

  const addResourceRow = () => {
    setSelectedResources([...selectedResources, { resourceId: '', quantity: 1 }]);
  };

  const removeResourceRow = (index) => {
    const updated = selectedResources.filter((_, i) => i !== index);
    setSelectedResources(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Clean up resource data before sending
      const cleanedResources = selectedResources
        .filter(r => r.resourceId !== '' && r.quantity > 0)
        .map(r => ({ resourceId: parseInt(r.resourceId), quantity: parseInt(r.quantity) }));

      await api.post('/events', {
        title,
        venue,
        eventDate,
        clientId: parseInt(clientId),
        resources: cleanedResources
      });

      // Redirect back to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      // Catch the error from our backend conflict detection
      setError(err.response?.data?.message || 'Failed to create event. Check resource availability.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Create New Event</h1>
        <p className="text-slate-500">Plan a new event and assign inventory.</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-6">
        
        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Event Title</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Corporate Gala" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Venue</label>
            <input type="text" required value={venue} onChange={(e) => setVenue(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Safari Park Hotel" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Event Date</label>
            <input type="date" required value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Select Client</label>
            <select required value={clientId} onChange={(e) => setClientId(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="">-- Choose a Client --</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        {/* Resource Assignment */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-slate-800">Assign Inventory</h3>
            <button type="button" onClick={addResourceRow} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">+ Add Another Resource</button>
          </div>

          {selectedResources.map((row, index) => (
            <div key={index} className="flex gap-4 items-end mb-4 bg-slate-50 p-4 rounded-lg">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-500 mb-1">Resource</label>
                <select value={row.resourceId} onChange={(e) => handleResourceChange(index, 'resourceId', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="">-- Select Resource --</option>
                  {availableResources.map(r => (
                    <option key={r.id} value={r.id} disabled={r.availableQty === 0}>
                      {r.name} (Available: {r.availableQty})
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-32">
                <label className="block text-xs font-medium text-slate-500 mb-1">Quantity</label>
                <input type="number" min="1" value={row.quantity} onChange={(e) => handleResourceChange(index, 'quantity', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <button type="button" onClick={() => removeResourceRow(index)} className="text-red-500 hover:text-red-700 p-2 h-10 font-medium">Remove</button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t">
          <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:bg-indigo-400">
            {loading ? 'Creating Event...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
}