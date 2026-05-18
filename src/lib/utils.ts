import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKES(amount: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function generateAdmissionNo(year: number, count: number): string {
  return `${year.toString().slice(-2)}${String(count).padStart(4, "0")}`;
}

export function generateStaffNo(year: number, count: number): string {
  return `STF/${year}/${String(count).padStart(4, "0")}`;
}

export function generateInvoiceNo(year: number, term: number, count: number): string {
  return `INV/${year}/T${term}/${String(count).padStart(4, "0")}`;
}

export const kcseGradePoints: Record<string, number> = {
  A: 12,
  "A-": 11,
  "B+": 10,
  B: 9,
  "B-": 8,
  "C+": 7,
  C: 6,
  "C-": 5,
  "D+": 4,
  D: 3,
  "D-": 2,
  E: 1,
};

export const kcseGradeFromScore = (score: number): string => {
  if (score >= 80) return "A";
  if (score >= 75) return "A-";
  if (score >= 70) return "B+";
  if (score >= 65) return "B";
  if (score >= 60) return "B-";
  if (score >= 55) return "C+";
  if (score >= 50) return "C";
  if (score >= 45) return "C-";
  if (score >= 40) return "D+";
  if (score >= 35) return "D";
  if (score >= 30) return "D-";
  return "E";
};

export const cbcLevelName = (level: string): string => {
  const names: Record<string, string> = {
    PP1: "Pre-Primary 1",
    PP2: "Pre-Primary 2",
    GRADE_1: "Grade 1",
    GRADE_2: "Grade 2",
    GRADE_3: "Grade 3",
    GRADE_4: "Grade 4",
    GRADE_5: "Grade 5",
    GRADE_6: "Grade 6",
    GRADE_7: "Grade 7",
    GRADE_8: "Grade 8",
    GRADE_9: "Grade 9",
    GRADE_10: "Grade 10",
    GRADE_11: "Grade 11",
    GRADE_12: "Grade 12",
    FORM_1: "Form 1",
    FORM_2: "Form 2",
    FORM_3: "Form 3",
    FORM_4: "Form 4",
  };
  return names[level] || level;
};
