"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AnimatedGrid from "@/components/AnimatedGrid";
import RollInput from "@/components/RollInput";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResultSearch = async (rollNo: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNo }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Result not found. Check your roll number and try again.");
        } else {
          throw new Error("Unable to connect to the server. Please try again later.");
        }
      }

      // Pre-fetching succeeded, route to the dashboard
      router.push(`/result/${rollNo}`);
    } catch (err: unknown) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : "An error occurred.");
    }
  };

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-24">
      {/* Interactive mouse-tracking dots & purple glow */}
      <AnimatedGrid />

      {/* Landing Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card-premium rounded-card p-8 md:p-10 shadow-premium-lg flex flex-col items-center border border-white/[0.08]">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-6 px-3.5 py-1 rounded-full border border-brand-primary/20 bg-brand-primary/10 text-[9px] font-mono font-bold tracking-[0.2em] text-brand-primary uppercase"
          >
            AKTU Academic Registry v1.0
          </motion.div>

          {/* Logo / Branding */}
          <div className="text-center mb-8 space-y-2">
            <h1 className="font-sans font-extrabold text-3xl md:text-4xl tracking-[-0.03em] text-white leading-tight">
              Result Explorer
            </h1>
            <p className="font-sans text-xs md:text-sm text-text-secondary max-w-xs mx-auto leading-relaxed">
              Explore your university academic transcript in a clean, high-performance dashboard.
            </p>
          </div>

          {/* Main Input Form */}
          <RollInput onSubmit={handleResultSearch} isLoading={isLoading} initialError={error} />
        </div>

        {/* Small detail text below card */}
        <p className="text-center text-[10px] text-text-muted font-mono tracking-[0.16em] mt-6 uppercase font-semibold">
          Enter 10-15 digit roll number to generate instant dashboard
        </p>
      </motion.div>

      {/* Cinematic Full-Screen Loading Screen Overlay */}
      <LoadingScreen isVisible={isLoading} />
    </div>
  );
}
