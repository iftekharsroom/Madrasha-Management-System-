import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import { User, BookOpen, Hash } from 'lucide-react';

const PublicStudents = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('All');

  useEffect(() => {
    const studentsRef = ref(db, 'students');
    onValue(studentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setStudents(Object.values(data));
      }
      setLoading(false);
    });
  }, []);

  const filteredStudents = selectedClass === 'All' 
    ? students 
    : students.filter(s => s.class === selectedClass);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">Our Bright Students</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Celebrating the achievements and diversity of our student body across all classes.</p>
      </div>

      <div className="flex justify-center mb-12 space-x-4 overflow-x-auto pb-4">
        {['All', '6', '7', '8', '9', '10'].map((c) => (
          <button
            key={c}
            onClick={() => setSelectedClass(c)}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all border ${
              selectedClass === c 
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                : 'bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            {c === 'All' ? 'All Classes' : `Class ${c}`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStudents.map((student, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow text-center group">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/10 group-hover:border-primary/30 transition-colors">
                <img 
                  src={student.photo || `https://i.pravatar.cc/150?u=${student.roll}`} 
                  alt={student.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{student.name}</h3>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 font-medium">
                <div className="flex items-center">
                  <BookOpen size={12} className="mr-1 text-primary" />
                  <span>Class {student.class}</span>
                </div>
                <div className="flex items-center">
                  <Hash size={12} className="mr-1 text-primary" />
                  <span>Roll {student.roll}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicStudents;
