'use client';
import { useEffect, useState } from 'react';
import EventNoteIcon from '@mui/icons-material/EventNote';

interface Appointment {
  id: number;
  patient: string;
  date: string; // ISO date
  time: string; // e.g. '09:00 AM'
  type: string;
}

const mockAppointments: Appointment[] = [
  { id: 1, patient: 'John Doe', date: '2025-07-22', time: '09:00 AM', type: 'Checkup' },
  { id: 2, patient: 'Jane Smith', date: '2025-07-22', time: '10:30 AM', type: 'Consultation' },
  { id: 3, patient: 'Sam Wilson', date: '2025-07-23', time: '01:00 PM', type: 'Follow-up' },
];

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // In a real app, fetch from API here
    setAppointments(mockAppointments);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-700">
        <EventNoteIcon className="text-blue-500" />
        Upcoming Appointments
      </h2>
      <ul className="divide-y divide-blue-100">
        {appointments.length === 0 ? (
          <li className="py-6 text-gray-500 text-center">No upcoming appointments.</li>
        ) : (
          appointments.map((appt) => (
            <li key={appt.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-2 hover:bg-blue-50 rounded-xl transition">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center">
                  <EventNoteIcon fontSize="small" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{appt.patient}</div>
                  <div className="text-xs text-gray-500">{appt.type}</div>
                </div>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center gap-2">
                <span className="text-sm font-medium text-blue-700">
                  {new Date(appt.date).toLocaleDateString()} {appt.time}
                </span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UpcomingAppointments;
