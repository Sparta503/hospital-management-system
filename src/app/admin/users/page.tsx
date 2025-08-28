'use client';

import React, { useState } from 'react';
import { FaUser, FaMapMarkerAlt, FaUserMd, FaPhone, FaEnvelope, FaIdCard, FaSearch } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  policyType: 'medical_aid' | 'cash';
  policyNumber?: string;
  medicalAidProvider?: string;
  role: 'patient' | 'doctor' | 'admin';
  lastVisit?: string;
}

const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St, Springfield, IL 62701',
    policyType: 'medical_aid',
    policyNumber: 'MA12345678',
    medicalAidProvider: 'Blue Cross',
    role: 'patient',
    lastVisit: '2023-08-20'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(234) 567-8901',
    address: '456 Oak Ave, Rivertown, NY 10001',
    policyType: 'cash',
    role: 'patient',
    lastVisit: '2023-08-15'
  },
  {
    id: 3,
    name: 'Dr. Sarah Johnson',
    email: 's.johnson@hospital.com',
    phone: '(345) 678-9012',
    address: '789 Pine Rd, Hillview, CA 94010',
    policyType: 'medical_aid',
    policyNumber: 'MA87654321',
    medicalAidProvider: 'Aetna',
    role: 'doctor',
    lastVisit: '2023-08-22'
  },
  {
    id: 4,
    name: 'Robert Brown',
    email: 'robert.b@example.com',
    phone: '(456) 789-0123',
    address: '321 Maple St, Lakewood, TX 75001',
    policyType: 'cash',
    role: 'patient',
    lastVisit: '2023-08-10'
  },
  {
    id: 5,
    name: 'Dr. Michael Chen',
    email: 'm.chen@hospital.com',
    phone: '(567) 890-1234',
    address: '654 Cedar Blvd, Brookside, FL 32004',
    policyType: 'medical_aid',
    policyNumber: 'MA24681357',
    medicalAidProvider: 'United Healthcare',
    role: 'doctor',
    lastVisit: '2023-08-24'
  },
  {
    id: 6,
    name: 'Emily Wilson',
    email: 'emily.w@example.com',
    phone: '(678) 901-2345',
    address: '987 Elm Dr, Westfield, WA 98001',
    policyType: 'medical_aid',
    policyNumber: 'MA13579246',
    medicalAidProvider: 'Cigna',
    role: 'patient',
    lastVisit: '2023-08-18'
  },
  {
    id: 7,
    name: 'Admin User',
    email: 'admin@hospital.com',
    phone: '(789) 012-3456',
    address: '147 Willow Ln, Eastgate, MA 02108',
    policyType: 'medical_aid',
    policyNumber: 'MA86420973',
    medicalAidProvider: 'Kaiser Permanente',
    role: 'admin',
    lastVisit: '2023-08-25'
  },
  {
    id: 8,
    name: 'David Kim',
    email: 'david.k@example.com',
    phone: '(890) 123-4567',
    address: '258 Birch Ct, Northvale, NJ 07647',
    policyType: 'cash',
    role: 'patient',
    lastVisit: '2023-08-12'
  },
  {
    id: 9,
    name: 'Dr. Lisa Wong',
    email: 'l.wong@hospital.com',
    phone: '(901) 234-5678',
    address: '369 Spruce Way, Southfield, MI 48075',
    policyType: 'medical_aid',
    policyNumber: 'MA97531086',
    medicalAidProvider: 'Humana',
    role: 'doctor',
    lastVisit: '2023-08-23'
  },
  {
    id: 10,
    name: 'Maria Garcia',
    email: 'maria.g@example.com',
    phone: '(012) 345-6789',
    address: '159 Redwood Dr, Fairview, CO 80401',
    policyType: 'cash',
    role: 'patient',
    lastVisit: '2023-08-14'
  }
];

const AdminUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | User['role']>('all');
  const [filterPolicy, setFilterPolicy] = useState<'all' | User['policyType']>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesPolicy = filterPolicy === 'all' || user.policyType === filterPolicy;
    
    return matchesSearch && matchesRole && matchesPolicy;
  });

  const getRoleBadge = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'doctor':
        return 'bg-blue-100 text-blue-800';
      case 'patient':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPolicyBadge = (policyType: User['policyType']) => {
    return policyType === 'medical_aid' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 bg-gradient-to-br from-blue-700 to-blue-900 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-6 mt-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FaUser className="inline-block text-blue-200 text-3xl drop-shadow" />
            Users Management
          </h1>
        </div>

        {/* Search and Filter Section */}
        <div className="relative rounded-lg shadow bg-black mb-6 group">
          <div className="absolute -top-2 -left-2 z-20 w-12 h-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-full h-full rounded-tl-2xl shadow-2xl shadow-blue-400/60" />
          </div>
          <div className="p-4 border-b border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <select
                  className="block w-full pl-3 pr-10 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value as 'all' | 'patient' | 'doctor' | 'admin')}
                >
                  <option value="all">All Roles</option>
                  <option value="patient">Patients</option>
                  <option value="doctor">Doctors</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
              <div>
                <select
                  className="block w-full pl-3 pr-10 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filterPolicy}
                  onChange={(e) => setFilterPolicy(e.target.value as 'all' | 'medical_aid' | 'cash')}
                >
                  <option value="all">All Policy Types</option>
                  <option value="medical_aid">Medical Aid</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <div className="transition-all duration-500">
              <table className="min-w-full text-white">
                <thead className="sticky top-0 bg-blue-800 z-10">
                  <tr>
                    <th className="py-3 px-4 text-left rounded-tl-lg w-16">
                      <span className="flex items-center gap-2">
                        <FaUser className="inline-block text-blue-300" />
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">User</th>
                    <th className="py-3 px-4 text-left">
                      <span className="flex items-center gap-2">
                        <FaEnvelope className="inline-block text-blue-300" />
                        <span>Email</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className="flex items-center gap-2">
                        <FaPhone className="inline-block text-blue-300" />
                        <span>Phone</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="inline-block text-blue-300" />
                        <span>Address</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">Role</th>
                    <th className="py-3 px-4 text-left">Policy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr 
                        key={user.id} 
                        className="hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            {user.role === 'doctor' ? (
                              <FaUserMd className="text-blue-200" />
                            ) : user.role === 'admin' ? (
                              <FaUser className="text-blue-200" />
                            ) : (
                              <FaUser className="text-blue-200" />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium">{user.name}</div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-300">
                          {user.email}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-300">
                          {user.phone}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-300 max-w-xs truncate">
                          {user.address}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadge(user.role)}`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col items-center gap-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${getPolicyBadge(user.policyType)}`}>
                              {user.policyType === 'medical_aid' ? 'Medical Aid' : 'Cash'}
                            </span>
                            {user.policyType === 'medical_aid' && user.medicalAidProvider && (
                              <div className="text-xs text-gray-400 flex items-center">
                                <FaIdCard className="mr-1 text-blue-300" />
                                <span className="max-w-[100px] truncate" title={user.medicalAidProvider}>
                                  {user.medicalAidProvider}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-gray-400">
                        No users found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;