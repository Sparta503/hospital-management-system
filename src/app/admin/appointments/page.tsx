'use client';

import React, { useState } from 'react';
import { Search, CalendarDays, UserCircle, Stethoscope, CheckCircle2, XCircle, Eye, RotateCcw } from 'lucide-react';

const sampleAppointments = [
  {
    id: 1,
    patient: 'Alice Smith',
    doctor: 'Dr. Johnson',
    field: 'Cardiology',
    date: '2025-08-02',
    time: '10:00 AM',
    status: 'Scheduled',
  },
  {
    id: 2,
    patient: 'Bob Lee',
    doctor: 'Dr. Chen',
    field: 'Neurology',
    date: '2025-08-03',
    time: '1:30 PM',
    status: 'Completed',
  },
  {
    id: 3,
    patient: 'Clara Evans',
    doctor: 'Dr. Patel',
    field: 'Pediatrics',
    date: '2025-08-04',
    time: '09:00 AM',
    status: 'Scheduled',
  },
];

const fields = ['All', 'Cardiology', 'Neurology', 'Pediatrics'];

export default function AdminAppointmentsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = sampleAppointments.filter(
    (appt) =>
      (filter === 'All' || appt.field === filter) &&
      (appt.patient.toLowerCase().includes(search.toLowerCase()) ||
        appt.doctor.toLowerCase().includes(search.toLowerCase()) ||
        appt.field.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelect = (id: number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const handleSelectAll = () => {
    setSelected(filtered.length === selected.length ? [] : filtered.map(a => a.id));
  };
  const handleCancel = (id: number) => {
    alert(`Cancel appointment ${id}`);
  };
  const handleBulkCancel = () => {
    alert(`Cancel appointments: ${selected.join(', ')}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-200 to-indigo-100 py-12 px-2 sm:px-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-8 drop-shadow-xl flex items-center gap-3">
        <CalendarDays className="w-8 h-8 text-blue-600" />
        Appointments Management
      </h1>
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex items-center bg-blue-50 rounded-lg px-3 py-2 flex-1">
            <Search className="w-5 h-5 text-blue-400 mr-2" />
            <input
              type="text"
              className="bg-transparent outline-none flex-1 text-blue-900 placeholder-blue-400"
              placeholder="Search by patient, doctor, or field..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="bg-blue-50 text-blue-700 rounded-lg px-4 py-2 border border-blue-200 focus:ring-blue-500 focus:border-blue-500"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            {fields.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          {selected.length > 0 && (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition shadow flex items-center gap-2"
              onClick={handleBulkCancel}
            >
              <XCircle className="w-5 h-5" /> Cancel Selected
            </button>
          )}
        </div>
        {/* Appointments Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-100">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider rounded-tl-lg">
                  <input type="checkbox" checked={filtered.length > 0 && selected.length === filtered.length} onChange={handleSelectAll} />
                </th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Patient</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Doctor</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Field</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-blue-400">No appointments found.</td>
                </tr>
              ) : (
                filtered.map((appt) => (
                  <tr key={appt.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 text-center">
                      <input type="checkbox" checked={selected.includes(appt.id)} onChange={() => handleSelect(appt.id)} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-blue-900 font-medium flex items-center gap-2">
                      <UserCircle className="w-5 h-5 text-blue-400" /> {appt.patient}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-blue-700 flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-blue-400" /> {appt.doctor}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-blue-700">{appt.field}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-blue-700">{new Date(appt.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-blue-700">{appt.time}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {appt.status === 'Scheduled' ? (
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                          <CheckCircle2 className="w-4 h-4" /> Scheduled
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                          <CheckCircle2 className="w-4 h-4" /> Completed
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium">
                        <Eye className="w-4 h-4" /> View
                      </button>
                      <button className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 font-medium">
                        <RotateCcw className="w-4 h-4" /> Reschedule
                      </button>
                      <button className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium" onClick={() => handleCancel(appt.id)}>
                        <XCircle className="w-4 h-4" /> Cancel
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}