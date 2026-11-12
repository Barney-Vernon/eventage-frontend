import { FileText, Download } from 'lucide-react';

export default function Invoices() {
  // Placeholder data (we will connect this to the backend later)
  const invoices = [
    { id: 'INV-001', event: 'Corporate Gala 2026', amount: '150,000', status: 'PAID', date: '2026-10-15' },
    { id: 'INV-002', event: 'ABC Wedding', amount: '80,000', status: 'UNPAID', date: '2026-10-16' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Invoices & Billing</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          + Generate Invoice
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm border-b">
            <tr>
              <th className="px-6 py-4">Invoice #</th>
              <th className="px-6 py-4">Event</th>
              <th className="px-6 py-4">Amount (KSH)</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    <FileText size={16} className="text-slate-400" /> {inv.id}
                  </td>
                  <td className="px-6 py-4">{inv.event}</td>
                  <td className="px-6 py-4 font-medium">{inv.amount}</td>
                  <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm font-medium">
                      <Download size={16} /> PDF
                    </button>
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