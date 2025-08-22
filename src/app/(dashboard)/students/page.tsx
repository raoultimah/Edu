'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/context/auth-context';
import { useRealtimeData } from '@/lib/hooks/use-realtime-data';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/utils';
import { Plus, Search, Edit, Trash } from 'lucide-react';

interface Student {
  id: string;
  admission_number: string;
  first_name: string;
  last_name: string;
  gender: string;
  current_class_id: string | null;
  current_section_id: string | null;
  admission_date: string;
  status: string;
}

export default function StudentsPage() {
  const { loading: authLoading, role } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: students, loading: studentsLoading, error } = useRealtimeData<Student>({
    table: 'students',
  });

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return (
      fullName.includes(query) ||
      student.admission_number.toLowerCase().includes(query)
    );
  });

  if (authLoading || studentsLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <p className="text-red-500">Error loading students: {error.message}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Students</h1>
            <p className="text-muted-foreground">
              Manage student information and records
            </p>
          </div>
          {(role === 'admin' || role === 'teacher') && (
            <Link href="/students/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or admission number..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-lg border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left">
                  <th className="px-4 py-3 font-medium">Admission No.</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Gender</th>
                  <th className="px-4 py-3 font-medium">Class</th>
                  <th className="px-4 py-3 font-medium">Admission Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-3 text-center">
                      {searchQuery
                        ? 'No students found matching your search.'
                        : 'No students found. Add a student to get started.'}
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b">
                      <td className="px-4 py-3">{student.admission_number}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/students/${student.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {student.first_name} {student.last_name}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{student.gender}</td>
                      <td className="px-4 py-3">
                        {student.current_class_id
                          ? `Class ${student.current_class_id}`
                          : 'Not Assigned'}
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(student.admission_date)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            student.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link href={`/students/${student.id}/edit`}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
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

