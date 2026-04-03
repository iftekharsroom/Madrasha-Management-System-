import React, { useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../firebase/config';
import { Search, GraduationCap, User, Calendar, BookOpen } from 'lucide-react';
import ResultSheet from '../components/dashboard/ResultSheet';

const PublicResults = () => {
  const [roll, setRoll] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [examType, setExamType] = useState('');
  const [result, setResult] = useState<any>(null);
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    setStudent(null);

    try {
      const studentsRef = ref(db, 'students');
      const studentsSnapshot = await get(studentsRef);
      
      if (studentsSnapshot.exists()) {
        const studentsData = studentsSnapshot.val();
        const foundStudentEntry = Object.entries(studentsData).find(([_, s]: any) => 
          s.roll === roll && s.class === studentClass
        );

        if (foundStudentEntry) {
          const [studentId, studentData] = foundStudentEntry;
          setStudent(studentData);

          const resultsRef = ref(db, `results/${studentId}/${examType}`);
          const resultsSnapshot = await get(resultsRef);

          if (resultsSnapshot.exists()) {
            setResult(resultsSnapshot.val());
          } else {
            setError('Result not found for this exam.');
          }
        } else {
          setError('Student not found with this roll and class.');
        }
      } else {
        setError('No student records found.');
      }
    } catch (err) {
      setError('An error occurred while fetching the result.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">Student Results</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Enter your details below to check your examination results and download your marksheet.</p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-12">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Roll Number</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                placeholder="e.g. 101"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Class</label>
            <div className="relative">
              <BookOpen size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select 
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
                required
              >
                <option value="">Select Class</option>
                {['6', '7', '8', '9', '10'].map(c => <option key={c} value={c}>Class {c}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Exam Type</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select 
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
                required
              >
                <option value="">Select Exam</option>
                <option value="First Term">First Term</option>
                <option value="Mid Term">Mid Term</option>
                <option value="Final Exam">Final Exam</option>
              </select>
            </div>
          </div>
          <div className="md:col-span-3">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search size={20} />
                  <span>Search Result</span>
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-center text-sm font-medium border border-red-100">
            {error}
          </div>
        )}
      </div>

      {result && student && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                <GraduationCap size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                <p className="text-gray-500">Class {student.class} • Roll {student.roll} • {examType}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Academic Year</p>
              <p className="text-lg font-bold text-primary">2026</p>
            </div>
          </div>

          <ResultSheet student={student} examType={examType} results={result} />
        </div>
      )}
    </div>
  );
};

export default PublicResults;
