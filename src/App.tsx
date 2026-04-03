import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import PublicTeachers from './pages/PublicTeachers';
import PublicStudents from './pages/PublicStudents';
import PublicNotices from './pages/PublicNotices';
import PublicResults from './pages/PublicResults';
import Contact from './pages/Contact';

// Dashboard Pages
import AdminDashboard from './pages/dashboard/AdminDashboard';
import StudentManagement from './pages/dashboard/StudentManagement';
import TeacherManagement from './pages/dashboard/TeacherManagement';
import AttendanceManagement from './pages/dashboard/AttendanceManagement';
import ResultManagement from './pages/dashboard/ResultManagement';
import NoticeManagement from './pages/dashboard/NoticeManagement';
import HolidayManagement from './pages/dashboard/HolidayManagement';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="teachers" element={<PublicTeachers />} />
            <Route path="students" element={<PublicStudents />} />
            <Route path="notices" element={<PublicNotices />} />
            <Route path="results" element={<PublicResults />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<StudentManagement />} />
            <Route path="teachers" element={<TeacherManagement />} />
            <Route path="attendance" element={<AttendanceManagement />} />
            <Route path="results" element={<ResultManagement />} />
            <Route path="notices" element={<NoticeManagement />} />
            <Route path="holidays" element={<HolidayManagement />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
