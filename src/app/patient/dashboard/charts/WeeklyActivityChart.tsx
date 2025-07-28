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
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 16,
        color: '#60a5fa',
        opacity: 0.18,
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 12,
        horizontal: false,
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    colors: ['#2563eb', '#60a5fa'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.4,
        gradientToColors: ['#60a5fa'],
        inverseColors: false,
        opacityFrom: 0.95,
        opacityTo: 0.85,
        stops: [0, 100]
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['#fff'],
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
