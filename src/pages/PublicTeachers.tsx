import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import { User, Phone, Mail } from 'lucide-react';

const PublicTeachers = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teachersRef = ref(db, 'teachers');
    onValue(teachersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setTeachers(Object.values(data));
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">Our Dedicated Teachers</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Meet the educators who are shaping the future of our students with their knowledge and wisdom.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={teacher.photo || `https://i.pravatar.cc/150?u=${teacher.name}`} 
                  alt={teacher.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-bold">{teacher.name}</p>
                  <p className="text-sm text-white/80">{teacher.subject}</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center text-gray-600">
                  <User size={18} className="mr-3 text-primary" />
                  <span className="text-sm">{teacher.qualification}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone size={18} className="mr-3 text-primary" />
                  <span className="text-sm">{teacher.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail size={18} className="mr-3 text-primary" />
                  <span className="text-sm">{teacher.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicTeachers;
