import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import UserDashboard from '../components/Dashboard/UserDashboard';
import ClockInOut from '../components/Attendance/ClockInOut';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <ClockInOut />
      {user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
}