'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const RevenueBarChart = () => {
  const series = useMemo(() => [
    {
      name: 'Revenue',
      data: [32000, 21000, 14000, 9000, 25000, 7000],
    },
  ], []);

  const options = useMemo(() => ({
    chart: {
      type: 'bar' as const,
      toolbar: { show: false },
      background: 'transparent',
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 20,
        color: '#67e8f9',
        opacity: 0.28,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 12,
        columnWidth: '50%',
        barHeight: '80%',
      },
    },
    colors: undefined, // Use gradient fill only
    dataLabels: { enabled: false },
    grid: { show: false },
    xaxis: {
      categories: ['Outpatient', 'Inpatient', 'Pharmacy', 'Lab Tests', 'Insurance', 'Self-Pay'],
      title: {
        text: 'Revenue Source',
        offsetY: 24,
        style: {
          color: '#2563eb',
          fontWeight: 600,
          fontSize: '13px',
        },
      },
      labels: {
        show: true,
        style: {
          colors: ['#64748b', '#64748b', '#64748b', '#64748b', '#64748b', '#64748b'],
          fontSize: '12px',
          fontWeight: 500,
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: true,
      title: {
        text: 'Revenue (USD)',
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: '#2563eb',
          fontWeight: 600,
          fontSize: '13px',
        },
      },
      labels: {
        show: true,
        style: {
          colors: '#64748b',
          fontSize: '12px',
          fontWeight: 500,
        },
        formatter: (val: number) => `$${val / 1000}k`,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    tooltip: { enabled: true, theme: 'dark', y: { formatter: (val: number) => `$${val.toLocaleString()}` } },
    legend: { show: false },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.85,
        gradientToColors: ['#ef4444', '#6366f1'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100],
      },
    },
    states: {
      hover: { filter: { type: 'lighten', value: 0.9 } },
      active: { filter: { type: 'lighten', value: 0.6 } },
    },
  }), []);

  return (
    <div style={{ width: 300, height: 420, paddingBottom: 24 }} className="flex flex-col items-center md:ml-[-30px]">
      <div className="font-semibold text-blue-700 text-sm mb-2">Revenue by Source</div>
      {/* SVG filter for glowing shadow */}
      <svg width="0" height="0">
        <defs>
          {/* Glossy highlight overlay for 3D illusion */}
          <linearGradient id="barGloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="30%" stopColor="#fff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          {/* Glowing shadow for 3D pop */}
          <filter id="barGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#67e8f9" floodOpacity="0.38" />
          </filter>
        </defs>
      </svg>
      <div style={{ width: 500, height: 400 }}>
        <div style={{position: 'relative', width: 500, height: 400}}>
          <ReactApexChart 
            options={{
              ...options,
              chart: {
                ...options.chart,
                dropShadow: {
                  enabled: true,
                  top: 0,
                  left: 0,
                  blur: 20,
                  color: '#67e8f9',
                  opacity: 0.28,
                },
              },
              plotOptions: {
                ...options.plotOptions,
                bar: {
                  ...options.plotOptions.bar,
                  borderRadius: 12,
                  barHeight: '80%',
                },
              },
            }}
            series={series}
            type="bar"
            height={400}
            width={500}
          />

        </div>
      </div>
    </div>
  );
};

export default RevenueBarChart;