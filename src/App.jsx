import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent'; // <-- Import new page
import Sidebar from './components/Sidebar';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          token ? <div className="flex h-screen w-full bg-gray-50 overflow-hidden"><Sidebar /><main className="flex-1 h-full overflow-y-auto"><Dashboard /></main></div> : <Navigate to="/" />
        } />
        
        {/* NEW ROUTE */}
        <Route path="/create-event" element={
          token ? <div className="flex h-screen w-full bg-gray-50 overflow-hidden"><Sidebar /><main className="flex-1 h-full overflow-y-auto"><CreateEvent /></main></div> : <Navigate to="/" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;