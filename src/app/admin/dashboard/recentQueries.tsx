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
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-black">Recent Queries</h2>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </button>
      </div>
      {queries.length > 0 ? (
        <div className="space-y-4">
          {queries.map((query) => (
            <div key={query.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 items-center mb-1">
                    <span className="font-medium text-black">{query.name}</span>
                    <span className="inline-flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                      <User className="w-3 h-3 mr-1" />{query.role}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ml-2 font-semibold ${query.status === 'Open' ? 'bg-green-100 text-green-700' : query.status === 'Closed' ? 'bg-gray-200 text-gray-600' : 'bg-yellow-100 text-yellow-700'}`}>{query.status}</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">{query.subject}</div>
                  <div className="text-xs text-gray-500">{new Date(query.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-4">Details</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No recent queries</p>
        </div>
      )}
    </div>
  );
};

export default RecentQueries;

