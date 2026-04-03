import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../firebase/config';
import { Search, Save, FileText, Download, GraduationCap } from 'lucide-react';
import { formatGPA } from '../../utils/utils';

const ResultManagement = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('6');
  const [examType, setExamType] = useState('First Term');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any>({});

  const subjects = ['Bangla', 'English', 'Mathematics', 'Hadith', 'Quran', 'Islamic Studies'];

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

    const resultsRef = ref(db, `results/${selectedClass}/${examType}`);
    onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        setResults(snapshot.val());
      } else {
        setResults({});
      }
    });
  }, [selectedClass, examType]);

  const handleMarkChange = (studentId: string, subject: string, value: string) => {
    const marks = parseInt(value) || 0;
    setResults((prev: any) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subject]: marks
      }
    }));
  };

  const saveResults = async () => {
    const resultsRef = ref(db, `results/${selectedClass}/${examType}`);
    try {
      await update(resultsRef, results);
      alert('Results saved successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  const calculateTotal = (studentId: string) => {
    const studentMarks = results[studentId] || {};
    return subjects.reduce((acc, sub) => acc + (studentMarks[sub] || 0), 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Result Management</h1>
          <p className="text-gray-500">Enter and manage student examination marks</p>
        </div>
        <button 
          onClick={saveResults}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <Save size={20} />
          <span>Save All Results</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Class</label>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
            >
              {['6', '7', '8', '9', '10'].map(c => <option key={c} value={c}>Class {c}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Examination</label>
            <select 
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="First Term">First Term</option>
              <option value="Mid Term">Mid Term</option>
              <option value="Final Exam">Final Exam</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Search Student</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Name or Roll..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-widest">
                <th className="p-4 font-bold sticky left-0 bg-gray-50 z-10 w-48">Student</th>
                {subjects.map(sub => <th key={sub} className="p-4 font-bold text-center">{sub}</th>)}
                <th className="p-4 font-bold text-center">Total</th>
                <th className="p-4 font-bold text-center">GPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.roll.includes(searchTerm)).map((student) => {
                const total = calculateTotal(student.id);
                const avg = total / subjects.length;
                const { gpa, grade } = formatGPA(avg);

                return (
                  <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 sticky left-0 bg-white z-10 border-r border-gray-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                      <p className="font-bold text-gray-900">{student.name}</p>
                      <p className="text-xs text-gray-500">Roll: {student.roll}</p>
                    </td>
                    {subjects.map(sub => (
                      <td key={sub} className="p-4">
                        <input 
                          type="number" 
                          min="0"
                          max="100"
                          value={results[student.id]?.[sub] || ''}
                          onChange={(e) => handleMarkChange(student.id, sub, e.target.value)}
                          className="w-16 mx-auto block text-center py-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-bold"
                        />
                      </td>
                    ))}
                    <td className="p-4 text-center font-bold text-gray-900">{total}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${gpa >= 4 ? 'bg-emerald-100 text-emerald-700' : gpa >= 2 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                        {gpa.toFixed(2)} ({grade})
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultManagement;
