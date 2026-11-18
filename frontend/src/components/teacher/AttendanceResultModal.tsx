import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import type { AttendanceResultItem, Subject } from '../../types';
import { createAttendance } from '../../lib/storage';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Check, Trash2 } from 'lucide-react';

interface AttendanceResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: AttendanceResultItem[];
  subject: Subject | null;
  onSaveSuccess: () => void;
}

export const AttendanceResultModal: React.FC<AttendanceResultModalProps> = ({
  isOpen,
  onClose,
  results: initialResults,
  subject,
  onSaveSuccess,
}) => {
  const [results, setResults] = useState<AttendanceResultItem[]>(initialResults);
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    setResults(initialResults);
  }, [initialResults]);

  if (!subject) return null;

  const presentCount = results.filter((r) => r.isPresent).length;
  const totalCount = results.length;
  const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  const toggleStudentStatus = (id: number) => {
    setResults((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPresent: !item.isPresent, source: item.isPresent ? 'Manual Override' : item.source } : item
      )
    );
  };

  const handleConfirmAndSave = async () => {
    setIsSaving(true);
    try {
      const currentTimestamp = new Date().toISOString();

      const attendanceLogs = results.map((item) => ({
        student_id: item.id,
        subject_id: subject.subject_id,
        timestamp: currentTimestamp,
        is_present: item.isPresent,
      }));

      createAttendance(attendanceLogs);

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B'],
      });

      onSaveSuccess();
      onClose();
    } catch (err) {
      console.error('Failed to save attendance logs:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Review AI Biometric Detections" maxWidth="xl">
      <div className="flex flex-col gap-4">
        {/* Summary Banner */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Attendance Verification</span>
            <h4 className="text-sm font-bold text-white mt-0.5">{subject.name}</h4>
            <p className="text-xs text-slate-400">
              Code: <b className="text-cyan-300 font-mono">{subject.subject_code}</b> &bull; Section {subject.section}
            </p>
          </div>
          <div className="text-right bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl">
            <span className="text-lg font-bold font-mono text-white">{presentCount}/{totalCount}</span>
            <p className="text-[10px] font-bold uppercase text-emerald-400">{attendanceRate}% Present</p>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Verify AI detection sources below. Click any status button to toggle manual attendance adjustments.
        </p>

        {/* Results Table */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950 max-h-72 overflow-y-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Student</th>
                <th className="py-2.5 px-3">ID</th>
                <th className="py-2.5 px-3 hidden sm:table-cell">Detection Source</th>
                <th className="py-2.5 px-3 text-right">Status (Toggle)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium text-slate-300">
              {results.map((student) => (
                <tr key={student.id} className="hover:bg-slate-900/60 transition">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      {student.avatarUrl ? (
                        <img
                          src={student.avatarUrl}
                          alt={student.name}
                          className="w-6 h-6 rounded-full object-cover border border-slate-700"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-[10px]">
                          {student.name.charAt(0)}
                        </div>
                      )}
                      <span className="font-semibold text-white">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">{student.id}</td>
                  <td className="py-2.5 px-3 text-slate-400 hidden sm:table-cell">
                    <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px]">
                      {student.source}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => toggleStudentStatus(student.id)}
                      className={`py-1 px-3 rounded-lg text-xs font-semibold cursor-pointer inline-flex items-center gap-1 transition ${
                        student.isPresent
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
                      }`}
                    >
                      {student.isPresent ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Present</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Absent</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onClose}
            type="button"
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold py-2.5 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-1.5 transition"
          >
            <Trash2 className="w-4 h-4 text-slate-500" />
            <span>Discard</span>
          </button>
          <button
            onClick={handleConfirmAndSave}
            disabled={isSaving}
            type="button"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-2 transition shadow-md shadow-indigo-600/25"
          >
            <Check className="w-4 h-4" />
            <span>Confirm &amp; Sync Session</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
