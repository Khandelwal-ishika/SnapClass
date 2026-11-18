import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SnapLogo } from './SnapLogo';
import { LogOut, ArrowLeft, User, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  variant?: 'home' | 'dashboard';
}

export const Header: React.FC<HeaderProps> = ({ variant = 'dashboard' }) => {
  const { userRole, teacher, student, logout, setRole } = useAuth();

  if (variant === 'home') {
    return (
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-4">
        {/* Brand */}
        <div onClick={() => setRole(null)} className="cursor-pointer">
          <SnapLogo size={46} showText={true} />
        </div>

        {/* Status Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs text-slate-300 font-medium backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Biometric Engine Active</span>
        </div>
      </header>
    );
  }

  // Dashboard variant
  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div
          onClick={() => setRole(null)}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <SnapLogo size={36} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-white tracking-tight">
                Snap<span className="text-cyan-400">Class</span>
              </span>
              <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase">
                {userRole === 'teacher' ? 'Faculty Portal' : 'Student Portal'}
              </span>
            </div>
          </div>
        </div>

        {/* User Info / Controls */}
        <div className="flex items-center gap-3">
          {userRole === 'teacher' && teacher && (
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{teacher.name}</span>
              <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-1.5 py-0.5 rounded font-mono">Prof</span>
            </div>
          )}

          {userRole === 'student' && student && (
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-200">
              {student.avatar_url ? (
                <img src={student.avatar_url} alt={student.name} className="w-5 h-5 rounded-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-cyan-400" />
              )}
              <span>{student.name}</span>
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-1.5 py-0.5 rounded font-mono">Student</span>
            </div>
          )}

          {/* Action Button */}
          {teacher || student ? (
            <button
              onClick={logout}
              title="Logout session"
              className="bg-slate-800 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 text-slate-300 border border-slate-700 font-semibold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-all duration-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          ) : (
            <button
              onClick={() => setRole(null)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-all duration-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
