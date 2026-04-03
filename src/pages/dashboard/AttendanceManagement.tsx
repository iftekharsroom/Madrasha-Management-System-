import React, { useState, useEffect } from 'react';
import { ref, onValue, set, push } from 'firebase/database';
import { db } from '../../firebase/config';
import { Check, X, Search, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

const AttendanceManagement = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('6');
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const studentsRef = ref(db, 'students');
    onValue(studentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.keys(data)
          .map(key => ({ id: key, ...data[key] }))
          .filter(s => s.class === selectedClass);
        setStudents(list);
      }
    });
  }, [selectedClass]);

  useEffect(() => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const attendanceRef = ref(db, `attendance/${selectedClass}/${dateStr}`);
    onValue(attendanceRef, (snapshot) => {
      if (snapshot.exists()) {
        setAttendance(snapshot.val());
      } else {
        setAttendance({});
      }
    });
  }, [selectedClass, date]);

  const handleMark = async (studentId: string, status: 'present' | 'absent') => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const attendanceRef = ref(db, `attendance/${selectedClass}/${dateStr}/${studentId}`);
    try {
      await set(attendanceRef, status);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance System</h1>
          <p className="text-gray-500">Mark daily attendance for students</p>
        </div>
        <div className="flex items-center space-x-4 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          <button onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft size={20} /></button>
          <div className="flex items-center space-x-2 font-bold text-gray-700">
            <Calendar size={18} className="text-primary" />
            <span>{format(date, 'MMMM dd, yyyy')}</span>
          </div>
          <button onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center space-x-4">
          <label className="font-bold text-gray-700">Select Class:</label>
          <div className="flex space-x-2">
            {['6', '7', '8', '9', '10'].map(c => (
              <button
                key={c}
                onClick={() => setSelectedClass(c)}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${selectedClass === c ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Class {c}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest">
                <th className="p-4 font-bold">Roll</th>
                <th className="p-4 font-bold">Student Name</th>
                <th className="p-4 font-bold text-center">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-gray-700">{student.roll}</td>
                  <td className="p-4 font-medium text-gray-900">{student.name}</td>
                  <td className="p-4 text-center">
                    {attendance[student.id] ? (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${attendance[student.id] === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {attendance[student.id]}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">Not Marked</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleMark(student.id, 'present')}
                        className={`p-2 rounded-lg transition-all ${attendance[student.id] === 'present' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        onClick={() => handleMark(student.id, 'absent')}
                        className={`p-2 rounded-lg transition-all ${attendance[student.id] === 'absent' ? 'bg-red-500 text-white shadow-lg' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;
