'use client';

import React from 'react';
import { UserCircle, CalendarDays, Clock, FileText, BadgeCheck } from 'lucide-react';

const patients = [
  {
    id: 1,
    name: 'Alice Smith',
    age: 29,
    contact: '+1234567890',
    date: '2025-08-01',
    time: '09:30 AM',
    reason: 'General Checkup',
    status: 'New',
  },
  {
    id: 2,
    name: 'Bob Lee',
    age: 42,
    contact: '+1987654321',
    date: '2025-08-03',
    time: '11:00 AM',
    reason: 'Dental Cleaning',
    status: 'Returning',
  },
  {
    id: 3,
    name: 'Clara Evans',
    age: 36,
    contact: '+1122334455',
    date: '2025-07-28',
    time: '03:00 PM',
    reason: 'Consultation',
    status: 'Returning',
  },
];

export default function DoctorPatientsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-200 to-indigo-100 py-12 px-2 sm:px-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-8 drop-shadow-xl flex items-center gap-3">
        <UserCircle className="w-8 h-8 text-blue-600" />
        Upcoming Patients
      </h1>
      <div className="w-full max-w-3xl space-y-8">
        {patients.map((patient) => (
          <div key={patient.id} className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-l-8 ${patient.status === 'New' ? 'border-blue-400' : 'border-green-400'} hover:shadow-2xl transition-shadow duration-200`}>
            <div className="flex items-center gap-4">
              <UserCircle className="w-10 h-10 text-blue-500" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-blue-900">{patient.name}</span>
                  {patient.status === 'New' && (
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                      <BadgeCheck className="w-4 h-4" /> New
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <span className="text-sm">Age: {patient.age}</span>
                  <span className="mx-2">|</span>
                  <span className="text-sm">{patient.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <CalendarDays className="w-4 h-4 text-blue-400" />
                  <span>{new Date(patient.date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 text-blue-400 ml-4" />
                  <span>{patient.time}</span>
                </div>
                <div className="mt-1 text-sm text-blue-700 font-medium">{patient.reason}</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition">
                <FileText className="w-5 h-5" /> View Records
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}