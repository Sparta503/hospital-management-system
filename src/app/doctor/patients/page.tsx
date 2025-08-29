'use client';

import React, { useState } from 'react';
import { UserCircle, Phone, Mail, DollarSign, CalendarDays, Search } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  age: number;
  contact: string;
  email: string;
  paymentType: 'Cash' | 'Monthly Subscription';
  amount: number;
}

const patients: Patient[] = [
  { id: 1, name: 'Alice Smith', age: 29, contact: '+1234567890', email: 'alice@email.com', paymentType: 'Cash', amount: 200 },
  { id: 2, name: 'Bob Lee', age: 42, contact: '+1987654321', email: 'bob@email.com', paymentType: 'Monthly Subscription', amount: 150 },
  { id: 3, name: 'Clara Evans', age: 36, contact: '+1122334455', email: 'clara@email.com', paymentType: 'Cash', amount: 300 },
  { id: 4, name: 'David Kim', age: 51, contact: '+1222333444', email: 'david@email.com', paymentType: 'Monthly Subscription', amount: 120 },
  { id: 5, name: 'Ella Brown', age: 24, contact: '+1444555666', email: 'ella@email.com', paymentType: 'Cash', amount: 180 },
  { id: 6, name: 'Frank Green', age: 47, contact: '+1555666777', email: 'frank@email.com', paymentType: 'Monthly Subscription', amount: 200 },
  { id: 7, name: 'Grace White', age: 33, contact: '+1666777888', email: 'grace@email.com', paymentType: 'Cash', amount: 250 },
  { id: 8, name: 'Henry Black', age: 39, contact: '+1777888999', email: 'henry@email.com', paymentType: 'Monthly Subscription', amount: 130 },
  { id: 9, name: 'Ivy Wilson', age: 28, contact: '+1888999000', email: 'ivy@email.com', paymentType: 'Cash', amount: 220 },
  { id: 10, name: 'Jack Davis', age: 54, contact: '+1999000111', email: 'jack@email.com', paymentType: 'Monthly Subscription', amount: 175 },
];

const total = patients.reduce((sum, p) => sum + p.amount, 0);

const INITIAL_VISIBLE = 5;

export default function AdminPatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPayment, setFilterPayment] = useState<'all' | Patient['paymentType']>('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const showMore = () => setVisibleCount(filteredPatients.length);
  const showLess = () => setVisibleCount(INITIAL_VISIBLE);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.contact.includes(searchTerm);
    
    const matchesPayment = filterPayment === 'all' || patient.paymentType === filterPayment;
    
    return matchesSearch && matchesPayment;
  });

  const visiblePatients = filteredPatients.slice(0, visibleCount);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 bg-gradient-to-br from-blue-700 to-blue-900 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-6 mt-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <UserCircle className="inline-block text-blue-200 text-3xl drop-shadow" />
            Patients Management
          </h1>
          <div className="flex items-center gap-4">
            <DollarSign className="w-6 h-6 text-green-300" />
            <span className="text-lg font-semibold text-green-200">Total:</span>
            <span className="text-xl font-bold text-white">${total.toLocaleString()}</span>
          </div>
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
                  <Search className="text-gray-400 w-4 h-4" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <select
                  className="block w-full pl-3 pr-10 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value as 'all' | 'Cash' | 'Monthly Subscription')}
                >
                  <option value="all">All Payment Types</option>
                  <option value="Cash">Cash</option>
                  <option value="Monthly Subscription">Monthly Subscription</option>
                </select>
              </div>
              <div className="flex items-center justify-end">
                <span className="text-sm text-gray-300">
                  {filteredPatients.length} {filteredPatients.length === 1 ? 'patient' : 'patients'} found
                </span>
              </div>
            </div>
          </div>

          {/* Patients Table */}
          <div className="overflow-x-auto">
            <div className="transition-all duration-500 w-full">
              <table className="w-full text-white">
                <thead className="sticky top-0 bg-blue-800 z-10">
                  <tr>
                    <th className="py-3 px-4 text-left rounded-tl-lg">
                      <UserCircle className="w-5 h-5 text-blue-300" />
                    </th>
                    <th className="py-3 px-4 text-left min-w-[140px]">
                      <span className="whitespace-nowrap text-base">Patient</span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Phone className="w-4 h-4 text-blue-300 flex-shrink-0" />
                        <span className="text-base">Contact</span>
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left min-w-[180px]">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Mail className="w-4 h-4 text-blue-300 flex-shrink-0" />
                        <span className="text-base">Email</span>
                      </div>
                    </th>
                    <th className="py-3 px-4 text-center whitespace-nowrap text-base">Age</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap text-base">Payment</th>
                    <th className="py-3 px-4 text-right rounded-tr-lg text-base">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {visiblePatients.length > 0 ? (
                    visiblePatients.map((patient) => (
                      <tr 
                        key={patient.id}
                        className="transition-all duration-200 transform hover:scale-[1.01] bg-gray-900 hover:bg-gray-700 hover:shadow-lg"
                      >
                        <td className="py-4 px-4">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <UserCircle className="text-blue-200 w-4 h-4" />
                          </div>
                        </td>
                        <td className="py-4 px-4 min-w-[140px]">
                          <div className="font-medium text-base group-hover:text-blue-300 transition-colors duration-200 truncate">
                            {patient.name}
                          </div>
                        </td>
                        <td className="py-4 px-4 group">
                          <div className="text-gray-300 group-hover:text-blue-100 transition-colors duration-200 truncate">
                            {patient.contact}
                          </div>
                        </td>
                        <td className="py-4 px-4 min-w-[180px] group">
                          <div className="text-gray-300 group-hover:text-blue-100 transition-colors duration-200 truncate">
                            {patient.email}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-700">
                            {patient.age}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col items-start gap-1">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                              patient.paymentType === 'Cash' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {patient.paymentType === 'Cash' ? 'Cash' : 'Subscription'}
                            </span>
                            <div className="text-sm text-green-400 font-medium">
                              ${patient.amount.toLocaleString()}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex justify-end gap-2">
                            <button className="p-1.5 text-blue-400 hover:text-blue-300 rounded-full hover:bg-blue-900/30 transition-all duration-200 hover:scale-110 transform">
                              <CalendarDays className="w-5 h-5" />
                            </button>
                            <button className="p-1.5 text-green-400 hover:text-green-300 rounded-full hover:bg-green-900/30 transition-all duration-200 hover:scale-110 transform">
                              <Mail className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-gray-400">
                        No patients found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              {filteredPatients.length > INITIAL_VISIBLE && (
                <div className="flex justify-center p-4 bg-gray-800 border-t border-gray-700">
                  <button
                    onClick={visibleCount < filteredPatients.length ? showMore : showLess}
                    className={`px-6 py-2 rounded-lg shadow transition ${
                      visibleCount < filteredPatients.length 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                  >
                    {visibleCount < filteredPatients.length ? 'Show More' : 'Show Less'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}