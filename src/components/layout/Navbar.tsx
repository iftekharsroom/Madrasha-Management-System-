import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bell, User, Search } from 'lucide-react';

const Navbar = () => {
  const { userData } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search for anything..." 
          className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full"
        />
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative text-gray-500 hover:text-primary transition-colors">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
        </button>
        
        <div className="flex items-center space-x-3 border-l pl-6">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{userData?.name || 'User'}</p>
            <p className="text-xs text-gray-500 capitalize">{userData?.role || 'Role'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
