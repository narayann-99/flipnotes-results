import { ResultData, Semester, Subject } from "@/types";
import { ResultProvider } from "./provider";

export class MockProvider implements ResultProvider {
  async getResult(rollNo: string): Promise<ResultData | null> {
    // Simulate network delay to showcase the premium loading experience
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Basic validation: must be numeric and between 10 and 15 digits
    const isNumeric = /^\d+$/.test(rollNo);
    if (!isNumeric || rollNo.length < 10 || rollNo.length > 15) {
      return null;
    }

    // Default primary student
    if (rollNo === "2504850100131") {
      return {
        student: {
          name: "Om Narayan Mishra",
          rollNo: "2504850100131",
          course: "B.Tech",
          branch: "Computer Science & Engineering",
          college: "SR Institute of Management & Technology",
          cgpa: "8.31",
          status: "PASS",
          backpapers: 0,
        },
        semesters: [
          {
            semester: 1,
            sgpa: 7.86,
            credits: 22,
            subjects: [
              { code: "BAS101", name: "Engineering Physics", internalMarks: 27, externalMarks: 55, totalMarks: 82, grade: "A", status: "PASS" },
              { code: "BAS103", name: "Engineering Mathematics-I", internalMarks: 24, externalMarks: 50, totalMarks: 74, grade: "B+", status: "PASS" },
              { code: "BEE101", name: "Basic Electrical Engineering", internalMarks: 26, externalMarks: 52, totalMarks: 78, grade: "B+", status: "PASS" },
              { code: "BCS101", name: "Programming for Problem Solving", internalMarks: 29, externalMarks: 62, totalMarks: 91, grade: "A+", status: "PASS" },
              { code: "BAS151", name: "Engineering Physics Lab", internalMarks: 44, externalMarks: 44, totalMarks: 88, grade: "A", status: "PASS" },
              { code: "BCS151", name: "Programming Lab", internalMarks: 48, externalMarks: 47, totalMarks: 95, grade: "O", status: "PASS" },
            ],
          },
          {
            semester: 2,
            sgpa: 8.12,
            credits: 22,
            subjects: [
              { code: "BAS202", name: "Engineering Chemistry", internalMarks: 28, externalMarks: 57, totalMarks: 85, grade: "A", status: "PASS" },
              { code: "BAS203", name: "Engineering Mathematics-II", internalMarks: 25, externalMarks: 51, totalMarks: 76, grade: "B+", status: "PASS" },
              { code: "BME201", name: "Basic Mechanical Engineering", internalMarks: 23, externalMarks: 49, totalMarks: 72, grade: "B", status: "PASS" },
              { code: "BCE201", name: "Engineering Graphics", internalMarks: 27, externalMarks: 54, totalMarks: 81, grade: "A", status: "PASS" },
              { code: "BAS252", name: "Engineering Chemistry Lab", internalMarks: 45, externalMarks: 45, totalMarks: 90, grade: "A+", status: "PASS" },
              { code: "BME251", name: "Workshop Practice Lab", internalMarks: 43, externalMarks: 44, totalMarks: 87, grade: "A", status: "PASS" },
            ],
          },
          {
            semester: 3,
            sgpa: 8.24,
            credits: 24,
            subjects: [
              { code: "BCS301", name: "Data Structures", internalMarks: 28, externalMarks: 60, totalMarks: 88, grade: "A", status: "PASS" },
              { code: "BCS302", name: "Computer Organization & Architecture", internalMarks: 25, externalMarks: 54, totalMarks: 79, grade: "B+", status: "PASS" },
              { code: "BCS303", name: "Discrete Structures & Theory of Logic", internalMarks: 27, externalMarks: 56, totalMarks: 83, grade: "A", status: "PASS" },
              { code: "BAS301", name: "Technical Communication", internalMarks: 28, externalMarks: 58, totalMarks: 86, grade: "A", status: "PASS" },
              { code: "BCS351", name: "Data Structures Lab", internalMarks: 46, externalMarks: 46, totalMarks: 92, grade: "A+", status: "PASS" },
              { code: "BCS352", name: "Computer Organization Lab", internalMarks: 44, externalMarks: 45, totalMarks: 89, grade: "A", status: "PASS" },
            ],
          },
          {
            semester: 4,
            sgpa: 8.08,
            credits: 24,
            subjects: [
              { code: "BCS401", name: "Operating Systems", internalMarks: 26, externalMarks: 54, totalMarks: 80, grade: "B+", status: "PASS" },
              { code: "BCS402", name: "Theory of Automata & Formal Languages", internalMarks: 23, externalMarks: 48, totalMarks: 71, grade: "B", status: "PASS" },
              { code: "BCS403", name: "Microprocessor", internalMarks: 25, externalMarks: 53, totalMarks: 78, grade: "B+", status: "PASS" },
              { code: "BAS402", name: "Universal Human Values", internalMarks: 30, externalMarks: 62, totalMarks: 92, grade: "A+", status: "PASS" },
              { code: "BCS451", name: "Operating Systems Lab", internalMarks: 47, externalMarks: 47, totalMarks: 94, grade: "O", status: "PASS" },
              { code: "BCS452", name: "Microprocessor Lab", internalMarks: 44, externalMarks: 44, totalMarks: 88, grade: "A", status: "PASS" },
            ],
          },
          {
            semester: 5,
            sgpa: 8.72,
            credits: 20,
            subjects: [
              { code: "BCS501", name: "Database Management System", internalMarks: 29, externalMarks: 63, totalMarks: 92, grade: "A+", status: "PASS" },
              { code: "BCS502", name: "Compiler Design", internalMarks: 27, externalMarks: 59, totalMarks: 86, grade: "A", status: "PASS" },
              { code: "BCS503", name: "Design & Analysis of Algorithms", internalMarks: 28, externalMarks: 60, totalMarks: 88, grade: "A", status: "PASS" },
              { code: "BCS051", name: "Data Analytics", internalMarks: 29, externalMarks: 61, totalMarks: 90, grade: "A+", status: "PASS" },
              { code: "BCS551", name: "DBMS Lab", internalMarks: 48, externalMarks: 48, totalMarks: 96, grade: "O", status: "PASS" },
              { code: "BCS552", name: "Algorithms Lab", internalMarks: 45, externalMarks: 46, totalMarks: 91, grade: "A+", status: "PASS" },
            ],
          },
          {
            semester: 6,
            sgpa: 8.60,
            credits: 20,
            subjects: [
              { code: "BCS601", name: "Software Engineering", internalMarks: 27, externalMarks: 60, totalMarks: 87, grade: "A", status: "PASS" },
              { code: "BCS602", name: "Web Technology", internalMarks: 30, externalMarks: 64, totalMarks: 94, grade: "O", status: "PASS" },
              { code: "BCS603", name: "Computer Networks", internalMarks: 26, externalMarks: 56, totalMarks: 82, grade: "A", status: "PASS" },
              { code: "BCS062", name: "Artificial Intelligence", internalMarks: 27, externalMarks: 58, totalMarks: 85, grade: "A", status: "PASS" },
              { code: "BCS651", name: "Web Technology Lab", internalMarks: 46, externalMarks: 47, totalMarks: 93, grade: "A+", status: "PASS" },
              { code: "BCS653", name: "Computer Networks Lab", internalMarks: 44, externalMarks: 45, totalMarks: 89, grade: "A", status: "PASS" },
            ],
          },
        ],
      };
    }

    // Dynamic subject calculation helper
    const getDynamicSubject = (code: string, name: string, baseMarks: number, isLab = false): Subject => {
      const internal = isLab ? Math.round(baseMarks * 0.48) : Math.round(baseMarks * 0.3);
      const external = baseMarks - internal;
      const total = baseMarks;
      const grade = total >= 90 ? "O" : total >= 80 ? "A+" : total >= 70 ? "A" : total >= 60 ? "B+" : "B";
      return {
        code,
        name,
        internalMarks: internal,
        externalMarks: external,
        totalMarks: total,
        grade,
        status: "PASS",
      };
    };

    // Generate random student name & result for other valid 13-digit numbers
    const names = [
      "Aditya Vardhan Singh",
      "Ananya Sen",
      "Harsh Vardhan",
      "Ishita Sharma",
      "Rohan Deshmukh",
      "Sneha Kapoor",
      "Vikram Malhotra",
    ];
    const name = names[parseInt(rollNo.slice(-3)) % names.length] || "Anshika Gupta";
    const sgpaList = [7.62, 8.04, 7.92, 8.41, 8.25, 8.56, 8.12, 8.35];
    const totalSems = (parseInt(rollNo.slice(-1)) % 4) + 4; // 4 to 7 semesters completed
    
    let sumSgpa = 0;
    const semesters: Semester[] = [];
    for (let i = 1; i <= totalSems; i++) {
      const baseSgpa = sgpaList[(parseInt(rollNo.slice(-2)) + i) % sgpaList.length];
      const sgpa = Math.min(10.0, Math.max(5.0, Math.round((baseSgpa + (Math.sin(i) * 0.2)) * 100) / 100));
      sumSgpa += sgpa;

      const subjects: Subject[] = [
        getDynamicSubject(`CS${i}01`, `Advanced CS Topic ${i}A`, Math.round(70 + sgpa * 3)),
        getDynamicSubject(`CS${i}02`, `Theoretical Core ${i}B`, Math.round(65 + sgpa * 3.2)),
        getDynamicSubject(`CS${i}03`, `Applied Technology ${i}C`, Math.round(75 + sgpa * 2.5)),
        getDynamicSubject(`CS${i}51`, `System Lab ${i}D`, Math.round(85 + sgpa * 1.5), true),
      ];

      if (i === totalSems && rollNo.endsWith("9")) {
        subjects.push({
          code: `CS${i}04`,
          name: `Elective Seminar ${i}E`,
          internalMarks: null,
          externalMarks: null,
          totalMarks: null,
          grade: "-",
          status: "AWAITED",
        });
      }

      semesters.push({
        semester: i,
        sgpa,
        credits: 22,
        subjects,
      });
    }

    const cgpa = (sumSgpa / totalSems).toFixed(2);

    return {
      student: {
        name,
        rollNo,
        course: "B.Tech",
        branch: "Computer Science & Engineering",
        college: "SR Institute of Technology",
        cgpa,
        status: parseFloat(cgpa) >= 5.0 ? "PASS" : "FAIL",
        backpapers: 0,
      },
      semesters,
    };
  }
}
