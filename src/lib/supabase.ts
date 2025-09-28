import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Student {
  id: string
  admission_id: string
  name: string
  email?: string
  phone?: string
  dob: string
  blood_group: string
  class_name: string
  section: string
  profile_photo?: string
  created_at: string
  updated_at: string
}

export interface Teacher {
  id: string
  teacher_id: string
  name: string
  email: string
  phone?: string
  subjects: string[]
  classes: string[]
  sections: string[]
  profile_photo?: string
  created_at: string
  updated_at: string
}

export interface Homework {
  id: string
  title: string
  description: string
  subject: string
  class_name: string
  section: string
  submission_date?: string
  created_by: string
  teacher_name: string
  created_at: string
  updated_at: string
}

export interface Notice {
  id: string
  title: string
  content: string
  date: string
  priority: 'low' | 'medium' | 'high'
  created_by: string
  created_at: string
  updated_at: string
}

export interface AdmissionApplication {
  id: string
  student_name: string
  father_name: string
  mother_name?: string
  email: string
  phone: string
  dob: string
  address: string
  grade_applying: string
  previous_school?: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface NeevApplication {
  id: string
  student_id: string
  student_name: string
  father_name: string
  email: string
  phone: string
  dob: string
  aim: string
  target_exams: string
  status: 'pending' | 'approved' | 'rejected'
  progress_step: number
  created_at: string
  updated_at: string
}