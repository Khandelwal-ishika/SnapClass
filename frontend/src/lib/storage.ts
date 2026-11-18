import type { Teacher, Student, Subject, SubjectStudent, AttendanceLog, AttendanceRecordSession } from '../types';
import { INITIAL_TEACHERS, INITIAL_STUDENTS, INITIAL_SUBJECTS, INITIAL_ENROLLMENTS, INITIAL_LOGS } from './mockData';

const KEYS = {
  TEACHERS: 'snapclass_teachers',
  STUDENTS: 'snapclass_students',
  SUBJECTS: 'snapclass_subjects',
  ENROLLMENTS: 'snapclass_enrollments',
  LOGS: 'snapclass_logs',
};

function safeGetItem<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    const item = localStorage.getItem(key);
    if (!item || item === 'undefined' || item === 'null') return fallback;
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`Error reading localStorage key "${key}":`, e);
    return fallback;
  }
}

function safeSetItem<T>(key: string, value: T): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.warn(`Error writing localStorage key "${key}":`, e);
  }
}

// Initialize default storage data if missing
function initStorage() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    if (!localStorage.getItem(KEYS.TEACHERS)) {
      safeSetItem(KEYS.TEACHERS, INITIAL_TEACHERS);
    }
    if (!localStorage.getItem(KEYS.STUDENTS)) {
      safeSetItem(KEYS.STUDENTS, INITIAL_STUDENTS);
    }
    if (!localStorage.getItem(KEYS.SUBJECTS)) {
      safeSetItem(KEYS.SUBJECTS, INITIAL_SUBJECTS);
    }
    if (!localStorage.getItem(KEYS.ENROLLMENTS)) {
      safeSetItem(KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
    }
    if (!localStorage.getItem(KEYS.LOGS)) {
      safeSetItem(KEYS.LOGS, INITIAL_LOGS);
    }
  } catch (e) {
    console.warn('LocalStorage init warning:', e);
  }
}

// Call on module load
initStorage();

export function getTeachers(): Teacher[] {
  initStorage();
  return safeGetItem<Teacher[]>(KEYS.TEACHERS, INITIAL_TEACHERS);
}

export function getStudents(): Student[] {
  initStorage();
  return safeGetItem<Student[]>(KEYS.STUDENTS, INITIAL_STUDENTS);
}

export function getSubjects(): Subject[] {
  initStorage();
  return safeGetItem<Subject[]>(KEYS.SUBJECTS, INITIAL_SUBJECTS);
}

export function getEnrollments(): SubjectStudent[] {
  initStorage();
  return safeGetItem<SubjectStudent[]>(KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
}

export function getAttendanceLogs(): AttendanceLog[] {
  initStorage();
  return safeGetItem<AttendanceLog[]>(KEYS.LOGS, INITIAL_LOGS);
}

export function teacherLogin(username: string, _password?: string): Teacher | null {
  const teachers = getTeachers();
  const match = teachers.find(t => t.username && t.username.toLowerCase() === username.trim().toLowerCase());
  return match || null;
}

export function checkTeacherExists(username: string): boolean {
  const teachers = getTeachers();
  return teachers.some(t => t.username && t.username.toLowerCase() === username.trim().toLowerCase());
}

export function createTeacher(username: string, _password: string, name: string): Teacher {
  const teachers = getTeachers();
  const newTeacher: Teacher = {
    teacher_id: Date.now(),
    username: username.trim(),
    name: name.trim(),
    created_at: new Date().toISOString(),
  };
  teachers.push(newTeacher);
  safeSetItem(KEYS.TEACHERS, teachers);
  return newTeacher;
}

export function createStudent(
  name: string,
  faceEmbedding?: number[] | null,
  voiceEmbedding?: number[] | null,
  avatarUrl?: string
): Student {
  const students = getStudents();
  const newStudent: Student = {
    student_id: Math.floor(100 + Math.random() * 900),
    name: name.trim(),
    face_embedding: faceEmbedding,
    voice_embedding: voiceEmbedding,
    avatar_url: avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
    created_at: new Date().toISOString(),
  };
  students.push(newStudent);
  safeSetItem(KEYS.STUDENTS, students);
  return newStudent;
}

export function getTeacherSubjects(teacherId: number): Subject[] {
  const subjects = getSubjects().filter(s => s.teacher_id === teacherId);
  const enrollments = getEnrollments();
  const logs = getAttendanceLogs();

  return subjects.map(sub => {
    const studentCount = enrollments.filter(e => e.subject_id === sub.subject_id).length;
    const subLogs = logs.filter(l => l.subject_id === sub.subject_id);
    const uniqueSessions = new Set(subLogs.map(l => l.timestamp)).size;

    return {
      ...sub,
      total_students: studentCount,
      total_classes: uniqueSessions,
    };
  });
}

export function createSubject(subjectCode: string, name: string, section: string, teacherId: number): Subject {
  const subjects = getSubjects();
  const newSub: Subject = {
    subject_id: Date.now(),
    subject_code: subjectCode.trim().toUpperCase(),
    name: name.trim(),
    section: section.trim().toUpperCase(),
    teacher_id: teacherId,
    total_students: 0,
    total_classes: 0,
    created_at: new Date().toISOString(),
  };
  subjects.push(newSub);
  safeSetItem(KEYS.SUBJECTS, subjects);
  return newSub;
}

export function findSubjectByCode(code: string): Subject | null {
  const subjects = getSubjects();
  return subjects.find(s => s.subject_code && s.subject_code.toLowerCase() === code.trim().toLowerCase()) || null;
}

export function getSubjectEnrolledStudents(subjectId: number): Student[] {
  const enrollments = getEnrollments().filter(e => e.subject_id === subjectId);
  const students = getStudents();
  return enrollments
    .map(e => students.find(s => s.student_id === e.student_id))
    .filter((s): s is Student => Boolean(s));
}

export function getStudentSubjects(studentId: number): Array<{ subjects: Subject }> {
  const enrollments = getEnrollments().filter(e => e.student_id === studentId);
  const subjects = getSubjects();
  return enrollments
    .map(e => {
      const sub = subjects.find(s => s.subject_id === e.subject_id);
      return sub ? { subjects: sub } : null;
    })
    .filter((item): item is { subjects: Subject } => Boolean(item));
}

export function getStudentAttendance(studentId: number): AttendanceLog[] {
  const logs = getAttendanceLogs().filter(l => l.student_id === studentId);
  const subjects = getSubjects();
  return logs.map(l => ({
    ...l,
    subjects: subjects.find(s => s.subject_id === l.subject_id),
  }));
}

export function enrollStudentToSubject(studentId: number, subjectId: number): boolean {
  const enrollments = getEnrollments();
  const alreadyEnrolled = enrollments.some(e => e.student_id === studentId && e.subject_id === subjectId);
  if (alreadyEnrolled) return false;

  enrollments.push({
    id: Date.now(),
    student_id: studentId,
    subject_id: subjectId,
    enrolled_at: new Date().toISOString(),
  });
  safeSetItem(KEYS.ENROLLMENTS, enrollments);
  return true;
}

export function unenrollStudentFromSubject(studentId: number, subjectId: number): boolean {
  let enrollments = getEnrollments();
  enrollments = enrollments.filter(e => !(e.student_id === studentId && e.subject_id === subjectId));
  safeSetItem(KEYS.ENROLLMENTS, enrollments);
  return true;
}

export function createAttendance(logs: Array<{ student_id: number; subject_id: number; timestamp: string; is_present: boolean }>) {
  const currentLogs = getAttendanceLogs();
  const newLogs: AttendanceLog[] = logs.map((l, i) => ({
    id: Date.now() + i,
    student_id: l.student_id,
    subject_id: l.subject_id,
    timestamp: l.timestamp,
    is_present: l.is_present,
  }));
  currentLogs.push(...newLogs);
  safeSetItem(KEYS.LOGS, currentLogs);
  return newLogs;
}

export function getAttendanceForTeacher(teacherId: number): AttendanceRecordSession[] {
  const teacherSubjects = getTeacherSubjects(teacherId);
  const subjectIds = new Set(teacherSubjects.map(s => s.subject_id));
  const logs = getAttendanceLogs().filter(l => subjectIds.has(l.subject_id));
  const students = getStudents();

  // Group by (timestamp without ms) + subject_id
  const groups: Record<string, AttendanceLog[]> = {};

  logs.forEach(log => {
    const tsKey = `${log.timestamp.split('.')[0]}_${log.subject_id}`;
    if (!groups[tsKey]) {
      groups[tsKey] = [];
    }
    const student = students.find(s => s.student_id === log.student_id);
    const subject = teacherSubjects.find(s => s.subject_id === log.subject_id);
    groups[tsKey].push({
      ...log,
      students: student,
      subjects: subject,
    });
  });

  const sessions: AttendanceRecordSession[] = Object.keys(groups).map(key => {
    const sessionLogs = groups[key];
    const firstLog = sessionLogs[0];
    const sub = teacherSubjects.find(s => s.subject_id === firstLog.subject_id);
    const presentCount = sessionLogs.filter(l => l.is_present).length;
    const totalCount = sessionLogs.length;

    let timeFormatted = firstLog.timestamp;
    try {
      const d = new Date(firstLog.timestamp);
      timeFormatted = d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      timeFormatted = firstLog.timestamp;
    }

    return {
      ts_group: key,
      timeFormatted,
      subject_name: sub?.name || 'Unknown Subject',
      subject_code: sub?.subject_code || '---',
      subject_id: firstLog.subject_id,
      present_count: presentCount,
      total_count: totalCount,
      attendance_stats: `✅ ${presentCount} / ${totalCount} Students`,
      records: sessionLogs,
    };
  });

  return sessions.sort((a, b) => b.ts_group.localeCompare(a.ts_group));
}
