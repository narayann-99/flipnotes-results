"use client";

import React from "react";
import { Subject } from "@/types";

interface SubjectTableProps {
  subjects: Subject[];
}

export default function SubjectTable({ subjects }: SubjectTableProps) {
  return (
    <div className="w-full overflow-x-auto select-none">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-white/[0.06] text-[9px] text-text-muted font-mono font-bold uppercase tracking-[0.15em]">
            <th className="pb-3 px-3">Code</th>
            <th className="pb-3 px-4">Subject Title</th>
            <th className="pb-3 px-3 text-center font-mono">Internal</th>
            <th className="pb-3 px-3 text-center font-mono">External</th>
            <th className="pb-3 px-3 text-center font-mono">Total</th>
            <th className="pb-3 px-3 text-center font-mono">Grade</th>
            <th className="pb-3 px-4 text-right font-mono">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.03] font-sans">
          {subjects.map((sub, index) => {
            const isPass = sub.status === "PASS";
            const isAwaited = sub.status === "AWAITED";

            return (
              <tr key={index} className="hover:bg-white/[0.015] transition-colors duration-200 group">
                {/* Code */}
                <td className="py-3.5 px-3">
                  <span className="font-mono text-[11px] text-text-secondary bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded group-hover:border-white/[0.12] group-hover:text-white transition-all">
                    {sub.code}
                  </span>
                </td>
                
                {/* Name */}
                <td className="py-3.5 px-4 text-xs font-semibold text-white tracking-tight">
                  {sub.name}
                </td>
                
                {/* Internal Marks */}
                <td className="py-3.5 px-3 text-xs text-center font-mono text-text-secondary">
                  {isAwaited || sub.internalMarks === null ? "—" : sub.internalMarks}
                </td>

                {/* External Marks */}
                <td className="py-3.5 px-3 text-xs text-center font-mono text-text-secondary">
                  {isAwaited || sub.externalMarks === null ? "—" : sub.externalMarks}
                </td>

                {/* Total Marks */}
                <td className="py-3.5 px-3 text-xs text-center font-mono text-white font-bold">
                  {isAwaited || sub.totalMarks === null ? "—" : sub.totalMarks}
                </td>
                
                {/* Grade */}
                <td className="py-3.5 px-3 text-xs text-center font-bold">
                  {isAwaited ? (
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/[0.06] text-text-muted text-[9px] font-mono font-bold uppercase">
                      —
                    </span>
                  ) : (
                    <span className={`font-mono text-xs px-2 py-0.5 rounded border ${
                      sub.grade === "O" || sub.grade === "A+" 
                        ? "bg-brand-primary/10 border-brand-primary/20 text-brand-primary font-bold" 
                        : sub.grade === "A" || sub.grade === "B+"
                        ? "bg-white/[0.03] border-white/[0.08] text-white font-semibold"
                        : "bg-white/[0.02] border-white/[0.05] text-text-secondary"
                    }`}>
                      {sub.grade}
                    </span>
                  )}
                </td>
                
                {/* Status */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end">
                    {isAwaited ? (
                      <div className="flex items-center gap-1.5 text-warning text-[10px] font-mono font-bold uppercase tracking-wider bg-warning/10 border border-warning/20 px-2 py-0.5 rounded-full">
                        <span className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse" />
                        <span>AWAITED</span>
                      </div>
                    ) : isPass ? (
                      <div className="flex items-center gap-1.5 text-success text-[10px] font-mono font-bold uppercase tracking-wider bg-success/10 border border-success/20 px-2 py-0.5 rounded-full">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                        <span>PASS</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-error text-[10px] font-mono font-bold uppercase tracking-wider bg-error/10 border border-error/20 px-2 py-0.5 rounded-full">
                        <span className="h-1.5 w-1.5 rounded-full bg-error" />
                        <span>FAIL</span>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
