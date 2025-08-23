'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface BarChartProps {
  title: string;
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
  colors?: string[];
  height?: number;
  stacked?: boolean;
}

export function BarChart({
  title,
  series,
  categories,
  colors = ['#7c3aed', '#e11d48', '#0ea5e9'],
  height = 300,
  stacked = false,
}: BarChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options = {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false,
      },
      fontFamily: 'inherit',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
        ...(stacked && { dataLabels: { position: 'top' } }),
      },
    },
    colors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px',
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
          colors: '#64748b',
          fontSize: '12px',
        },
        formatter: (value: number) => {
          return value.toLocaleString();
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top' as const,
      horizontalAlign: 'right' as const,
      fontSize: '14px',
      markers: {
        radius: 12,
      },
    },
    grid: {
      borderColor: 'rgba(100, 116, 139, 0.1)',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value: number) => {
          return value.toLocaleString();
        },
      },
    },
    ...(stacked && {
      chart: {
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4,
        },
      },
    }),
  };

  if (!mounted) return null;

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={height}
          />
        </div>
      </CardContent>
    </Card>
  );
}

