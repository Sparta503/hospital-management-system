'use client';

import React from 'react';
import { MessageCircle, User } from 'lucide-react';

interface Query {
  id: number;
  name: string;
  role: string;
  subject: string;
  date: string;
  status: 'Open' | 'Closed' | 'Pending';
}

const RecentQueries: React.FC = () => {
  const queries: Query[] = [
    { id: 1, name: 'Alice Brown', role: 'Patient', subject: 'Billing Issue', date: '2025-07-23', status: 'Open' },
    { id: 2, name: 'Dr. Smith', role: 'Doctor', subject: 'Lab Report Delay', date: '2025-07-22', status: 'Pending' },
    { id: 3, name: 'John Doe', role: 'Patient', subject: 'Appointment Reschedule', date: '2025-07-21', status: 'Closed' },
    { id: 4, name: 'Nurse Jane', role: 'Nurse', subject: 'Equipment Request', date: '2025-07-20', status: 'Open' },
  ];

  return (
    <div className="bg-transparent w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-blue-200">Recent Queries</h2>
        <button className="text-blue-300 hover:text-blue-100 text-sm font-medium">
          View All
        </button>
      </div>
      {queries.length > 0 ? (
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-4 pr-2">
            {queries.map((query) => (
            <div key={query.id} className="bg-black/30 border border-gray-800 rounded-lg p-4 hover:bg-black/40 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-900/20 hover:border-blue-500/50 hover:-translate-y-0.5">
              <div className="flex items-start">
                <div className="bg-blue-900/30 p-2 rounded-lg mr-4">
                  <MessageCircle className="w-5 h-5 text-blue-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 items-center mb-1">
                    <span className="font-medium text-white/90">{query.name}</span>
                    <span className="inline-flex items-center text-xs bg-blue-900/30 text-blue-200 px-2 py-0.5 rounded-full">
                      <User className="w-3 h-3 mr-1 text-blue-300" />{query.role}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ml-2 font-semibold ${query.status === 'Open' ? 'bg-green-900/30 text-green-300' : query.status === 'Closed' ? 'bg-gray-700/50 text-gray-300' : 'bg-yellow-900/30 text-yellow-300'}`}>{query.status}</span>
                  </div>
                  <div className="text-sm text-gray-200 mb-1">{query.subject}</div>
                  <div className="text-xs text-gray-300">{new Date(query.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                </div>
                <button className="text-blue-300 hover:text-blue-100 text-sm font-medium ml-4 transition-colors">Details</button>
              </div>
            </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-8 text-gray-500">
            <p>No recent queries</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentQueries;

