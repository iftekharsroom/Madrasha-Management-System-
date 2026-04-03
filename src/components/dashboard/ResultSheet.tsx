import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { GraduationCap, Download, Printer } from 'lucide-react';
import { formatGPA } from '../../utils/utils';

interface ResultSheetProps {
  student: any;
  marks: Record<string, number>;
  examType: string;
}

const ResultSheet: React.FC<ResultSheetProps> = ({ student, marks, examType }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  const subjects = Object.keys(marks);
  const total = subjects.reduce((acc, sub) => acc + marks[sub], 0);
  const avg = total / subjects.length;
  const { gpa, grade } = formatGPA(avg);

  return (
    <div className="space-y-4">
      <div 
        ref={componentRef}
        className="p-12 bg-white border shadow-sm max-w-4xl mx-auto font-sans"
      >
        {/* Header */}
        <div className="text-center border-b-2 border-primary pb-8 mb-8">
          <GraduationCap className="mx-auto text-primary mb-4" size={48} />
          <h1 className="text-3xl font-bold text-gray-900 uppercase">Chami Moslemia Dakhil Madrasha</h1>
          <p className="text-gray-600 font-medium">Nesarabad, Pirojpur, Bangladesh</p>
          <div className="mt-6 inline-block px-8 py-2 bg-primary text-white font-bold rounded-full uppercase tracking-widest text-sm">
            Academic Transcript: {examType}
          </div>
        </div>

        {/* Student Info */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="space-y-2">
            <p className="flex justify-between border-b border-gray-100 py-1">
              <span className="text-gray-500 font-semibold">Student Name:</span>
              <span className="font-bold text-gray-900">{student.name}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 py-1">
              <span className="text-gray-500 font-semibold">Roll Number:</span>
              <span className="font-bold text-gray-900">{student.roll}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 py-1">
              <span className="text-gray-500 font-semibold">Class:</span>
              <span className="font-bold text-gray-900">{student.class}</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex justify-between border-b border-gray-100 py-1">
              <span className="text-gray-500 font-semibold">Father's Name:</span>
              <span className="font-bold text-gray-900">{student.fatherName}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 py-1">
              <span className="text-gray-500 font-semibold">Mother's Name:</span>
              <span className="font-bold text-gray-900">{student.motherName}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 py-1">
              <span className="text-gray-500 font-semibold">Date of Birth:</span>
              <span className="font-bold text-gray-900">{student.dob}</span>
            </p>
          </div>
        </div>

        {/* Marks Table */}
        <table className="w-full border-collapse mb-12">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-4 text-left font-bold text-gray-700">Subject Name</th>
              <th className="border p-4 text-center font-bold text-gray-700">Full Marks</th>
              <th className="border p-4 text-center font-bold text-gray-700">Obtained Marks</th>
              <th className="border p-4 text-center font-bold text-gray-700">Grade</th>
              <th className="border p-4 text-center font-bold text-gray-700">GPA</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map(sub => {
              const { gpa: subGpa, grade: subGrade } = formatGPA(marks[sub]);
              return (
                <tr key={sub}>
                  <td className="border p-4 font-semibold text-gray-800">{sub}</td>
                  <td className="border p-4 text-center">100</td>
                  <td className="border p-4 text-center font-bold">{marks[sub]}</td>
                  <td className="border p-4 text-center font-bold">{subGrade}</td>
                  <td className="border p-4 text-center font-bold">{subGpa.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-bold">
              <td colSpan={2} className="border p-4 text-right">Total Marks:</td>
              <td className="border p-4 text-center text-primary text-xl">{total}</td>
              <td className="border p-4 text-right">Result:</td>
              <td className="border p-4 text-center text-primary text-xl">{gpa.toFixed(2)} ({grade})</td>
            </tr>
          </tfoot>
        </table>

        {/* Signatures */}
        <div className="grid grid-cols-3 gap-12 mt-24 text-center">
          <div className="border-t border-gray-400 pt-2 text-sm font-bold text-gray-600 uppercase">Class Teacher</div>
          <div className="border-t border-gray-400 pt-2 text-sm font-bold text-gray-600 uppercase">Headmaster</div>
          <div className="border-t border-gray-400 pt-2 text-sm font-bold text-gray-600 uppercase">Guardian</div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button 
          onClick={() => handlePrint()}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-primary/90 transition-all shadow-lg"
        >
          <Printer size={20} />
          <span>Print Result Sheet</span>
        </button>
      </div>
    </div>
  );
};

export default ResultSheet;
