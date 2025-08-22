'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/context/auth-context';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Form, FormField, FormLabel } from '@/components/ui/form';
import { Plus, FileText, BarChart, Download, Eye } from 'lucide-react';
import { formatDate } from '@/lib/utils';

// Sample exams data
const EXAMS = [
  {
    id: '1',
    name: 'First Term Assessment',
    academic_year: '2023-2024',
    term: 'Term 1',
    start_date: '2023-10-15',
    end_date: '2023-10-20',
    status: 'completed',
    published: true,
  },
  {
    id: '2',
    name: 'Mid-Term Examination',
    academic_year: '2023-2024',
    term: 'Term 1',
    start_date: '2023-11-10',
    end_date: '2023-11-15',
    status: 'completed',
    published: true,
  },
  {
    id: '3',
    name: 'End of Term Examination',
    academic_year: '2023-2024',
    term: 'Term 1',
    start_date: '2023-12-10',
    end_date: '2023-12-15',
    status: 'upcoming',
    published: false,
  },
];

export default function ExamsPage() {
  const { loading: authLoading, role } = useAuthContext();
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2023-2024');
  const [selectedTerm, setSelectedTerm] = useState('All Terms');

  const filteredExams = EXAMS.filter((exam) => {
    if (selectedAcademicYear && exam.academic_year !== selectedAcademicYear) {
      return false;
    }
    if (selectedTerm !== 'All Terms' && exam.term !== selectedTerm) {
      return false;
    }
    return true;
  });

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
            <h1 className="text-3xl font-bold">Exams & Results</h1>
            <p className="text-muted-foreground">
              Manage examinations, grades, and results
            </p>
          </div>
          {(role === 'admin' || role === 'teacher') && (
            <Link href="/exams/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Exam
              </Button>
            </Link>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/exams">
            <div className="flex h-full cursor-pointer flex-col rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Exams</h3>
              <p className="mt-2 text-muted-foreground">
                View and manage all examinations
              </p>
            </div>
          </Link>

          <Link href="/exams/results">
            <div className="flex h-full cursor-pointer flex-col rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Results</h3>
              <p className="mt-2 text-muted-foreground">
                View and publish examination results
              </p>
            </div>
          </Link>

          <Link href="/exams/report-cards">
            <div className="flex h-full cursor-pointer flex-col rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Report Cards</h3>
              <p className="mt-2 text-muted-foreground">
                Generate and download student report cards
              </p>
            </div>
          </Link>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <FormField>
              <FormLabel htmlFor="academic-year">Academic Year</FormLabel>
              <Select
                id="academic-year"
                value={selectedAcademicYear}
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
              >
                <option value="2023-2024">2023-2024</option>
                <option value="2022-2023">2022-2023</option>
                <option value="2021-2022">2021-2022</option>
              </Select>
            </FormField>
            <FormField>
              <FormLabel htmlFor="term">Term</FormLabel>
              <Select
                id="term"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
              >
                <option value="All Terms">All Terms</option>
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </Select>
            </FormField>
          </div>
        </div>

        <div className="rounded-lg border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left">
                  <th className="px-4 py-3 font-medium">Exam Name</th>
                  <th className="px-4 py-3 font-medium">Term</th>
                  <th className="px-4 py-3 font-medium">Date Range</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Results</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-3 text-center">
                      No exams found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredExams.map((exam) => (
                    <tr key={exam.id} className="border-b">
                      <td className="px-4 py-3 font-medium">{exam.name}</td>
                      <td className="px-4 py-3">{exam.term}</td>
                      <td className="px-4 py-3">
                        {formatDate(exam.start_date)} - {formatDate(exam.end_date)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            exam.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : exam.status === 'ongoing'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            exam.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {exam.published ? 'Published' : 'Not Published'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link href={`/exams/${exam.id}`}>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </Link>
                          {(role === 'admin' || role === 'teacher') && (
                            <>
                              <Link href={`/exams/${exam.id}/edit`}>
                                <Button variant="ghost" size="icon">
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                              </Link>
                              <Link href={`/exams/${exam.id}/results`}>
                                <Button variant="ghost" size="icon">
                                  <BarChart className="h-4 w-4" />
                                  <span className="sr-only">Results</span>
                                </Button>
                              </Link>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

