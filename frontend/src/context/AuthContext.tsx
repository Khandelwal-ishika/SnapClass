import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Teacher, Student, UserRole } from '../types';
import { teacherLogin, createTeacher, createStudent } from '../lib/storage';

interface AuthContextType {
  userRole: UserRole;
  isLoggedIn: boolean;
  teacher: Teacher | null;
  student: Student | null;
  setRole: (role: UserRole) => void;
  handleTeacherLogin: (username: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  handleTeacherRegister: (username: string, name: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  handleStudentFaceLogin: (matchedStudent: Student) => void;
  handleStudentRegister: (name: string, faceEmb?: number[] | null, voiceEmb?: number[] | null, avatarUrl?: string) => Student;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      if (typeof window === 'undefined') return null;
      const savedRole = localStorage.getItem('snapclass_active_role');
      return (savedRole as UserRole) || null;
    } catch {
      return null;
    }
  });

  const [teacher, setTeacher] = useState<Teacher | null>(() => {
    try {
      if (typeof window === 'undefined') return null;
      const saved = localStorage.getItem('snapclass_active_teacher');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [student, setStudent] = useState<Student | null>(() => {
    try {
      if (typeof window === 'undefined') return null;
      const saved = localStorage.getItem('snapclass_active_student');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (userRole) {
        localStorage.setItem('snapclass_active_role', userRole);
      } else {
        localStorage.removeItem('snapclass_active_role');
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [userRole]);

  useEffect(() => {
    try {
      if (teacher) {
        localStorage.setItem('snapclass_active_teacher', JSON.stringify(teacher));
      } else {
        localStorage.removeItem('snapclass_active_teacher');
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [teacher]);

  useEffect(() => {
    try {
      if (student) {
        localStorage.setItem('snapclass_active_student', JSON.stringify(student));
      } else {
        localStorage.removeItem('snapclass_active_student');
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [student]);

  const setRole = (role: UserRole) => {
    setUserRole(role);
  };

  const handleTeacherLogin = async (username: string, password?: string) => {
    if (!username.trim()) {
      return { success: false, message: 'Please enter your username' };
    }
    const found = teacherLogin(username, password);
    if (found) {
      setTeacher(found);
      setUserRole('teacher');
      return { success: true };
    }
    return { success: false, message: 'Invalid username or credentials' };
  };

  const handleTeacherRegister = async (username: string, name: string, password = '') => {
    if (!username.trim() || !name.trim()) {
      return { success: false, message: 'All fields are required' };
    }
    try {
      const newTeacher = createTeacher(username, password, name);
      setTeacher(newTeacher);
      setUserRole('teacher');
      return { success: true };
    } catch {
      return { success: false, message: 'Registration failed. Try another username.' };
    }
  };

  const handleStudentFaceLogin = (matchedStudent: Student) => {
    setStudent(matchedStudent);
    setUserRole('student');
  };

  const handleStudentRegister = (name: string, faceEmb?: number[] | null, voiceEmb?: number[] | null, avatarUrl?: string) => {
    const newStudent = createStudent(name, faceEmb, voiceEmb, avatarUrl);
    setStudent(newStudent);
    setUserRole('student');
    return newStudent;
  };

  const logout = () => {
    setTeacher(null);
    setStudent(null);
    setUserRole(null);
    try {
      localStorage.removeItem('snapclass_active_role');
      localStorage.removeItem('snapclass_active_teacher');
      localStorage.removeItem('snapclass_active_student');
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const isLoggedIn = Boolean((userRole === 'teacher' && teacher) || (userRole === 'student' && student));

  return (
    <AuthContext.Provider
      value={{
        userRole,
        isLoggedIn,
        teacher,
        student,
        setRole,
        handleTeacherLogin,
        handleTeacherRegister,
        handleStudentFaceLogin,
        handleStudentRegister,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
