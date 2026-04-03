import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  ArrowRight, 
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gray-900 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523050853064-85a17f009c5d?auto=format&fit=crop&q=80&w=1920" 
            alt="Madrasha Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1 bg-accent text-primary font-bold rounded-full text-sm mb-6 uppercase tracking-widest">
              Established 19XX
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Nurturing <span className="text-accent">Faith</span> & Excellence
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Welcome to Chami Moslemia Dakhil Madrasha. We provide a balanced education combining Islamic values with modern academic standards.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold flex items-center space-x-2 transition-all shadow-xl shadow-primary/30">
                <span>Explore More</span>
                <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold transition-all border border-white/20">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: 'Students', value: '800+' },
              { icon: GraduationCap, label: 'Graduates', value: '2500+' },
              { icon: BookOpen, label: 'Subjects', value: '15+' },
              { icon: Award, label: 'Awards', value: '50+' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-2">
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose CMDM?</h2>
            <p className="text-gray-600 text-lg">We offer a unique educational environment that focuses on both spiritual growth and academic success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Islamic Values',
                desc: 'Deep integration of Quranic teachings and Islamic ethics in daily life.',
                icon: '🕌'
              },
              {
                title: 'Modern Curriculum',
                desc: 'Following the latest educational standards in science, math, and technology.',
                icon: '📚'
              },
              {
                title: 'Expert Faculty',
                desc: 'Highly qualified teachers dedicated to student success and mentorship.',
                icon: '👨‍🏫'
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100"
              >
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Join Our Community?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Admission is now open for the new academic session. Secure your child's future today.
          </p>
          <Link to="/contact" className="bg-accent hover:bg-accent-hover text-primary px-10 py-4 rounded-full font-bold text-lg transition-all shadow-2xl shadow-black/20">
            Apply for Admission
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
