import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { ArrowRight, Sparkles, ScanFace, Mic, QrCode, BarChart3, ShieldCheck, GraduationCap, School, CheckCircle2, Zap } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { setRole } = useAuth();

  const studentMascot = 'https://i.ibb.co/844D9Lrt/mascot-student.png';
  const profMascot = 'https://i.ibb.co/CsmQQV6X/mascot-prof.png';

  return (
    <div className="min-h-screen bg-[#0B0F19] bg-grid-pattern text-slate-100 flex flex-col justify-between">
      {/* Navbar Header */}
      <Header variant="home" />

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col items-center">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-300 mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next-Generation AI Vision &amp; Acoustic Roll Call</span>
        </div>

        {/* Hero Title & Subtitle */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-center tracking-tight text-white max-w-3xl leading-[1.15]">
          Smart Classroom Attendance, Powered by <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">AI Intelligence</span>
        </h1>
        <p className="mt-4 text-sm md:text-base text-slate-400 text-center max-w-2xl font-normal">
          Eliminate manual roll calls. Scan full classrooms in one second with multi-face detection, acoustic voice verification, and automated gradebook sync.
        </p>

        {/* Value Prop Chips */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mt-6 flex-wrap text-xs text-slate-300 font-medium">
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>&lt;1s Multi-Face Scan</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>99.4% Biometric Precision</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Encrypted &amp; Privacy-First</span>
          </div>
        </div>

        {/* Dual Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-12">
          {/* Student Portal Card */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-8 flex flex-col justify-between gap-6 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 group">
            <div className="flex items-start justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Student Access</span>
                <h3 className="text-2xl font-bold text-white mt-1">Student Portal</h3>
                <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed">
                  Verify attendance using on-device FaceID, manage enrolled courses, track attendance standing, and join classes instantly via QR codes.
                </p>
              </div>
              <img
                src={studentMascot}
                alt="Student Mascot"
                className="h-20 w-20 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition"
              />
            </div>

            <div className="space-y-2 border-t border-slate-800/80 pt-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Instant FaceID &amp; Voice Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Real-time Attendance Analytics</span>
              </div>
            </div>

            <button
              onClick={() => setRole('student')}
              className="w-full bg-slate-800 hover:bg-cyan-600 text-white font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer transition shadow-md group-hover:shadow-cyan-500/25"
            >
              <span>Launch Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Teacher Portal Card */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-8 flex flex-col justify-between gap-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 group">
            <div className="flex items-start justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  <School className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">Faculty Access</span>
                <h3 className="text-2xl font-bold text-white mt-1">Faculty Portal</h3>
                <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed">
                  Capture multi-angle classroom photos or audio roll call, manage course rosters, generate dynamic joining QR codes, and export CSV logs.
                </p>
              </div>
              <img
                src={profMascot}
                alt="Teacher Mascot"
                className="h-20 w-20 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition"
              />
            </div>

            <div className="space-y-2 border-t border-slate-800/80 pt-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Multi-Photo Batch AI Scanning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Audio Roll-Call Identification &amp; Export</span>
              </div>
            </div>

            <button
              onClick={() => setRole('teacher')}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer transition shadow-lg shadow-indigo-600/25"
            >
              <span>Launch Faculty Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl mt-12">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center flex flex-col items-center gap-2">
            <ScanFace className="w-5 h-5 text-indigo-400" />
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Multi-Face AI</h4>
            <p className="text-[11px] text-slate-400">Scans 50+ students in a single second</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center flex flex-col items-center gap-2">
            <Mic className="w-5 h-5 text-cyan-400" />
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Voice Roll Call</h4>
            <p className="text-[11px] text-slate-400">256-D Acoustic speaker identification</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center flex flex-col items-center gap-2">
            <QrCode className="w-5 h-5 text-emerald-400" />
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Instant QR Join</h4>
            <p className="text-[11px] text-slate-400">1-Click student enrollment codes</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center flex flex-col items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Analytics &amp; CSV</h4>
            <p className="text-[11px] text-slate-400">Historical records &amp; gradebook sync</p>
          </div>
        </div>
      </main>

      {/* Compliance & Security Footer */}
      <Footer variant="home" />
    </div>
  );
};
