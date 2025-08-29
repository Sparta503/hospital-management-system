'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Dynamically import Chart with SSR disabled
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function BarChart() {
  const [chartWidth, setChartWidth] = useState<number>(500);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Responsive handler
  useEffect(() => {
    function handleResize() {
      if (chartContainerRef.current) {
        const containerWidth = chartContainerRef.current.offsetWidth;
        setChartWidth(Math.max(Math.min(containerWidth, 700), 300));
      }
    }

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Type the chart options
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      background: 'transparent',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          customIcons: []
        },
        autoSelected: 'selection' as const
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
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
        columnWidth: '40%',
        distributed: true,
        dataLabels: { 
          position: 'top' as const 
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val: number) { 
        return `${val} appts`; 
      },
      offsetY: -20,
      style: { 
        fontSize: '12px', 
        colors: ['#fff'] 
      }
    },
    stroke: { 
      show: true, 
      width: 2, 
      colors: ['transparent'] 
    },
    xaxis: {
      categories: ['Checkup', 'Follow-up', 'Consultation', 'Procedure', 'Emergency'],
      labels: {
        style: { 
          colors: '#fff', 
          fontSize: '12px' 
        },
        rotate: -45,
        trim: false,
        hideOverlappingLabels: true,
      },
      axisBorder: { 
        color: '#4b5563' 
      },
      axisTicks: { 
        color: '#4b5563' 
      }
    },
    yaxis: {
      title: { 
        text: 'Appointments', 
        style: { 
          color: '#fff',
          fontSize: '12px'
        } 
      },
      labels: { 
        style: { 
          colors: '#fff',
          fontSize: '12px'
        } 
      },
      min: 0,
      tickAmount: 5
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8
      }
    },
    tooltip: {
      theme: 'dark' as const,
      y: { 
        formatter: function(val: number) { 
          return `${val} appointments`; 
        } 
      }
    },
    theme: { 
      mode: 'dark' as const 
    },
    responsive: [
      {
        breakpoint: 1920,
        options: { 
          chart: { 
            height: 400 
          } 
        }
      },
      {
        breakpoint: 1080,
        options: { 
          chart: { 
            height: 350 
          } 
        }
      },
      {
        breakpoint: 600,
        options: { 
          chart: { 
            height: 250 
          } 
        }
      }
    ]
  };

  const series = [{
    name: 'Appointments',
    data: [24, 18, 15, 12, 8] // Sample data for different appointment types
  }];

  return (
    <div
      ref={chartContainerRef}
      className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 sm:p-6 rounded-xl shadow-xl text-white w-full max-w-4xl mx-auto"
      style={{ minWidth: 0 }}
    >
      <h3 className="text-xl font-semibold mb-4">Appointment Distribution</h3>
      <div className="space-y-4">
        <div className="w-full overflow-x-auto">
          {typeof window !== 'undefined' && (
            <Chart
              options={options}
              series={series}
              type="bar"
              height={options.chart?.height}
              width={chartWidth}
            />
          )}
        </div>
        <div className="flex justify-center space-x-8 mt-4 flex-wrap">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
            <span className="text-sm">Total Appointments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
