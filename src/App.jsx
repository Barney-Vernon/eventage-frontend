import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        
        {/* Protected Route with Sidebar Layout */}
        <Route path="/dashboard" element={
          token ? (
            <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
              {/* <Sidebar /> */}
                 <main className="w-full h-full overflow-y-auto">
                <Dashboard />
              </main>
            </div>
          ) : (
            <Navigate to="/" />
          )
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;