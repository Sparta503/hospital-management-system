'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated or not a doctor
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'doctor') {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user, router]);

  if (!user || user.role !== 'doctor') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Doctor Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, Dr. {user.name}!</h2>
          <p className="text-gray-600">You are logged in as a doctor.</p>
          {/* Add doctor-specific content here */}
        </div>
      </div>
    </div>
  );
}
