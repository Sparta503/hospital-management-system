'use client';

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AppointmentTypesChart = () => {
  const options = {
    chart: {
      type: 'donut' as const,
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

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-black mb-4">Appointment Types</h3>
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

export default AppointmentTypesChart;
