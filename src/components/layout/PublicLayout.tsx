import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';

const PublicLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Teachers', path: '/teachers' },
    { name: 'Students', path: '/students' },
    { name: 'Notice', path: '/notices' },
    { name: 'Results', path: '/results' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4 text-sm hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <p>Welcome to Chami Moslemia Dakhil Madrasha</p>
          <div className="flex space-x-4">
            <span>Email: info@cmdm.edu.bd</span>
            <span>Phone: +880 17XX-XXXXXX</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-lg">
                <GraduationCap className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary leading-tight">CMDM</h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Nesarabad, Pirojpur</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className="text-gray-600 hover:text-primary font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/login" 
                className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className="block text-gray-600 hover:text-primary font-medium p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/login" 
              className="block bg-primary text-white text-center py-3 rounded-lg font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <GraduationCap className="text-accent" size={40} />
                <h2 className="text-2xl font-bold">CMDM</h2>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Chami Moslemia Dakhil Madrasha is a premier Islamic educational institution dedicated to academic excellence and moral development.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Quick Links</h3>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                <li><Link to="/teachers" className="hover:text-accent transition-colors">Our Teachers</Link></li>
                <li><Link to="/notices" className="hover:text-accent transition-colors">Notice Board</Link></li>
                <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Resources</h3>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/results" className="hover:text-accent transition-colors">Exam Results</Link></li>
                <li><Link to="/students" className="hover:text-accent transition-colors">Student Portal</Link></li>
                <li><Link to="/login" className="hover:text-accent transition-colors">Admin Login</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Contact Info</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start space-x-3">
                  <span className="text-accent">📍</span>
                  <span>Nesarabad, Pirojpur, Bangladesh</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-accent">📞</span>
                  <span>+880 17XX-XXXXXX</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-accent">✉️</span>
                  <span>info@cmdm.edu.bd</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Chami Moslemia Dakhil Madrasha. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
