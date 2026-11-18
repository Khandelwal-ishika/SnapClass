import type { Teacher, Student, Subject, SubjectStudent, AttendanceLog } from '../types';

export const INITIAL_TEACHERS: Teacher[] = [
  {
    teacher_id: 1,
    username: 'ananyaroy',
    name: 'Prof. Ananya Roy',
  },
  {
    teacher_id: 2,
    username: 'alex',
    name: 'Dr. Alex Mercer',
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    student_id: 101,
    name: 'Akash Sharma',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    created_at: '2026-08-01T10:00:00Z',
  },
  {
    student_id: 102,
    name: 'Priya Patel',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    created_at: '2026-08-01T10:00:00Z',
  },
  {
    student_id: 103,
    name: 'Rohan Gupta',
    avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    created_at: '2026-08-02T11:00:00Z',
  },
  {
    student_id: 104,
    name: 'Sneha Verma',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    created_at: '2026-08-02T11:00:00Z',
  },
  {
    student_id: 105,
    name: 'Devansh Roy',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    created_at: '2026-08-03T09:30:00Z',
  },
  {
    student_id: 106,
    name: 'Aanya Sen',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    created_at: '2026-08-03T09:30:00Z',
  }
];

export const INITIAL_SUBJECTS: Subject[] = [
  {
    subject_id: 1,
    subject_code: 'CS101',
    name: 'Introduction to Computer Science',
    section: 'A',
    teacher_id: 1,
    total_students: 5,
    total_classes: 12,
  },
  {
    subject_id: 2,
    subject_code: 'AI302',
    name: 'Artificial Intelligence & Neural Nets',
    section: 'B',
    teacher_id: 1,
    total_students: 4,
    total_classes: 8,
  },
  {
    subject_id: 3,
    subject_code: 'DS204',
    name: 'Data Structures & Algorithms',
    section: 'C',
    teacher_id: 1,
    total_students: 6,
    total_classes: 15,
  }
];

export const INITIAL_ENROLLMENTS: SubjectStudent[] = [
  { id: 1, student_id: 101, subject_id: 1 },
  { id: 2, student_id: 102, subject_id: 1 },
  { id: 3, student_id: 103, subject_id: 1 },
  { id: 4, student_id: 104, subject_id: 1 },
  { id: 5, student_id: 105, subject_id: 1 },
  { id: 6, student_id: 101, subject_id: 2 },
  { id: 7, student_id: 102, subject_id: 2 },
  { id: 8, student_id: 103, subject_id: 2 },
  { id: 9, student_id: 106, subject_id: 2 },
  { id: 10, student_id: 101, subject_id: 3 },
  { id: 11, student_id: 102, subject_id: 3 },
  { id: 12, student_id: 103, subject_id: 3 },
  { id: 13, student_id: 104, subject_id: 3 },
  { id: 14, student_id: 105, subject_id: 3 },
  { id: 15, student_id: 106, subject_id: 3 },
];

export const INITIAL_LOGS: AttendanceLog[] = [
  { id: 1, student_id: 101, subject_id: 1, timestamp: '2026-08-24T09:30:00', is_present: true },
  { id: 2, student_id: 102, subject_id: 1, timestamp: '2026-08-24T09:30:00', is_present: true },
  { id: 3, student_id: 103, subject_id: 1, timestamp: '2026-08-24T09:30:00', is_present: false },
  { id: 4, student_id: 104, subject_id: 1, timestamp: '2026-08-24T09:30:00', is_present: true },
  { id: 5, student_id: 105, subject_id: 1, timestamp: '2026-08-24T09:30:00', is_present: true },

  { id: 6, student_id: 101, subject_id: 1, timestamp: '2026-08-22T10:00:00', is_present: true },
  { id: 7, student_id: 102, subject_id: 1, timestamp: '2026-08-22T10:00:00', is_present: true },
  { id: 8, student_id: 103, subject_id: 1, timestamp: '2026-08-22T10:00:00', is_present: true },
  { id: 9, student_id: 104, subject_id: 1, timestamp: '2026-08-22T10:00:00', is_present: false },
  { id: 10, student_id: 105, subject_id: 1, timestamp: '2026-08-22T10:00:00', is_present: true },

  { id: 11, student_id: 101, subject_id: 2, timestamp: '2026-08-23T14:15:00', is_present: true },
  { id: 12, student_id: 102, subject_id: 2, timestamp: '2026-08-23T14:15:00', is_present: true },
  { id: 13, student_id: 103, subject_id: 2, timestamp: '2026-08-23T14:15:00', is_present: true },
  { id: 14, student_id: 106, subject_id: 2, timestamp: '2026-08-23T14:15:00', is_present: false },
];
