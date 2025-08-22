export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      academic_years: {
        Row: {
          id: string
          name: string
          start_date: string
          end_date: string
          is_current: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          start_date: string
          end_date: string
          is_current?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          start_date?: string
          end_date?: string
          is_current?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      terms: {
        Row: {
          id: string
          academic_year_id: string
          name: string
          start_date: string
          end_date: string
          is_current: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          academic_year_id: string
          name: string
          start_date: string
          end_date: string
          is_current?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          academic_year_id?: string
          name?: string
          start_date?: string
          end_date?: string
          is_current?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      classes: {
        Row: {
          id: string
          name: string
          level: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          level: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          level?: number
          created_at?: string
          updated_at?: string
        }
      }
      sections: {
        Row: {
          id: string
          class_id: string
          name: string
          capacity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          class_id: string
          name: string
          capacity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          class_id?: string
          name?: string
          capacity?: number
          created_at?: string
          updated_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          name: string
          code: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subject_assignments: {
        Row: {
          id: string
          subject_id: string
          class_id: string
          section_id: string | null
          teacher_id: string
          academic_year_id: string
          term_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          subject_id: string
          class_id: string
          section_id?: string | null
          teacher_id: string
          academic_year_id: string
          term_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          subject_id?: string
          class_id?: string
          section_id?: string | null
          teacher_id?: string
          academic_year_id?: string
          term_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      students: {
        Row: {
          id: string
          user_id: string
          admission_number: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: string
          address: string
          phone: string | null
          email: string | null
          current_class_id: string | null
          current_section_id: string | null
          admission_date: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          admission_number: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: string
          address: string
          phone?: string | null
          email?: string | null
          current_class_id?: string | null
          current_section_id?: string | null
          admission_date: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          admission_number?: string
          first_name?: string
          last_name?: string
          date_of_birth?: string
          gender?: string
          address?: string
          phone?: string | null
          email?: string | null
          current_class_id?: string | null
          current_section_id?: string | null
          admission_date?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      guardians: {
        Row: {
          id: string
          user_id: string | null
          student_id: string
          relationship: string
          first_name: string
          last_name: string
          phone: string
          email: string | null
          address: string
          occupation: string | null
          is_primary: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          student_id: string
          relationship: string
          first_name: string
          last_name: string
          phone: string
          email?: string | null
          address: string
          occupation?: string | null
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          student_id?: string
          relationship?: string
          first_name?: string
          last_name?: string
          phone?: string
          email?: string | null
          address?: string
          occupation?: string | null
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      employees: {
        Row: {
          id: string
          user_id: string
          employee_id: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: string
          address: string
          phone: string
          email: string
          position: string
          department: string
          join_date: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          employee_id: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: string
          address: string
          phone: string
          email: string
          position: string
          department: string
          join_date: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          employee_id?: string
          first_name?: string
          last_name?: string
          date_of_birth?: string
          gender?: string
          address?: string
          phone?: string
          email?: string
          position?: string
          department?: string
          join_date?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      attendance: {
        Row: {
          id: string
          student_id: string | null
          employee_id: string | null
          date: string
          status: string
          remarks: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id?: string | null
          employee_id?: string | null
          date: string
          status: string
          remarks?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string | null
          employee_id?: string | null
          date?: string
          status?: string
          remarks?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      exams: {
        Row: {
          id: string
          name: string
          academic_year_id: string
          term_id: string | null
          start_date: string
          end_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          academic_year_id: string
          term_id?: string | null
          start_date: string
          end_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          academic_year_id?: string
          term_id?: string | null
          start_date?: string
          end_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      marks: {
        Row: {
          id: string
          exam_id: string
          student_id: string
          subject_id: string
          marks_obtained: number
          max_marks: number
          remarks: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          exam_id: string
          student_id: string
          subject_id: string
          marks_obtained: number
          max_marks: number
          remarks?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          exam_id?: string
          student_id?: string
          subject_id?: string
          marks_obtained?: number
          max_marks?: number
          remarks?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      fees: {
        Row: {
          id: string
          name: string
          amount: number
          academic_year_id: string
          term_id: string | null
          class_id: string | null
          due_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          amount: number
          academic_year_id: string
          term_id?: string | null
          class_id?: string | null
          due_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          amount?: number
          academic_year_id?: string
          term_id?: string | null
          class_id?: string | null
          due_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          student_id: string
          fee_id: string
          amount: number
          payment_date: string
          payment_method: string
          reference_number: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          fee_id: string
          amount: number
          payment_date: string
          payment_method: string
          reference_number?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          fee_id?: string
          amount?: number
          payment_date?: string
          payment_method?: string
          reference_number?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

