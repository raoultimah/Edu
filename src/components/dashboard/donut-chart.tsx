'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DonutChartProps {
  title: string;
  series: number[];
  labels: string[];
  colors?: string[];
  height?: number;
}

export function DonutChart({
  title,
  series,
  labels,
  colors = ['#7c3aed', '#e11d48', '#0ea5e9', '#22c55e', '#f59e0b'],
  height = 300,
}: DonutChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options = {
    chart: {
      type: 'donut' as const,
      fontFamily: 'inherit',
    },
    colors,
    labels,
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 600,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '16px',
              fontWeight: 400,
              formatter: (val: number) => val.toLocaleString(),
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '14px',
              fontWeight: 600,
              formatter: (w: any) => {
                return w.globals.seriesTotals
                  .reduce((a: number, b: number) => a + b, 0)
                  .toLocaleString();
              },
            },
          },
        },
      },
    },
    legend: {
      position: 'bottom' as const,
      fontSize: '14px',
      markers: {
        radius: 12,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => val.toLocaleString(),
      },
    },
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
            type="donut"
            height={height}
          />
        </div>
      </CardContent>
    </Card>
  );
}

