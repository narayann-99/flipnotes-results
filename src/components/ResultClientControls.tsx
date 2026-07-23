"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

export default function ResultClientControls() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <Link
        href="/"
        className="flex items-center gap-2 text-xs font-mono font-bold text-text-secondary hover:text-white transition-colors uppercase tracking-widest group bg-white/[0.02] border border-white/[0.05] px-3 py-1.5 rounded-lg"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
        <span>Search Roll Number</span>
      </Link>

      <button
        onClick={handlePrint}
        className="flex items-center justify-center gap-2 px-4 py-1.5 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-lg transition-all duration-200 cursor-pointer shadow-premium-sm"
      >
        <Printer className="h-3.5 w-3.5" />
        <span>Print Report</span>
      </button>
    </div>
  );
}
