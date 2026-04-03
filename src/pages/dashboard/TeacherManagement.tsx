import React, { useState, useEffect } from 'react';
import { ref, push, onValue, remove, update } from 'firebase/database';
import { db } from '../../firebase/config';
import { Plus, Search, Edit2, Trash2, User, X, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    qualification: '',
    phone: '',
    email: '',
    photo: ''
  });

  useEffect(() => {
    const teachersRef = ref(db, 'teachers');
    onValue(teachersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setTeachers(list);
      } else {
        setTeachers([]);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await update(ref(db, `teachers/${editingId}`), formData);
      } else {
        await push(ref(db, 'teachers'), formData);
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ name: '', subject: '', qualification: '', phone: '', email: '', photo: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (teacher: any) => {
    setFormData(teacher);
    setEditingId(teacher.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      await remove(ref(db, `teachers/${id}`));
    }
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Management</h1>
          <p className="text-gray-500">Manage faculty members and their subjects</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
          <span>Add New Teacher</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or subject..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <motion.div 
              key={teacher.id}
              layout
              className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary overflow-hidden border border-primary/20">
                  {teacher.photo ? (
                    <img src={teacher.photo} alt={teacher.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={32} />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{teacher.name}</h3>
                  <p className="text-sm text-primary font-semibold">{teacher.subject}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600 flex items-center space-x-2">
                  <span className="font-semibold">Qualification:</span>
                  <span>{teacher.qualification}</span>
                </p>
                <p className="text-sm text-gray-600 flex items-center space-x-2">
                  <span className="font-semibold">Phone:</span>
                  <span>{teacher.phone}</span>
                </p>
              </div>

              <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(teacher)} className="p-2 bg-white shadow-sm rounded-lg text-blue-600 hover:bg-blue-50">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(teacher.id)} className="p-2 bg-white shadow-sm rounded-lg text-red-600 hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-xl rounded-2xl shadow-2xl relative z-10 overflow-hidden">
              <div className="p-6 bg-primary text-white flex justify-between items-center">
                <h2 className="text-xl font-bold">{editingId ? 'Edit Teacher' : 'Add Teacher'}</h2>
                <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Subject</label>
                    <input type="text" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Qualification</label>
                    <input type="text" value={formData.qualification} onChange={(e) => setFormData({...formData, qualification: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-sm font-semibold">Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-sm font-semibold">Photo URL</label>
                    <input type="text" value={formData.photo} onChange={(e) => setFormData({...formData, photo: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="flex space-x-4 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border rounded-xl font-bold">Cancel</button>
                  <button type="submit" className="flex-1 bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/20">Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherManagement;
