import React from 'react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-6">About Our Madrasha</h1>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Chami Moslemia Dakhil Madrasha is a premier Islamic educational institution located in Nesarabad, Pirojpur, Bangladesh. 
            Established with the vision of providing quality academic education integrated with Islamic values, 
            we have been serving the community for decades.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our curriculum is designed to prepare students for both this world and the hereafter, 
            fostering a generation of knowledgeable, ethical, and productive citizens.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h3 className="font-bold text-primary">Our Mission</h3>
              <p className="text-sm text-gray-500">To provide holistic education that combines modern science with traditional Islamic wisdom.</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h3 className="font-bold text-primary">Our Vision</h3>
              <p className="text-sm text-gray-500">To be a leading center of excellence in Islamic and general education in Bangladesh.</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/madrasha/800/600" 
            alt="Madrasha Building" 
            className="rounded-2xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 hidden lg:block">
            <p className="text-3xl font-bold text-primary">25+</p>
            <p className="text-sm text-gray-500">Years of Excellence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
