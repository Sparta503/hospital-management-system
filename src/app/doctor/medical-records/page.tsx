'use client';

import React, { useState } from 'react';
import { UserCircle, FileText, Search, Download, StickyNote } from 'lucide-react';

const records = [
  {
    id: 1,
    patient: 'Alice Smith',
    age: 29,
    type: 'Lab Result',
    date: '2025-07-20',
    summary: 'Blood test - Normal',
  },
  {
    id: 2,
    patient: 'Bob Lee',
    age: 42,
    type: 'Prescription',
    date: '2025-06-10',
    summary: 'Amoxicillin 500mg',
  },
  {
    id: 3,
    patient: 'Clara Evans',
    age: 36,
    type: 'Consultation',
    date: '2025-05-02',
    summary: 'Routine checkup',
  },
];

const recordTypes = ['All', 'Lab Result', 'Prescription', 'Consultation'];

export default function DoctorMedicalRecordsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredRecords = records.filter(
    (rec) =>
      (filter === 'All' || rec.type === filter) &&
      (rec.patient.toLowerCase().includes(search.toLowerCase()) ||
        rec.summary.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-200 to-indigo-100 py-12 px-2 sm:px-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-8 drop-shadow-xl flex items-center gap-3">
        <FileText className="w-8 h-8 text-blue-600" />
        Patient Medical Records
      </h1>
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex items-center bg-blue-50 rounded-lg px-3 py-2 flex-1">
            <Search className="w-5 h-5 text-blue-400 mr-2" />
            <input
              type="text"
              className="bg-transparent outline-none flex-1 text-blue-900 placeholder-blue-400"
              placeholder="Search by patient or summary..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="bg-blue-50 text-blue-700 rounded-lg px-4 py-2 border border-blue-200 focus:ring-blue-500 focus:border-blue-500"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            {recordTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        {/* Records Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-100">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider rounded-tl-lg">Patient</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Age</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Summary</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-50">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-blue-400">No records found.</td>
                </tr>
              ) : (
                filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-blue-900 font-medium flex items-center gap-2">
                      <UserCircle className="w-5 h-5 text-blue-400" /> {rec.patient}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-blue-700">{rec.age}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-blue-700">{rec.type}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-blue-700">{new Date(rec.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-blue-700">{rec.summary}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium">
                        <FileText className="w-4 h-4" /> View
                      </button>
                      <button className="flex items-center gap-1 text-green-600 hover:text-green-800 font-medium">
                        <Download className="w-4 h-4" /> Download
                      </button>
                      <button className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 font-medium">
                        <StickyNote className="w-4 h-4" /> Add Note
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