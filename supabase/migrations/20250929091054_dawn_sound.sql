/*
  # Complete School Management System Schema

  1. New Tables
    - `students` - Student information and profiles
    - `teachers` - Teacher profiles and assignments
    - `classes` - Class and section management
    - `subjects` - Subject definitions
    - `homework` - Homework assignments
    - `notices` - School notices and announcements
    - `attendance` - Student attendance tracking
    - `grades` - Student grades and assessments
    - `events` - School events and calendar
    - `admission_applications` - New admission requests
    - `neev_applications` - NEEV program applications
    - `library_books` - Library management
    - `fee_records` - Fee payment tracking
    - `timetable` - Class schedules

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
    - Secure student and teacher data

  3. Features
    - Real-time updates
    - File uploads for documents
    - Comprehensive reporting
*/

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admission_id text UNIQUE NOT NULL,
  name text NOT NULL,
  email text,
  phone text,
  dob date,
  blood_group text,
  class_name text NOT NULL,
  section text NOT NULL,
  father_name text,
  mother_name text,
  address text,
  profile_photo text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id text UNIQUE NOT NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  subjects text[] DEFAULT '{}',
  classes text[] DEFAULT '{}',
  sections text[] DEFAULT '{}',
  profile_photo text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_name text NOT NULL,
  section text NOT NULL,
  teacher_id uuid REFERENCES teachers(id),
  capacity integer DEFAULT 40,
  current_strength integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(class_name, section)
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  class_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Homework table
CREATE TABLE IF NOT EXISTS homework (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subject text NOT NULL,
  class_name text NOT NULL,
  section text NOT NULL,
  submission_date date,
  created_by uuid REFERENCES teachers(id),
  teacher_name text,
  attachments text[],
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notices table
CREATE TABLE IF NOT EXISTS notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  date date DEFAULT CURRENT_DATE,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  target_audience text DEFAULT 'all' CHECK (target_audience IN ('all', 'students', 'teachers', 'parents')),
  created_by uuid REFERENCES teachers(id),
  attachments text[],
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
  remarks text,
  marked_by uuid REFERENCES teachers(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, date)
);

-- Grades table
CREATE TABLE IF NOT EXISTS grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  subject text NOT NULL,
  exam_type text NOT NULL,
  marks_obtained numeric NOT NULL,
  total_marks numeric NOT NULL,
  grade text,
  exam_date date,
  created_by uuid REFERENCES teachers(id),
  created_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_date date NOT NULL,
  event_time time,
  location text,
  event_type text DEFAULT 'general' CHECK (event_type IN ('academic', 'sports', 'cultural', 'general', 'holiday')),
  target_audience text DEFAULT 'all',
  created_by uuid REFERENCES teachers(id),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Admission Applications table
CREATE TABLE IF NOT EXISTS admission_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  father_name text NOT NULL,
  mother_name text,
  email text NOT NULL,
  phone text NOT NULL,
  dob date NOT NULL,
  address text NOT NULL,
  grade_applying text NOT NULL,
  previous_school text,
  documents text[],
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'waitlisted')),
  remarks text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- NEEV Applications table
CREATE TABLE IF NOT EXISTS neev_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  student_name text NOT NULL,
  father_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  dob date NOT NULL,
  aim text,
  target_exams text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  progress_step integer DEFAULT 1,
  interview_date date,
  test_score numeric,
  remarks text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Library Books table
CREATE TABLE IF NOT EXISTS library_books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  isbn text UNIQUE,
  category text NOT NULL,
  total_copies integer DEFAULT 1,
  available_copies integer DEFAULT 1,
  location text,
  created_at timestamptz DEFAULT now()
);

-- Book Issues table
CREATE TABLE IF NOT EXISTS book_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES library_books(id),
  student_id uuid REFERENCES students(id),
  issue_date date DEFAULT CURRENT_DATE,
  due_date date NOT NULL,
  return_date date,
  fine_amount numeric DEFAULT 0,
  status text DEFAULT 'issued' CHECK (status IN ('issued', 'returned', 'overdue')),
  created_at timestamptz DEFAULT now()
);

-- Fee Records table
CREATE TABLE IF NOT EXISTS fee_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  fee_type text NOT NULL,
  amount numeric NOT NULL,
  due_date date NOT NULL,
  paid_date date,
  payment_method text,
  transaction_id text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'partial')),
  remarks text,
  created_at timestamptz DEFAULT now()
);

-- Timetable table
CREATE TABLE IF NOT EXISTS timetable (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_name text NOT NULL,
  section text NOT NULL,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
  period_number integer NOT NULL,
  subject text NOT NULL,
  teacher_id uuid REFERENCES teachers(id),
  start_time time NOT NULL,
  end_time time NOT NULL,
  room_number text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(class_name, section, day_of_week, period_number)
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE neev_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Students
CREATE POLICY "Students can read own data"
  ON students FOR SELECT
  TO authenticated
  USING (auth.uid()::text = admission_id);

CREATE POLICY "Teachers can read all students"
  ON students FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM teachers WHERE teacher_id = auth.uid()::text
  ));

-- RLS Policies for Teachers
CREATE POLICY "Teachers can read own data"
  ON teachers FOR SELECT
  TO authenticated
  USING (auth.uid()::text = teacher_id);

CREATE POLICY "All authenticated users can read teacher names"
  ON teachers FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for Homework
CREATE POLICY "Students can read homework for their class"
  ON homework FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students 
      WHERE admission_id = auth.uid()::text 
      AND class_name = homework.class_name 
      AND section = homework.section
    )
  );

CREATE POLICY "Teachers can manage homework"
  ON homework FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teachers WHERE teacher_id = auth.uid()::text
    )
  );

-- RLS Policies for Notices
CREATE POLICY "All authenticated users can read notices"
  ON notices FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Teachers can manage notices"
  ON notices FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teachers WHERE teacher_id = auth.uid()::text
    )
  );

-- RLS Policies for Attendance
CREATE POLICY "Students can read own attendance"
  ON attendance FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students 
      WHERE admission_id = auth.uid()::text 
      AND id = attendance.student_id
    )
  );

CREATE POLICY "Teachers can manage attendance"
  ON attendance FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teachers WHERE teacher_id = auth.uid()::text
    )
  );

-- RLS Policies for Grades
CREATE POLICY "Students can read own grades"
  ON grades FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students 
      WHERE admission_id = auth.uid()::text 
      AND id = grades.student_id
    )
  );

CREATE POLICY "Teachers can manage grades"
  ON grades FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teachers WHERE teacher_id = auth.uid()::text
    )
  );

-- Insert sample data
INSERT INTO students (admission_id, name, email, phone, dob, blood_group, class_name, section, father_name) VALUES
('himanshu123', 'Himanshu Kumar', 'himanshu@gmail.com', '9876543210', '2011-07-08', 'B+', 'IX', 'NEEV', 'Ram Kumar'),
('adarshraj001', 'Adarsh Raj', 'adarsh@gmail.com', '9876543211', '2012-09-05', 'A+', 'IX', 'NEEV', 'Suresh Raj'),
('adityaks001', 'Aditya Kumar Singh', 'aditya@gmail.com', '9876543212', '2012-02-23', 'B-', 'IX', 'NEEV', 'Rajesh Singh');

INSERT INTO teachers (teacher_id, name, email, phone, subjects, classes, sections) VALUES
('Avinash', 'MR Avinash Kumar', 'avinash@gmail.com', '9876543220', ARRAY['Mathematics'], ARRAY['VIII', 'IX'], ARRAY['NEEV']),
('Rahul', 'Mr Rahul', 'rahul@school.edu', '9876543221', ARRAY['Artificial Intelligence'], ARRAY['IX', 'X'], ARRAY['B', 'NEEV']),
('Azence', 'Mr Azence Kumar', 'azence@school.edu', '9876543222', ARRAY['Physics'], ARRAY['IX', 'X', 'XI', 'XII'], ARRAY['B', 'NEEV']);

INSERT INTO notices (title, content, priority, created_by) VALUES
('Half Yearly Exam', 'The Half-Yearly Examinations will commence from 09-09-2025. Students are advised to prepare thoroughly.', 'high', (SELECT id FROM teachers WHERE teacher_id = 'Avinash')),
('Science Exhibition', 'The school is organizing a Science Exhibition on 20th September 2025.', 'medium', (SELECT id FROM teachers WHERE teacher_id = 'Rahul')),
('PA 4 PTM', 'Parent-Teacher Meeting for Periodic Assessment-4 will be held on 23rd August 2025.', 'high', (SELECT id FROM teachers WHERE teacher_id = 'Azence'));

INSERT INTO events (title, description, event_date, event_type) VALUES
('Annual Sports Day', 'Annual sports competition for all classes', '2025-03-15', 'sports'),
('Science Fair', 'Students will showcase their science projects', '2025-04-20', 'academic'),
('Cultural Program', 'Annual cultural program with dance and music', '2025-05-10', 'cultural');