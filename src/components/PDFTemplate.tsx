"use client";

import React from "react";
import { ResultData } from "@/types";

interface PDFTemplateProps {
  data: ResultData;
}

export default function PDFTemplate({ data }: PDFTemplateProps) {
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="hidden print:block w-full text-black bg-white p-12 min-h-screen font-sans leading-relaxed">
      {/* Document Header */}
      <div className="text-center border-b-2 border-black pb-6 mb-8">
        <h1 className="text-base font-bold tracking-widest uppercase">
          Dr. A.P.J. Abdul Kalam Technical University
        </h1>
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">
          Lucknow, Uttar Pradesh, India &bull; Academic Registrar
        </p>
        <div className="mt-4">
          <span className="px-4 py-1.5 border border-black font-semibold text-xs tracking-wider uppercase">
            Official Academic Record
          </span>
        </div>
      </div>

      {/* Student Details Sheet */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs border border-zinc-200 p-6 rounded-lg mb-8 bg-zinc-50/50">
        <div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold">Student Name</p>
          <p className="font-bold text-sm mt-0.5">{data.student.name}</p>
        </div>
        <div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold">Roll Number</p>
          <p className="font-mono font-bold mt-0.5">{data.student.rollNo}</p>
        </div>
        <div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold">Course / Degree</p>
          <p className="font-semibold mt-0.5">{data.student.course} ({data.student.branch})</p>
        </div>
        <div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold">Institution</p>
          <p className="font-semibold mt-0.5">{data.student.college}</p>
        </div>
        <div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold">Cumulative GPA</p>
          <p className="font-bold text-sm mt-0.5">{data.student.cgpa} / 10.00</p>
        </div>
        <div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold">Academic Result</p>
          <p className="font-bold text-sm mt-0.5 text-emerald-700">{data.student.status}</p>
        </div>
      </div>

      {/* Semester Wise Grid */}
      <div className="space-y-8">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-zinc-300 pb-2">
          Academic Timeline Summary
        </h2>

        {data.semesters.map((sem) => (
          <div key={sem.semester} className="avoid-break page-break-inside-avoid">
            <div className="flex justify-between items-end border-b border-zinc-200 pb-1.5 mb-3">
              <h3 className="font-bold text-xs">Semester {sem.semester}</h3>
              <p className="text-[10px] text-zinc-500">
                SGPA: <span className="font-bold text-black">{sem.sgpa.toFixed(2)}</span> &bull; Credits: {sem.credits}
              </p>
            </div>

            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="border-b border-zinc-300 font-bold text-zinc-600">
                  <th className="py-2 w-20">Code</th>
                  <th className="py-2">Subject Name</th>
                  <th className="py-2 text-center w-14">Internal</th>
                  <th className="py-2 text-center w-14">External</th>
                  <th className="py-2 text-center w-14">Total</th>
                  <th className="py-2 text-right w-14">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {sem.subjects.map((sub, index) => (
                  <tr key={index}>
                    <td className="py-2 font-mono">{sub.code}</td>
                    <td className="py-2 font-medium">{sub.name}</td>
                    <td className="py-2 text-center font-mono">{sub.internalMarks === null ? "—" : sub.internalMarks}</td>
                    <td className="py-2 text-center font-mono">{sub.externalMarks === null ? "—" : sub.externalMarks}</td>
                    <td className="py-2 text-center font-mono font-bold">{sub.totalMarks === null ? "—" : sub.totalMarks}</td>
                    <td className="py-2 text-right font-bold">{sub.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Verification footer & QR Code Mockup */}
      <div className="mt-16 pt-8 border-t border-zinc-300 flex items-center justify-between avoid-break">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] text-zinc-500 uppercase font-medium">Record Verification</p>
            <p className="text-xs font-semibold">Generated on {dateStr}</p>
            <p className="text-[10px] text-zinc-400">Verified electronically via FlipNotes Results. Authenticated origin.</p>
          </div>
          <div className="pt-2 flex items-center gap-6">
            <div>
              <div className="w-20 h-0.5 bg-black" />
              <p className="text-[9px] text-zinc-500 mt-1 uppercase">Controller of Exams</p>
            </div>
            <div>
              <div className="w-20 h-0.5 bg-zinc-300" />
              <p className="text-[9px] text-zinc-400 mt-1 uppercase">Signature Witness</p>
            </div>
          </div>
        </div>

        {/* Vector SVG QR code mockup */}
        <div className="flex flex-col items-center gap-1.5 p-3 border border-zinc-200 rounded-lg bg-zinc-50">
          <svg width="64" height="64" viewBox="0 0 29 29" className="text-black fill-current">
            <path d="M0 0h7v7H0zm1 1v5h5V1zm8 0h1v1H9zm1 0h1v1h-1zm1 0h2v1h-2zm2 0h1v1h-1zm1 0h1v2h-1zm2 0h2v1h-2zm2 0h4v1h-4zm0 1h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v3h-1zm-6 1h1v1h-1zm1 0h2v1h-2zm2 0h1v1h-1zm-9 1H8v1h1v1H8v1h1V4zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm-5 1h1v1H5zm6 0h1v1h-1zm1 0h2v1h-2zm-12 2h7v7H0zm1 1v5h5V9zm8 0h1v1H9zm1 0h1v1h-1zm1 0h2v1h-2zm2 0h1v1h-1zm1 0h1v2h-1zm2 0h2v1h-2zm2 0h4v1h-4zm0 1h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm1 0h1v3h-1zm-6 1h1v1h-1zm1 0h2v1h-2zm2 0h1v1h-1zm-7 1h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm-10 1h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm6 0h1v1h-1zm1 0h2v1h-2zm2 0h1v1h-1zm-10 1h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm6 0h1v1h-1zm1 0h2v1h-2zm2 0h1v1h-1z" />
          </svg>
          <span className="text-[8px] text-zinc-400 font-mono tracking-widest">FN-VERIFIED</span>
        </div>
      </div>
    </div>
  );
}
