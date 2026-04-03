import { ref, set, get } from 'firebase/database';
import { db } from '../firebase/config';

export const seedDemoData = async () => {
  const studentsRef = ref(db, 'students');
  const teachersRef = ref(db, 'teachers');
  const noticesRef = ref(db, 'notices');
  const holidaysRef = ref(db, 'holidays');

  // Check if data already exists
  const snapshot = await get(studentsRef);
  if (snapshot.exists()) return;

  // Seed Students
  const demoStudents = {
    "s1": { name: "Abdullah Al Mamun", roll: "101", class: "10", section: "A", mobile: "01711111111", fatherName: "Abul Kashem", motherName: "Fatema Begum", dob: "2008-05-15", photo: "https://i.pravatar.cc/150?u=s1" },
    "s2": { name: "Fatima Zohra", roll: "102", class: "10", section: "A", mobile: "01722222222", fatherName: "Mohammad Ali", motherName: "Ayesha Khatun", dob: "2008-08-20", photo: "https://i.pravatar.cc/150?u=s2" },
    "s3": { name: "Omar Faruk", roll: "201", class: "9", section: "B", mobile: "01733333333", fatherName: "Ibrahim Khalil", motherName: "Rokeya Begum", dob: "2009-03-10", photo: "https://i.pravatar.cc/150?u=s3" }
  };

  // Seed Teachers
  const demoTeachers = {
    "t1": { name: "Maulana Abdul Hai", subject: "Quran & Hadith", qualification: "Kamil (Masters)", phone: "01811111111", email: "abdulhai@cmdm.edu.bd", photo: "https://i.pravatar.cc/150?u=t1" },
    "t2": { name: "Mr. Rafiqul Islam", subject: "Mathematics", qualification: "M.Sc in Math", phone: "01822222222", email: "rafiq@cmdm.edu.bd", photo: "https://i.pravatar.cc/150?u=t2" }
  };

  // Seed Notices
  const demoNotices = {
    "n1": { title: "Final Exam Schedule 2026", content: "The final examinations for all classes will begin from April 15, 2026. Please collect your admit cards.", date: "2026-03-25", category: "Exam" },
    "n2": { title: "Ramadan Vacation", content: "The Madrasha will remain closed for Ramadan and Eid-ul-Fitr from April 1, 2026.", date: "2026-03-20", category: "Holiday" }
  };

  // Seed Holidays
  const demoHolidays = {
    "h1": { name: "Eid-ul-Fitr", date: "2026-04-20", type: "Islamic" },
    "h2": { name: "Independence Day", date: "2026-03-26", type: "Government" }
  };

  await set(studentsRef, demoStudents);
  await set(teachersRef, demoTeachers);
  await set(noticesRef, demoNotices);
  await set(holidaysRef, demoHolidays);
};
