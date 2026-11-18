import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { findSubjectByCode, enrollStudentToSubject, getStudentSubjects } from '../../lib/storage';
import { Sparkles, CheckCircle2, AlertCircle, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AutoEnrollModalProps {
  joinCode: string;
  studentId: number;
  onComplete: () => void;
}

export const AutoEnrollModal: React.FC<AutoEnrollModalProps> = ({
  joinCode,
  studentId,
  onComplete,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [success, setSuccess] = useState(false);

  const subject = findSubjectByCode(joinCode);
  const enrolledList = getStudentSubjects(studentId);
  const isAlreadyEnrolled = Boolean(subject && enrolledList.some((e) => e.subjects.subject_id === subject.subject_id));

  const handleEnroll = () => {
    if (!subject) return;
    enrollStudentToSubject(studentId, subject.subject_id);
    setSuccess(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#4F46E5', '#06B6D4', '#10B981'],
    });

    setTimeout(() => {
      setIsOpen(false);
      onComplete();
    }, 1500);
  };

  const handleClose = () => {
    setIsOpen(false);
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Quick Auto-Registration" maxWidth="md">
      <div className="flex flex-col gap-4">
        {!subject ? (
          <div className="text-center py-4 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white">Invalid Course Code ({joinCode})</h4>
            <p className="text-xs text-slate-400">
              No active course matches this registration code.
            </p>
            <button
              onClick={handleClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer mt-2 transition"
            >
              Close
            </button>
          </div>
        ) : isAlreadyEnrolled ? (
          <div className="text-center py-4 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white">Already Registered</h4>
            <p className="text-xs text-slate-400">
              You are already enrolled in <b>{subject.name}</b> ({subject.subject_code}).
            </p>
            <button
              onClick={handleClose}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2 rounded-xl text-xs cursor-pointer mt-2 transition shadow-sm"
            >
              Acknowledge
            </button>
          </div>
        ) : (
          <>
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">Course Invitation</span>
              <h4 className="text-sm font-bold text-white mt-0.5">{subject.name}</h4>
              <p className="text-xs text-slate-400">
                Course Code: <b className="text-cyan-300 font-mono">{subject.subject_code}</b> &bull; Section {subject.section}
              </p>
            </div>

            {success ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-4 rounded-xl text-center flex flex-col items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold">Successfully enrolled in course!</span>
              </div>
            ) : (
              <>
                <p className="text-xs text-slate-400">
                  Would you like to enroll in this course to enable attendance tracking and gradebook participation?
                </p>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold py-2.5 rounded-xl text-xs cursor-pointer transition"
                  >
                    Decline
                  </button>
                  <button
                    onClick={handleEnroll}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-1.5 transition shadow-md shadow-indigo-600/25"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Confirm Enrollment</span>
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};
