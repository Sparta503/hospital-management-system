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

export default function PatientDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!user) router.push('/login');
    else if (user.role !== 'patient') router.push(`/${user.role}/dashboard`);
  }, [user, router]);

  if (!isMounted || !user || user.role !== 'patient') {
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
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome back, {user.name}!
          </h1>
          <p className="text-blue-100">Here&apos;s what&apos;s happening with your account today.</p>
        </div>
        
        {/* Dashboard Cards */}
        <DashboardCards />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 mb-8">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Staff Distribution</h3>
            <RolePieChart />
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Resource Allocation</h3>
            <ResourceAllocationChart />
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
            <RevenueBarChart />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activities</h3>
              <RecentQueries />
            </div>
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </Container>
    </div>
  );
}
