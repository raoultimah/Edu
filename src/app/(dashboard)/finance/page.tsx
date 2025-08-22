'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { StatCard } from '@/components/dashboard/stat-card';
import { AreaChart } from '@/components/dashboard/area-chart';
import { BarChart } from '@/components/dashboard/bar-chart';
import { DonutChart } from '@/components/dashboard/donut-chart';
import { GaugeChart } from '@/components/dashboard/gauge-chart';
import { DataTable } from '@/components/dashboard/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Download,
  FileText,
  Filter,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

// Sample data for charts
const revenueData = [42500, 56000, 48000, 61000, 53000, 57000, 68000, 71000, 65000, 74000, 79000, 82000];
const monthlyCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const feeCollectionData = [
  {
    name: 'Collected',
    data: [35000, 42000, 40000, 45000, 50000, 52000, 60000, 65000, 58000, 68000, 72000, 75000],
  },
  {
    name: 'Outstanding',
    data: [7500, 14000, 8000, 16000, 3000, 5000, 8000, 6000, 7000, 6000, 7000, 7000],
  },
];

const feeDistributionSeries = [45, 25, 15, 10, 5];
const feeDistributionLabels = ['Tuition', 'Development', 'Technology', 'Sports', 'Others'];

const paymentMethodSeries = [65, 20, 15];
const paymentMethodLabels = ['Bank Transfer', 'Cash', 'Mobile Money'];

// Sample data for recent payments
const recentPayments = [
  {
    id: 'PAY-001',
    student: 'John Doe',
    amount: 1250.00,
    date: '2023-12-01',
    status: 'completed',
    method: 'Bank Transfer',
  },
  {
    id: 'PAY-002',
    student: 'Jane Smith',
    amount: 950.00,
    date: '2023-11-28',
    status: 'completed',
    method: 'Cash',
  },
  {
    id: 'PAY-003',
    student: 'Michael Johnson',
    amount: 1500.00,
    date: '2023-11-25',
    status: 'completed',
    method: 'Mobile Money',
  },
  {
    id: 'PAY-004',
    student: 'Sarah Williams',
    amount: 1100.00,
    date: '2023-11-22',
    status: 'completed',
    method: 'Bank Transfer',
  },
  {
    id: 'PAY-005',
    student: 'Robert Brown',
    amount: 850.00,
    date: '2023-11-20',
    status: 'completed',
    method: 'Cash',
  },
  {
    id: 'PAY-006',
    student: 'Emily Davis',
    amount: 1300.00,
    date: '2023-11-18',
    status: 'completed',
    method: 'Mobile Money',
  },
  {
    id: 'PAY-007',
    student: 'David Miller',
    amount: 1050.00,
    date: '2023-11-15',
    status: 'completed',
    method: 'Bank Transfer',
  },
];

// Sample data for upcoming payments
const upcomingPayments = [
  {
    id: 'INV-001',
    student: 'Thomas Wilson',
    amount: 1200.00,
    dueDate: '2023-12-10',
    status: 'pending',
  },
  {
    id: 'INV-002',
    student: 'Lisa Anderson',
    amount: 950.00,
    dueDate: '2023-12-12',
    status: 'pending',
  },
  {
    id: 'INV-003',
    student: 'James Taylor',
    amount: 1450.00,
    dueDate: '2023-12-15',
    status: 'pending',
  },
];

export default function FinancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Year');
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Finance Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of financial performance and fee collection
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              {format(new Date(), 'MMMM yyyy')}
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value="₦3.62M"
            icon={<DollarSign className="h-6 w-6" />}
            change={{ value: 12.5, trend: "up", text: "from last term" }}
          />
          <StatCard
            title="Fee Collection"
            value="81.3%"
            icon={<CreditCard className="h-6 w-6" />}
            change={{ value: 7.2, trend: "up", text: "from last term" }}
          />
          <StatCard
            title="Outstanding Fees"
            value="₦720K"
            icon={<TrendingDown className="h-6 w-6" />}
            change={{ value: 4.8, trend: "down", text: "from last term" }}
          />
          <StatCard
            title="Expenses"
            value="₦2.14M"
            icon={<TrendingUp className="h-6 w-6" />}
            change={{ value: 2.3, trend: "up", text: "from last term" }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AreaChart
            title="Revenue Trend"
            data={revenueData}
            categories={monthlyCategories}
            colors={['#7c3aed']}
          />
          <BarChart
            title="Fee Collection Analysis"
            series={feeCollectionData}
            categories={monthlyCategories}
            colors={['#22c55e', '#f59e0b']}
            stacked={true}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <DonutChart
            title="Fee Distribution"
            series={feeDistributionSeries}
            labels={feeDistributionLabels}
            colors={['#7c3aed', '#0ea5e9', '#22c55e', '#f59e0b', '#64748b']}
          />
          <DonutChart
            title="Payment Methods"
            series={paymentMethodSeries}
            labels={paymentMethodLabels}
            colors={['#0ea5e9', '#22c55e', '#f59e0b']}
          />
          <GaugeChart
            title="Collection Target"
            value={81}
            color="#7c3aed"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DataTable
              title="Recent Payments"
              data={recentPayments}
              columns={[
                {
                  header: 'Receipt ID',
                  accessorKey: 'id',
                },
                {
                  header: 'Student',
                  accessorKey: 'student',
                },
                {
                  header: 'Amount',
                  accessorKey: 'amount',
                  cell: (row) => (
                    <span className="font-medium">
                      ₦{row.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  ),
                },
                {
                  header: 'Date',
                  accessorKey: 'date',
                  cell: (row) => format(new Date(row.date), 'MMM dd, yyyy'),
                },
                {
                  header: 'Method',
                  accessorKey: 'method',
                },
                {
                  header: 'Status',
                  accessorKey: 'status',
                  cell: (row) => (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400">
                      {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </span>
                  ),
                },
              ]}
              searchable
              searchPlaceholder="Search payments..."
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{payment.student}</h4>
                        <span className="text-sm font-medium">
                          ₦{payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                        <span>Due: {format(new Date(payment.dueDate), 'MMM dd, yyyy')}</span>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400">
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Invoices
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Fee Collection by Class</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Primary 1</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} indicatorColor="bg-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Primary 2</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <Progress value={88} indicatorColor="bg-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Primary 3</span>
                    <span className="font-medium">76%</span>
                  </div>
                  <Progress value={76} indicatorColor="bg-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Primary 4</span>
                    <span className="font-medium">84%</span>
                  </div>
                  <Progress value={84} indicatorColor="bg-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Primary 5</span>
                    <span className="font-medium">79%</span>
                  </div>
                  <Progress value={79} indicatorColor="bg-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Primary 6</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} indicatorColor="bg-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                    <div className="mt-1 text-2xl font-bold">₦3,620,000</div>
                    <div className="mt-1 flex items-center text-xs text-green-500">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>12.5% increase</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Total Expenses</div>
                    <div className="mt-1 text-2xl font-bold">₦2,140,000</div>
                    <div className="mt-1 flex items-center text-xs text-red-500">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>2.3% increase</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Net Profit</div>
                    <div className="mt-1 text-2xl font-bold">₦1,480,000</div>
                    <div className="mt-1 flex items-center text-xs text-green-500">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>21.9% increase</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Profit Margin</div>
                    <div className="mt-1 text-2xl font-bold">40.8%</div>
                    <div className="mt-1 flex items-center text-xs text-green-500">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>3.2% increase</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="mb-2 text-sm font-medium">Budget Utilization</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Staff Salaries</span>
                      <span>65% of budget</span>
                    </div>
                    <Progress value={65} indicatorColor="bg-blue-500" />
                    <div className="flex items-center justify-between text-xs">
                      <span>Infrastructure</span>
                      <span>42% of budget</span>
                    </div>
                    <Progress value={42} indicatorColor="bg-purple-500" />
                    <div className="flex items-center justify-between text-xs">
                      <span>Learning Materials</span>
                      <span>78% of budget</span>
                    </div>
                    <Progress value={78} indicatorColor="bg-green-500" />
                    <div className="flex items-center justify-between text-xs">
                      <span>Administrative</span>
                      <span>51% of budget</span>
                    </div>
                    <Progress value={51} indicatorColor="bg-orange-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

