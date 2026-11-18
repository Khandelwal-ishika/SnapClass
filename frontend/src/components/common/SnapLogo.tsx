import React from 'react';

interface SnapLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const SnapLogo: React.FC<SnapLogoProps> = ({
  className = '',
  size = 40,
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 3D Glowing Camera Iris & Graduation Cap Icon */}
      <div className="relative group flex items-center justify-center">
        {/* Glow backdrop */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-indigo-600 via-cyan-400 to-emerald-400 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition duration-300"
          style={{ width: size, height: size }}
        />
        
        {/* Logo Image */}
        <img
          src="/logo.png"
          alt="SnapClass AI Logo"
          className="relative rounded-xl object-cover border border-white/20 shadow-lg group-hover:scale-105 transition-transform duration-300"
          style={{ width: size, height: size }}
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-extrabold text-white tracking-tight leading-none">
              Snap<span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Class</span>
            </span>
            <span className="bg-indigo-500/20 text-cyan-300 border border-cyan-500/30 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase">
              AI
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium tracking-wide">
            Biometric Attendance
          </span>
        </div>
      )}
    </div>
  );
};
