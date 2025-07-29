'use client';

import React from 'react';
import { UserCircle, CalendarDays, Clock, CheckCircle2, RefreshCcw } from 'lucide-react';

const appointments = [
  {
    id: 1,
    patient: 'Alice Smith',
    date: '2025-08-01',
    time: '09:30 AM',
    type: 'General Checkup',
    status: 'Pending',
  },
  {
    id: 2,
    patient: 'Bob Lee',
    date: '2025-08-03',
    time: '11:00 AM',
    type: 'Dental Cleaning',
    status: 'Pending',
  },
  {
    id: 3,
    patient: 'Clara Evans',
    date: '2025-07-28',
    time: '03:00 PM',
    type: 'Consultation',
    status: 'Accepted',
  },
];

export default function DoctorAppointmentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-200 to-indigo-100 py-12 px-2 sm:px-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-8 drop-shadow-xl flex items-center gap-3">
        <CalendarDays className="w-8 h-8 text-blue-600" />
        Patient Appointments
      </h1>
      <div className="w-full max-w-3xl space-y-8">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-l-8 ${appt.status === 'Accepted' ? 'border-green-400' : 'border-blue-400'} hover:shadow-2xl transition-shadow duration-200`}
          >
            <div className="flex items-center gap-4">
              <UserCircle className="w-10 h-10 text-blue-500" />
              <div>
                <div className="text-lg font-semibold text-blue-900">{appt.patient}</div>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <CalendarDays className="w-4 h-4 text-blue-400" />
                  <span>{new Date(appt.date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 text-blue-400 ml-4" />
                  <span>{appt.time}</span>
                </div>
                <div className="mt-1 text-sm text-blue-700 font-medium">{appt.type}</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              {appt.status === 'Pending' ? (
                <>
                  <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition">
                    <CheckCircle2 className="w-5 h-5" /> Accept
                  </button>
                  <button className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-semibold shadow-md transition">
                    <RefreshCcw className="w-5 h-5" /> Reschedule
                  </button>
                </>
              ) : (
                <span className="inline-flex items-center gap-2 text-green-700 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" /> Accepted
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}