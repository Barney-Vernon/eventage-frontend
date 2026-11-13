import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import Events from './pages/Events';
import Clients from './pages/Clients';
import Inventory from './pages/Inventory';
import Invoices from './pages/Invoices';
import Settings from './pages/Settings';
import Users from './pages/Users';
import VendorPortal from './pages/VendorPortal';
import ClientPortal from './pages/ClientPortal';
import Sidebar from './components/Sidebar';

const DashboardLayout = ({ children }) => (
  <div className="flex h-screen w-full bg-indigo-50 overflow-hidden">
    <Sidebar />
    <main className="flex-1 h-full overflow-y-auto">
      {children}
    </main>
  </div>
);

function App() {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  // Log exactly what is being read from local storage
  console.log("App reading - Token:", token ? "Exists" : "Missing");
  console.log("App reading - User:", userStr);

  let user = null;
  try {
    user = userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;
  } catch (e) {
    console.error("Error parsing user:", e);
  }

  // 1. Not logged in
  if (!token || !user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // 2. Vendor
  if (user?.role === 'VENDOR') {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<VendorPortal />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // 3. Client
  if (user?.role === 'CLIENT') {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ClientPortal />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // 4. Admin/Staff
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/create-event" element={<DashboardLayout><CreateEvent /></DashboardLayout>} />
        <Route path="/events" element={<DashboardLayout><Events /></DashboardLayout>} />
        <Route path="/clients" element={<DashboardLayout><Clients /></DashboardLayout>} />
        <Route path="/inventory" element={<DashboardLayout><Inventory /></DashboardLayout>} />

        {/* PROTECTED ROUTES: Only Admin can access these */}
        <Route path="/invoices" element={
          user?.role === 'ADMIN' ? <DashboardLayout><Invoices /></DashboardLayout> : <Navigate to="/dashboard" />
        } />
        <Route path="/settings" element={
          user?.role === 'ADMIN' ? <DashboardLayout><Settings /></DashboardLayout> : <Navigate to="/dashboard" />
        } />
         <Route path="/users" element={
          user?.role === 'ADMIN' ? <DashboardLayout><Users /></DashboardLayout> : <Navigate to="/dashboard" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;