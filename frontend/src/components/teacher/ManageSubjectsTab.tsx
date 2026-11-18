import React, { useState } from 'react';
import type { Subject } from '../../types';
import { getTeacherSubjects } from '../../lib/storage';
import { CreateSubjectModal } from './CreateSubjectModal';
import { ShareSubjectModal } from './ShareSubjectModal';
import { Plus, Share2, BookOpen, Users, Clock } from 'lucide-react';

interface ManageSubjectsTabProps {
  teacherId: number;
}

export const ManageSubjectsTab: React.FC<ManageSubjectsTabProps> = ({ teacherId }) => {
  const [subjects, setSubjects] = useState<Subject[]>(() => getTeacherSubjects(teacherId));
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [shareSubject, setShareSubject] = useState<Subject | null>(null);

  const refreshSubjects = () => {
    setSubjects(getTeacherSubjects(teacherId));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            Course Management &amp; Rosters
          </h3>
          <p className="text-xs text-slate-400 font-normal mt-1">
            Configure active courses, track student enrollment numbers, and generate dynamic joining QR codes.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-lg shadow-indigo-600/25 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-cyan-300" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Courses Grid */}
      {subjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {subjects.map((sub) => (
            <div
              key={sub.subject_id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 flex flex-col justify-between gap-5 transition-all hover:shadow-xl hover:shadow-indigo-500/5 group"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                      Section {sub.section}
                    </span>
                    <h4 className="text-lg font-bold text-white leading-snug mt-0.5">{sub.name}</h4>
                  </div>
                  <span className="bg-slate-800 border border-slate-700 text-slate-200 font-mono font-bold text-xs px-2.5 py-1 rounded-lg uppercase shrink-0">
                    {sub.subject_code}
                  </span>
                </div>
              </div>

              {/* Stats badges */}
              <div className="flex items-center gap-3">
                <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    <b className="text-white">{sub.total_students || 0}</b> Students
                  </span>
                </div>

                <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>
                    <b className="text-white">{sub.total_classes || 0}</b> Sessions
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between">
                <button
                  onClick={() => setShareSubject(sub)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Share QR Code &amp; Join Link</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">No Courses Registered</h3>
          <p className="text-xs text-slate-400 font-normal max-w-md">
            Click "Create New Course" above to set up your subjects and start accepting student enrollments.
          </p>
        </div>
      )}

      {/* Modals */}
      <CreateSubjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        teacherId={teacherId}
        onSubjectCreated={() => {
          refreshSubjects();
        }}
      />

      <ShareSubjectModal
        isOpen={Boolean(shareSubject)}
        onClose={() => setShareSubject(null)}
        subject={shareSubject}
      />
    </div>
  );
};
