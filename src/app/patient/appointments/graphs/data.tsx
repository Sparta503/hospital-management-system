'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function TrendGraph() {
  const [chartWidth, setChartWidth] = useState<number>(600);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Responsive resize handler
  useEffect(() => {
    function handleResponsiveResize() {
      if (chartContainerRef.current) {
        const width = chartContainerRef.current.offsetWidth;
        setChartWidth(width);
      }
      // Sidebar detection removed as it's not being used
    }

    // Type for the observer
    let observer: MutationObserver | undefined;

    handleResponsiveResize();
    window.addEventListener('resize', handleResponsiveResize);

    // Observe sidebar collapse/expand for layout changes
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      observer = new MutationObserver(handleResponsiveResize);
      observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
    }

    return () => {
      window.removeEventListener('resize', handleResponsiveResize);
      if (observer) observer.disconnect();
    };
  }, []);

  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      background: 'transparent',
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 350 }
      }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { style: { colors: '#fff' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: { style: { colors: '#fff' } }
    },
    grid: {
      borderColor: 'rgba(255,255,255,0.1)',
      strokeDashArray: 4,
      xaxis: { lines: { show: true } }
    },
    tooltip: { theme: 'dark', x: { format: 'MMM' } },
    theme: { mode: 'dark' },
    responsive: [
      {
        breakpoint: 1920,
        options: { chart: { height: 400 } }
      },
      {
        breakpoint: 1080,
        options: { chart: { height: 350 } }
      },
      {
        breakpoint: 600,
        options: { chart: { height: 250 } }
      }
    ]
  };

  const series = [
    {
      name: 'New Patients',
      data: [24, 32, 28, 35, 42, 58, 45, 62, 55, 48, 51, 67]
    },
    {
      name: 'Follow-up Visits',
      data: [45, 38, 52, 48, 56, 72, 65, 58, 62, 55, 48, 51]
    }
  ];

  return (
    <div
      ref={chartContainerRef}
      className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 md:p-6 rounded-xl shadow-xl text-white w-full max-w-4xl transition-all duration-300 overflow-hidden mt-10 mx-auto"
      style={{ minWidth: 0 }}
    >
      <h3 className="text-lg md:text-xl font-semibold mb-4">Monthly Patient Visits</h3>
      <div className="space-y-4 relative">
        <div className="w-full overflow-hidden">
          <Chart
            options={options}
            series={series}
            type="area"
            height={options.chart?.height || 350}
            width={chartWidth}
          />
        </div>
        <div className="flex justify-center space-x-8 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
            <span className="text-sm">New Patients</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
            <span className="text-sm">Follow-up Visits</span>
          </div>
        </div>
      </div>
    </div>
  );
}
