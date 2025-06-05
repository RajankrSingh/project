export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  department: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  clockIn: string;
  clockOut: string | null;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface LeaveRequest {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  type: 'sick' | 'vacation' | 'personal';
}