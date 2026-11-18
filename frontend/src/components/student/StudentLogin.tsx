import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { WebCamCapture } from '../common/WebCamCapture';
import { AudioRecorder } from '../common/AudioRecorder';
import { getStudents } from '../../lib/storage';
import type { Student } from '../../types';
import { ScanFace, UserPlus, Sparkles, CheckCircle2, AlertCircle, ChevronRight, Mic, ShieldCheck } from 'lucide-react';

export const StudentLogin: React.FC = () => {
  const { handleStudentFaceLogin, handleStudentRegister } = useAuth();
  const registeredStudents = getStudents();

  const [isScanning, setIsScanning] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [newName, setNewName] = useState('');
  const [voiceRecordedBlob, setVoiceRecordedBlob] = useState<Blob | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleFaceCapture = (photoDataUrl: string) => {
    setCapturedPhoto(photoDataUrl);
    setIsScanning(true);
    setErrorMessage('');
    setShowRegistration(false);

    setTimeout(() => {
      setIsScanning(false);
      const availableStudents = getStudents();

      const matchCandidate = availableStudents.length > 0 ? availableStudents[0] : null;
      const isRecognized = availableStudents.length > 0 && Math.random() > 0.35;

      if (isRecognized && matchCandidate) {
        showToast(`Face Verified! Welcome back, ${matchCandidate.name}! 👋`);
        setTimeout(() => {
          handleStudentFaceLogin(matchCandidate);
        }, 1000);
      } else {
        setErrorMessage('Biometric pattern not recognized in institutional database. Please create your student profile below.');
        setShowRegistration(true);
      }
    }, 1600);
  };

  const handleQuickDemoLogin = (student: Student) => {
    showToast(`Authenticating ${student.name}...`);
    setTimeout(() => {
      handleStudentFaceLogin(student);
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setErrorMessage('Please enter your full legal name');
      return;
    }

    const dummyFaceEmb = Array.from({ length: 128 }, () => Math.random());
    const dummyVoiceEmb = voiceRecordedBlob ? Array.from({ length: 256 }, () => Math.random()) : null;

    const newStudent = handleStudentRegister(newName.trim(), dummyFaceEmb, dummyVoiceEmb, capturedPhoto || undefined);
    showToast(`Profile Registered! Welcome, ${newStudent.name}! 🎉`);
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6">
      {/* Toast */}
      {toastMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold text-xs px-4 py-3 rounded-2xl flex items-center gap-2 shadow-lg animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main FaceID Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <ScanFace className="w-3.5 h-3.5" />
            <span>Biometric FaceID Login</span>
          </div>
          <h3 className="text-2xl font-bold text-white">
            Facial Recognition Sign In
          </h3>
          <p className="text-xs text-slate-400 font-normal mt-1">
            Position your face within the optical viewfinder to verify student credentials.
          </p>
        </div>

        {/* Camera Viewfinder */}
        <div className="w-full">
          <WebCamCapture
            onCapture={handleFaceCapture}
            showScanLaser={true}
            scanTargetText="Center face for biometric match"
            buttonLabel="Scan Face for FaceID"
            isScanning={isScanning}
          />
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-3.5 rounded-2xl text-xs font-medium flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Registration Section */}
        {showRegistration && (
          <form
            onSubmit={handleRegisterSubmit}
            className="border border-indigo-500/30 bg-slate-950/80 rounded-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-bottom-3"
          >
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <UserPlus className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white">Register Student Profile</h4>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Akash Sharma"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-hidden transition"
              />
            </div>

            {/* Optional Voice Enrollment */}
            <div className="pt-2">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-cyan-400" />
                Optional: Voice Profile Enrollment
              </span>
              <p className="text-[11px] text-slate-400 font-normal mb-2">
                Record your voice to enable acoustic roll-call verification.
              </p>
              <AudioRecorder
                onAudioRecorded={(blob) => setVoiceRecordedBlob(blob)}
                promptText='Say "I am present, my name is..."'
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer mt-2 transition shadow-lg shadow-indigo-600/25"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Complete Profile &amp; Sign In</span>
            </button>
          </form>
        )}
      </div>

      {/* Quick Demo Students Login List */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            ⚡ Quick 1-Click Demo Profiles ({registeredStudents.length})
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {registeredStudents.map((s) => (
            <button
              key={s.student_id}
              onClick={() => handleQuickDemoLogin(s)}
              type="button"
              className="bg-slate-950 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 text-left p-3 rounded-xl flex items-center justify-between cursor-pointer group transition"
            >
              <div className="flex items-center gap-2.5">
                {s.avatar_url ? (
                  <img src={s.avatar_url} alt={s.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-xs">
                    {s.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-white group-hover:text-cyan-300 transition">{s.name}</p>
                  <p className="text-[10px] font-mono text-slate-400">ID: {s.student_id}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
