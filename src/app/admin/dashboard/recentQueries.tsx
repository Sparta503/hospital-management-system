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
    <div className="bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-blue-800/10 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-400/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-blue-200">Recent Queries</h2>
        <button className="text-blue-300 hover:text-blue-100 text-sm font-medium transition-colors">
          View All
        </button>
      </div>
      {queries.length > 0 ? (
        <div className="space-y-4">
          {queries.map((query) => (
            <div key={query.id} className="bg-black/40 border border-blue-400/20 rounded-xl p-4 hover:bg-black/60 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 hover:border-blue-300/40 cursor-pointer group">
              <div className="flex items-start">
                <div className="bg-blue-500/30 p-2 rounded-lg mr-4 backdrop-blur-sm group-hover:bg-blue-500/40 transition-colors duration-300">
                  <MessageCircle className="w-5 h-5 text-blue-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 items-center mb-1">
                    <span className="font-medium text-white">{query.name}</span>
                    <span className="inline-flex items-center text-xs bg-blue-500/40 text-blue-100 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      <User className="w-3 h-3 mr-1 text-blue-200" />{query.role}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ml-2 font-semibold ${query.status === 'Open' ? 'bg-green-500/20 text-green-200' : query.status === 'Closed' ? 'bg-gray-500/20 text-gray-300' : 'bg-yellow-500/20 text-yellow-200'}`}>{query.status}</span>
                  </div>
                  <div className="text-sm text-blue-50 mb-1">{query.subject}</div>
                  <div className="text-xs text-blue-200">{new Date(query.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                </div>
                <button className="text-blue-300 hover:text-blue-100 text-sm font-medium ml-4 transition-colors group-hover:scale-110 transform transition-transform duration-200">
                  <span className="group-hover:underline">Details</span> →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-blue-300">
          <p>No recent queries</p>
        </div>
      )}
    </div>
  );
};

export default RecentQueries;

