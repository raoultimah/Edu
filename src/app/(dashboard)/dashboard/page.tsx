'use client';

import { useEffect } from 'react';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { useAuthContext } from '@/context/auth-context';

export default function DashboardPage() {
  const { user, role, loading } = useAuthContext();

  if (loading) {
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
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.user_metadata?.first_name || 'User'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Total Students</p>
                <h3 className="text-2xl font-bold">1,234</h3>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Total Teachers</p>
                <h3 className="text-2xl font-bold">87</h3>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                  <path d="M12 3v6"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Total Classes</p>
                <h3 className="text-2xl font-bold">24</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Recent Announcements</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-medium">End of Term Examination</h4>
                  <p className="text-sm text-muted-foreground">
                    End of term examinations will begin on 15th December 2023.
                  </p>
                  <p className="text-xs text-muted-foreground">Posted 2 days ago</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-medium">Parent-Teacher Meeting</h4>
                  <p className="text-sm text-muted-foreground">
                    Parent-teacher meeting scheduled for 10th December 2023.
                  </p>
                  <p className="text-xs text-muted-foreground">Posted 5 days ago</p>
                </div>
                <div>
                  <h4 className="font-medium">School Closure</h4>
                  <p className="text-sm text-muted-foreground">
                    School will be closed on 25th December 2023 for Christmas.
                  </p>
                  <p className="text-xs text-muted-foreground">Posted 1 week ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Upcoming Events</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-4">
                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="rounded-md bg-primary/10 p-2 text-center">
                    <div className="text-sm font-medium">DEC</div>
                    <div className="text-xl font-bold">10</div>
                  </div>
                  <div>
                    <h4 className="font-medium">Parent-Teacher Meeting</h4>
                    <p className="text-sm text-muted-foreground">9:00 AM - 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="rounded-md bg-primary/10 p-2 text-center">
                    <div className="text-sm font-medium">DEC</div>
                    <div className="text-xl font-bold">15</div>
                  </div>
                  <div>
                    <h4 className="font-medium">End of Term Examination</h4>
                    <p className="text-sm text-muted-foreground">8:00 AM - 12:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-primary/10 p-2 text-center">
                    <div className="text-sm font-medium">DEC</div>
                    <div className="text-xl font-bold">20</div>
                  </div>
                  <div>
                    <h4 className="font-medium">End of Term Ceremony</h4>
                    <p className="text-sm text-muted-foreground">10:00 AM - 1:00 PM</p>
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

