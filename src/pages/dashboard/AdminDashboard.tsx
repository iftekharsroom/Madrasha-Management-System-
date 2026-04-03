import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase/config';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Bell, 
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { motion } from 'motion/react';

import { seedDemoData } from '../../utils/seedData';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    attendanceToday: 0,
    noticesCount: 0
  });

  const handleSeed = async () => {
    if (window.confirm('Seed demo data? (This will only work if the database is empty)')) {
      await seedDemoData();
      alert('Demo data seeded successfully!');
    }
  };

  const [attendanceData, setAttendanceData] = useState([
    { name: 'Sun', present: 400 },
    { name: 'Mon', present: 300 },
    { name: 'Tue', present: 200 },
    { name: 'Wed', present: 278 },
    { name: 'Thu', present: 189 },
  ]);

  useEffect(() => {
    const studentsRef = ref(db, 'students');
    const teachersRef = ref(db, 'teachers');
    const noticesRef = ref(db, 'notices');

    onValue(studentsRef, (snapshot) => {
      setStats(prev => ({ ...prev, totalStudents: snapshot.exists() ? Object.keys(snapshot.val()).length : 0 }));
    });

    onValue(teachersRef, (snapshot) => {
      setStats(prev => ({ ...prev, totalTeachers: snapshot.exists() ? Object.keys(snapshot.val()).length : 0 }));
    });

    onValue(noticesRef, (snapshot) => {
      setStats(prev => ({ ...prev, noticesCount: snapshot.exists() ? Object.keys(snapshot.val()).length : 0 }));
    });
  }, []);

  const statCards = [
    { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'bg-blue-500' },
    { label: 'Total Teachers', value: stats.totalTeachers, icon: GraduationCap, color: 'bg-emerald-500' },
    { label: 'Today Attendance', value: '92%', icon: UserCheck, color: 'bg-amber-500' },
    { label: 'Recent Notices', value: stats.noticesCount, icon: Bell, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, Administrator</p>
        </div>
        <button 
          onClick={handleSeed}
          className="text-xs text-gray-400 hover:text-primary transition-colors"
        >
          Seed Demo Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4"
          >
            <div className={`${card.color} p-4 rounded-xl text-white`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Attendance Analytics</h3>
            <TrendingUp className="text-emerald-500" size={20} />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="present" fill="#065f46" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Upcoming Events</h3>
            <Calendar className="text-primary" size={20} />
          </div>
          <div className="space-y-4">
            {[
              { title: 'Final Examination 2026', date: 'April 15, 2026', type: 'Exam' },
              { title: 'Eid-ul-Fitr Holiday', date: 'April 20, 2026', type: 'Holiday' },
              { title: 'Parent Teacher Meeting', date: 'May 02, 2026', type: 'Meeting' },
              { title: 'Annual Sports Day', date: 'May 10, 2026', type: 'Event' },
            ].map((event, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex flex-col items-center justify-center shadow-sm border border-gray-100">
                    <span className="text-[10px] font-bold text-primary uppercase">{event.date.split(' ')[0]}</span>
                    <span className="text-lg font-bold text-gray-900">{event.date.split(' ')[1].replace(',', '')}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
