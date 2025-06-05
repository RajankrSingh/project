import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import DashboardPage from './pages/DashboardPage';
import LeaveManagement from './components/Leave/LeaveManagement';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/leave" element={<LeaveManagement />} />
        <Route path="/" element={<Navigate to="/dashboard\" replace />} />
      </Routes>
    </Layout>
  );
}

export default App