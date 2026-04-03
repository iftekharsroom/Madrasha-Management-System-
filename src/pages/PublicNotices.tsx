import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import { Bell, Calendar, Tag } from 'lucide-react';

const PublicNotices = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const noticesRef = ref(db, 'notices');
    onValue(noticesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setNotices(Object.values(data).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">Notice Board</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Stay updated with the latest announcements, events, and important information from our Madrasha.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notices.map((notice, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bell size={64} className="text-primary" />
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Published Date</p>
                  <p className="text-sm font-semibold text-gray-700">{notice.date}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <Tag size={14} className="text-primary mr-2" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">{notice.category}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{notice.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm line-clamp-4">{notice.content}</p>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button className="text-primary font-bold text-sm hover:underline flex items-center">
                  Read More <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicNotices;
