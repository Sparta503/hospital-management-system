'use client';

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const WeeklyActivityChart = () => {
  const options = {
    chart: {
      type: 'bar' as const,
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    colors: ['#3B82F6'],
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + " min";
        }
      }
    }
  };

  const series = [{
    name: 'Activity',
    data: [30, 40, 45, 50, 49, 60, 70]
  }];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-black mb-4">Weekly Activity</h3>
      <div className="h-[350px]">
        {typeof window !== 'undefined' && (
          <Chart
            options={options}
            series={series}
            type="bar"
            height="100%"
          />
        )}
      </div>
    </div>
  );
};

export default WeeklyActivityChart;
