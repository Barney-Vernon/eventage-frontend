import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Inventory() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    api.get('/resources').then(res => setResources(res.data)).catch(console.error);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Inventory & Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((res) => (
          <div key={res.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg text-slate-800">{res.name}</h3>
            <p className="text-slate-500 text-sm mb-4">Total Stock: {res.totalQty}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${(res.availableQty / res.totalQty) * 100}%` }}></div>
            </div>
            <p className="text-sm font-medium text-slate-700 mt-2">Available: {res.availableQty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}