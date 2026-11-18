import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { findSubjectByCode, enrollStudentToSubject } from '../../lib/storage';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: number;
  onEnrolled: () => void;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({
  isOpen,
  onClose,
  studentId,
  onEnrolled,
}) => {
  const [joinCode, setJoinCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!joinCode.trim()) {
      setErrorMessage('Please enter a course code');
      return;
    }

    const subject = findSubjectByCode(joinCode.trim());
    if (!subject) {
      setErrorMessage('Course code not found. Please verify with your professor.');
      return;
    }

    const success = enrollStudentToSubject(studentId, subject.subject_id);
    if (!success) {
      setErrorMessage(`You are already enrolled in ${subject.name}.`);
      return;
    }

    setSuccessMessage(`Enrolled in "${subject.name}" successfully! 🎉`);
    setTimeout(() => {
      setJoinCode('');
      setSuccessMessage('');
      onEnrolled();
      onClose();
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enroll in Course" maxWidth="md">
      <form onSubmit={handleEnroll} className="flex flex-col gap-4">
        <p className="text-xs text-slate-400 font-normal">
          Enter the course code (e.g. <b>CS101</b> or <b>AI302</b>) provided by your instructor.
        </p>

        {errorMessage && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-3 rounded-xl text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-3 rounded-xl text-xs font-medium flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
            Course Registration Code
          </label>
          <input
            type="text"
            required
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            placeholder="e.g. CS101"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold text-white focus:border-indigo-500 focus:outline-hidden uppercase placeholder:normal-case transition"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold px-4 py-2 rounded-xl text-xs cursor-pointer transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition shadow-md shadow-indigo-600/25"
          >
            <span>Register Now</span>
            <ArrowRight className="w-4 h-4 text-cyan-300" />
          </button>
        </div>
      </form>
    </Modal>
  );
};
