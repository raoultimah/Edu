'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/context/auth-context';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Form, FormField, FormLabel } from '@/components/ui/form';
import { Plus, Download, Printer } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const PERIODS = [
  { id: 1, name: 'Period 1', time: '8:00 AM - 8:45 AM' },
  { id: 2, name: 'Period 2', time: '8:50 AM - 9:35 AM' },
  { id: 3, name: 'Period 3', time: '9:40 AM - 10:25 AM' },
  { id: 4, name: 'Period 4', time: '10:30 AM - 11:15 AM' },
  { id: 5, name: 'Break', time: '11:15 AM - 11:45 AM' },
  { id: 6, name: 'Period 5', time: '11:45 AM - 12:30 PM' },
  { id: 7, name: 'Period 6', time: '12:35 PM - 1:20 PM' },
  { id: 8, name: 'Period 7', time: '1:25 PM - 2:10 PM' },
];

// Sample timetable data
const SAMPLE_TIMETABLE = {
  'Monday-1': { subject: 'Mathematics', teacher: 'Mr. Johnson' },
  'Monday-2': { subject: 'English', teacher: 'Mrs. Smith' },
  'Monday-3': { subject: 'Science', teacher: 'Dr. Brown' },
  'Monday-4': { subject: 'History', teacher: 'Ms. Davis' },
  'Monday-6': { subject: 'Geography', teacher: 'Mr. Wilson' },
  'Monday-7': { subject: 'Art', teacher: 'Mrs. Taylor' },
  'Monday-8': { subject: 'Physical Education', teacher: 'Mr. Anderson' },
  
  'Tuesday-1': { subject: 'Science', teacher: 'Dr. Brown' },
  'Tuesday-2': { subject: 'Mathematics', teacher: 'Mr. Johnson' },
  'Tuesday-3': { subject: 'English', teacher: 'Mrs. Smith' },
  'Tuesday-4': { subject: 'Computer Science', teacher: 'Mr. Lee' },
  'Tuesday-6': { subject: 'Music', teacher: 'Ms. Garcia' },
  'Tuesday-7': { subject: 'History', teacher: 'Ms. Davis' },
  'Tuesday-8': { subject: 'Geography', teacher: 'Mr. Wilson' },
  
  'Wednesday-1': { subject: 'English', teacher: 'Mrs. Smith' },
  'Wednesday-2': { subject: 'Science', teacher: 'Dr. Brown' },
  'Wednesday-3': { subject: 'Mathematics', teacher: 'Mr. Johnson' },
  'Wednesday-4': { subject: 'Art', teacher: 'Mrs. Taylor' },
  'Wednesday-6': { subject: 'Physical Education', teacher: 'Mr. Anderson' },
  'Wednesday-7': { subject: 'Computer Science', teacher: 'Mr. Lee' },
  'Wednesday-8': { subject: 'Music', teacher: 'Ms. Garcia' },
  
  'Thursday-1': { subject: 'History', teacher: 'Ms. Davis' },
  'Thursday-2': { subject: 'Geography', teacher: 'Mr. Wilson' },
  'Thursday-3': { subject: 'Science', teacher: 'Dr. Brown' },
  'Thursday-4': { subject: 'Mathematics', teacher: 'Mr. Johnson' },
  'Thursday-6': { subject: 'English', teacher: 'Mrs. Smith' },
  'Thursday-7': { subject: 'Physical Education', teacher: 'Mr. Anderson' },
  'Thursday-8': { subject: 'Art', teacher: 'Mrs. Taylor' },
  
  'Friday-1': { subject: 'Computer Science', teacher: 'Mr. Lee' },
  'Friday-2': { subject: 'Music', teacher: 'Ms. Garcia' },
  'Friday-3': { subject: 'English', teacher: 'Mrs. Smith' },
  'Friday-4': { subject: 'Mathematics', teacher: 'Mr. Johnson' },
  'Friday-6': { subject: 'Science', teacher: 'Dr. Brown' },
  'Friday-7': { subject: 'History', teacher: 'Ms. Davis' },
  'Friday-8': { subject: 'Geography', teacher: 'Mr. Wilson' },
};

export default function TimetablePage() {
  const { loading: authLoading, role } = useAuthContext();
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [selectedSection, setSelectedSection] = useState('Section A');

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
            <h1 className="text-3xl font-bold">Timetable</h1>
            <p className="text-muted-foreground">
              View and manage class timetables
            </p>
          </div>
          {(role === 'admin' || role === 'teacher') && (
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Link href="/timetable/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Timetable
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <FormField>
              <FormLabel htmlFor="class">Class</FormLabel>
              <Select
                id="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
              </Select>
            </FormField>
            <FormField>
              <FormLabel htmlFor="section">Section</FormLabel>
              <Select
                id="section"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="Section A">Section A</option>
                <option value="Section B">Section B</option>
                <option value="Section C">Section C</option>
              </Select>
            </FormField>
          </div>
        </div>

        <div className="rounded-lg border shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 font-medium text-left">Time</th>
                {DAYS.map((day) => (
                  <th key={day} className="px-4 py-3 font-medium text-left">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERIODS.map((period) => (
                <tr key={period.id} className="border-b">
                  <td className="px-4 py-3 align-top">
                    <div className="font-medium">{period.name}</div>
                    <div className="text-xs text-muted-foreground">{period.time}</div>
                  </td>
                  {DAYS.map((day) => {
                    const key = `${day}-${period.id}`;
                    const cell = SAMPLE_TIMETABLE[key as keyof typeof SAMPLE_TIMETABLE];
                    
                    if (period.name === 'Break') {
                      return (
                        <td
                          key={key}
                          className="px-4 py-3 bg-muted/20 text-center"
                          colSpan={5}
                        >
                          Break Time
                        </td>
                      );
                    }
                    
                    return (
                      <td key={key} className="px-4 py-3">
                        {cell ? (
                          <div>
                            <div className="font-medium">{cell.subject}</div>
                            <div className="text-xs text-muted-foreground">{cell.teacher}</div>
                          </div>
                        ) : (
                          <div className="text-muted-foreground">-</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Legend</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-blue-500"></div>
              <span>Core Subjects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
              <span>Science Subjects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
              <span>Arts & Humanities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-purple-500"></div>
              <span>Physical Education</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

