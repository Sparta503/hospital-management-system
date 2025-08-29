'use client';

import React, { useState } from 'react';
import {
  FaFileMedical,
  FaUserMd,
  FaNotesMedical,
  FaFilePdf,
  FaDownload,
  FaShare,
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaFileAlt,
  FaFilePrescription as FaRx,
  FaXRay as FaXRayAlt,
  FaProcedures as FaProcedureAlt
} from 'react-icons/fa';

interface MedicalRecord {
  id: number;
  date: string;
  type: 'lab' | 'prescription' | 'consultation' | 'imaging' | 'procedure';
  doctor: string;
  specialty: string;
  summary: string;
  status: 'completed' | 'pending' | 'needs_review';
}

const medicalRecords: MedicalRecord[] = [
  {
    id: 1,
    date: '2023-06-15',
    type: 'lab',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Pathology',
    summary: 'Complete Blood Count (CBC) - Normal',
    status: 'completed'
  },
  {
    id: 2,
    date: '2023-06-10',
    type: 'prescription',
    doctor: 'Dr. Michael Chen',
    specialty: 'Internal Medicine',
    summary: 'Amoxicillin 500mg - 10 days',
    status: 'completed'
  },
  {
    id: 3,
    date: '2023-06-05',
    type: 'imaging',
    doctor: 'Dr. Emily Lee',
    specialty: 'Radiology',
    summary: 'Chest X-ray - No abnormalities',
    status: 'completed'
  },
  {
    id: 4,
    date: '2023-05-28',
    type: 'consultation',
    doctor: 'Dr. Robert Wilson',
    specialty: 'Cardiology',
    summary: 'Follow-up visit - ECG results normal',
    status: 'completed'
  },
  {
    id: 5,
    date: '2023-05-20',
    type: 'procedure',
    doctor: 'Dr. Lisa Wong',
    specialty: 'Dermatology',
    summary: 'Skin biopsy - Results pending',
    status: 'pending'
  },
  {
    id: 6,
    date: '2023-05-15',
    type: 'lab',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Pathology',
    summary: 'Lipid Panel - High cholesterol noted',
    status: 'needs_review'
  },
  {
    id: 7,
    date: '2023-05-10',
    type: 'consultation',
    doctor: 'Dr. David Kim',
    specialty: 'Orthopedics',
    summary: 'Knee pain evaluation',
    status: 'completed'
  },
  {
    id: 8,
    date: '2023-05-05',
    type: 'prescription',
    doctor: 'Dr. Michael Chen',
    specialty: 'Internal Medicine',
    summary: 'Lisinopril 10mg - 30 days',
    status: 'completed'
  },
  {
    id: 9,
    date: '2023-04-28',
    type: 'lab',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Pathology',
    summary: 'Thyroid Function Test - Normal',
    status: 'completed'
  },
  {
    id: 10,
    date: '2023-04-20',
    type: 'consultation',
    doctor: 'Dr. Rachel Adams',
    specialty: 'Nutrition',
    summary: 'Diet and nutrition counseling',
    status: 'completed'
  },
];

const INITIAL_VISIBLE = 5;

export default function MedicalRecords() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const showMore = () => setVisibleCount(medicalRecords.length);
  const showLess = () => setVisibleCount(INITIAL_VISIBLE);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'needs_review':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab':
        return <FaFileMedical className="text-blue-500" />;
      case 'prescription':
        return <FaRx className="text-purple-500" />;
      case 'consultation':
        return <FaUserMd className="text-green-500" />;
      case 'imaging':
        return <FaXRayAlt className="text-indigo-500" />;
      case 'procedure':
        return <FaProcedureAlt className="text-red-500" />;
      default:
        return <FaFileAlt className="text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const filteredRecords = medicalRecords
    .filter(record => 
      selectedStatus === 'all' || record.status === selectedStatus
    )
    .filter(record =>
      Object.values(record).some(
        value =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const visibleRecords = filteredRecords.slice(0, visibleCount);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-700 to-blue-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-white flex items-center gap-3 mt-12">
        <FaFileMedical className="inline-block text-blue-200 text-3xl drop-shadow" />
        Medical Records
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 w-full">
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-300" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2.5 border border-gray-300/30 rounded-xl bg-white/5 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto justify-center">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white/10 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto [&>option]:bg-black [&>option]:text-white"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="needs_review">Needs Review</option>
          </select>
        </div>
      </div>

      <div className="relative rounded-lg shadow bg-black mb-6 mt-0 group">
        <div className="absolute -top-2 -left-2 z-20 w-12 h-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-full h-full rounded-tl-2xl shadow-2xl shadow-blue-400/60" />
        </div>
        <div className="overflow-x-hidden">
          <div className="transition-all duration-500" style={{ maxHeight: 'calc(100vh - 300px)' }}>
          <table className="min-w-full text-white">
            <thead className="sticky top-0 bg-blue-800 z-10">
              <tr>
                <th className="py-3 px-4 text-left rounded-tl-lg w-16">
                  <span className="flex items-center gap-2">
                    <FaFileAlt className="text-blue-300" />
                  </span>
                </th>
                <th className="py-3 px-4 text-left">
                  <span className="flex items-center gap-2">
                    <FaFileAlt className="text-blue-300" />
                    <span>Record</span>
                  </span>
                </th>
                <th className="py-3 px-4 text-left">
                  <span className="flex items-center gap-2">
                    <FaUserMd className="text-blue-300" />
                    <span>Doctor</span>
                  </span>
                </th>
                <th className="py-3 px-4 text-left">
                  <span className="flex items-center gap-2">
                    <FaNotesMedical className="text-blue-300" />
                    <span>Summary</span>
                  </span>
                </th>
                <th className="py-3 px-4 text-left">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-300" />
                    <span>Date</span>
                  </span>
                </th>
                <th className="py-3 px-4 text-left rounded-tr-lg">
                  <span className="flex items-center gap-2">
                    <FaFilter className="text-blue-300" />
                    <span>Status</span>
                  </span>
                </th>
                <th className="py-3 px-4 text-right rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {visibleRecords.length > 0 ? (
                visibleRecords.map((record, idx) => (
                  <tr 
                    key={record.id}
                    className={`transition-all duration-200 transform hover:scale-[1.01] ${idx % 2 === 0 ? 'bg-gray-900' : 'bg-gray-850'} hover:bg-gray-700 hover:shadow-lg`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <div className="p-2 rounded-lg bg-blue-900/30">
                          {getTypeIcon(record.type)}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 group">
                      <div className="flex flex-col">
                        <div className="font-medium group-hover:text-blue-300 transition-colors duration-200">
                          {getTypeLabel(record.type)}
                        </div>
                        <div className="text-sm text-gray-400">{record.specialty}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 group">
                      <div className="font-medium group-hover:text-blue-300 transition-colors duration-200">{record.doctor}</div>
                      <div className="text-sm text-gray-400">{record.specialty}</div>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <div className="line-clamp-2 group-hover:text-blue-100 transition-colors duration-200">{record.summary}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-4 px-4 group">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(record.status)}`}>
                        {record.status.replace('_', ' ').split(' ').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-blue-400 hover:text-blue-300 rounded-full hover:bg-blue-900/30 transition-all duration-200 hover:scale-110 transform">
                          <FaFilePdf className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-green-400 hover:text-green-300 rounded-full hover:bg-green-900/30 transition-all duration-200 hover:scale-110 transform">
                          <FaDownload className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-purple-400 hover:text-purple-300 rounded-full hover:bg-purple-900/30 transition-all duration-200 hover:scale-110 transform">
                          <FaShare className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">
                    No records found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>
        
        {filteredRecords.length > INITIAL_VISIBLE && (
          <div className="flex justify-center p-4 bg-gray-800 border-t border-gray-700">
            <button
              onClick={visibleCount < filteredRecords.length ? showMore : showLess}
              className={`px-6 py-2 rounded-lg shadow transition ${
                visibleCount < filteredRecords.length 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              {visibleCount < filteredRecords.length ? 'Show More' : 'Show Less'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
