'use client';

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AppointmentTypesChart = () => {
  const options = {
    chart: {
      type: 'donut' as const,
      background: '#e0f2fe',
      foreColor: '#1e3a8a',
      toolbar: {
        show: false
      },
    },
    plotOptions: {
      pie: {
        donut: {
          background: '#e0f2fe',
        },
      },
    },
    theme: {
      mode: 'light' as const,
      palette: 'palette1',
      monochrome: {
        enabled: false,
      },
    },
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    labels: ['General Checkup', 'Dental', 'Cardiology', 'Dermatology', 'Other'],
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'],
    legend: {
      position: 'bottom' as const,
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const series = [44, 55, 13, 43, 22];

  const chartOptions = {
    ...options,
    chart: {
      ...options.chart,
      background: 'transparent',
      dropShadow: {
        enabled: true,
        top: 4,
        left: 0,
        blur: 8,
        color: '#6366f1',
        opacity: 0.25,
      },
    },
    legend: {
      position: 'bottom' as const,
      fontSize: '14px',
      labels: { colors: '#222' },
      itemMargin: { horizontal: 16, vertical: 8 },
    },
    dataLabels: {
      enabled: true,
      style: { 
        fontSize: '14px', 
        fontWeight: 600,
        colors: ['#fff']
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        color: '#000',
        opacity: 0.15,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['#fff'],
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: { width: 300 },
          legend: { fontSize: '12px' },
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Appointment Types</h2>
      <div className="h-[300px]">
        {typeof window !== 'undefined' && (
          <Chart
            options={chartOptions}
            series={series}
            type="donut"
            height="100%"
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentTypesChart;
