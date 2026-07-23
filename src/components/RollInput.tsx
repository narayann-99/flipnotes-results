"use client";

import React, { useState } from "react";
import { ArrowRight, AlertCircle, Loader2, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RollInputProps {
  onSubmit: (rollNo: string) => void;
  isLoading: boolean;
  initialError?: string | null;
}

export default function RollInput({ onSubmit, isLoading, initialError }: RollInputProps) {
  const [rollNo, setRollNo] = useState("");
  const [error, setError] = useState<string | null>(initialError || null);

  React.useEffect(() => {
    if (initialError) {
      setError(initialError);
    }
  }, [initialError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = rollNo.trim();
    if (!trimmed) {
      setError("Please enter your roll number to explore results.");
      return;
    }

    if (!/^\d+$/.test(trimmed)) {
      setError("Roll number must contain numerical digits only.");
      return;
    }

    if (trimmed.length < 10 || trimmed.length > 15) {
      setError("AKTU Roll Numbers are typically 10 to 15 digits.");
      return;
    }

    onSubmit(trimmed);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d+$/.test(val)) {
      setRollNo(val);
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="relative group">
        {/* Deep background soft glow */}
        <div className="absolute -inset-1 rounded-[20px] bg-gradient-to-r from-brand-primary/20 via-brand-secondary/25 to-brand-primary/20 opacity-0 group-focus-within:opacity-100 group-hover:opacity-40 blur-xl transition-all duration-500 pointer-events-none" />

        <div className="relative flex items-center">
          <Search className="absolute left-5 h-4.5 w-4.5 text-text-muted group-focus-within:text-brand-primary transition-colors duration-300 pointer-events-none" />
          <input
            type="text"
            value={rollNo}
            onChange={handleInputChange}
            placeholder="Enter AKTU Roll Number"
            disabled={isLoading}
            maxLength={15}
            className="w-full pl-12 pr-12 py-4 bg-[#0E0E12]/90 border border-white/[0.08] rounded-input text-white placeholder:text-text-muted text-base md:text-sm font-mono tracking-widest focus:outline-none focus:border-brand-primary/70 focus:bg-[#121218] focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300 shadow-inner"
            aria-label="University Roll Number"
          />

          {rollNo && !isLoading && (
            <button
              type="button"
              onClick={() => setRollNo("")}
              className="absolute right-4 p-1 text-text-muted hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
              aria-label="Clear roll number input"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 text-error text-xs px-1 font-medium bg-error/10 border border-error/20 py-2.5 px-3.5 rounded-xl"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ y: -1.5 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="w-full relative flex items-center justify-center gap-2.5 px-6 py-4 bg-brand-primary hover:bg-brand-hover disabled:opacity-50 text-white font-bold text-xs uppercase tracking-[0.14em] rounded-button shadow-premium-glow hover:shadow-[0_0_50px_-5px_rgba(109,94,248,0.55)] transition-all duration-300 cursor-pointer overflow-hidden border border-white/10 group"
      >
        {/* Subtle top glare edge line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
        
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-white" />
            <span>Searching Registry...</span>
          </div>
        ) : (
          <>
            <span>Explore Result</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </motion.button>
    </form>
  );
}
