'use client';
import { useEffect, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface RecentAppointment {
  id: number;
  patient: string;
  time: string; // e.g. '10:30 AM, 2025-07-20'
}

const mockRecentAppointments: RecentAppointment[] = [
  { id: 1, patient: 'Emily Clark', time: '10:30 AM, 2025-07-20' },
  { id: 2, patient: 'Michael Brown', time: '09:00 AM, 2025-07-20' },
  { id: 3, patient: 'Sarah Lee', time: '04:30 PM, 2025-07-19' },
];

const RecentAppointments = () => {
  const [appointments, setAppointments] = useState<RecentAppointment[]>([]);

  useEffect(() => {
    // In a real app, fetch from API here
    setAppointments(mockRecentAppointments);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-700">
        <AccessTimeIcon className="text-blue-500" />
        Recent Appointments
      </h2>
      <ul className="divide-y divide-blue-100">
        {appointments.length === 0 ? (
          <li className="py-6 text-gray-500 text-center">No recent appointments.</li>
        ) : (
          appointments.map((appt) => (
            <li key={appt.id} className="flex items-center justify-between py-4 px-2 hover:bg-blue-50 rounded-xl transition">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center">
                  <AccessTimeIcon fontSize="small" />
                </div>
                <div className="font-semibold text-gray-900">{appt.patient}</div>
              </div>
              <span className="text-sm text-blue-700 font-medium">
                {appt.time}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentAppointments;