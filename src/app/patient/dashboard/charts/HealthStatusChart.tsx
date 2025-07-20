'use client';

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const HealthStatusChart = () => {
  const options = {
    chart: {
      type: 'donut' as const,
    },
    labels: ['Excellent', 'Good', 'Fair', 'Poor'],
    colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
    legend: {
      position: 'bottom' as const,
    },
  };

  const series = [70, 20, 7, 3];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-black mb-4">Health Status</h3>
      <div className="h-[300px]">
        {typeof window !== 'undefined' && (
          <Chart
            options={options}
            series={series}
            type="donut"
            height="100%"
          />
        )}
      </div>
    </div>
  );
};

export default HealthStatusChart;
