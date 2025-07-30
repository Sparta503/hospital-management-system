'use client';

import React from 'react';
import { UserCircle, Phone, Mail, CreditCard, DollarSign, CalendarDays } from 'lucide-react';

const patients = [
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

export default function AdminPatientsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-200 to-indigo-100 py-12 px-2 sm:px-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-8 drop-shadow-xl flex items-center gap-3">
        <UserCircle className="w-8 h-8 text-blue-600" />
        Patients Management
      </h1>
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8">
        {/* Total Payments */}
        <div className="mb-6 flex items-center gap-4">
          <DollarSign className="w-7 h-7 text-green-500" />
          <span className="text-xl font-semibold text-green-700">Total Payments:</span>
          <span className="text-2xl font-bold text-green-900">${total.toLocaleString()}</span>
        </div>
        {/* Patients Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-100">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider rounded-tl-lg">Name</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Age</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Payment Type</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-50">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-blue-900 font-medium flex items-center gap-2">
                    <UserCircle className="w-5 h-5 text-blue-400" /> {p.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-blue-700">{p.age}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-blue-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-400" /> {p.contact}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-blue-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" /> {p.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${p.paymentType === 'Cash' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                      {p.paymentType === 'Cash' ? <DollarSign className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />} {p.paymentType}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-green-700 font-semibold">${p.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium">
                      <CalendarDays className="w-4 h-4" /> View Appointments
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}