'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const roleData = [
  24, // Doctors
  36, // Nurses
  4,  // Admins
  8,  // Receptionists
  120, // Patients
  6,  // Pharmacists
];

const roleLabels = [
  'Doctors',
  'Nurses',
  'Admins',
  'Receptionists',
  'Patients',
  'Pharmacists',
];

const colors = [
  '#2563eb', // blue
  '#10b981', // emerald
  '#f59e42', // orange
  '#a21caf', // purple
  '#e11d48', // rose
  '#fbbf24', // yellow
];

const options = {
  chart: {
    type: 'donut' as const,
    background: 'transparent',
    toolbar: { show: false },
    dropShadow: {
      enabled: true,
      top: 4,
      left: 0,
      blur: 8,
      color: '#6366f1',
      opacity: 0.25,
    },
  },
  labels: roleLabels,
  legend: {
    show: true,
    position: 'bottom' as const,
    fontSize: '16px',
    labels: { colors: '#222' },
    itemMargin: { horizontal: 16, vertical: 8 },
  },
  dataLabels: {
    enabled: true,
    style: { fontSize: '16px', fontWeight: 600 },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      color: '#000',
      opacity: 0.15,
    },
    formatter: (val: number) => `${Math.round(val)}%`,
  },
  colors,
  fill: {
    type: 'gradient',
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['#fff'],
  },
  tooltip: {
    y: {
      formatter: (val: number) => `${val} users`,
    },
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        chart: { width: 320 },
        legend: { fontSize: '13px' },
      },
    },
  ],
};

const RolePieChart: React.FC = () => (
  <div className="bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-blue-800/10 backdrop-blur-sm rounded-2xl shadow-lg p-6 w-full max-w-xl mx-auto border border-blue-400/20">
    <h2 className="text-xl font-bold mb-4 text-blue-200">User Roles Distribution</h2>
    <div className="flex justify-center">
      {typeof window !== 'undefined' && (
        <Chart 
          options={{
            ...options,
            chart: {
              ...options.chart,
              background: 'transparent',
              foreColor: '#e2e8f0'
            },
            theme: { mode: 'dark' as const }
          }} 
          series={roleData} 
          type="donut" 
          width={400} 
        />
      )}
    </div>
  </div>
);

export default RolePieChart;
