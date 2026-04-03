import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  CalendarCheck, 
  GraduationCap, 
  Bell, 
  CalendarDays, 
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';
import { cn } from '../../utils/utils';

const Sidebar = () => {
  const { role } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['admin', 'teacher', 'student'] },
    { icon: Users, label: 'Students', path: '/dashboard/students', roles: ['admin', 'teacher'] },
    { icon: UserSquare2, label: 'Teachers', path: '/dashboard/teachers', roles: ['admin'] },
    { icon: CalendarCheck, label: 'Attendance', path: '/dashboard/attendance', roles: ['admin', 'teacher'] },
    { icon: GraduationCap, label: 'Results', path: '/dashboard/results', roles: ['admin', 'teacher', 'student'] },
    { icon: Bell, label: 'Notices', path: '/dashboard/notices', roles: ['admin'] },
    { icon: CalendarDays, label: 'Holidays', path: '/dashboard/holidays', roles: ['admin', 'teacher', 'student'] },
    { icon: Home, label: 'Public Site', path: '/', roles: ['admin', 'teacher', 'student'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role || ''));

  return (
    <div className="w-64 bg-primary text-white h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-tight">CMDM SMS</h1>
        <p className="text-xs text-white/60 mt-1 uppercase tracking-widest">Management System</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg transition-colors",
              location.pathname === item.path 
                ? "bg-white/20 text-white shadow-lg" 
                : "text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => auth.signOut()}
          className="flex items-center space-x-3 p-3 w-full rounded-lg text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
