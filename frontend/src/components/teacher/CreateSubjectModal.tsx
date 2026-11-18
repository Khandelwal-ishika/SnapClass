import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { createSubject } from '../../lib/storage';
import type { Subject } from '../../types';
import { Plus, AlertCircle } from 'lucide-react';

interface CreateSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherId: number;
  onSubjectCreated: (newSubject: Subject) => void;
}

export const CreateSubjectModal: React.FC<CreateSubjectModalProps> = ({
  isOpen,
  onClose,
  teacherId,
  onSubjectCreated,
}) => {
  const [subjectCode, setSubjectCode] = useState('');
  const [name, setName] = useState('');
  const [section, setSection] = useState('A');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectCode.trim() || !name.trim() || !section.trim()) {
      setErrorMessage('Please fill in all subject fields.');
      return;
    }

    try {
      const created = createSubject(subjectCode, name, section, teacherId);
      setSubjectCode('');
      setName('');
      setSection('A');
      setErrorMessage('');
      onSubjectCreated(created);
      onClose();
    } catch {
      setErrorMessage('Failed to create course. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Course" maxWidth="md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-xs text-slate-400 font-normal">
          Enter the course information below. Students will use the subject code to register.
        </p>

        {errorMessage && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-3 rounded-xl text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
            Course / Subject Code
          </label>
          <input
            type="text"
            required
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            placeholder="e.g. CS101 or AI302"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-white focus:border-indigo-500 focus:outline-hidden uppercase placeholder:normal-case transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
            Course Title
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Intro to Machine Learning"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:border-indigo-500 focus:outline-hidden transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
            Class Section
          </label>
          <input
            type="text"
            required
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="e.g. A"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:border-indigo-500 focus:outline-hidden transition"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs cursor-pointer transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition shadow-md shadow-indigo-600/25"
          >
            <Plus className="w-4 h-4" />
            <span>Create Course</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
