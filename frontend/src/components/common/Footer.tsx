import React from 'react';
import { ShieldCheck, Cpu, Lock } from 'lucide-react';

interface FooterProps {
  variant?: 'home' | 'dashboard';
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full py-8 mt-12 border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-md select-none">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className="text-xs font-semibold text-slate-400">
            Snap<span className="text-indigo-400">Class</span> &mdash; Intelligent Classroom Attendance &amp; Analytics
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Empowering modern institutions with high-precision biometric &amp; acoustic recognition.
          </p>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-indigo-400" />
            <span>Encrypted Storage</span>
          </span>
          <span className="text-slate-700">&bull;</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>FERPA &amp; Privacy Ready</span>
          </span>
          <span className="text-slate-700">&bull;</span>
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>On-Device AI</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
