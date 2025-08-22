'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AreaChartProps {
  title: string;
  data: number[];
  categories: string[];
  colors?: string[];
  height?: number;
}

export function AreaChart({
  title,
  data,
  categories,
  colors = ['#7c3aed'],
  height = 300,
}: AreaChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options = {
    chart: {
      type: 'area' as const,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      fontFamily: 'inherit',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth' as const,
      width: 3,
    },
    colors,
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
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
    grid: {
      borderColor: 'rgba(100, 116, 139, 0.1)',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true,
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
      x: {
        show: false,
      },
    },
  };

  const series = [
    {
      name: title,
      data,
    },
  ];

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
            type="area"
            height={height}
          />
        </div>
      </CardContent>
    </Card>
  );
}

