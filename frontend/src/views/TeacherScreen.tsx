import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { TeacherLogin } from '../components/teacher/TeacherLogin';
import { TakeAttendanceTab } from '../components/teacher/TakeAttendanceTab';
import { ManageSubjectsTab } from '../components/teacher/ManageSubjectsTab';
import { AttendanceRecordsTab } from '../components/teacher/AttendanceRecordsTab';
import { ScanFace, BookOpen, BarChart3 } from 'lucide-react';

type TeacherTab = 'take_attendance' | 'manage_subjects' | 'attendance_records';

export const TeacherScreen: React.FC = () => {
  const { teacher } = useAuth();
  const [activeTab, setActiveTab] = useState<TeacherTab>('take_attendance');

  return (
    <div className="min-h-screen bg-[#0B0F19] bg-grid-pattern text-slate-100 flex flex-col justify-between">
      {/* Header */}
      <Header variant="dashboard" />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto w-full px-4 md:px-8 py-6 flex-1">
        {!teacher ? (
          <TeacherLogin />
        ) : (
          <div className="flex flex-col gap-6">
            {/* Top Navigation Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-900/90 border border-slate-800 rounded-2xl">
              <button
                onClick={() => setActiveTab('take_attendance')}
                className={`py-3 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  activeTab === 'take_attendance'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <ScanFace className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Take Attendance</span>
                <span className="sm:hidden">Attendance</span>
              </button>

              <button
                onClick={() => setActiveTab('manage_subjects')}
                className={`py-3 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  activeTab === 'manage_subjects'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Manage Courses</span>
                <span className="sm:hidden">Courses</span>
              </button>

              <button
                onClick={() => setActiveTab('attendance_records')}
                className={`py-3 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  activeTab === 'attendance_records'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Attendance Records</span>
                <span className="sm:hidden">Records</span>
              </button>
            </div>

            {/* Active Tab Screen Component */}
            {activeTab === 'take_attendance' && <TakeAttendanceTab teacherId={teacher.teacher_id} />}
            {activeTab === 'manage_subjects' && <ManageSubjectsTab teacherId={teacher.teacher_id} />}
            {activeTab === 'attendance_records' && <AttendanceRecordsTab teacherId={teacher.teacher_id} />}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer variant="dashboard" />
    </div>
  );
};
