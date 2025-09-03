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
      foreColor: '#e2e8f0',
      fontFamily: 'Inter, sans-serif',
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 20,
        color: '#60a5fa',
        opacity: 0.25,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 12,
        columnWidth: '50%',
        barHeight: '80%',
      },
    },
    // Colors are defined in the fill gradient
    dataLabels: { enabled: false },
    grid: {
      show: false,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
    },
    xaxis: {
      categories: ['Outpatient', 'Inpatient', 'Pharmacy', 'Lab Tests', 'Insurance', 'Self-Pay'],
      title: {
        text: 'Revenue Source',
        offsetY: 24,
        style: {
          color: '#93c5fd',
          fontWeight: 500,
          fontSize: '13px',
          fontFamily: 'Inter, sans-serif',
        },
      },
      labels: {
        show: true,
        style: {
          colors: '#e2e8f0',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      title: {
        text: 'Amount ($)',
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: '#93c5fd',
          fontWeight: 500,
          fontSize: '13px',
          fontFamily: 'Inter, sans-serif',
        },
      },
      labels: {
        show: true,
        style: {
          colors: '#e2e8f0',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        },
        formatter: (value: number) => `$${value.toLocaleString()}`,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true,
        formatter: (val: number | string) => {
          if (typeof val === 'string') return val;
          return val.toString();
        },
      },
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
        title: {
          formatter: () => 'Amount',
        },
      },
    },
    legend: { show: false },
    colors: ['#10b981'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#34d399', '#10b981', '#059669'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    states: {
      hover: { filter: { type: 'lighten', value: 0.9 } },
      active: { filter: { type: 'lighten', value: 0.6 } },
    },
  }), []);

  return (
    <div className="bg-transparent w-full max-w-[520px] mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-200">Revenue by Source</h2>
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
      <div className="w-full" style={{ height: 380, position: 'relative' }}>
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
          height={380}
          width="100%"
        />
      </div>
    </div>
  );
};

export default RevenueBarChart;