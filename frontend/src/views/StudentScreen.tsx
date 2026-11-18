import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { StudentLogin } from '../components/student/StudentLogin';
import { StudentDashboard } from '../components/student/StudentDashboard';

export const StudentScreen: React.FC = () => {
  const { student } = useAuth();

  return (
    <div className="min-h-screen bg-[#0B0F19] bg-grid-pattern text-slate-100 flex flex-col justify-between">
      {/* Header */}
      <Header variant="dashboard" />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 flex-1">
        {!student ? <StudentLogin /> : <StudentDashboard />}
      </main>

      {/* Footer */}
      <Footer variant="dashboard" />
    </div>
  );
};
