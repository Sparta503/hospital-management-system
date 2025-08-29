'use client';

import React, { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Dynamically import Chart component with no SSR
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AppointmentStatusChart(): ReactElement {
  const chartWidth = '100%';

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      height: 400,
      background: 'transparent',
      toolbar: { show: false },
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
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.9,
        opacityTo: 0.95,
        stops: [0, 90, 100]
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              color: '#fff'
            },
            value: {
              show: true,
              fontSize: '14px',
              color: '#fff'
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '16px',
              color: '#fff'
            }
          }
        },
        customScale: 1,
        offsetY: 0,
        expandOnClick: true
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['#1E293B']
    },
    labels: ['Completed', 'In Progress', 'Pending', 'Cancelled'],
    colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
      style: {
        fontSize: '14px',
        colors: ['#fff']
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 2,
        blur: 4,
        opacity: 0.4
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '14px',
      fontFamily: 'Helvetica, Arial',
      fontWeight: 400,
      labels: {
        colors: '#fff'
      },
      markers: {
        size: 12,
        strokeWidth: 0,
        fillColors: ['#fff'],
        offsetX: 0,
        offsetY: 0
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => `${val}% of appointments`
      }
    },
    theme: {
      mode: 'dark'
    }
  };

  const series: number[] = [45, 25, 20, 10]; // Completed, In Progress, Pending, Cancelled

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-xl text-white w-full max-w-full overflow-hidden transition-all duration-300 mt-20 flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-4">Appointment Status</h3>
      <div className="space-y-4 relative flex flex-col items-center w-full">
        <div className="w-full flex justify-center">
          <Chart
            options={options}
            series={series}
            type="donut"
            height={360}
            width={chartWidth}
          />
        </div>
        <div className="flex justify-center space-x-8 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
            <span className="text-sm">Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
            <span className="text-sm">In Progress</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
            <span className="text-sm">Pending</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
            <span className="text-sm">Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  );
}