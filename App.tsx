
import React, { useState } from 'react';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import ParentDashboard from './components/ParentDashboard';
import AcademicDashboard from './components/AcademicDashboard';
import AdminDashboard from './components/AdminDashboard';
import { UserRole, Resource, SchoolInfo, UserProfile } from './types';

const INITIAL_RESOURCES: Resource[] = [
  { id: '1', title: 'Cell Structure Notes', unit: 'Unit 1', fileSize: '2.4 MB', subject: 'Biology', content: 'Cells are the building blocks of life.' },
];

const SCHOOL: SchoolInfo = {
  name: "Gayaza High School",
  location: "Wakiso, Uganda",
  motto: "Never Give Up"
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);

  const handleLoginSuccess = (userProfile: UserProfile) => {
    setProfile(userProfile);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setProfile(null);
  };

  const handleAddResource = (newRes: Resource) => {
    setResources(prev => [newRes, ...prev]);
  };

  if (!isAuthenticated || !profile) {
    return <Login onLogin={handleLoginSuccess} schoolName={SCHOOL.name} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Role-Based Rendering */}
      {profile.role === 'student' && (
        <StudentDashboard onLogout={handleLogout} resources={resources} school={SCHOOL} userProfile={profile} />
      )}
      
      {profile.role === 'teacher' && (
        <TeacherDashboard onLogout={handleLogout} resources={resources} onAddResource={handleAddResource} school={SCHOOL} userProfile={profile} />
      )}
      
      {profile.role === 'parent' && (
        <ParentDashboard onLogout={handleLogout} school={SCHOOL} userProfile={profile} />
      )}

      {profile.role === 'academic' && (
        <AcademicDashboard onLogout={handleLogout} school={SCHOOL} userProfile={profile} />
      )}

      {profile.role === 'admin' && (
        <AdminDashboard onLogout={handleLogout} userProfile={profile} />
      )}
      
      {/* Visual Identity Layer */}
      <div className="fixed inset-0 pointer-events-none african-pattern -z-10" />
    </div>
  );
};

export default App;
