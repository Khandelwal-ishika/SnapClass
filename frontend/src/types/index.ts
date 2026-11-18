export type UserRole = 'teacher' | 'student' | null;

export interface Teacher {
  teacher_id: number;
  username: string;
  name: string;
  created_at?: string;
}

export interface Student {
  student_id: number;
  name: string;
  face_embedding?: number[] | null;
  voice_embedding?: number[] | null;
  avatar_url?: string;
  created_at?: string;
}

export interface Subject {
  subject_id: number;
  subject_code: string;
  name: string;
  section: string;
  teacher_id: number;
  total_students?: number;
  total_classes?: number;
  created_at?: string;
}

export interface SubjectStudent {
  id?: number;
  student_id: number;
  subject_id: number;
  enrolled_at?: string;
  students?: Student;
  subjects?: Subject;
}

export interface AttendanceLog {
  id?: number;
  student_id: number;
  subject_id: number;
  timestamp: string;
  is_present: boolean;
  students?: Student;
  subjects?: Subject;
}

export interface AttendanceResultItem {
  id: number;
  name: string;
  source: string;
  isPresent: boolean;
  avatarUrl?: string;
}

export interface AttendanceRecordSession {
  ts_group: string;
  timeFormatted: string;
  subject_name: string;
  subject_code: string;
  subject_id: number;
  present_count: number;
  total_count: number;
  attendance_stats: string;
  records: AttendanceLog[];
}
