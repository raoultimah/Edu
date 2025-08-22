'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/context/auth-context';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Form, FormField, FormLabel } from '@/components/ui/form';
import { Plus, DollarSign, Receipt, CreditCard, BarChart, Download } from 'lucide-react';
import { formatDate } from '@/lib/utils';

// Sample fee types
const FEE_TYPES = [
  { id: '1', name: 'Tuition Fee', amount: 50000, frequency: 'term' },
  { id: '2', name: 'Development Fee', amount: 10000, frequency: 'year' },
  { id: '3', name: 'Library Fee', amount: 5000, frequency: 'year' },
  { id: '4', name: 'Computer Lab Fee', amount: 8000, frequency: 'term' },
  { id: '5', name: 'Sports Fee', amount: 5000, frequency: 'term' },
];

// Sample recent payments
const RECENT_PAYMENTS = [
  {
    id: '1',
    student_name: 'John Smith',
    admission_number: 'ADM2023001',
    amount: 50000,
    payment_date: '2023-11-15',
    payment_method: 'Bank Transfer',
    receipt_number: 'REC20231115001',
    status: 'completed',
  },
  {
    id: '2',
    student_name: 'Sarah Johnson',
    admission_number: 'ADM2023045',
    amount: 63000,
    payment_date: '2023-11-14',
    payment_method: 'Cash',
    receipt_number: 'REC20231114003',
    status: 'completed',
  },
  {
    id: '3',
    student_name: 'Michael Brown',
    admission_number: 'ADM2023078',
    amount: 50000,
    payment_date: '2023-11-13',
    payment_method: 'Mobile Money',
    receipt_number: 'REC20231113007',
    status: 'completed',
  },
  {
    id: '4',
    student_name: 'Emily Davis',
    admission_number: 'ADM2023022',
    amount: 50000,
    payment_date: '2023-11-10',
    payment_method: 'Bank Transfer',
    receipt_number: 'REC20231110002',
    status: 'completed',
  },
  {
    id: '5',
    student_name: 'David Wilson',
    admission_number: 'ADM2023056',
    amount: 50000,
    payment_date: '2023-11-08',
    payment_method: 'Cash',
    receipt_number: 'REC20231108005',
    status: 'completed',
  },
];

export default function FinancePage() {
  const { loading: authLoading, role } = useAuthContext();
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2023-2024');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Finance</h1>
            <p className="text-muted-foreground">
              Manage fees, payments, and financial records
            </p>
          </div>
          {(role === 'admin' || role === 'finance') && (
            <div className="flex items-center gap-2">
              <Link href="/finance/reports">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Reports
                </Button>
              </Link>
              <Link href="/finance/payment/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Record Payment
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Collected</p>
                <h3 className="text-2xl font-bold">₦ 5,450,000</h3>
                <p className="text-xs text-muted-foreground">Current Term</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Receipt className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Outstanding</p>
                <h3 className="text-2xl font-bold">₦ 1,250,000</h3>
                <p className="text-xs text-muted-foreground">Current Term</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Payments</p>
                <h3 className="text-2xl font-bold">109</h3>
                <p className="text-xs text-muted-foreground">Current Term</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Collection Rate</p>
                <h3 className="text-2xl font-bold">81.3%</h3>
                <p className="text-xs text-muted-foreground">Current Term</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Fee Structure</h3>
              <p className="text-sm text-muted-foreground">
                {selectedAcademicYear}, {selectedTerm}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left">
                    <th className="px-4 py-3 font-medium">Fee Type</th>
                    <th className="px-4 py-3 font-medium">Amount (₦)</th>
                    <th className="px-4 py-3 font-medium">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {FEE_TYPES.map((fee) => (
                    <tr key={fee.id} className="border-b">
                      <td className="px-4 py-3 font-medium">{fee.name}</td>
                      <td className="px-4 py-3">{fee.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 capitalize">{fee.frequency}</td>
                    </tr>
                  ))}
                  <tr className="bg-muted/20">
                    <td className="px-4 py-3 font-medium">Total Term Fees</td>
                    <td className="px-4 py-3 font-bold">
                      {FEE_TYPES.reduce(
                        (total, fee) =>
                          total +
                          (fee.frequency === 'term'
                            ? fee.amount
                            : fee.amount / 3),
                        0
                      ).toLocaleString()}
                    </td>
                    <td className="px-4 py-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Recent Payments</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left">
                    <th className="px-4 py-3 font-medium">Student</th>
                    <th className="px-4 py-3 font-medium">Amount (₦)</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_PAYMENTS.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="px-4 py-3">
                        <div className="font-medium">{payment.student_name}</div>
                        <div className="text-xs text-muted-foreground">
                          {payment.admission_number}
                        </div>
                      </td>
                      <td className="px-4 py-3">{payment.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">{formatDate(payment.payment_date)}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/finance/receipt/${payment.receipt_number}`}
                          className="text-primary hover:underline"
                        >
                          {payment.receipt_number}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 text-center">
                <Link href="/finance/payments" className="text-primary hover:underline">
                  View All Payments
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <h4 className="font-medium">Bank Transfer</h4>
              <p className="mt-2 text-sm">
                <span className="block">Bank: First Bank of Nigeria</span>
                <span className="block">Account Name: EDU-WISE BASIC</span>
                <span className="block">Account Number: 1234567890</span>
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium">Mobile Money</h4>
              <p className="mt-2 text-sm">
                <span className="block">Provider: MTN MoMo</span>
                <span className="block">Number: 0801234567</span>
                <span className="block">Account Name: EDU-WISE BASIC</span>
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium">Cash Payment</h4>
              <p className="mt-2 text-sm">
                <span className="block">Location: School Finance Office</span>
                <span className="block">Hours: 8:00 AM - 2:00 PM</span>
                <span className="block">Days: Monday - Friday</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

