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
    <div className="bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-blue-800/10 backdrop-blur-sm rounded-2xl shadow-lg p-6 w-full max-w-[520px] mx-auto border border-blue-400/20">
      <div className="font-semibold text-blue-200 text-sm mb-2">Revenue by Source</div>
      {/* SVG filter for glowing shadow */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="barGloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="30%" stopColor="#fff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <filter id="barGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#67e8f9" floodOpacity="0.38" />
          </filter>
        </defs>
      </svg>
      <div style={{ width: '100%', height: 380, position: 'relative' }}>
        <ReactApexChart 
          options={{
            ...options,
            chart: {
              ...options.chart,
              background: 'transparent',
              foreColor: '#e2e8f0',
              dropShadow: {
                enabled: true,
                top: 0,
                left: 0,
                blur: 20,
                color: '#67e8f9',
                opacity: 0.28,
              },
            },
            xaxis: {
              ...options.xaxis,
              labels: {
                ...options.xaxis.labels,
                style: {
                  ...options.xaxis.labels.style,
                  colors: '#e2e8f0',
                },
              },
            },
            yaxis: {
              ...options.yaxis,
              labels: {
                ...options.yaxis.labels,
                style: {
                  ...options.yaxis.labels.style,
                  colors: '#e2e8f0',
                },
              },
            },
            theme: { mode: 'dark' as const }
          }}
          series={series}
          type="bar"
          height={380}
          width="100%"
        />
      </div>
    </div>
  );
};

export default RevenueBarChart;