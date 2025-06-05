import { useState } from 'react';
import { useAttendance } from '../../context/AttendanceContext';
import { Clock } from 'lucide-react';

export default function ClockInOut() {
  const { clockIn, clockOut } = useAttendance();
  const [loading, setLoading] = useState(false);

  const handleClockIn = async () => {
    setLoading(true);
    try {
      await clockIn();
    } catch (error) {
      console.error('Error clocking in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    setLoading(true);
    try {
      await clockOut();
    } catch (error) {
      console.error('Error clocking out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Attendance</h2>
        <Clock className="h-6 w-6 text-blue-600" />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleClockIn}
          disabled={loading}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Clock In
        </button>
        <button
          onClick={handleClockOut}
          disabled={loading}
          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Clock Out
        </button>
      </div>
    </div>
  );
}