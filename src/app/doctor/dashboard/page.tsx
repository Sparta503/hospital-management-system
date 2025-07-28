'use client';

import { Box, Typography } from '@mui/material';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar'
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';

import MessageIcon from '@mui/icons-material/Message';
import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import NewAppointmentButton from './NewApointmentButton';
import UpcomingAppointments from './UpcomingAppointments';
import RecentAppointments from './RecentAppointments';
import ViewTaskButton from './ViewTask';
import MessagesButton from './messages';
import SmallBarChart from './barchart';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: string;
  iconBg?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  iconBg = 'bg-gradient-to-br from-blue-600 to-blue-800'
}) => {
  return (
    <div className="p-4 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full max-w-full md:max-w-[170px] mx-auto border border-blue-400/20 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <div className={`absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 ${iconBg} rounded-bl-full transform rotate-45 translate-x-4 sm:translate-x-6 -translate-y-4 sm:-translate-y-6`} />
      <div className="flex justify-between items-center mb-2 sm:mb-3">
        <span className="font-semibold text-xs sm:text-sm tracking-wide text-blue-100">
          {title}
        </span>
        <span className="text-blue-200 hover:scale-110 transition-transform animate-bounce relative z-10">
          {icon}
        </span>
      </div>
      <div className="font-bold mb-1 sm:mb-2 text-xl sm:text-2xl tracking-tight text-white animate-pulse">
        {value}
      </div>
      <div className="flex items-center">
        <TrendingUpIcon className="text-blue-200 mr-1 animate-pulse" fontSize="small" />
        <span className="text-blue-200 font-medium text-xs">{change}</span>
      </div>
    </div>
  );
};



export default function DoctorDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Set client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect to login if not authenticated or not a doctor
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'doctor') {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user, router]);

  if (!isClient || !user || user.role !== 'doctor') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <div className="min-h-screen w-full bg-blue-500">
      <div className="container mx-auto px-4 py-8">
        <SearchBar />
        <div className="mb-8 mt-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <span className="inline-block rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 p-1 shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-blue-300/80 animate-blink group relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <style jsx>{`
                  @keyframes blink {
                    0%, 100% { opacity: 1; }
                    45% { opacity: 1; }
                    50% { opacity: 0.2; }
                    55% { opacity: 1; }
                  }
                  .animate-blink { animation: blink 2s infinite; }
                `}</style>
              </span>
              Welcome back, Dr {user?.name}!
            </h1>
            <p className="text-white">Here’s your dashboard overview for today.</p>
          </div>
          {/* No action buttons here, moved to Quick Actions below */}
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 mt-6 sm:mt-10">
          {[
            {
              title: 'Appointments Today',
              value: 12,
              icon: <EventNoteIcon fontSize="small" />,
            change: '2 scheduled',
            iconBg: 'bg-gradient-to-br from-blue-600 to-blue-800',
          },
          {
            title: 'Total Patients',
            value: 84,
            icon: <GroupIcon fontSize="small" />,
            change: '3 new',
            iconBg: 'bg-gradient-to-br from-blue-600 to-blue-800',
          },
          {
            title: 'Pending Tasks',
            value: 5,
            icon: <AssignmentIcon fontSize="small" />,
            change: '1 urgent',
            iconBg: 'bg-gradient-to-br from-blue-600 to-blue-800',
          },
          {
            title: 'Messages',
            value: 7,
            icon: <MessageIcon fontSize="small" />,
            change: '2 unread',
            iconBg: 'bg-gradient-to-br from-blue-600 to-blue-800',
          },
        ].map((stat, idx) => (
          <StatsCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            iconBg={stat.iconBg}
          />
        ))}
        </div>
        {/* Appointments and Quick Actions side by side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Appointments section (2/3 width on desktop) */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <UpcomingAppointments />
            <RecentAppointments />
          </div>
          {/* Quick Actions (1/3 width on desktop) */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 items-start">
              <h2 className="text-lg font-bold text-blue-700 mb-2">Quick Actions</h2>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <NewAppointmentButton />
                  <ViewTaskButton />
                </div>
                <MessagesButton />
              </div>
            </div>
            <div className="mt-20 flex justify-center w-full">
              <SmallBarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
