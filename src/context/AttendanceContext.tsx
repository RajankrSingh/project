import { createContext, useContext, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { AttendanceRecord, LeaveRequest } from '../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface AttendanceContextType {
  clockIn: () => Promise<void>;
  clockOut: () => Promise<void>;
  submitLeave: (request: Omit<LeaveRequest, 'id' | 'userId' | 'status'>) => Promise<void>;
  getAttendanceHistory: (userId: string) => Promise<AttendanceRecord[]>;
  getLeaveRequests: (userId: string) => Promise<LeaveRequest[]>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export function AttendanceProvider({ children }: { children: React.ReactNode }) {
  const clockIn = async () => {
    const { error } = await supabase
      .from('attendance')
      .insert([
        {
          clockIn: new Date().toISOString(),
          date: new Date().toISOString().split('T')[0],
          status: 'present'
        }
      ]);
    if (error) throw error;
  };

  const clockOut = async () => {
    const { error } = await supabase
      .from('attendance')
      .update({ clockOut: new Date().toISOString() })
      .eq('date', new Date().toISOString().split('T')[0]);
    if (error) throw error;
  };

  const submitLeave = async (request: Omit<LeaveRequest, 'id' | 'userId' | 'status'>) => {
    const { error } = await supabase
      .from('leave_requests')
      .insert([{ ...request, status: 'pending' }]);
    if (error) throw error;
  };

  const getAttendanceHistory = async (userId: string) => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('userId', userId);
    if (error) throw error;
    return data;
  };

  const getLeaveRequests = async (userId: string) => {
    const { data, error } = await supabase
      .from('leave_requests')
      .select('*')
      .eq('userId', userId);
    if (error) throw error;
    return data;
  };

  return (
    <AttendanceContext.Provider value={{
      clockIn,
      clockOut,
      submitLeave,
      getAttendanceHistory,
      getLeaveRequests
    }}>
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
}