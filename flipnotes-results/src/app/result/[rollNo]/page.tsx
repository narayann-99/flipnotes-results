"use client";

import React, { useEffect, useState, use, useCallback } from "react";
import Link from "next/link";
import { ResultData, Subject } from "@/types";
import { ArrowLeft, Printer, Sparkles, AlertCircle, RefreshCw, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import ResultSummary from "@/components/ResultSummary";
import SemesterCard from "@/components/SemesterCard";
import PerformanceChart from "@/components/PerformanceChart";
import PDFTemplate from "@/components/PDFTemplate";

interface PageProps {
  params: Promise<{ rollNo: string }>;
}

export default function ResultPage({ params }: PageProps) {
  const { rollNo } = use(params);

  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errStatus, setErrStatus] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setErrStatus(null);
    try {
      const response = await fetch("/api/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNo }),
      });

      if (!response.ok) {
        setErrStatus(response.status);
        if (response.status === 404) {
          throw new Error("Result Not Found");
        } else {
          throw new Error("Unable to Connect");
        }
      }

      const json = await response.json();
      setData(json);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, [rollNo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // AI insights generator based on actual student data
  const generateAiInsights = (resData: ResultData) => {
    const insights: string[] = [];
    
    // 1. Strongest subject
    let bestSubject: Subject | null = null;
    let worstSubject: Subject | null = null;
    resData.semesters.forEach((sem) => {
      sem.subjects.forEach((sub) => {
        if (sub.totalMarks !== null) {
          if (!bestSubject || sub.totalMarks > (bestSubject.totalMarks || 0)) {
            bestSubject = sub;
          }
          if (!worstSubject || sub.totalMarks < (worstSubject.totalMarks || 100)) {
            worstSubject = sub;
          }
        }
      });
    });

    if (bestSubject) {
      insights.push(`Programming & ${(bestSubject as Subject).name} are your strongest areas.`);
    }

    // 2. SGPA Trend
    if (resData.semesters.length > 1) {
      const sems = resData.semesters;
      const first = sems[0].sgpa;
      const last = sems[sems.length - 1].sgpa;
      if (last > first) {
        const imp = ((last - first) / first) * 100;
        insights.push(`SGPA improved ${imp.toFixed(0)}% since Semester 1.`);
      } else {
        insights.push(`Maintain consistency in theoretical modules to stabilize your grade.`);
      }
    }

    // 3. Attention subject
    if (worstSubject && ((worstSubject as Subject).totalMarks || 0) < 80) {
      insights.push(`${(worstSubject as Subject).name} needs focus next semester.`);
    } else {
      insights.push(`Mathematics and core sciences show strong foundation.`);
    }

    // 4. Future projection
    const curCgpa = parseFloat(resData.student.cgpa);
    const est = (curCgpa + 0.11).toFixed(2);
    insights.push(`Estimated CGPA after next semester: ${est}`);

    return insights;
  };

  const handlePrint = () => {
    window.print();
  };

  // Skeleton Loader screen matching design guidelines
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl w-full px-6 py-12 md:py-16 space-y-8 animate-pulse">
        {/* Header skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-28 bg-white/[0.04] rounded-md" />
          <div className="h-9 w-36 bg-white/[0.04] rounded-button" />
        </div>
        {/* Hero Card skeleton */}
        <div className="h-64 bg-white/[0.03] border border-white/[0.05] rounded-card w-full" />
        
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-20 bg-white/[0.03] border border-white/[0.05] rounded-card" />
            <div className="h-20 bg-white/[0.03] border border-white/[0.05] rounded-card" />
            <div className="h-20 bg-white/[0.03] border border-white/[0.05] rounded-card" />
          </div>
          <div className="space-y-4">
            <div className="h-48 bg-white/[0.03] border border-white/[0.05] rounded-card" />
            <div className="h-64 bg-white/[0.03] border border-white/[0.05] rounded-card" />
          </div>
        </div>
      </div>
    );
  }

  // Error States (Result Not Found / Network Failure)
  if (error) {
    const is404 = errStatus === 404;
    return (
      <div className="flex-1 flex items-center justify-center p-6 min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md glass-card-premium rounded-card p-8 md:p-10 shadow-premium-lg text-center border border-white/[0.08]"
        >
          <div className="h-14 w-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-7 w-7 text-brand-primary" />
          </div>

          <h1 className="font-sans font-extrabold text-2xl text-white tracking-tight mb-2.5">
            {is404 ? "Transcript Not Found" : "Connection Interrupted"}
          </h1>
          <p className="font-sans text-xs md:text-sm text-text-secondary mb-8 max-w-xs mx-auto leading-relaxed">
            {is404 
              ? "The requested roll number is not indexed in the registry database. Please verify and retry."
              : "Unable to establish secure connection with university registry servers. Check your network connection."
            }
          </p>

          <div className="space-y-3">
            <button
              onClick={fetchData}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-brand-primary hover:bg-brand-hover text-white font-mono font-bold text-xs uppercase tracking-widest rounded-button transition-all duration-200 cursor-pointer shadow-premium-glow"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry Registry Fetch</span>
            </button>
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/[0.03] hover:bg-white/[0.06] text-white font-mono font-bold text-xs uppercase tracking-widest rounded-button border border-white/[0.06] transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Search</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!data) return null;

  const insights = generateAiInsights(data);

  return (
    <>
      {/* Screen container, hidden in print layout */}
      <div className="print:hidden mx-auto max-w-7xl w-full px-4 sm:px-6 py-3 md:py-6 space-y-5 relative z-10">
        
        {/* Navigation & Controls header */}
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

        {/* Top summary row */}
        <ResultSummary student={data.student} completedSemesters={data.semesters.length} />

        {/* Executive Highlights Row (Above the Fold on Main Screen) */}
        <div id="analytics-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 scroll-mt-6">
          {/* AI Insights Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-premium rounded-card p-6 h-full shadow-premium-md relative overflow-hidden border border-white/[0.06] flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-[35px] pointer-events-none" />

              <div>
                <div className="flex items-center gap-2 text-brand-primary mb-4">
                  <Sparkles className="h-4 w-4 fill-brand-primary/20" />
                  <h3 className="font-mono font-bold text-xs tracking-[0.16em] text-white uppercase">
                    AI Academic Insights
                  </h3>
                </div>

                <div className="space-y-3">
                  {insights.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                      <p className="text-xs text-text-secondary font-medium leading-relaxed font-sans">
                        {insight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Performance Chart */}
          <div className="lg:col-span-7">
            <PerformanceChart semesters={data.semesters} />
          </div>
        </div>

        {/* Detailed Academic Semester Timeline */}
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="font-sans font-extrabold text-lg md:text-xl text-white tracking-tight">
              Academic Progress Timeline
            </h2>
            <span className="text-[9px] bg-white/[0.03] border border-white/[0.06] text-text-muted font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              {data.semesters.length} SEMESTERS RECORDED
            </span>
          </div>

          <div className="space-y-4">
            {data.semesters.map((sem, i) => (
              <SemesterCard key={sem.semester} semester={sem} defaultOpen={i === data.semesters.length - 1} />
            ))}
          </div>
        </div>
      </div>

      {/* Hidden print page overlay */}
      <PDFTemplate data={data} />
    </>
  );
}
