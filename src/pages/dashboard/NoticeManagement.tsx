import React, { useState, useEffect } from 'react';
import { ref, push, onValue, remove, update } from 'firebase/database';
import { db } from '../../firebase/config';
import { Plus, Bell, Trash2, Edit2, X, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

const NoticeManagement = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    category: 'General'
  });

  useEffect(() => {
    const noticesRef = ref(db, 'notices');
    onValue(noticesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setNotices(list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } else {
        setNotices([]);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await update(ref(db, `notices/${editingId}`), formData);
      } else {
        await push(ref(db, 'notices'), formData);
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ title: '', content: '', date: format(new Date(), 'yyyy-MM-dd'), category: 'General' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this notice?')) {
      await remove(ref(db, `notices/${id}`));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notice Board</h1>
          <p className="text-gray-500">Manage school announcements</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
          <span>Add Notice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${notice.category === 'Exam' ? 'bg-red-100 text-red-700' : 'bg-primary/10 text-primary'}`}>
                  {notice.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>{format(new Date(notice.date), 'MMM dd, yyyy')}</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{notice.title}</h3>
              <p className="text-gray-600 leading-relaxed">{notice.content}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => { setFormData(notice); setEditingId(notice.id); setIsModalOpen(true); }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => handleDelete(notice.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden">
              <div className="p-6 bg-primary text-white flex justify-between items-center">
                <h2 className="text-xl font-bold">{editingId ? 'Edit Notice' : 'New Notice'}</h2>
                <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Title</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="General">General</option>
                    <option value="Exam">Exam</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Admission">Admission</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Content</label>
                  <textarea rows={4} required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                </div>
                <div className="flex space-x-4 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border rounded-xl font-bold">Cancel</button>
                  <button type="submit" className="flex-1 bg-primary text-white py-3 rounded-xl font-bold">Post Notice</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NoticeManagement;
