import React from 'react';
import { UserCircle, Lock, Bell, Trash2, LogOut } from 'lucide-react';

export default function PatientSettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-800 py-12 px-2 sm:px-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-xl">Settings</h1>
      <div className="w-full max-w-2xl space-y-8">
        {/* Profile Info */}
        <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <UserCircle className="w-7 h-7 text-blue-600" />
            <span className="text-xl font-semibold text-blue-800">Profile Information</span>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" className="w-full rounded-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full rounded-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500" placeholder="john@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" className="w-full rounded-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500" placeholder="+1234567890" />
            </div>
            <div className="flex items-end">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Save Changes</button>
            </div>
          </form>
        </section>
        {/* Password Change */}
        <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-7 h-7 text-blue-600" />
            <span className="text-xl font-semibold text-blue-800">Change Password</span>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input type="password" className="w-full rounded-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" className="w-full rounded-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input type="password" className="w-full rounded-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
            </div>
            <div className="flex items-end">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Update Password</button>
            </div>
          </form>
        </section>
        {/* Notification Preferences */}
        <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-7 h-7 text-blue-600" />
            <span className="text-xl font-semibold text-blue-800">Notification Preferences</span>
          </div>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="accent-blue-600 w-5 h-5" defaultChecked />
              <span className="text-gray-700">Email Notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="accent-blue-600 w-5 h-5" />
              <span className="text-gray-700">SMS Alerts</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="accent-blue-600 w-5 h-5" defaultChecked />
              <span className="text-gray-700">Appointment Reminders</span>
            </label>
          </div>
        </section>
        {/* Account Actions */}
        <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <Trash2 className="w-7 h-7 text-red-600" />
            <span className="text-xl font-semibold text-red-700">Danger Zone</span>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2 max-w-xs">
            <Trash2 className="w-5 h-5" /> Delete Account
          </button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center gap-2 max-w-xs">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </section>
      </div>
    </div>
  );
}
