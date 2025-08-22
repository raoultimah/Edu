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
        }
        Insert: {
          id?: string
          name: string
          start_date: string
          end_date: string
          is_current?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          start_date?: string
          end_date?: string
          is_current?: boolean
          created_at?: string
        }
        Relationships: []
      }
      terms: {
        Row: {
          id: string
          name: string
          academic_year_id: string
          start_date: string
          end_date: string
          sequence_count: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          academic_year_id: string
          start_date: string
          end_date: string
          sequence_count: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          academic_year_id?: string
          start_date?: string
          end_date?: string
          sequence_count?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "terms_academic_year_id_fkey"
            columns: ["academic_year_id"]
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          }
        ]
      }
      classes: {
        Row: {
          id: string
          name: string
          level: number
          academic_year_id: string
          default_promotion_threshold: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          level: number
          academic_year_id: string
          default_promotion_threshold?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          level?: number
          academic_year_id?: string
          default_promotion_threshold?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_academic_year_id_fkey"
            columns: ["academic_year_id"]
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          }
        ]
      }
      sections: {
        Row: {
          id: string
          name: string
          class_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          class_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          class_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sections_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          }
        ]
      }
      subjects: {
        Row: {
          id: string
          name: string
          code: string
          coefficient: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          coefficient?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          coefficient?: number
          created_at?: string
        }
        Relationships: []
      }
      subject_assignments: {
        Row: {
          id: string
          subject_id: string
          class_id: string
          teacher_id: string
          created_at: string
        }
        Insert: {
          id?: string
          subject_id: string
          class_id: string
          teacher_id: string
          created_at?: string
        }
        Update: {
          id?: string
          subject_id?: string
          class_id?: string
          teacher_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subject_assignments_subject_id_fkey"
            columns: ["subject_id"]
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subject_assignments_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subject_assignments_teacher_id_fkey"
            columns: ["teacher_id"]
            referencedRelation: "employees"
            referencedColumns: ["id"]
          }
        ]
      }
      students: {
        Row: {
          id: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: string
          address: string
          phone: string
          email: string
          current_class_id: string
          current_section_id: string
          academic_year_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: string
          address: string
          phone?: string
          email?: string
          current_class_id: string
          current_section_id: string
          academic_year_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          date_of_birth?: string
          gender?: string
          address?: string
          phone?: string
          email?: string
          current_class_id?: string
          current_section_id?: string
          academic_year_id?: string
          user_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_current_class_id_fkey"
            columns: ["current_class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_current_section_id_fkey"
            columns: ["current_section_id"]
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_academic_year_id_fkey"
            columns: ["academic_year_id"]
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      guardians: {
        Row: {
          id: string
          student_id: string
          guardian_id: string
          relationship: string
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          guardian_id: string
          relationship: string
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          guardian_id?: string
          relationship?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guardians_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guardians_guardian_id_fkey"
            columns: ["guardian_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      employees: {
        Row: {
          id: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: string
          address: string
          phone: string
          email: string
          position: string
          department: string
          hire_date: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: string
          address: string
          phone?: string
          email?: string
          position: string
          department: string
          hire_date: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          date_of_birth?: string
          gender?: string
          address?: string
          phone?: string
          email?: string
          position?: string
          department?: string
          hire_date?: string
          user_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

