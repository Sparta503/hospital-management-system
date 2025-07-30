'use client';

import React from 'react';
import { UserCircle, MapPin, Briefcase } from 'lucide-react';

const users = [
  { id: 1, name: 'Alice Smith', profession: 'Teacher', address: '123 Main St, Springfield' },
  { id: 2, name: 'Bob Lee', profession: 'Police', address: '456 Oak Ave, Rivertown' },
  { id: 3, name: 'Clara Evans', profession: 'Soldier', address: '789 Pine Rd, Hillview' },
  { id: 4, name: 'David Kim', profession: 'Engineer', address: '321 Maple St, Lakewood' },
  { id: 5, name: 'Ella Brown', profession: 'Nurse', address: '654 Cedar Blvd, Brookside' },
  { id: 6, name: 'Frank Green', profession: 'Firefighter', address: '987 Elm Dr, Westfield' },
  { id: 7, name: 'Grace White', profession: 'Doctor', address: '147 Willow Ln, Eastgate' },
  { id: 8, name: 'Henry Black', profession: 'Lawyer', address: '258 Birch Ct, Northvale' },
];

export default function AdminUsersPage() {
  // Group users by profession
  const grouped = users.reduce<{ [profession: string]: typeof users }>((acc, user) => {
    if (!acc[user.profession]) acc[user.profession] = [];
    acc[user.profession].push(user);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-200 to-indigo-100 py-12 px-2 sm:px-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-8 drop-shadow-xl flex items-center gap-3">
        <UserCircle className="w-8 h-8 text-blue-600" />
        Users Management
      </h1>
      <div className="w-full max-w-4xl flex flex-col gap-10">
        {Object.keys(grouped).map((profession) => (
          <div key={profession} className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-400" /> {profession}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-100">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider rounded-tl-lg">Name</th>
                    <th className="px-4 py-3 bg-blue-50 text-right text-xs font-semibold text-blue-700 uppercase tracking-wider rounded-tr-lg">Address</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-50">
                  {grouped[profession].map((u) => (
                    <tr key={u.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-blue-900 font-medium flex items-center gap-2">
  <UserCircle className="w-5 h-5 text-blue-400" /> {u.name}
</td>
<td className="px-4 py-3 whitespace-nowrap text-blue-700 bg-blue-50 rounded-lg text-right">
  <span className="inline-flex items-center gap-1">
    <MapPin className="w-4 h-4 text-blue-400" /> {u.address ? u.address : <span className="italic text-gray-400">No address provided</span>}
  </span>
</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}