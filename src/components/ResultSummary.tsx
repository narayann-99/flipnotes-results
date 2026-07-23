"use client";

import React from "react";
import { StudentInfo } from "@/types";
import { BookOpen, GraduationCap, CheckCircle2, AlertTriangle, Building2, Layers, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface ResultSummaryProps {
  student: StudentInfo;
  completedSemesters: number;
}

export default function ResultSummary({ student, completedSemesters }: ResultSummaryProps) {
  const totalSemesters = 8;
  const progressPercent = (completedSemesters / totalSemesters) * 100;
  const cgpaValue = parseFloat(student.cgpa);

  // SVG Progress Ring calculations
  const radius = 54;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (cgpaValue / 10) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card-premium rounded-card p-5 sm:p-8 md:p-10 shadow-premium-lg relative overflow-hidden border border-white/[0.07]"
    >
      {/* Background glow overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left section: Student Header */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.18em] text-brand-primary uppercase bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-0.5 rounded-md">
                Official Transcript
              </span>
              <span className={`text-[9px] sm:text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border ${
                student.status === "PASS" 
                  ? "bg-success/10 border-success/20 text-success" 
                  : student.status === "FAIL"
                  ? "bg-error/10 border-error/20 text-error"
                  : "bg-warning/10 border-warning/20 text-warning"
              }`}>
                {student.status === "PASS" ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <AlertTriangle className="h-3 w-3" />
                )}
                <span>STATUS: {student.status}</span>
              </span>
            </div>

            <h1 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-[-0.03em] leading-tight pt-1">
              {student.name}
            </h1>
            
            <p className="font-sans text-xs md:text-sm font-semibold text-text-secondary flex items-center gap-2 pt-0.5">
              <GraduationCap className="h-4 w-4 text-brand-primary shrink-0" />
              <span>{student.course} &bull; {student.branch}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white/[0.015] border border-white/[0.05]">
              <div className="h-9 w-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                <Building2 className="h-4.5 w-4.5 text-text-secondary" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <p className="text-[9px] text-text-muted font-mono font-bold uppercase tracking-widest">College / Institute</p>
                <p className="text-xs text-white font-bold truncate">{student.college}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white/[0.015] border border-white/[0.05]">
              <div className="h-9 w-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                <BookOpen className="h-4.5 w-4.5 text-text-secondary" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <p className="text-[9px] text-text-muted font-mono font-bold uppercase tracking-widest">University Roll No</p>
                <p className="text-xs text-white font-mono font-bold tracking-wider">{student.rollNo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle section: CGPA Circle (Apple-inspired) */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-around gap-8 lg:border-l lg:border-white/[0.06] lg:pl-10">
          <div className="relative flex items-center justify-center">
            {/* SVG Progress Ring */}
            <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
              {/* Background circle */}
              <circle
                stroke="rgba(255, 255, 255, 0.04)"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Foreground animated circle */}
              <motion.circle
                stroke="#6D5EF8"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + " " + circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="drop-shadow-[0_0_10px_rgba(109,94,248,0.5)]"
              />
            </svg>
            {/* Inner value */}
            <div className="absolute text-center">
              <span className="font-mono font-extrabold text-3xl text-white tracking-tight">{student.cgpa}</span>
              <span className="block text-[9px] text-text-muted font-mono font-bold uppercase tracking-widest mt-0.5">CGPA</span>
            </div>
          </div>

          <div className="space-y-3.5 w-full sm:w-auto sm:flex-1 sm:max-w-[200px]">
            <div className="flex justify-between items-center py-1.5 border-b border-white/[0.05]">
              <span className="text-xs text-text-secondary font-medium">Completed Sems</span>
              <span className="text-xs text-white font-bold font-mono">
                {completedSemesters} / {totalSemesters}
              </span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-white/[0.05]">
              <span className="text-xs text-text-secondary font-medium font-sans">Active Backpapers</span>
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                student.backpapers > 0 ? "text-error bg-error/10 border border-error/20" : "text-success bg-success/10 border border-success/20"
              }`}>
                {student.backpapers === 0 ? "CLEAR (0)" : `${student.backpapers} PENDING`}
              </span>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="text-xs text-text-secondary font-medium">Academic Standing</span>
              <span className="text-xs text-white font-bold font-sans">
                {cgpaValue >= 8.0 ? "First Class with Distinction" : cgpaValue >= 6.5 ? "First Division" : "Second Division"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Completion timeline row */}
      <div className="mt-8 pt-6 border-t border-white/[0.06]">
        <div className="flex justify-between text-[10px] text-text-secondary font-bold font-mono uppercase tracking-widest mb-3">
          <span className="flex items-center gap-1.5">
            <Layers className="h-3 w-3 text-brand-primary" />
            Degree Completion Timeline
          </span>
          <span>{Math.round(progressPercent)}% Progress</span>
        </div>
        
        {/* Timeline Bar */}
        <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden flex relative">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-full shadow-[0_0_12px_#6D5EF8]"
          />
        </div>

        {/* Timeline Node Labels */}
        <div className="flex justify-between mt-3 text-[10px] text-text-muted font-mono font-bold">
          {Array.from({ length: totalSemesters }).map((_, i) => {
            const sem = i + 1;
            const isCompleted = sem <= completedSemesters;
            return (
              <span 
                key={sem} 
                className={`transition-colors duration-300 ${
                  isCompleted ? "text-brand-primary font-black" : "text-[#3F3F46]"
                }`}
              >
                Sem {sem}
              </span>
            );
          })}
        </div>
      </div>

      {/* Translucent Scroll Down Action Button */}
      <div className="mt-6 pt-4 flex justify-center border-t border-white/[0.04]">
        <button
          onClick={() => {
            const el = document.getElementById("analytics-section");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            } else {
              window.scrollBy({ top: 380, behavior: "smooth" });
            }
          }}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] backdrop-blur-md text-[11px] font-mono font-bold uppercase tracking-widest text-text-secondary hover:text-white transition-all duration-300 shadow-premium-sm cursor-pointer"
        >
          <span>Scroll down to check result score</span>
          <ChevronDown className="h-3.5 w-3.5 text-brand-primary group-hover:translate-y-0.5 transition-transform duration-300 animate-bounce" />
        </button>
      </div>
    </motion.div>
  );
}
