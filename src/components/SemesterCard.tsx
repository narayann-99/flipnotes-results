"use client";

import React, { useState } from "react";
import { Semester } from "@/types";
import SubjectTable from "./SubjectTable";
import { ChevronDown, ChevronUp, BookOpen, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SemesterCardProps {
  semester: Semester;
  defaultOpen?: boolean;
}

function SemesterCardComponent({ semester, defaultOpen = false }: SemesterCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const accordionId = `semester-drawer-${semester.semester}`;

  return (
    <div className="glass-card-premium rounded-card overflow-hidden transition-all duration-300 border border-white/[0.06] hover:border-white/[0.1]">
      {/* Header Button trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={accordionId}
        className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-white/[0.015] transition-colors cursor-pointer outline-none group select-none"
      >
        <div className="flex items-center gap-4">
          {/* Semester Badge */}
          <div className="h-11 w-11 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0 shadow-premium-sm group-hover:border-brand-primary/40 transition-colors">
            <span className="font-mono font-black text-brand-primary text-base">S{semester.semester}</span>
          </div>
          <div>
            <h3 className="font-sans font-bold text-base text-white tracking-tight group-hover:text-brand-primary transition-colors">
              Semester {semester.semester}
            </h3>
            <p className="text-xs text-text-secondary mt-0.5 font-medium flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-text-muted" />
              <span>{semester.subjects.length} Subjects &bull; {semester.credits} Credits</span>
            </p>
          </div>
        </div>

        {/* Stats on the right */}
        <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto border-t md:border-t-0 border-white/[0.05] pt-3.5 md:pt-0">
          <div className="flex items-center gap-8">
            <div className="space-y-0.5 text-left md:text-right">
              <span className="block text-[9px] text-text-muted font-mono font-bold uppercase tracking-widest">SGPA</span>
              <span className="font-mono font-black text-xl text-white tracking-tight">{semester.sgpa.toFixed(2)}</span>
            </div>
            
            <div className="space-y-0.5 text-left md:text-right">
              <span className="block text-[9px] text-text-muted font-mono font-bold uppercase tracking-widest">Result</span>
              <span className="text-xs text-success font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                <span>PASS</span>
              </span>
            </div>
          </div>

          <div className="text-text-secondary p-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] group-hover:text-white transition-colors">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </div>
      </button>

      {/* Subject list drawer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={accordionId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="overflow-hidden bg-[#09090D]/90 border-t border-white/[0.05]"
          >
            <div className="p-5 md:p-7">
              <SubjectTable subjects={semester.subjects} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default React.memo(SemesterCardComponent);
