'use client';

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const WeeklyActivityChart = () => {
  const options = {
    chart: {
      type: 'bar' as const,
      height: 350,
      background: '#e0f2fe',
      foreColor: '#1e3a8a',
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
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    theme: {
      mode: 'light' as const,
      palette: 'palette1',
      monochrome: {
        enabled: false,
      },
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

  const chartOptions = {
    ...options,
    chart: {
      ...options.chart,
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
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '60%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: 'bottom' as const,
      fontSize: '14px',
      labels: { colors: '#222' },
      itemMargin: { horizontal: 16, vertical: 8 },
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          colors: '#4b5563',
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
      labels: {
        style: {
          colors: '#4b5563',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} min`,
      },
    },
    colors: ['#3B82F6', '#60A5FA'],
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: '100%',
          },
          plotOptions: {
            bar: {
              columnWidth: '45%',
            },
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl mx-auto col-span-1 lg:col-span-2">
      <h2 className="text-xl font-bold mb-6 text-blue-700">Weekly Activity</h2>
      <div className="h-[350px]">
        {typeof window !== 'undefined' && (
          <Chart
            options={chartOptions}
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
