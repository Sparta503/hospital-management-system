'use client';

import React, { useState } from 'react';
import { UserMinus, Trash2, Bell, MailWarning, UserCheck, ShieldCheck, RefreshCw, FileText, Megaphone, UserCircle } from 'lucide-react';

const transferredStaff = [
  { id: 1, name: 'Dr. John Doe', role: 'Doctor' },
  { id: 2, name: 'Nurse Jane Smith', role: 'Nurse' },
];
const unsubscribedUsers = [
  { id: 3, name: 'Alice Brown', email: 'alice@email.com' },
  { id: 4, name: 'Bob Green', email: 'bob@email.com' },
];

export default function AdminSettingsPage() {
  const [deletedStaff, setDeletedStaff] = useState<number[]>([]);
  const [removedUsers, setRemovedUsers] = useState<number[]>([]);
  const [notifiedUsers, setNotifiedUsers] = useState<number[]>([]);

  const handleDeleteStaff = (id: number) => {
    setDeletedStaff((prev) => [...prev, id]);
    alert('Staff deleted (placeholder)');
  };
  const handleRemoveUser = (id: number) => {
    setRemovedUsers((prev) => [...prev, id]);
    alert('User removed (placeholder)');
  };
  const handleNotifyUser = (id: number) => {
    setNotifiedUsers((prev) => [...prev, id]);
    alert('Notification sent (placeholder)');
  };
  const handleResetPasswords = () => {
    alert('Reset all passwords (placeholder)');
  };
  const handleExportData = () => {
    alert('Export user data (placeholder)');
  };
  const handleBroadcast = () => {
    alert('Broadcast announcement (placeholder)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-200 to-indigo-100 py-12 px-2 sm:px-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-8 drop-shadow-xl flex items-center gap-3">
        <ShieldCheck className="w-8 h-8 text-blue-600" />
        Admin Settings & Controls
      </h1>
      <div className="w-full max-w-4xl flex flex-col gap-8">
        {/* Delete Transferred Staff */}
        <section className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <UserMinus className="w-7 h-7 text-red-500" />
            <span className="text-xl font-semibold text-blue-800">Delete Transferred Staff</span>
          </div>
          <ul className="space-y-2">
            {transferredStaff.map((staff) => (
              <li key={staff.id} className="flex items-center justify-between p-2 rounded hover:bg-red-50">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-blue-400" />
                  <span className="font-medium text-blue-900">{staff.name}</span>
                  <span className="text-xs text-blue-500 bg-blue-100 rounded px-2 py-0.5 ml-2">{staff.role}</span>
                </div>
                <button
                  className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded border border-red-200 bg-red-50 hover:bg-red-100"
                  onClick={() => handleDeleteStaff(staff.id)}
                  disabled={deletedStaff.includes(staff.id)}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
        {/* Remove Unsubscribed Users */}
        <section className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <MailWarning className="w-7 h-7 text-yellow-500" />
            <span className="text-xl font-semibold text-blue-800">Remove Unsubscribed Users</span>
          </div>
          <ul className="space-y-2">
            {unsubscribedUsers.map((user) => (
              <li key={user.id} className="flex items-center justify-between p-2 rounded hover:bg-yellow-50">
                <div className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5 text-blue-400" />
                  <span className="font-medium text-blue-900">{user.name}</span>
                  <span className="text-xs text-blue-500 bg-blue-100 rounded px-2 py-0.5 ml-2">{user.email}</span>
                </div>
                <button
                  className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 font-medium px-3 py-1 rounded border border-yellow-200 bg-yellow-50 hover:bg-yellow-100"
                  onClick={() => handleRemoveUser(user.id)}
                  disabled={removedUsers.includes(user.id)}
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </li>
            ))}
          </ul>
        </section>
        {/* Notify Unsubscribed Users */}
        <section className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-7 h-7 text-blue-500" />
            <span className="text-xl font-semibold text-blue-800">Notify Unsubscribed Users</span>
          </div>
          <ul className="space-y-2">
            {unsubscribedUsers.map((user) => (
              <li key={user.id} className="flex items-center justify-between p-2 rounded hover:bg-blue-50">
                <div className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5 text-blue-400" />
                  <span className="font-medium text-blue-900">{user.name}</span>
                  <span className="text-xs text-blue-500 bg-blue-100 rounded px-2 py-0.5 ml-2">{user.email}</span>
                </div>
                <button
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded border border-blue-200 bg-blue-50 hover:bg-blue-100"
                  onClick={() => handleNotifyUser(user.id)}
                  disabled={notifiedUsers.includes(user.id)}
                >
                  <Bell className="w-4 h-4" /> Notify
                </button>
              </li>
            ))}
          </ul>
        </section>
        {/* Other Admin Actions */}
        <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-7 h-7 text-blue-600" />
            <span className="text-xl font-semibold text-blue-800">Other Admin Actions</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold hover:bg-blue-200 shadow"
              onClick={handleResetPasswords}
            >
              <RefreshCw className="w-5 h-5" /> Reset All Passwords
            </button>
            <button
              className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-green-200 shadow"
              onClick={handleExportData}
            >
              <FileText className="w-5 h-5" /> Export User Data
            </button>
            <button
              className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-200 shadow"
              onClick={handleBroadcast}
            >
              <Megaphone className="w-5 h-5" /> Broadcast Announcement
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}