import React, { useState } from 'react';
import { getAttendanceForTeacher } from '../../lib/storage';
import type { AttendanceRecordSession } from '../../types';
import { Modal } from '../common/Modal';
import { Calendar, Search, Download, CheckCircle2, XCircle, FileText, ChevronRight } from 'lucide-react';

interface AttendanceRecordsTabProps {
  teacherId: number;
}

export const AttendanceRecordsTab: React.FC<AttendanceRecordsTabProps> = ({ teacherId }) => {
  const sessions = getAttendanceForTeacher(teacherId);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState<AttendanceRecordSession | null>(null);

  const filteredSessions = sessions.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.subject_name.toLowerCase().includes(term) ||
      s.subject_code.toLowerCase().includes(term) ||
      s.timeFormatted.toLowerCase().includes(term)
    );
  });

  const exportToCSV = () => {
    if (sessions.length === 0) return;

    let csvContent = 'data:text/csv;charset=utf-8,Session Time,Subject Name,Subject Code,Present Count,Total Count,Attendance Percentage\n';

    sessions.forEach((s) => {
      const pct = s.total_count > 0 ? Math.round((s.present_count / s.total_count) * 100) : 0;
      csvContent += `"${s.timeFormatted}","${s.subject_name}","${s.subject_code}",${s.present_count},${s.total_count},${pct}%\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `snapclass_attendance_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search & Export Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by course or date..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-white focus:border-indigo-500 focus:outline-hidden"
          />
        </div>

        {/* CSV Export Button */}
        <button
          onClick={exportToCSV}
          disabled={sessions.length === 0}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 transition shadow-md shadow-indigo-600/25 self-stretch sm:self-auto"
        >
          <Download className="w-4 h-4 text-cyan-300" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Sessions Table Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              Classroom Attendance Logbook ({filteredSessions.length})
            </h3>
            <p className="text-xs text-slate-400 font-normal">
              Chronological ledger of AI facial and acoustic attendance sessions.
            </p>
          </div>
        </div>

        {filteredSessions.length > 0 ? (
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Session Date &amp; Time</th>
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4">Attendance Stats</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-medium text-slate-300">
                  {filteredSessions.map((session) => {
                    const pct =
                      session.total_count > 0
                        ? Math.round((session.present_count / session.total_count) * 100)
                        : 0;

                    return (
                      <tr
                        key={session.ts_group}
                        onClick={() => setSelectedSession(session)}
                        className="hover:bg-slate-900/80 transition-colors cursor-pointer group"
                      >
                        <td className="py-3 px-4 text-white font-semibold">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                            <span>{session.timeFormatted}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-bold text-white">{session.subject_name}</td>
                        <td className="py-3 px-4">
                          <span className="bg-slate-900 border border-slate-700 text-cyan-300 font-mono font-bold text-xs px-2 py-0.5 rounded">
                            {session.subject_code}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-200">{session.attendance_stats}</span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                                pct >= 75
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              }`}
                            >
                              {pct}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            className="bg-slate-800 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white p-1.5 rounded-lg transition"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 flex flex-col items-center gap-2">
            <FileText className="w-8 h-8 stroke-1" />
            <p className="text-xs font-semibold text-slate-400">No session logs recorded</p>
            <p className="text-[11px] text-slate-500">Run roll call in the "Take Attendance" tab to populate this logbook.</p>
          </div>
        )}
      </div>

      {/* Session Breakdown Modal */}
      {selectedSession && (
        <Modal
          isOpen={Boolean(selectedSession)}
          onClose={() => setSelectedSession(null)}
          title={`Session Details: ${selectedSession.subject_name}`}
          maxWidth="lg"
        >
          <div className="flex flex-col gap-4">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Recorded Session</span>
                <h4 className="text-sm font-bold text-white mt-0.5">{selectedSession.timeFormatted}</h4>
                <p className="text-xs text-slate-400">Course Code: <b className="text-slate-200">{selectedSession.subject_code}</b></p>
              </div>
              <div className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl text-center">
                <span className="text-base font-bold text-cyan-400 font-mono">
                  {selectedSession.present_count}/{selectedSession.total_count}
                </span>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Present</p>
              </div>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950 max-h-60 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 border-b border-slate-800 font-semibold uppercase text-[10px] text-slate-400">
                  <tr>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Student ID</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {selectedSession.records.map((rec, i) => (
                    <tr key={i} className="hover:bg-slate-900/60">
                      <td className="py-2.5 px-3 font-semibold text-white">
                        {rec.students?.name || `Student #${rec.student_id}`}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">{rec.student_id}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span
                          className={`inline-flex items-center gap-1 font-semibold text-[11px] px-2 py-0.5 rounded-md ${
                            rec.is_present
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {rec.is_present ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Present</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              <span>Absent</span>
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedSession(null)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2 rounded-xl text-xs cursor-pointer transition shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
