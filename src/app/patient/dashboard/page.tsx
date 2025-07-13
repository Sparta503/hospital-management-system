'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { 
  Calendar, 
  FileText, 
  Pill, 
  MessageSquare,
} from 'lucide-react';

// Mock data - replace with actual API calls
const barChartData = {
  options: {
    chart: {
      type: 'bar' as const,
      height: 350,
      toolbar: {
        show: false,
      },
      background: 'transparent',
      foreColor: '#6B7280',
      fontFamily: 'Inter, sans-serif',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        }
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 0.1,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        endingShape: 'rounded',
        borderRadius: 8,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#6B7280'],
        fontWeight: 'bold',
      },
    },
    colors: ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'],
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      title: {
        text: 'Patients',
        style: {
          color: '#6B7280',
          fontSize: '12px',
          fontWeight: 600,
        },
      },
      labels: {
        style: {
          colors: '#9CA3AF',
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      borderColor: '#F3F4F6',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.4,
        gradientToColors: ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val: number) {
          return val + (val === 1 ? ' patient' : ' patients');
        },
      },
      marker: {
        show: false,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.15,
        },
      },
    },
  },
  series: [
    {
      name: 'Patients',
      data: [
        { x: 'Mon', y: 30, fillColor: '#4F46E5' },
        { x: 'Tue', y: 40, fillColor: '#7C3AED' },
        { x: 'Wed', y: 45, fillColor: '#EC4899' },
        { x: 'Thu', y: 50, fillColor: '#F59E0B' },
        { x: 'Fri', y: 49, fillColor: '#10B981' },
        { x: 'Sat', y: 35, fillColor: '#3B82F6' },
        { x: 'Sun', y: 25, fillColor: '#8B5CF6' },
      ],
    },
  ],
};
const upcomingAppointments = [
  { id: 1, doctor: 'Dr. Sarah Johnson', date: '2025-07-15', time: '10:00 AM', type: 'General Checkup' },
  { id: 2, doctor: 'Dr. Michael Chen', date: '2025-07-20', time: '2:30 PM', type: 'Follow-up' },
];

const recentRecords = [
  { id: 1, date: '2025-06-28', type: 'Blood Test', status: 'Completed' },
  { id: 2, date: '2025-06-20', type: 'X-Ray', status: 'Completed' },
  { id: 3, date: '2025-05-15', type: 'Annual Physical', status: 'Completed' },
];

const quickActions = [
  { id: 1, title: 'Book Appointment', icon: <Calendar className="w-6 h-6" />, path: '/appointments/book' },
  { id: 2, title: 'View Records', icon: <FileText className="w-6 h-6" />, path: '/medical-records' },
  { id: 3, title: 'Request Prescription', icon: <Pill className="w-6 h-6" />, path: '/prescriptions/request' },
  { id: 4, title: 'Message Doctor', icon: <MessageSquare className="w-6 h-6" />, path: '/messages' },
];

// Chart data and options
const chartOptions: ApexCharts.ApexOptions = {
  chart: {
    type: 'donut' as const,
    foreColor: '#6B7280',
    fontFamily: 'Inter, sans-serif',
    height: 350,
  },
  colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
  labels: ['General Checkup', 'Dental', 'Cardiology', 'Dermatology'],
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '14px',
            fontWeight: 500,
            color: '#6B7280',
          },
          value: {
            show: true,
            fontSize: '24px',
            fontWeight: 600,
            color: '#111827',
            formatter: (val: string) => `${val}%`,
          },
          total: {
            show: true,
            label: 'Total',
            color: '#6B7280',
            formatter: () => '100%',
          },
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};

const healthChartOptions: ApexCharts.ApexOptions = {
  ...chartOptions,
  chart: {
    ...chartOptions.chart,
    type: 'donut' as const,
  },
  colors: ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
  labels: ['Excellent', 'Good', 'Fair', 'Needs Attention'],
  plotOptions: {
    pie: {
      ...chartOptions.plotOptions?.pie,
      donut: {
        ...chartOptions.plotOptions?.pie?.donut,
        labels: {
          ...chartOptions.plotOptions?.pie?.donut?.labels,
          value: {
            ...chartOptions.plotOptions?.pie?.donut?.labels?.value,
            formatter: (val: string) => val,
          },
          total: {
            ...chartOptions.plotOptions?.pie?.donut?.labels?.total,
            formatter: () => 'Health',
          },
        },
      },
    },
  },
};

const chartSeries = [35, 25, 20, 20];
const healthSeries = [40, 30, 20, 10];

export default function PatientDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated or not a patient
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
    <Box sx={{ width: '100%', bgcolor: 'background.default' }}>
      <Container 
        maxWidth={false} 
        sx={{ 
          p: 3, 
          m: 0, 
          width: 'calc(100% - 80px)',
          maxWidth: '100% !important',
          ml: '40px',
          mr: '40px',
        }}
      >
        <div className="space-y-6 w-full">
        {/* Search Bar */}
        <div className="flex justify-center w-full mb-8 px-4">
          <div className="relative w-full max-w-2xl group">
            {/* Animated border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-70 group-hover:opacity-100 blur-sm transition-all duration-300 group-hover:duration-200 animate-pulse"></div>
            
            <div className="relative flex items-center bg-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-5 py-4 bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-400 transition-all duration-300"
                placeholder="Search appointments, records, and more..."
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                Search
              </button>
            </div>
            
            {/* Glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 -z-10"></div>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="text-gray-600 mt-1">Here&apos;s what&apos;s happening with your health today</p>
          </div>
          <div className="mt-4 md:mt-0 ml-4">
            <button 
              onClick={() => router.push('/appointments/book')}
              className="animate-blink inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              <Calendar className="-ml-1 mr-3 h-6 w-6" />
              <span className="font-semibold">Book Appointment</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="relative">
          {/* Grid pattern background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Upcoming Appointments Card */}
          <div className="relative group p-0.5 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
            <div className="relative bg-white rounded-xl p-5 h-full">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl p-3 shadow-md">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-500">Upcoming Appointments</h3>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">2</p>
                    <span className="ml-2 text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">Next in 3 days</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <a href="/appointments" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center group">
                  View all appointments
                  <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Medical Records Card */}
          <div className="relative group p-0.5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
            <div className="relative bg-white rounded-xl p-5 h-full">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl p-3 shadow-md">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-500">Medical Records</h3>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500">12</p>
                    <span className="ml-2 text-xs font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded-full">3 new</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <a href="/medical-records" className="text-sm font-medium text-green-600 hover:text-green-500 flex items-center group">
                  View all records
                  <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Active Prescriptions Card */}
          <div className="relative group p-0.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
            <div className="relative bg-white rounded-xl p-5 h-full">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl p-3 shadow-md">
                  <Pill className="h-6 w-6" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-500">Active Prescriptions</h3>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">3</p>
                    <span className="ml-2 text-xs font-medium text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">1 expiring</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <a href="/prescriptions" className="text-sm font-medium text-amber-600 hover:text-amber-500 flex items-center group">
                  View all prescriptions
                  <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Unread Messages Card */}
          <div className="relative group p-0.5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
            <div className="relative bg-white rounded-xl p-5 h-full">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-3 shadow-md">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-500">Unread Messages</h3>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">2</p>
                    <span className="ml-2 text-xs font-medium text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full">New message</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <a href="/messages" className="text-sm font-medium text-purple-600 hover:text-purple-500 flex items-center group">
                  View all messages
                  <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Health Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col lg:col-span-1">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment Types</h3>
            <div className="flex-1 flex items-center justify-center h-[250px]">
              {typeof window !== 'undefined' && (
                <div className="w-full max-w-[300px] mx-auto">
                  <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="donut"
                    height={250}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Health Status</h3>
            <div className="flex-1 flex items-center justify-center h-[250px]">
              {typeof window !== 'undefined' && (
                <div className="w-full max-w-[300px] mx-auto">
                  <Chart
                    options={healthChartOptions}
                    series={healthSeries}
                    type="donut"
                    height={250}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Weekly Activity Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col lg:col-span-1">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Activity</h3>
            <div className="flex-1">
              {typeof window !== 'undefined' && (
                <Chart
                  options={barChartData.options}
                  series={barChartData.series}
                  type="bar"
                  height={300}
                />
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Appointments</h3>
                  <button 
                    onClick={() => router.push('/appointments')}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{appointment.doctor}</div>
                          <div className="text-sm text-gray-500">{appointment.type}</div>
                          <div className="mt-1 text-sm text-gray-500">
                            {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            <span className="mx-2">•</span>
                            {appointment.time}
                          </div>
                        </div>
                        <div className="ml-auto">
                          <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-12 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming appointments</h3>
                    <p className="mt-1 text-sm text-gray-500">Book an appointment to get started.</p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => router.push('/appointments/book')}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Calendar className="-ml-1 mr-2 h-5 w-5" />
                        Book Appointment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* View Records Section */}
            <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
              <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">View Records</h3>
                <button 
                  onClick={() => router.push('/medical-records')}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  View All
                </button>
              </div>
              <div className="px-6 py-4">
                <p className="text-sm text-gray-600 mb-3">
                  Access your medical records from previous months and years.
                </p>
                <button
                  onClick={() => router.push('/medical-records')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <FileText className="-ml-1 mr-2 h-5 w-5" />
                  View Past Records
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Records */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => router.push(action.path)}
                      className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-150"
                    >
                      <div className="bg-blue-100 p-3 rounded-full mb-2">
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{action.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Records */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Medical Records</h3>
                  <button 
                    onClick={() => router.push('/medical-records')}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentRecords.length > 0 ? (
                  recentRecords.map((record) => (
                    <div key={record.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/medical-records/${record.id}`)}>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-100 p-2 rounded-md">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{record.type}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                        <div className="ml-auto">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {record.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center">
                    <FileText className="mx-auto h-10 w-10 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No records found</h3>
                    <p className="mt-1 text-sm text-gray-500">Your medical records will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </Container>
    </Box>
  );
}
