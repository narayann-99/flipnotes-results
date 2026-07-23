"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Semester } from "@/types";
import { TrendingUp } from "lucide-react";

interface PerformanceChartProps {
  semesters: Semester[];
}

// Dynamically import heavy Recharts components with explicit loading skeleton (SSR False)
const RechartsChart = dynamic(
  () =>
    import("recharts").then((mod) => {
      const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = mod;
      
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

      return function InnerChart({ data }: { data: Array<{ name: string; sgpa: number }> }) {
        return (
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
        );
      };
    }),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-white/[0.01] rounded-xl border border-white/[0.05]">
        <span className="text-xs text-text-secondary font-mono">Loading Analytics Chart...</span>
      </div>
    ),
  }
);

function PerformanceChartComponent({ semesters }: PerformanceChartProps) {
  const data = useMemo(
    () =>
      semesters.map((sem) => ({
        name: `Sem ${sem.semester}`,
        sgpa: sem.sgpa,
      })),
    [semesters]
  );

  const hasMultipleSems = semesters.length > 1;
  const firstSgpa = semesters[0]?.sgpa || 0;
  const lastSgpa = semesters[semesters.length - 1]?.sgpa || 0;
  const percentDiff = useMemo(
    () => (firstSgpa > 0 ? ((lastSgpa - firstSgpa) / firstSgpa) * 100 : 0),
    [firstSgpa, lastSgpa]
  );
  const isImproved = percentDiff >= 0;

  return (
    <div className="glass-card-premium rounded-card p-6 h-full shadow-premium-lg flex flex-col justify-between border border-white/[0.06]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.15em] text-brand-primary uppercase font-mono">
            Performance Index
          </span>
          <h2 className="font-sans font-black text-base md:text-lg text-white mt-0.5 tracking-tight">
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

      <div className="h-56 w-full select-none">
        <RechartsChart data={data} />
      </div>
    </div>
  );
}

export default React.memo(PerformanceChartComponent);
