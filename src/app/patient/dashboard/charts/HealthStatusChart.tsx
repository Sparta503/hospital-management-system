'use client';

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const HealthStatusChart = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const series = [70, 20, 7, 3];

  const chartOptions = {
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
    labels: ['Excellent', 'Good', 'Fair', 'Poor'],
    colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
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
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Status Overview</h3>
      <div className="h-64">
        {typeof window !== 'undefined' && (
          <Chart
            options={chartOptions}
            series={series}
            type="donut"
            width="100%"
            height="100%"
          />
        )}
      </div>
    </div>
  );
};

export default HealthStatusChart;
