import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getStudentSubjects, getStudentAttendance, unenrollStudentFromSubject } from '../../lib/storage';
import { EnrollModal } from './EnrollModal';
import { AutoEnrollModal } from './AutoEnrollModal';
import { BookOpen, Plus, Trash2, Calendar, CheckCircle2, UserCheck, ShieldCheck } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { student } = useAuth();
  if (!student) return null;

  const [enrolledSubjects, setEnrolledSubjects] = useState(() => getStudentSubjects(student.student_id));
  const [attendanceLogs, setAttendanceLogs] = useState(() => getStudentAttendance(student.student_id));
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [urlJoinCode, setUrlJoinCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('join-code');
    if (code) {
      setUrlJoinCode(code);
    }
  }, []);

  const refreshData = () => {
    setEnrolledSubjects(getStudentSubjects(student.student_id));
    setAttendanceLogs(getStudentAttendance(student.student_id));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const statsMap: Record<number, { total: number; attended: number }> = {};
  attendanceLogs.forEach((log) => {
    const sid = log.subject_id;
    if (!statsMap[sid]) {
      statsMap[sid] = { total: 0, attended: 0 };
    }
    statsMap[sid].total += 1;
    if (log.is_present) {
      statsMap[sid].attended += 1;
    }
  });

  let totalAllClasses = 0;
  let totalAllAttended = 0;
  Object.values(statsMap).forEach((stat) => {
    totalAllClasses += stat.total;
    totalAllAttended += stat.attended;
  });
  const overallPercentage =
    totalAllClasses > 0 ? Math.round((totalAllAttended / totalAllClasses) * 100) : 100;

  const handleUnenroll = (subjectId: number, subjectName: string) => {
    if (window.confirm(`Are you sure you want to unenroll from "${subjectName}"?`)) {
      unenrollStudentFromSubject(student.student_id, subjectId);
      refreshData();
      showToast(`Unenrolled from ${subjectName} successfully.`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold text-xs px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-lg animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner / Student Greeting */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          {student.avatar_url ? (
            <img
              src={student.avatar_url}
              alt={student.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-md"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-bold text-2xl flex items-center justify-center">
              {student.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              <span>Verified Student Record</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {student.name}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              Student ID: <b className="text-slate-200 font-mono">{student.student_id}</b> &bull; {enrolledSubjects.length} Enrolled Courses
            </p>
          </div>
        </div>

        {/* Attendance Score Badge & Quick Enroll */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-2xl text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Attendance Health</span>
            <span className="text-2xl font-extrabold text-cyan-400 font-mono">{overallPercentage}%</span>
          </div>

          <button
            onClick={() => setIsEnrollOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition shadow-lg shadow-indigo-600/25"
          >
            <Plus className="w-4 h-4 text-cyan-300" />
            <span>Enroll in Course</span>
          </button>
        </div>
      </div>

      {/* Enrolled Courses Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Enrolled Courses ({enrolledSubjects.length})
            </h3>
            <p className="text-xs text-slate-400 font-normal">
              Course attendance standing and participation rate.
            </p>
          </div>
        </div>

        {enrolledSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {enrolledSubjects.map(({ subjects: sub }) => {
              const stat = statsMap[sub.subject_id] || { total: 0, attended: 0 };
              const coursePct =
                stat.total > 0 ? Math.round((stat.attended / stat.total) * 100) : 100;
              const isGoodStanding = coursePct >= 75;

              return (
                <div
                  key={sub.subject_id}
                  className="bg-slate-950 border border-slate-800/80 hover:border-slate-700 rounded-3xl p-6 flex flex-col justify-between gap-5 transition hover:shadow-xl group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                          Section {sub.section}
                        </span>
                        <h4 className="text-lg font-bold text-white leading-snug mt-0.5">{sub.name}</h4>
                      </div>
                      <span className="bg-slate-900 border border-slate-800 text-slate-300 font-mono font-bold text-xs px-2.5 py-1 rounded-lg uppercase shrink-0">
                        {sub.subject_code}
                      </span>
                    </div>
                  </div>

                  {/* Attendance Progress Bar */}
                  <div className="flex flex-col gap-1.5 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-400">Course Attendance</span>
                      <span className={isGoodStanding ? 'text-emerald-400' : 'text-amber-400'}>
                        {coursePct}% {isGoodStanding ? 'Good Standing' : 'Low Attendance'}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isGoodStanding ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                        }`}
                        style={{ width: `${coursePct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Attendance Stats Badges */}
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-900 border border-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-xl flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>
                        <b className="text-white">{stat.total}</b> Total Classes
                      </span>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-xl flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>
                        <b className="text-white">{stat.attended}</b> Attended
                      </span>
                    </div>
                  </div>

                  {/* Unenroll Action */}
                  <div className="border-t border-slate-800/80 pt-4 flex items-center justify-end">
                    <button
                      onClick={() => handleUnenroll(sub.subject_id, sub.name)}
                      className="w-full bg-slate-900 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 text-slate-400 border border-slate-800 font-semibold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Unenroll from Course</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-950 border border-dashed border-slate-800 rounded-3xl p-10 text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-white">Not Registered in Any Courses</h4>
            <p className="text-xs text-slate-400 max-w-sm">
              Click the "Enroll in Course" button and enter the code provided by your instructor.
            </p>
            <button
              onClick={() => setIsEnrollOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll Now</span>
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <EnrollModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        studentId={student.student_id}
        onEnrolled={refreshData}
      />

      {urlJoinCode && (
        <AutoEnrollModal
          joinCode={urlJoinCode}
          studentId={student.student_id}
          onComplete={() => {
            setUrlJoinCode(null);
            window.history.replaceState({}, '', window.location.pathname);
            refreshData();
          }}
        />
      )}
    </div>
  );
};
