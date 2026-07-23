"use client";

import React, { useEffect, useState } from "react";
import { Semester } from "@/types";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface PerformanceChartProps {
  semesters: Semester[];
}

export default function PerformanceChart({ semesters }: PerformanceChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data = semesters.map((sem) => ({
    name: `Sem ${sem.semester}`,
    sgpa: sem.sgpa,
  }));

  // Calculate SGPA improvement
  const hasMultipleSems = semesters.length > 1;
  const firstSgpa = semesters[0]?.sgpa || 0;
  const lastSgpa = semesters[semesters.length - 1]?.sgpa || 0;
  const percentDiff = firstSgpa > 0 ? ((lastSgpa - firstSgpa) / firstSgpa) * 100 : 0;
  const isImproved = percentDiff >= 0;

  // Custom premium tooltip
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      value: number;
      payload: {
        name: string;
        sgpa: number;
      };
    }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card-premium rounded-xl px-4 py-2.5 text-[11px] shadow-premium-sm border border-white/[0.08]">
          <p className="text-[#8F8F9E] font-bold tracking-widest uppercase">{payload[0].payload.name}</p>
          <p className="font-mono font-black text-sm text-brand-primary mt-1">
            SGPA {payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="glass-card-premium rounded-card p-8 shadow-premium-lg flex flex-col justify-between"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-bold tracking-[0.15em] text-brand-primary uppercase">
            Performance Index
          </span>
          <h2 className="font-sans font-black text-base md:text-lg text-white mt-1 tracking-tight">
            Academic Growth Curve
          </h2>
        </div>

        {hasMultipleSems && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.01] border border-white/[0.04] self-start select-none">
            <TrendingUp className={`h-3.5 w-3.5 ${isImproved ? "text-success" : "text-[#EF4444]"}`} />
            <span className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">
              Trend:{" "}
              <span className={`font-mono font-extrabold ${isImproved ? "text-success" : "text-[#EF4444]"}`}>
                {isImproved ? "+" : ""}
                {percentDiff.toFixed(1)}%
              </span>
            </span>
          </div>
        )}
      </div>

      <div className="h-60 w-full select-none">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSgpa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6D5EF8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6D5EF8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.015)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8F8F9E", fontSize: 9, fontWeight: 700, fontFamily: "monospace" }}
              />
              <YAxis
                domain={[4, 10]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8F8F9E", fontSize: 9, fontWeight: 700, fontFamily: "monospace" }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(109, 94, 248, 0.15)", strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="sgpa"
                stroke="#6D5EF8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSgpa)"
                className="drop-shadow-[0_0_6px_rgba(109,94,248,0.2)]"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/[0.01] rounded-xl border border-white/[0.05]">
            <span className="text-xs text-text-secondary">Loading Chart...</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
