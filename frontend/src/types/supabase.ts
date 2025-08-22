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
      students: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          first_name: string
          last_name: string
          middle_name: string | null
          date_of_birth: string
          gender: string
          admission_number: string
          admission_date: string
          current_class_id: string | null
          current_section_id: string | null
          address: string | null
          city: string | null
          state: string | null
          country: string | null
          phone: string | null
          email: string | null
          status: string
          profile_image: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name: string
          last_name: string
          middle_name?: string | null
          date_of_birth: string
          gender: string
          admission_number: string
          admission_date: string
          current_class_id?: string | null
          current_section_id?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          phone?: string | null
          email?: string | null
          status?: string
          profile_image?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string
          last_name?: string
          middle_name?: string | null
          date_of_birth?: string
          gender?: string
          admission_number?: string
          admission_date?: string
          current_class_id?: string | null
          current_section_id?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          phone?: string | null
          email?: string | null
          status?: string
          profile_image?: string | null
        }
      }
      guardians: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          first_name: string
          last_name: string
          relationship: string
          phone: string
          email: string | null
          occupation: string | null
          address: string | null
          city: string | null
          state: string | null
          country: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name: string
          last_name: string
          relationship: string
          phone: string
          email?: string | null
          occupation?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string
          last_name?: string
          relationship?: string
          phone?: string
          email?: string | null
          occupation?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
        }
      }
      student_guardians: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          student_id: string
          guardian_id: string
          is_primary: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          student_id: string
          guardian_id: string
          is_primary?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          student_id?: string
          guardian_id?: string
          is_primary?: boolean
        }
      }
      classes: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          level: number
          academic_year_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          level: number
          academic_year_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          level?: number
          academic_year_id?: string
        }
      }
      sections: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          class_id: string
          teacher_id: string | null
          capacity: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          class_id: string
          teacher_id?: string | null
          capacity?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          class_id?: string
          teacher_id?: string | null
          capacity?: number | null
        }
      }
      subjects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          code: string
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          code: string
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          code?: string
          description?: string | null
        }
      }
      teachers: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          qualification: string | null
          joining_date: string
          status: string
          user_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          qualification?: string | null
          joining_date: string
          status?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          qualification?: string | null
          joining_date?: string
          status?: string
          user_id?: string | null
        }
      }
      academic_years: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          start_date: string
          end_date: string
          is_current: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          start_date: string
          end_date: string
          is_current?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          start_date?: string
          end_date?: string
          is_current?: boolean
        }
      }
      terms: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          academic_year_id: string
          start_date: string
          end_date: string
          is_current: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          academic_year_id: string
          start_date: string
          end_date: string
          is_current?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          academic_year_id?: string
          start_date?: string
          end_date?: string
          is_current?: boolean
        }
      }
      timetables: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          class_id: string
          section_id: string
          subject_id: string
          teacher_id: string
          day_of_week: number
          start_time: string
          end_time: string
          room: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          class_id: string
          section_id: string
          subject_id: string
          teacher_id: string
          day_of_week: number
          start_time: string
          end_time: string
          room?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          class_id?: string
          section_id?: string
          subject_id?: string
          teacher_id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          room?: string | null
        }
      }
      exams: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          term_id: string
          start_date: string
          end_date: string
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          term_id: string
          start_date: string
          end_date: string
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          term_id?: string
          start_date?: string
          end_date?: string
          status?: string
        }
      }
      exam_results: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          exam_id: string
          student_id: string
          subject_id: string
          marks: number
          grade: string
          remarks: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          exam_id: string
          student_id: string
          subject_id: string
          marks: number
          grade: string
          remarks?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          exam_id?: string
          student_id?: string
          subject_id?: string
          marks?: number
          grade?: string
          remarks?: string | null
        }
      }
      fees: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          amount: number
          frequency: string
          academic_year_id: string
          class_id: string | null
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          amount: number
          frequency: string
          academic_year_id: string
          class_id?: string | null
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          amount?: number
          frequency?: string
          academic_year_id?: string
          class_id?: string | null
          description?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          student_id: string
          amount: number
          payment_date: string
          payment_method: string
          receipt_number: string
          term_id: string
          status: string
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          student_id: string
          amount: number
          payment_date: string
          payment_method: string
          receipt_number: string
          term_id: string
          status?: string
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          student_id?: string
          amount?: number
          payment_date?: string
          payment_method?: string
          receipt_number?: string
          term_id?: string
          status?: string
          notes?: string | null
        }
      }
      payment_details: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          payment_id: string
          fee_id: string
          amount: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          payment_id: string
          fee_id: string
          amount: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          payment_id?: string
          fee_id?: string
          amount?: number
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

