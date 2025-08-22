'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/context/auth-context';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, Users, Calendar, Clock } from 'lucide-react';

export default function AcademicsPage() {
  const { loading: authLoading, role } = useAuthContext();

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
        <div>
          <h1 className="text-3xl font-bold">Academics</h1>
          <p className="text-muted-foreground">
            Manage academic structure, classes, subjects, and timetables
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/academics/classes">
            <div className="flex h-full cursor-pointer flex-col rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Classes & Sections</h3>
              <p className="mt-2 text-muted-foreground">
                Manage class levels, sections, and student assignments
              </p>
            </div>
          </Link>

          <Link href="/academics/subjects">
            <div className="flex h-full cursor-pointer flex-col rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Subjects</h3>
              <p className="mt-2 text-muted-foreground">
                Manage subjects, curriculum, and teacher assignments
              </p>
            </div>
          </Link>

          <Link href="/academics/teachers">
            <div className="flex h-full cursor-pointer flex-col rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Teachers</h3>
              <p className="mt-2 text-muted-foreground">
                Manage teacher profiles, assignments, and workload
              </p>
            </div>
          </Link>

          <Link href="/academics/academic-years">
            <div className="flex h-full cursor-pointer flex-col rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Academic Years</h3>
              <p className="mt-2 text-muted-foreground">
                Manage academic years, terms, and calendar
              </p>
            </div>
          </Link>

          <Link href="/timetable">
            <div className="flex h-full cursor-pointer flex-col rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Timetable</h3>
              <p className="mt-2 text-muted-foreground">
                Create and manage class and teacher timetables
              </p>
            </div>
          </Link>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-xl font-bold">Current Academic Year</h3>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">2023-2024 Academic Year</h4>
                  <p className="text-sm text-muted-foreground">
                    September 1, 2023 - June 30, 2024
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Current
                </span>
              </div>
              <div className="mt-4">
                <h5 className="text-sm font-medium">Terms</h5>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between rounded-md border p-2">
                    <div>
                      <p className="font-medium">Term 1</p>
                      <p className="text-xs text-muted-foreground">
                        September 1, 2023 - December 15, 2023
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Current
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-2">
                    <div>
                      <p className="font-medium">Term 2</p>
                      <p className="text-xs text-muted-foreground">
                        January 10, 2024 - March 30, 2024
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-2">
                    <div>
                      <p className="font-medium">Term 3</p>
                      <p className="text-xs text-muted-foreground">
                        April 10, 2024 - June 30, 2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

