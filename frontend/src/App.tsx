import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HomeScreen } from './views/HomeScreen';
import { TeacherScreen } from './views/TeacherScreen';
import { StudentScreen } from './views/StudentScreen';

const MainRouter: React.FC = () => {
  const { userRole, setRole } = useAuth();

  // Check for join-code query param on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const joinCode = params.get('join-code');
    if (joinCode && userRole !== 'student') {
      setRole('student');
    }
  }, [userRole, setRole]);

  switch (userRole) {
    case 'teacher':
      return <TeacherScreen />;
    case 'student':
      return <StudentScreen />;
    case null:
    default:
      return <HomeScreen />;
  }
};

export default function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
}
