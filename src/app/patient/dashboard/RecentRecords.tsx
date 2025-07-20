import React from 'react';
import { FileText, Clock } from 'lucide-react';

interface MedicalRecord {
  id: number;
  date: string;
  type: string;
  doctor: string;
  details: string;
}

const RecentRecords: React.FC = () => {
  const records: MedicalRecord[] = [
    {
      id: 1,
      date: '2025-07-10',
      type: 'Lab Results',
      doctor: 'Dr. Sarah Johnson',
      details: 'Blood Test Results - All within normal range'
    },
    {
      id: 2,
      date: '2025-06-25',
      type: 'Prescription',
      doctor: 'Dr. Michael Chen',
      details: 'Amoxicillin - 500mg, 3 times daily for 7 days'
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-black">Recent Medical Records</h2>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </button>
      </div>
      
      {records.length > 0 ? (
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-black">{record.type}</h3>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        year: 'numeric',
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{record.doctor}</p>
                  <p className="text-sm text-gray-800 mt-1">{record.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No recent medical records found</p>
        </div>
      )}
    </div>
  );
};

export default RecentRecords;
