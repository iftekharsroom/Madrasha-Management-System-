import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatGPA = (marks: number) => {
  if (marks >= 80) return { gpa: 5.0, grade: 'A+' };
  if (marks >= 70) return { gpa: 4.0, grade: 'A' };
  if (marks >= 60) return { gpa: 3.5, grade: 'A-' };
  if (marks >= 50) return { gpa: 3.0, grade: 'B' };
  if (marks >= 40) return { gpa: 2.0, grade: 'C' };
  if (marks >= 33) return { gpa: 1.0, grade: 'D' };
  return { gpa: 0.0, grade: 'F' };
};
