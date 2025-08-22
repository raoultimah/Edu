'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/context/auth-context';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import {
  Users,
  BookOpen,
  Calendar,
  FileText,
  DollarSign,
  Bell,
  TrendingUp,
  CheckCircle,
  Clock,
} from 'lucide-react';

// Sample announcements
const ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'End of Term Examination',
    content: 'End of term examinations will commence on December 10th, 2023.',
    date: '2023-11-20',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting',
    content: 'Parent-teacher meeting is scheduled for December 5th, 2023.',
    date: '2023-11-18',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'School Closure',
    content: 'The school will be closed on November 30th for staff development.',
    date: '2023-11-15',
    priority: 'high',
  },
];

// Sample upcoming events
const UPCOMING_EVENTS = [
  {
    id: '1',
    title: 'Science Fair',
    date: '2023-12-08',
    time: '09:00 AM - 02:00 PM',
    location: 'School Hall',
  },
  {
    id: '2',
    title: 'Sports Day',
    date: '2023-12-15',
    time: '08:00 AM - 04:00 PM',
    location: 'School Field',
  },
  {
    id: '3',
    title: 'Christmas Concert',
    date: '2023-12-20',
    time: '03:00 PM - 06:00 PM',
    location: 'School Auditorium',
  },
];

// Sample tasks
const TASKS = [
  {
    id: '1',
    title: 'Submit Term Reports',
    dueDate: '2023-12-01',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Update Student Attendance',
    dueDate: '2023-11-25',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Prepare Exam Questions',
    dueDate: '2023-11-30',
    status: 'in-progress',
  },
  {
    id: '4',
    title: 'Review Curriculum Plan',
    dueDate: '2023-12-05',
    status: 'pending',
  },
];

export default function DashboardPage() {
  const { user, role, loading: authLoading } = useAuthContext();
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
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.user_metadata?.first_name || 'User'}!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/students">
            <div className="flex h-full cursor-pointer flex-col rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/10">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Students</p>
                  <h3 className="text-2xl font-bold">450</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>5% increase from last term</span>
              </div>
            </div>
          </Link>

          <Link href="/academics">
            <div className="flex h-full cursor-pointer flex-col rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/10">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Classes</p>
                  <h3 className="text-2xl font-bold">18</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <CheckCircle className="mr-1 h-3 w-3" />
                <span>All classes assigned</span>
              </div>
            </div>
          </Link>

          <Link href="/timetable">
            <div className="flex h-full cursor-pointer flex-col rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/10">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Timetable</p>
                  <h3 className="text-2xl font-bold">Active</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                <span>Updated 2 days ago</span>
              </div>
            </div>
          </Link>

          <Link href="/finance">
            <div className="flex h-full cursor-pointer flex-col rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/10">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Fee Collection</p>
                  <h3 className="text-2xl font-bold">81.3%</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>7% increase from last term</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1 rounded-lg border bg-card shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between p-6">
              <h3 className="text-lg font-medium">Announcements</h3>
              {(role === 'admin' || role === 'teacher') && (
                <Link href="/announcements/new">
                  <Button variant="outline" size="sm">
                    New Announcement
                  </Button>
                </Link>
              )}
            </div>
            <div className="space-y-4 p-6 pt-0">
              {ANNOUNCEMENTS.map((announcement) => (
                <div
                  key={announcement.id}
                  className="rounded-lg border bg-card p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-medium">{announcement.title}</h4>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        announcement.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : announcement.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {announcement.priority.charAt(0).toUpperCase() +
                        announcement.priority.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {announcement.content}
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {new Date(announcement.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              ))}
              <div className="text-center">
                <Link href="/announcements" className="text-sm text-primary hover:underline">
                  View All Announcements
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Upcoming Events</h3>
            </div>
            <div className="space-y-4 p-6 pt-0">
              {UPCOMING_EVENTS.map((event) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary/10 text-center">
                    <span className="text-xs font-medium">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                      })}
                    </span>
                    <span className="text-lg font-bold">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {event.time} • {event.location}
                    </p>
                  </div>
                </div>
              ))}
              <div className="text-center">
                <Link href="/events" className="text-sm text-primary hover:underline">
                  View All Events
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Tasks</h3>
            </div>
            <div className="p-6 pt-0">
              {TASKS.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between border-b py-3 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        task.status === 'completed'
                          ? 'bg-green-500'
                          : task.status === 'in-progress'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    ></div>
                    <span
                      className={
                        task.status === 'completed'
                          ? 'text-muted-foreground line-through'
                          : ''
                      }
                    >
                      {task.title}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Link href="/tasks" className="text-sm text-primary hover:underline">
                  View All Tasks
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Quick Links</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 pt-0 sm:grid-cols-3">
              <Link href="/students/new">
                <div className="flex flex-col items-center rounded-lg border p-4 text-center transition-colors hover:bg-accent/10">
                  <Users className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm">Add Student</span>
                </div>
              </Link>
              <Link href="/timetable">
                <div className="flex flex-col items-center rounded-lg border p-4 text-center transition-colors hover:bg-accent/10">
                  <Calendar className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm">Timetable</span>
                </div>
              </Link>
              <Link href="/exams">
                <div className="flex flex-col items-center rounded-lg border p-4 text-center transition-colors hover:bg-accent/10">
                  <FileText className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm">Exams</span>
                </div>
              </Link>
              <Link href="/finance/payment/new">
                <div className="flex flex-col items-center rounded-lg border p-4 text-center transition-colors hover:bg-accent/10">
                  <DollarSign className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm">Record Payment</span>
                </div>
              </Link>
              <Link href="/announcements/new">
                <div className="flex flex-col items-center rounded-lg border p-4 text-center transition-colors hover:bg-accent/10">
                  <Bell className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm">Announcement</span>
                </div>
              </Link>
              <Link href="/settings">
                <div className="flex flex-col items-center rounded-lg border p-4 text-center transition-colors hover:bg-accent/10">
                  <BookOpen className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm">Academic Year</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

