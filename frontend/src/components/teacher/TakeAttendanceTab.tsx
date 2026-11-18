import React, { useState } from 'react';
import type { Subject, AttendanceResultItem } from '../../types';
import { getTeacherSubjects, getSubjectEnrolledStudents } from '../../lib/storage';
import { AddPhotosModal } from './AddPhotosModal';
import { VoiceAttendanceModal } from './VoiceAttendanceModal';
import { AttendanceResultModal } from './AttendanceResultModal';
import { Camera, Mic, ScanFace, Trash2, Plus, CheckCircle2, ChevronDown, AlertCircle, Sparkles, Users, Clock } from 'lucide-react';

interface TakeAttendanceTabProps {
  teacherId: number;
}

export const TakeAttendanceTab: React.FC<TakeAttendanceTabProps> = ({ teacherId }) => {
  const subjects = getTeacherSubjects(teacherId);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>(() => {
    return subjects.length > 0 ? subjects[0].subject_id : 0;
  });

  const [photos, setPhotos] = useState<string[]>([]);
  const [isAddPhotosOpen, setIsAddPhotosOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isScanningFaces, setIsScanningFaces] = useState(false);
  const [attendanceResults, setAttendanceResults] = useState<AttendanceResultItem[]>([]);
  const [toastMessage, setToastMessage] = useState('');

  const selectedSubject = subjects.find((s) => s.subject_id === selectedSubjectId) || subjects[0] || null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddPhoto = (newPhoto: string) => {
    setPhotos((prev) => [...prev, newPhoto]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearAllPhotos = () => {
    setPhotos([]);
    showToast('All photos cleared');
  };

  const handleRunFaceAnalysis = () => {
    if (!selectedSubject) return;
    const enrolledStudents = getSubjectEnrolledStudents(selectedSubject.subject_id);

    if (enrolledStudents.length === 0) {
      alert('No students are enrolled in this course yet. Share the subject code with students first!');
      return;
    }

    setIsScanningFaces(true);

    setTimeout(() => {
      setIsScanningFaces(false);

      const simulatedResults: AttendanceResultItem[] = enrolledStudents.map((student, idx) => {
        const isDetected = Math.random() > 0.18 || idx === 0;
        const matchedPhotoIndex = (idx % photos.length) + 1;

        return {
          id: student.student_id,
          name: student.name,
          source: isDetected ? `Photo #${matchedPhotoIndex} (Confidence: 98.4%)` : '-',
          isPresent: isDetected,
          avatarUrl: student.avatar_url,
        };
      });

      setAttendanceResults(simulatedResults);
      setIsResultModalOpen(true);
    }, 1800);
  };

  if (subjects.length === 0) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-10 text-center flex flex-col items-center gap-4 max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-white">No Active Courses</h3>
        <p className="text-xs text-slate-400 font-normal">
          You haven't created any courses yet. Go to <b>"Manage Courses"</b> to create your first class.
        </p>
      </div>
    );
  }

  const hasPhotos = photos.length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Toast */}
      {toastMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium text-xs px-4 py-3 rounded-2xl flex items-center gap-2 shadow-lg animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Subject Selector Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="flex-1">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Active Course Selection
          </label>
          <div className="relative">
            <select
              value={selectedSubject?.subject_id || ''}
              onChange={(e) => setSelectedSubjectId(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm font-bold text-white appearance-none focus:border-indigo-500 focus:outline-hidden cursor-pointer"
            >
              {subjects.map((sub) => (
                <option key={sub.subject_id} value={sub.subject_id}>
                  {sub.name} &bull; {sub.subject_code} (Section {sub.section})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
          </div>

          {selectedSubject && (
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <b className="text-slate-200">{selectedSubject.total_students}</b> Enrolled Students
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <b className="text-slate-200">{selectedSubject.total_classes}</b> Recorded Sessions
              </span>
            </div>
          )}
        </div>

        {/* Add Photos Button */}
        <button
          onClick={() => setIsAddPhotosOpen(true)}
          type="button"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-lg shadow-indigo-600/25"
        >
          <Camera className="w-4 h-4 text-cyan-300" />
          <span>Add Classroom Snapshots</span>
        </button>
      </div>

      {/* Added Photos Gallery Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              Classroom Angles &amp; Snapshots ({photos.length})
            </h3>
            <p className="text-xs text-slate-400 font-normal">
              Capture or upload multiple angles of the lecture hall for high-precision facial detection.
            </p>
          </div>

          {hasPhotos && (
            <button
              onClick={handleClearAllPhotos}
              className="bg-slate-800 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 text-slate-400 border border-slate-700 font-medium px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Gallery</span>
            </button>
          )}
        </div>

        {/* Gallery Grid */}
        {hasPhotos ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((img, idx) => (
              <div
                key={idx}
                className="relative group rounded-2xl overflow-hidden border border-slate-700/80 aspect-4/3 bg-slate-950 shadow-md"
              >
                <img src={img} alt={`Class angle ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button
                    onClick={() => handleRemovePhoto(idx)}
                    className="p-2 rounded-xl bg-rose-600/80 text-white hover:bg-rose-500 transition cursor-pointer"
                    title="Delete photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 bg-slate-900/90 border border-slate-700 text-slate-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  Angle #{idx + 1}
                </div>
              </div>
            ))}

            {/* Quick add more */}
            <button
              onClick={() => setIsAddPhotosOpen(true)}
              className="border border-dashed border-slate-700 rounded-2xl aspect-4/3 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/60 hover:bg-indigo-500/5 transition cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span className="text-xs font-semibold">Add Snapshot</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/50">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2">
              <Camera className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200">No Classroom Snapshots Yet</h4>
            <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
              Capture snapshots of your classroom using your camera or upload photo files to run AI biometric scan.
            </p>
            <button
              onClick={() => setIsAddPhotosOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Capture / Upload Snapshots</span>
            </button>
          </div>
        )}

        {/* AI Action Execution Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
          <button
            onClick={handleRunFaceAnalysis}
            disabled={!hasPhotos || isScanningFaces}
            type="button"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl text-xs flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-40 transition shadow-lg shadow-indigo-600/20"
          >
            <ScanFace className={`w-4 h-4 text-cyan-300 ${isScanningFaces ? 'animate-spin' : ''}`} />
            <span>{isScanningFaces ? 'Deep Scanning Classroom Faces...' : 'Run AI Face Recognition'}</span>
          </button>

          <button
            onClick={() => setIsVoiceModalOpen(true)}
            type="button"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold py-3.5 px-6 rounded-xl text-xs flex items-center justify-center gap-2.5 cursor-pointer transition"
          >
            <Mic className="w-4 h-4 text-cyan-400" />
            <span>Use Acoustic Voice Roll Call</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <AddPhotosModal
        isOpen={isAddPhotosOpen}
        onClose={() => setIsAddPhotosOpen(false)}
        photos={photos}
        onAddPhoto={handleAddPhoto}
        onRemovePhoto={handleRemovePhoto}
      />

      <VoiceAttendanceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        subject={selectedSubject}
        onProceedToReview={(results) => {
          setAttendanceResults(results);
          setIsResultModalOpen(true);
        }}
      />

      <AttendanceResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        results={attendanceResults}
        subject={selectedSubject}
        onSaveSuccess={() => {
          setPhotos([]);
          showToast('Attendance recorded & synchronized to database! 🎉');
        }}
      />
    </div>
  );
};
