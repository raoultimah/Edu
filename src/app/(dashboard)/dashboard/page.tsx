'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/context/auth-context';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { StatCard } from '@/components/dashboard/stat-card';
import { AreaChart } from '@/components/dashboard/area-chart';
import { DataTable } from '@/components/dashboard/data-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
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
  ArrowRight,
  BarChart2,
  Layers,
  CreditCard,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { format } from 'date-fns';

// Sample data for attendance chart
const attendanceData = [92, 94, 91, 89, 95, 93, 96, 92, 90, 94];
const attendanceCategories = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'];

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

// Sample recent activities
const RECENT_ACTIVITIES = [
  {
    id: '1',
    user: 'John Smith',
    action: 'added a new student',
    target: 'Emma Johnson',
    timestamp: '2023-11-22T10:30:00',
    avatar: '',
  },
  {
    id: '2',
    user: 'Sarah Williams',
    action: 'updated fee structure for',
    target: 'Primary 3',
    timestamp: '2023-11-22T09:15:00',
    avatar: '',
  },
  {
    id: '3',
    user: 'Michael Brown',
    action: 'recorded payment for',
    target: 'David Wilson',
    timestamp: '2023-11-21T16:45:00',
    avatar: '',
  },
  {
    id: '4',
    user: 'Jennifer Davis',
    action: 'created exam schedule for',
    target: 'End of Term Exams',
    timestamp: '2023-11-21T14:20:00',
    avatar: '',
  },
  {
    id: '5',
    user: 'Robert Miller',
    action: 'updated timetable for',
    target: 'Primary 5',
    timestamp: '2023-11-21T11:10:00',
    avatar: '',
  },
];

export default function DashboardPage() {
  const { user, role, loading: authLoading } = useAuthContext();
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2023-2024');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  if (authLoading || !mounted) {
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.user_metadata?.first_name || 'User'}!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedAcademicYear}
              onChange={(e) => setSelectedAcademicYear(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="2023-2024">2023-2024</option>
              <option value="2022-2023">2022-2023</option>
            </select>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
              <option value="Term 3">Term 3</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <StatCard
              title="Students"
              value="450"
              icon={<Users className="h-6 w-6" />}
              change={{ value: 5, trend: "up", text: "from last term" }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <StatCard
              title="Attendance"
              value="92.5%"
              icon={<CheckCircle className="h-6 w-6" />}
              change={{ value: 1.5, trend: "up", text: "from last week" }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <StatCard
              title="Fee Collection"
              value="81.3%"
              icon={<DollarSign className="h-6 w-6" />}
              change={{ value: 7, trend: "up", text: "from last term" }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <StatCard
              title="Upcoming Events"
              value="8"
              icon={<Calendar className="h-6 w-6" />}
              change={{ value: 2, trend: "up", text: "from last month" }}
            />
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1 lg:col-span-2">
            <AreaChart
              title="Student Attendance Trend"
              data={attendanceData}
              categories={attendanceCategories}
              colors={['#7c3aed']}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>Your pending and completed tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {TASKS.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-lg border p-3"
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
                      {format(new Date(task.dueDate), 'MMM dd')}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <span>View All Tasks</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest actions in the system</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {RECENT_ACTIVITIES.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={activity.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {activity.user.split(' ').map(name => name[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-muted-foreground">{activity.action}</span>
                        <span className="font-medium">{activity.target}</span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {format(new Date(activity.timestamp), 'MMM dd, yyyy • h:mm a')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Schedule for the next few weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {UPCOMING_EVENTS.map((event) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary/10 text-center">
                      <span className="text-xs font-medium">
                        {format(new Date(event.date), 'MMM')}
                      </span>
                      <span className="text-lg font-bold">
                        {format(new Date(event.date), 'd')}
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
                <Button variant="outline" className="w-full">
                  <span>View Calendar</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>Important school announcements</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            : announcement.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
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
                      {format(new Date(announcement.date), 'MMMM d, yyyy')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Frequently used actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
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
                <Link href="/analytics">
                  <div className="flex flex-col items-center rounded-lg border p-4 text-center transition-colors hover:bg-accent/10">
                    <BarChart2 className="mb-2 h-6 w-6 text-primary" />
                    <span className="text-sm">Analytics</span>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

