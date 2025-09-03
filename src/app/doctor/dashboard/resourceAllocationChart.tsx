'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const allocationData = [
  28, // Emergency
  22, // Cardiology
  14, // Pediatrics
  18, // Surgery
  10, // Radiology
  8,  // ICU
];

const allocationLabels = [
  'Emergency',
  'Cardiology',
  'Pediatrics',
  'Surgery',
  'Radiology',
  'ICU',
];

const colors = [
  '#f59e42', // orange
  '#2563eb', // blue
  '#10b981', // green
  '#a21caf', // purple
  '#e11d48', // rose
  '#fbbf24', // yellow
];

const options = {
  chart: {
    type: 'donut' as const,
    background: 'transparent',
    foreColor: '#e2e8f0',
    fontFamily: 'Inter, sans-serif',
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
  labels: allocationLabels,
  legend: {
    show: true,
    position: 'bottom' as const,
    fontSize: '16px',
    labels: { colors: '#e2e8f0' },
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
      opacity: 0.12,
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
    colors: ['#1e293b'], // Dark border color
  },
  tooltip: {
    theme: 'dark',
    enabled: true,
    y: {
      formatter: (val: number) => `${val}%`,
    },
  },
  states: {
    hover: {
      filter: { type: 'lighten', value: 0.1 },
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

const ResourceAllocationChart: React.FC = () => (
  <div className="bg-transparent w-full max-w-xl mx-auto">
    <h2 className="text-xl font-bold mb-4 text-blue-200">Department Resource Allocation</h2>
    <div className="flex justify-center">
      {typeof window !== 'undefined' && (
        <Chart options={options} series={allocationData} type="donut" width={400} />
      )}
    </div>
  </div>
);

export default ResourceAllocationChart;