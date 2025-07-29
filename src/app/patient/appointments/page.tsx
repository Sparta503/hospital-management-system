'use client';

import React from 'react';
import { CalendarDays, Clock, UserCircle, Plus } from 'lucide-react';

const appointments = [
  {
    id: 1,
    date: '2025-07-30',
    time: '10:00 AM',
    doctor: 'Dr. Sarah Johnson',
    type: 'General Checkup',
    status: 'Upcoming',
  },
  {
    id: 2,
    date: '2025-08-02',
    time: '2:30 PM',
    doctor: 'Dr. Michael Chen',
    type: 'Dental Cleaning',
    status: 'Upcoming',
  },
  {
    id: 3,
    date: '2025-06-15',
    time: '9:00 AM',
    doctor: 'Dr. Emily Lee',
    type: 'Consultation',
    status: 'Completed',
  },
];

export default function AppointmentsPage() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-800 py-12 px-2 sm:px-8 flex flex-col items-center">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-10">
        <CalendarDays className="w-10 h-10 text-white drop-shadow-lg animate-pulse" />
        <h1 className="text-4xl font-bold text-white drop-shadow-xl tracking-tight">My Appointments</h1>
      </div>
      {/* Timeline */}
      <div className="relative w-full max-w-2xl">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-blue-300/70 via-blue-500/30 to-indigo-400/20 rounded-full z-0" />
        <ul className="space-y-10">
          {appointments.map((appt) => (
            <li key={appt.id} className="relative flex items-start z-10">
              {/* Timeline dot */}
              <span className={`absolute left-3 top-2 w-6 h-6 rounded-full flex items-center justify-center border-4 ${appt.status === 'Upcoming' ? 'border-blue-400 bg-white' : 'border-green-300 bg-green-100'} shadow-lg animate-bounce`}>
                <Clock className={`w-4 h-4 ${appt.status === 'Upcoming' ? 'text-blue-500' : 'text-green-600'}`} />
              </span>
              {/* Glassmorphism card */}
              <div className="ml-16 w-full bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/40 hover:scale-[1.02] transition-transform duration-200 group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">{appt.type}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold tracking-wide ${appt.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{appt.status}</span>
                </div>
                <div className="flex items-center gap-4 mb-1">
                  <UserCircle className="w-5 h-5 text-blue-700" />
                  <span className="text-sm text-blue-900 font-medium">{appt.doctor}</span>
                </div>
                <div className="flex items-center gap-4">
                  <CalendarDays className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-blue-900">{new Date(appt.date).toLocaleDateString()}</span>
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-blue-900">{appt.time}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-200 flex items-center group z-50">
        <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform" />
        <span className="ml-2 font-semibold text-lg hidden md:inline">Book New</span>
      </button>
    </div>
  );
}