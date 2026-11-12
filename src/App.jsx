import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import Events from './pages/Events';
import Clients from './pages/Clients';
import Inventory from './pages/Inventory';
import Invoices from './pages/Invoices'; // <-- Import this
import Sidebar from './components/Sidebar';

const DashboardLayout = ({ children }) => (
  <div className="flex h-screen w-full bg-indigo-300 overflow-hidden">
    <Sidebar />
    <main className="flex-1 h-full overflow-y-auto">
      {children}
    </main>
  </div>
);

function App() {
  const token = localStorage.getItem('token');

  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/create-event" element={<DashboardLayout><CreateEvent /></DashboardLayout>} />
        <Route path="/events" element={<DashboardLayout><Events /></DashboardLayout>} />
        <Route path="/clients" element={<DashboardLayout><Clients /></DashboardLayout>} />
        <Route path="/inventory" element={<DashboardLayout><Inventory /></DashboardLayout>} />
        
        {/* Add the new Invoices Route */}
        <Route path="/invoices" element={<DashboardLayout><Invoices /></DashboardLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;