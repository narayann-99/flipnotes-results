export interface StudentInfo {
  name: string;
  rollNo: string;
  course: string;
  branch: string;
  college: string;
  cgpa: string;
  status: "PASS" | "FAIL" | "PCP";
  backpapers: number;
}

export interface Subject {
  code: string;
  name: string;
  internalMarks: number | null;
  externalMarks: number | null;
  totalMarks: number | null; // internal + external
  grade: string;
  status: "PASS" | "FAIL" | "AWAITED";
}

export interface Semester {
  semester: number;
  sgpa: number;
  credits: number;
  subjects: Subject[];
}

export interface ResultData {
  student: StudentInfo;
  semesters: Semester[];
}
