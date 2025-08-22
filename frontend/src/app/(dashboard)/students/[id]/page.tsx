'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { formatDate, calculateAge } from '@/lib/utils';
import { ArrowLeft, Edit, UserRound, Phone, Mail, MapPin, Calendar, School } from 'lucide-react';

interface Student {
  id: string;
  admission_number: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  address: string;
  phone: string | null;
  email: string | null;
  current_class_id: string | null;
  current_section_id: string | null;
  admission_date: string;
  status: string;
}

interface Guardian {
  id: string;
  student_id: string;
  relationship: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  address: string;
  occupation: string | null;
  is_primary: boolean;
}

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        
        // Fetch student data
        const { data: studentData, error: studentError } = await supabase
          .from('students')
          .select('*')
          .eq('id', params.id)
          .single();
        
        if (studentError) {
          throw studentError;
        }
        
        setStudent(studentData);
        
        // Fetch guardians data
        const { data: guardiansData, error: guardiansError } = await supabase
          .from('guardians')
          .select('*')
          .eq('student_id', params.id);
        
        if (guardiansError) {
          throw guardiansError;
        }
        
        setGuardians(guardiansData);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching student data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudentData();
  }, [params.id, supabase]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !student) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <p className="text-red-500">
            {error || 'Student not found'}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {student.first_name} {student.last_name}
            </h1>
            <p className="text-muted-foreground">
              Student ID: {student.admission_number}
            </p>
          </div>
          <div className="ml-auto">
            <Link href={`/students/${student.id}/edit`}>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit Student
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Personal Information</h3>
            </div>
            <div className="p-6 pt-0">
              <dl className="space-y-4">
                <div className="flex items-center gap-3">
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-32 font-medium">Full Name:</dt>
                  <dd>
                    {student.first_name} {student.last_name}
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-32 font-medium">Date of Birth:</dt>
                  <dd>
                    {formatDate(student.date_of_birth)} ({calculateAge(student.date_of_birth)} years)
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-32 font-medium">Gender:</dt>
                  <dd>{student.gender}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-32 font-medium">Phone:</dt>
                  <dd>{student.phone || 'Not provided'}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-32 font-medium">Email:</dt>
                  <dd>{student.email || 'Not provided'}</dd>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <dt className="w-32 font-medium">Address:</dt>
                  <dd>{student.address}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Academic Information</h3>
            </div>
            <div className="p-6 pt-0">
              <dl className="space-y-4">
                <div className="flex items-center gap-3">
                  <School className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-32 font-medium">Class:</dt>
                  <dd>
                    {student.current_class_id
                      ? `Class ${student.current_class_id}`
                      : 'Not Assigned'}
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <School className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-32 font-medium">Section:</dt>
                  <dd>
                    {student.current_section_id
                      ? `Section ${student.current_section_id}`
                      : 'Not Assigned'}
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-32 font-medium">Admission Date:</dt>
                  <dd>{formatDate(student.admission_date)}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-32 font-medium">Status:</dt>
                  <dd>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        student.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {student.status}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-medium">Guardians</h3>
          </div>
          <div className="p-6 pt-0">
            {guardians.length === 0 ? (
              <p className="text-muted-foreground">No guardians found for this student.</p>
            ) : (
              <div className="space-y-6">
                {guardians.map((guardian) => (
                  <div key={guardian.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">
                        {guardian.first_name} {guardian.last_name}
                        {guardian.is_primary && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            Primary
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {guardian.relationship}
                      </p>
                    </div>
                    <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <dt className="sr-only">Phone</dt>
                        <dd>{guardian.phone}</dd>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <dt className="sr-only">Email</dt>
                        <dd>{guardian.email || 'Not provided'}</dd>
                      </div>
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <dt className="sr-only">Address</dt>
                        <dd>{guardian.address}</dd>
                      </div>
                      {guardian.occupation && (
                        <div className="flex items-center gap-2 sm:col-span-2">
                          <UserRound className="h-4 w-4 text-muted-foreground" />
                          <dt className="sr-only">Occupation</dt>
                          <dd>{guardian.occupation}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

