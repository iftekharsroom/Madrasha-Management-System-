import React, { useState, useEffect } from 'react';
import { ref, push, onValue, remove } from 'firebase/database';
import { db } from '../../firebase/config';
import { Plus, Calendar, Trash2, X } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

const HolidayManagement = () => {
  const [holidays, setHolidays] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    type: 'Islamic'
  });

  useEffect(() => {
    const holidaysRef = ref(db, 'holidays');
    onValue(holidaysRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setHolidays(list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await push(ref(db, 'holidays'), formData);
    setIsModalOpen(false);
    setFormData({ name: '', date: format(new Date(), 'yyyy-MM-dd'), type: 'Islamic' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Remove this holiday?')) {
      await remove(ref(db, `holidays/${id}`));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Holiday List</h1>
          <p className="text-gray-500">Academic and religious holidays</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
          <span>Add Holiday</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {holidays.map((holiday) => (
            <div key={holiday.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-xl flex flex-col items-center justify-center shadow-sm border border-gray-100">
                  <span className="text-[10px] font-bold text-primary uppercase">{format(new Date(holiday.date), 'MMM')}</span>
                  <span className="text-lg font-bold text-gray-900">{format(new Date(holiday.date), 'dd')}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{holiday.name}</h3>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{holiday.type} Holiday</p>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(holiday.id)}
                className="absolute top-4 right-4 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden">
              <div className="p-6 bg-primary text-white flex justify-between items-center">
                <h2 className="text-xl font-bold">Add Holiday</h2>
                <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Holiday Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Date</label>
                  <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="Islamic">Islamic</option>
                    <option value="Government">Government</option>
                    <option value="School">School</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 shadow-lg shadow-primary/20">Add to Calendar</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HolidayManagement;
