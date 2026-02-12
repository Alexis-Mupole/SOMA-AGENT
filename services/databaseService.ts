
import { Resource, UserProfile, SchoolClass, ApprovalStatus, UserRole, StudentProgress, TeacherFeedback, Exam } from '../types';

let MOCK_USERS: UserProfile[] = [
  { id: 'u1', fullName: 'Okello John', role: 'student', schoolId: 'GAYAZA-01', studentCode: 'SOMA-9921', status: 'APPROVED', email: 'john@soma.ug' },
  { id: 'u2', fullName: 'Martha Nabirye', role: 'teacher', schoolId: 'GAYAZA-01', email: 'martha@soma.ug' },
  { id: 'u3', fullName: 'Dr. Sempa', role: 'academic', schoolId: 'GAYAZA-01', email: 'dos@soma.ug' },
  { id: 'u4', fullName: 'Technical Admin', role: 'admin', schoolId: 'GLOBAL', email: 'admin@soma.ug' },
  { id: 'u5', fullName: 'Sarah Nankunda', role: 'parent', schoolId: 'GAYAZA-01', email: 'parent@soma.ug' },
];

let MOCK_FEEDBACK: TeacherFeedback[] = [
  { id: 'f1', fromTeacher: 'Ms. Martha', subject: 'Biology', date: '2023-11-10', message: 'Excellent work on the cell project, John! Keep focusing on mitosis.' }
];

let MOCK_EXAMS: Exam[] = [
  { id: 'e1', title: 'Mid-Term Biology Quiz', subject: 'Biology', date: '2023-11-20', duration: '45 mins', status: 'upcoming' }
];

export const authenticateUser = async (email: string, password?: string): Promise<UserProfile | null> => {
  await new Promise(r => setTimeout(r, 600));
  return MOCK_USERS.find(u => u.email === email.toLowerCase()) || null;
};

export const registerUser = async (fullName: string, email: string, role: UserRole): Promise<{success: boolean, profile?: UserProfile, message?: string}> => {
  await new Promise(r => setTimeout(r, 1000));
  if (MOCK_USERS.some(u => u.email === email.toLowerCase())) return { success: false, message: 'Email taken.' };
  const isStudent = role === 'student';
  const newProfile: UserProfile = {
    id: 'u' + (MOCK_USERS.length + 1),
    fullName,
    email: email.toLowerCase(),
    role,
    schoolId: 'GAYAZA-01',
    status: isStudent ? 'PENDING' : 'APPROVED',
    studentCode: isStudent ? `SOMA-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
  };
  MOCK_USERS.push(newProfile);
  return { success: true, profile: newProfile };
};

export const fetchStudentProgress = async (subject: string): Promise<StudentProgress[]> => {
  await new Promise(r => setTimeout(r, 500));
  return [
    { studentId: 'u1', studentName: 'Okello John', mastery: 65, lastActive: '2h ago', status: 'on-track' },
    { studentId: 'u9', studentName: 'Musa Atwine', mastery: 32, lastActive: '1d ago', status: 'at-risk' },
    { studentId: 'u10', studentName: 'Nantale Mary', mastery: 89, lastActive: '10m ago', status: 'excellent' },
  ];
};

export const sendStudentFeedback = async (teacherName: string, studentId: string, subject: string, message: string) => {
  const feedback: TeacherFeedback = { id: Date.now().toString(), fromTeacher: teacherName, subject, message, date: new Date().toISOString().split('T')[0] };
  MOCK_FEEDBACK.push(feedback);
  return true;
};

export const fetchStudentFeedback = async (studentId: string): Promise<TeacherFeedback[]> => {
  return MOCK_FEEDBACK;
};

export const scheduleExam = async (exam: Omit<Exam, 'id'>) => {
  const newExam = { ...exam, id: Math.random().toString() };
  MOCK_EXAMS.push(newExam);
  return newExam;
};

export const fetchUpcomingExams = async (subject?: string): Promise<Exam[]> => {
  if (subject) return MOCK_EXAMS.filter(e => e.subject === subject);
  return MOCK_EXAMS;
};

export const fetchPendingStudents = async (schoolId: string): Promise<UserProfile[]> => {
  return MOCK_USERS.filter(u => u.role === 'student' && u.status === 'PENDING');
};

export const updateStudentStatus = async (studentId: string, status: ApprovalStatus) => {
  const user = MOCK_USERS.find(u => u.id === studentId);
  if (user) user.status = status;
  return true;
};

export const fetchSchoolClasses = async (schoolId: string): Promise<SchoolClass[]> => {
  return [{ id: 'c1', name: 'S.4 North', level: 'Senior 4', studentCount: 45 }];
};

export const createSchoolClass = async (schoolId: string, name: string, level: string) => {
  return { id: Math.random().toString(), name, level, studentCount: 0 };
};

export const fetchTeachers = async (schoolId: string): Promise<UserProfile[]> => {
  return MOCK_USERS.filter(u => u.role === 'teacher');
};

export const fetchSystemHealth = async () => {
  return { status: 'Optimal', users: MOCK_USERS.length, uptime: '99.9%' };
};

export const fetchTeacherCourses = async (teacherId: string): Promise<string[]> => {
  return ['Biology', 'General Science', 'Chemistry']; 
};

// Assigns a specific course/subject to a teacher for instructional tracking.
export const assignCourseToTeacher = async (teacherId: string, subject: string) => {
  await new Promise(r => setTimeout(r, 400));
  return true;
};

export const fetchClassResources = async (schoolId: string, subjectFilter?: string): Promise<Resource[]> => {
  const all = [
    { id: '1', title: 'Cell Structure Notes', unit: 'Unit 1', fileSize: '2.4 MB', subject: 'Biology', content: 'Cells are life basics.' },
  ];
  if (subjectFilter) return all.filter(r => r.subject === subjectFilter);
  return all;
};

export const linkStudentByCode = async (parentId: string, studentCode: string) => {
  const student = MOCK_USERS.find(u => u.studentCode === studentCode);
  return student ? { success: true, studentName: student.fullName } : { success: false };
};
