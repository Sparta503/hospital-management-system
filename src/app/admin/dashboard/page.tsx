'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import { 
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  MonetizationOn as MonetizationOnIcon,
  Dashboard as DashboardIcon,



} from '@mui/icons-material';
import { Plus as PlusIcon } from 'lucide-react';
import React from 'react';
import RolePieChart from './roleChart';
import ResourceAllocationChart from './resourceAllocationChart';
import RevenueBarChart from './revenueBarChart';
import RecentQueries from './recentQueries';
import QuickActions from './QuickActions';

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

const DashboardCards: React.FC = () => {
  const stats = [
    {
      title: 'Upcoming Appointments',
      value: '3',
      icon: <DashboardIcon fontSize="small" />,
      change: '2 this week',
      iconBg: 'bg-gradient-to-br from-blue-600 to-blue-800'
    },
    {
      title: 'Medical Records',
      value: '12',
      icon: <PeopleIcon fontSize="small" />,
      change: '3 new updates',
      iconBg: 'bg-gradient-to-br from-blue-600 to-blue-800'
    },
    {
      title: 'Prescriptions',
      value: '2',
      icon: <ShoppingCartIcon fontSize="small" />,
      change: '1 expiring soon',
      iconBg: 'bg-gradient-to-br from-blue-600 to-blue-800'
    },
    {
      title: 'Messages',
      value: '5',
      icon: <MonetizationOnIcon fontSize="small" />,
      change: '2 unread',
      iconBg: 'bg-gradient-to-br from-blue-600 to-blue-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 mt-6 sm:mt-10">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          iconBg={stat.iconBg}
        />
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!user) router.push('/login');
    else if (user.role !== 'admin') router.push(`/${user.role}/dashboard`);
  }, [user, router]);

  if (!isMounted || !user || user.role !== 'admin') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <div className="min-h-screen w-full bg-blue-500">
      <Container
        maxWidth={false}
      sx={{
        p: 3,
        m: 0,
        width: 'calc(100% - 80px)',
        maxWidth: '100% !important',
        ml: '0px',
        mr: '16px',
      }}
    >
    

      {/* Shared Search Bar */}
      <SearchBar />
      {/* Welcome Message */}
      <div className="mb-8 mt-6">
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
          Welcome, Administrator {user.name}!
        </h1>
        <p className="text-white">Here you can manage users, staff, appointments, and view system analytics.</p>
      </div>
      {/* Shared Patient Dashboard Cards */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-black">Overview</h2>
        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200/50 active:scale-95 animate-pulse"
          onClick={() => alert('Add User clicked')}
        >
          <PlusIcon className="w-5 h-5 mr-1 animate-bounce" />
          Add User
        </button>
      </div>
      <DashboardCards />


      {/* Main Content Area: Admin Charts */}
      <div className="flex flex-col md:flex-row gap-6 mt-8 mb-8 justify-center items-stretch flex-wrap">
        <RolePieChart />
        <ResourceAllocationChart />
        <RevenueBarChart />
      </div>
      {/* Actions & Queries Row */}
      <div className="flex flex-col md:flex-row gap-20 mb-8 items-stretch">
        <div className="flex-[2] min-w-[320px] ml-[60px]">
          <RecentQueries />
        </div>
        <div className="flex-1 min-w-[300px] max-w-xs">
          <QuickActions />
        </div>
      </div>
      </Container>
    </div>
  );
}
