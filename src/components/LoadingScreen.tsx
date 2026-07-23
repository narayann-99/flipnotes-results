"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Database, Layers, CheckCircle2, Sparkles } from "lucide-react";

interface LoadingScreenProps {
  isVisible: boolean;
}

const STEPS = [
  { id: 1, label: "Establishing Secure Gateway", icon: ShieldCheck },
  { id: 2, label: "Retrieving AKTU Record Archive", icon: Database },
  { id: 3, label: "Formatting Semester Transcripts", icon: Layers },
];

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(1);
      setProgress(5);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 12) + 8;
        if (next > 35 && next < 70) setCurrentStep(2);
        if (next >= 70) setCurrentStep(3);
        return Math.min(next, 98);
      });
    }, 280);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(14px)", scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#08080A]/90 backdrop-blur-2xl noise-bg p-6"
        >
          {/* Soft ambient lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

          {/* Premium Glass HUD Card */}
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -15, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm glass-card-premium rounded-card p-7 md:p-8 shadow-premium-lg border border-white/[0.08] relative z-10 space-y-6"
          >
            {/* Header Brand Badge */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand-primary" />
                <span className="font-sans font-black text-sm text-white tracking-tight">
                  Flip<span className="text-brand-primary">Notes</span>
                </span>
                <span className="text-[8px] font-mono tracking-widest text-text-muted border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 rounded font-bold uppercase">
                  REGISTRY
                </span>
              </div>
              <span className="font-mono text-xs font-extrabold text-brand-primary tracking-widest">
                {String(progress).padStart(2, "0")}%
              </span>
            </div>

            {/* Live Progress Ring Activity Indicator */}
            <div className="flex items-center gap-4 py-2">
              <div className="relative h-10 w-10 shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
                <div className="absolute inset-0 rounded-full border-2 border-brand-primary border-t-transparent animate-spin" />
                <div className="h-2 w-2 rounded-full bg-brand-primary animate-ping" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted">
                  System Status
                </p>
                <p className="text-xs font-bold text-white truncate font-sans">
                  {STEPS[currentStep - 1]?.label}...
                </p>
              </div>
            </div>

            {/* Micro-Steps List */}
            <div className="space-y-2.5 pt-1 border-t border-white/[0.06]">
              {STEPS.map((step) => {
                const isDone = currentStep > step.id || progress === 100;
                const isActive = currentStep === step.id && progress < 100;
                const IconComponent = step.icon;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 ${
                      isDone
                        ? "bg-success/5 border-success/15 text-white"
                        : isActive
                        ? "bg-brand-primary/10 border-brand-primary/25 text-white"
                        : "bg-white/[0.01] border-white/[0.04] text-text-muted opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <IconComponent
                        className={`h-3.5 w-3.5 shrink-0 ${
                          isDone ? "text-success" : isActive ? "text-brand-primary" : "text-text-muted"
                        }`}
                      />
                      <span className="text-[11px] font-medium truncate font-sans">
                        {step.label}
                      </span>
                    </div>

                    {isDone ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                    ) : isActive ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse shrink-0" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Progress Bar */}
            <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full shadow-[0_0_10px_#6D5EF8]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
