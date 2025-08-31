'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import AppointmentsSection from './AppointmentsSection';
import QuickActions from './QuickActions';
import RecentRecords from './RecentRecords';
import dynamic from 'next/dynamic';

// Dynamically import charts to avoid SSR issues
const AppointmentTypesChart = dynamic(
  () => import('./charts/AppointmentTypesChart'), 
  { ssr: false }
);

const HealthStatusChart = dynamic(
  () => import('./charts/HealthStatusChart'), 
  { ssr: false }
);

const WeeklyActivityChart = dynamic(
  () => import('./charts/WeeklyActivityChart'), 
  { ssr: false }
);

import { 
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  MonetizationOn as MonetizationOnIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';

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

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'patient') {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user, router]);

  if (!user || user.role !== 'patient') {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="min-h-screen w-full bg-blue-500">
      <div className="container mx-auto pl-4 pr-0 py-8">
        <SearchBar />
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
            Welcome back, {user.name}!
          </h1>
          <p className="text-white">Here&apos;s what&apos;s happening with your health today</p>
        </div>
        <DashboardCards />
        {/* Charts Section */}
        <div className="flex flex-col md:flex-row gap-8 mt-8 mb-8 justify-center items-stretch flex-wrap">
          <div className="flex-1 min-w-[300px] max-w-md" style={{ transform: 'translateX(-300px)' }}>
            <AppointmentTypesChart />
          </div>
          <div className="flex-1 min-w-[300px] max-w-md">
            <HealthStatusChart />
          </div>
          <div className="flex-1 min-w-[300px] max-w-md" style={{ transform: 'translateX(300px)' }}>
            <WeeklyActivityChart />
          </div>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6 -ml-8">
            <AppointmentsSection />
            <RecentRecords />
          </div>
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}