'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface SeriesData {
  name: string;
  data: number[];
}

export default function AppointmentTrend() {
  const [chartWidth, setChartWidth] = useState<string>('100%');

  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        setChartWidth('100%');
      }
    };

    handleResize();
    const observer = new MutationObserver(handleResize);
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
    }

    return () => observer.disconnect();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      background: 'transparent',
      toolbar: {
        show: true,
      },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM', '12AM', '2AM', '4AM', '6AM'],
      labels: {
        style: {
          colors: '#fff'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff'
        }
      }
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'MMM'
      }
    },
    theme: {
      mode: 'dark'
    }
  };

  const series: SeriesData[] = [
    {
      name: 'Appointments',
      data: [45, 52, 38, 65, 55, 72, 80, 91, 76, 85, 78, 95]
    }
  ];

  return (
    <div className="w-full h-full">
      <div className="w-full overflow-hidden">
        <Chart 
          options={{
            ...options,
            chart: {
              ...options.chart,
              toolbar: {
                show: false
              }
            },
            legend: {
              show: false
            },
            tooltip: {
              ...options.tooltip,
              theme: 'dark'
            }
          }} 
          series={series} 
          type="area" 
          height={350}
          width={chartWidth}
        />
      </div>
    </div>
  );
}
