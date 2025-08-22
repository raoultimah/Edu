'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Form, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';

interface Student {
  id: string;
  user_id: string;
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

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Student form state
  const [formData, setFormData] = useState<Student | null>(null);
  
  // Guardians form state
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [deletedGuardianIds, setDeletedGuardianIds] = useState<string[]>([]);
  
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
        
        setFormData(studentData);
        
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
  
  const handleStudentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => prev ? ({
      ...prev,
      [name]: value,
    }) : null);
  };
  
  const handleGuardianInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setGuardians((prev) => {
      const updated = [...prev];
      if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        
        // If this guardian is being set as primary, set all others to false
        if (name === 'is_primary' && checked) {
          updated.forEach((g, i) => {
            if (i !== index) {
              g.is_primary = false;
            }
          });
        }
        
        updated[index] = {
          ...updated[index],
          [name]: checked,
        };
      } else {
        updated[index] = {
          ...updated[index],
          [name]: value,
        };
      }
      return updated;
    });
  };
  
  const addGuardian = () => {
    if (!formData) return;
    
    setGuardians((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        student_id: formData.id,
        relationship: 'parent',
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address: '',
        occupation: '',
        is_primary: prev.length === 0,
      },
    ]);
  };
  
  const removeGuardian = (index: number) => {
    const guardianToRemove = guardians[index];
    
    // If it's an existing guardian (has a non-temporary ID), add to deleted list
    if (guardianToRemove.id && !guardianToRemove.id.startsWith('new-')) {
      setDeletedGuardianIds((prev) => [...prev, guardianToRemove.id]);
    }
    
    setGuardians((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      
      // If we removed the primary guardian and there are still guardians left,
      // set the first one as primary
      if (prev[index].is_primary && updated.length > 0) {
        updated[0].is_primary = true;
      }
      
      return updated;
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    
    setSaving(true);
    setError(null);
    
    try {
      // Update student record
      const { error: studentError } = await supabase
        .from('students')
        .update({
          admission_number: formData.admission_number,
          first_name: formData.first_name,
          last_name: formData.last_name,
          date_of_birth: formData.date_of_birth,
          gender: formData.gender,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          admission_date: formData.admission_date,
          status: formData.status,
        })
        .eq('id', formData.id);
      
      if (studentError) throw studentError;
      
      // Handle guardians
      // 1. Delete removed guardians
      if (deletedGuardianIds.length > 0) {
        const { error: deleteError } = await supabase
          .from('guardians')
          .delete()
          .in('id', deletedGuardianIds);
        
        if (deleteError) throw deleteError;
      }
      
      // 2. Update or insert guardians
      for (const guardian of guardians) {
        if (guardian.id.startsWith('new-')) {
          // This is a new guardian, insert it
          const { error: insertError } = await supabase
            .from('guardians')
            .insert({
              student_id: formData.id,
              relationship: guardian.relationship,
              first_name: guardian.first_name,
              last_name: guardian.last_name,
              phone: guardian.phone,
              email: guardian.email,
              address: guardian.address,
              occupation: guardian.occupation,
              is_primary: guardian.is_primary,
            });
          
          if (insertError) throw insertError;
        } else {
          // This is an existing guardian, update it
          const { error: updateError } = await supabase
            .from('guardians')
            .update({
              relationship: guardian.relationship,
              first_name: guardian.first_name,
              last_name: guardian.last_name,
              phone: guardian.phone,
              email: guardian.email,
              address: guardian.address,
              occupation: guardian.occupation,
              is_primary: guardian.is_primary,
            })
            .eq('id', guardian.id);
          
          if (updateError) throw updateError;
        }
      }
      
      // Redirect to the student detail page
      router.push(`/students/${formData.id}`);
    } catch (err: any) {
      setError(err.message);
      console.error('Error updating student:', err);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error && !formData) {
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
  
  if (!formData) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <p className="text-red-500">Student not found</p>
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
            <h1 className="text-3xl font-bold">Edit Student</h1>
            <p className="text-muted-foreground">
              Update student information for {formData.first_name} {formData.last_name}
            </p>
          </div>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          </div>
        )}
        
        <Form onSubmit={handleSubmit}>
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Personal Information</h3>
            </div>
            <div className="p-6 pt-0 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField>
                  <FormLabel htmlFor="admission_number">Admission Number *</FormLabel>
                  <Input
                    id="admission_number"
                    name="admission_number"
                    value={formData.admission_number}
                    onChange={handleStudentInputChange}
                    required
                  />
                </FormField>
                <FormField>
                  <FormLabel htmlFor="admission_date">Admission Date *</FormLabel>
                  <Input
                    id="admission_date"
                    name="admission_date"
                    type="date"
                    value={formData.admission_date.split('T')[0]}
                    onChange={handleStudentInputChange}
                    required
                  />
                </FormField>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField>
                  <FormLabel htmlFor="first_name">First Name *</FormLabel>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleStudentInputChange}
                    required
                  />
                </FormField>
                <FormField>
                  <FormLabel htmlFor="last_name">Last Name *</FormLabel>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleStudentInputChange}
                    required
                  />
                </FormField>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField>
                  <FormLabel htmlFor="date_of_birth">Date of Birth *</FormLabel>
                  <Input
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    value={formData.date_of_birth.split('T')[0]}
                    onChange={handleStudentInputChange}
                    required
                  />
                </FormField>
                <FormField>
                  <FormLabel htmlFor="gender">Gender *</FormLabel>
                  <Select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleStudentInputChange}
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                </FormField>
              </div>
              
              <FormField>
                <FormLabel htmlFor="address">Address *</FormLabel>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleStudentInputChange}
                  required
                />
              </FormField>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone || ''}
                    onChange={handleStudentInputChange}
                  />
                </FormField>
                <FormField>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={handleStudentInputChange}
                  />
                </FormField>
              </div>
              
              <FormField>
                <FormLabel htmlFor="status">Status *</FormLabel>
                <Select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleStudentInputChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                  <option value="graduated">Graduated</option>
                </Select>
              </FormField>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6 flex items-center justify-between">
              <h3 className="text-lg font-medium">Guardian Information</h3>
              <Button type="button" onClick={addGuardian} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Guardian
              </Button>
            </div>
            <div className="p-6 pt-0 space-y-6">
              {guardians.length === 0 ? (
                <p className="text-muted-foreground">No guardians found. Add a guardian using the button above.</p>
              ) : (
                guardians.map((guardian, index) => (
                  <div key={guardian.id} className="rounded-lg border p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Guardian {index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => removeGuardian(index)}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField>
                        <FormLabel htmlFor={`guardian_${index}_relationship`}>Relationship *</FormLabel>
                        <Select
                          id={`guardian_${index}_relationship`}
                          name="relationship"
                          value={guardian.relationship}
                          onChange={(e) => handleGuardianInputChange(index, e)}
                          required
                        >
                          <option value="parent">Parent</option>
                          <option value="guardian">Guardian</option>
                          <option value="sibling">Sibling</option>
                          <option value="other">Other</option>
                        </Select>
                      </FormField>
                      <div className="flex items-end gap-2">
                        <input
                          type="checkbox"
                          id={`guardian_${index}_is_primary`}
                          name="is_primary"
                          checked={guardian.is_primary}
                          onChange={(e) => handleGuardianInputChange(index, e)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label
                          htmlFor={`guardian_${index}_is_primary`}
                          className="text-sm font-medium"
                        >
                          Primary Contact
                        </label>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField>
                        <FormLabel htmlFor={`guardian_${index}_first_name`}>First Name *</FormLabel>
                        <Input
                          id={`guardian_${index}_first_name`}
                          name="first_name"
                          value={guardian.first_name}
                          onChange={(e) => handleGuardianInputChange(index, e)}
                          required
                        />
                      </FormField>
                      <FormField>
                        <FormLabel htmlFor={`guardian_${index}_last_name`}>Last Name *</FormLabel>
                        <Input
                          id={`guardian_${index}_last_name`}
                          name="last_name"
                          value={guardian.last_name}
                          onChange={(e) => handleGuardianInputChange(index, e)}
                          required
                        />
                      </FormField>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField>
                        <FormLabel htmlFor={`guardian_${index}_phone`}>Phone *</FormLabel>
                        <Input
                          id={`guardian_${index}_phone`}
                          name="phone"
                          type="tel"
                          value={guardian.phone}
                          onChange={(e) => handleGuardianInputChange(index, e)}
                          required
                        />
                      </FormField>
                      <FormField>
                        <FormLabel htmlFor={`guardian_${index}_email`}>Email</FormLabel>
                        <Input
                          id={`guardian_${index}_email`}
                          name="email"
                          type="email"
                          value={guardian.email || ''}
                          onChange={(e) => handleGuardianInputChange(index, e)}
                        />
                      </FormField>
                    </div>
                    
                    <FormField>
                      <FormLabel htmlFor={`guardian_${index}_address`}>Address *</FormLabel>
                      <Input
                        id={`guardian_${index}_address`}
                        name="address"
                        value={guardian.address}
                        onChange={(e) => handleGuardianInputChange(index, e)}
                        required
                      />
                    </FormField>
                    
                    <FormField>
                      <FormLabel htmlFor={`guardian_${index}_occupation`}>Occupation</FormLabel>
                      <Input
                        id={`guardian_${index}_occupation`}
                        name="occupation"
                        value={guardian.occupation || ''}
                        onChange={(e) => handleGuardianInputChange(index, e)}
                      />
                    </FormField>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                'Saving...'
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </Form>
      </div>
    </DashboardLayout>
  );
}

