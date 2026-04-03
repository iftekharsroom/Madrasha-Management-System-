import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Have questions? We're here to help. Reach out to us through any of the following channels.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Address</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Chami Moslemia Dakhil Madrasha<br />
              Nesarabad, Pirojpur<br />
              Bangladesh
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Phone & Email</h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Phone: +880 1711 111111</p>
              <p className="text-gray-600">Email: info@cmdm.edu.bd</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Office Hours</h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Saturday - Thursday</p>
              <p className="text-gray-600">8:00 AM - 2:00 PM</p>
              <p className="text-red-500 font-medium">Friday: Closed</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Send size={120} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message</label>
                <textarea 
                  rows={6}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <button 
                  type="button"
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
