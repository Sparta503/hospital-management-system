'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { ApexOptions } from 'apexcharts';

interface ThreeDPieChartProps {
  labels: string[];
  data: number[];
  colors: string[];
}

export default function ThreeDPieChart({ labels, data, colors }: ThreeDPieChartProps) {
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

  // Pie Chart Configuration
  const pieOptions: ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
      width: '100%',
      height: 400,
      parentHeightOffset: 0,
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
    labels: labels,
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Value',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 600,
            },
          },
        },
        expandOnClick: true,
        offsetY: 10,
      },
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: ['#fff'],
      },
    },
    fill: {
      type: 'gradient',
      colors: colors,
    },
    theme: {
      mode: 'dark',
    },
  };

  // Bar Chart Configuration
  const barOptions: ApexOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: {
        show: false,
      },
      width: chartWidth,
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
        borderRadius: 4,
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'],
      labels: {
        style: {
          colors: '#fff',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff',
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#FFB6B6', '#FFC9C9', '#FFDCDC', '#FFEFEF', '#FFF5F5'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
      },
    },
    theme: {
      mode: 'dark',
    },
  };

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4 text-white">Distribution</h3>
          <Chart 
            options={{
              ...pieOptions,
              labels: labels,
              series: data,
              fill: {
                ...pieOptions.fill,
                colors: colors
              },
              plotOptions: {
                pie: {
                  ...pieOptions.plotOptions?.pie,
                  donut: {
                    ...pieOptions.plotOptions?.pie?.donut,
                    size: '70%',
                  }
                }
              },
              legend: {
                ...pieOptions.legend,
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                  horizontal: 10,
                  vertical: 5
                },
                fontSize: '13px',
                labels: {
                  colors: '#ffffff'
                }
              },
              tooltip: {
                y: {
                  formatter: (value: number) => `${value}%`
                }
              },
              dataLabels: {
                enabled: true,
                style: {
                  colors: ['#fff']
                },
                dropShadow: {
                  enabled: true,
                  top: 1,
                  left: 1,
                  blur: 1,
                  opacity: 0.8
                }
              }
            }} 
            series={data} 
            type="donut" 
            height={300} 
          />
        </div>

        {/* Bar Chart */}
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4 text-white">Type Comparison</h3>
          <Chart 
            options={{
              ...barOptions,
              xaxis: {
                ...barOptions.xaxis,
                categories: labels,
              },
              fill: {
                ...barOptions.fill,
                colors: colors,
                gradient: {
                  ...barOptions.fill?.gradient,
                  gradientToColors: colors,
                }
              },
              tooltip: {
                y: {
                  formatter: (value: number) => `${value}%`
                }
              },
              colors: colors,
              grid: {
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
            series={[{
              name: 'Appointments',
              data: data
            }]}
            type="bar"
            height={300}
          />
        </div>
      </div>
    </div>
  );
}