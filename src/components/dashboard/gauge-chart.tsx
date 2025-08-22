'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface GaugeChartProps {
  title: string;
  value: number;
  min?: number;
  max?: number;
  color?: string;
  height?: number;
  label?: string;
}

export function GaugeChart({
  title,
  value,
  min = 0,
  max = 100,
  color = '#7c3aed',
  height = 300,
  label = '%',
}: GaugeChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options = {
    chart: {
      type: 'radialBar' as const,
      fontFamily: 'inherit',
      sparkline: {
        enabled: true,
      },
    },
    colors: [color],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#e7e7e7',
          strokeWidth: '97%',
          margin: 5,
          dropShadow: {
            enabled: false,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: '22px',
            fontWeight: 600,
            formatter: (val: number) => `${val}${label}`,
          },
        },
        hollow: {
          margin: 15,
          size: '65%',
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [color],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round' as const,
    },
    labels: [title],
  };

  const series = [value];

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
            type="radialBar"
            height={height}
          />
        </div>
      </CardContent>
    </Card>
  );
}

