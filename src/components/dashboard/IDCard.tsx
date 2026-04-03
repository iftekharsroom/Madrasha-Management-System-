import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { GraduationCap, MapPin, Phone, Mail } from 'lucide-react';

interface IDCardProps {
  student: {
    name: string;
    roll: string;
    class: string;
    section: string;
    photo?: string;
    mobile?: string;
  };
}

const IDCard: React.FC<IDCardProps> = ({ student }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  return (
    <div className="space-y-4">
      <div 
        ref={componentRef}
        className="w-[350px] h-[500px] bg-white border-2 border-primary rounded-3xl overflow-hidden shadow-2xl relative islamic-pattern"
      >
        {/* Header */}
        <div className="bg-primary p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
          <GraduationCap className="mx-auto mb-2 text-accent" size={32} />
          <h2 className="text-lg font-bold leading-tight">Chami Moslemia Dakhil Madrasha</h2>
          <p className="text-[10px] uppercase tracking-widest opacity-80">Nesarabad, Pirojpur</p>
        </div>

        {/* Photo */}
        <div className="mt-8 flex justify-center">
          <div className="w-32 h-32 rounded-2xl border-4 border-primary/10 p-1 bg-white shadow-lg">
            <div className="w-full h-full rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              {student.photo ? (
                <img src={student.photo} alt={student.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">👤</span>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 px-8 text-center space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">{student.name}</h3>
            <p className="text-primary font-bold">STUDENT</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase">Roll No</p>
              <p className="font-bold text-gray-900">{student.roll}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase">Class</p>
              <p className="font-bold text-gray-900">{student.class}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase">Section</p>
              <p className="font-bold text-gray-900">{student.section}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase">Blood Group</p>
              <p className="font-bold text-gray-900">O+</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full bg-gray-900 p-4 text-white text-[10px] flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Phone size={10} className="text-accent" />
            <span>+880 17XX-XXXXXX</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin size={10} className="text-accent" />
            <span>CMDM, Pirojpur</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => handlePrint()}
        className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center space-x-2"
      >
        <span>Download ID Card</span>
      </button>
    </div>
  );
};

export default IDCard;
