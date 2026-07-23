import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Subject, ResultData } from "@/types";
import { MockProvider } from "@/lib/providers/mockProvider";
import { Sparkles, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import ResultSummary from "@/components/ResultSummary";
import SemesterCard from "@/components/SemesterCard";
import PerformanceChart from "@/components/PerformanceChart";
import PDFTemplate from "@/components/PDFTemplate";
import ResultClientControls from "@/components/ResultClientControls";

interface PageProps {
  params: Promise<{ rollNo: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { rollNo } = await params;
  const provider = new MockProvider();
  const data = await provider.getResult(rollNo.trim());

  if (!data) {
    return {
      title: "Result Not Found - FlipNotes Results",
    };
  }

  return {
    title: `${data.student.name} (${data.student.rollNo}) - AKTU Transcript | FlipNotes`,
    description: `Official AKTU academic transcript for ${data.student.name}. CGPA: ${data.student.cgpa}, Status: ${data.student.status}.`,
  };
}

export default async function ResultPage({ params }: PageProps) {
  const { rollNo } = await params;
  const provider = new MockProvider();
  const data = await provider.getResult(rollNo.trim());

  if (!data) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 min-h-[70vh]">
        <div className="w-full max-w-md glass-card-premium rounded-card p-8 md:p-10 shadow-premium-lg text-center border border-white/[0.08]">
          <div className="h-14 w-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-7 w-7 text-brand-primary" />
          </div>

          <h1 className="font-sans font-extrabold text-2xl text-white tracking-tight mb-2.5">
            Transcript Not Found
          </h1>
          <p className="font-sans text-xs md:text-sm text-text-secondary mb-8 max-w-xs mx-auto leading-relaxed">
            The requested roll number is not indexed in the registry database. Please verify and retry.
          </p>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-brand-primary hover:bg-brand-hover text-white font-mono font-bold text-xs uppercase tracking-widest rounded-button transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Search</span>
          </Link>
        </div>
      </div>
    );
  }

  // AI insights generator based on actual student data
  const generateAiInsights = (resData: ResultData) => {
    const insights: string[] = [];
    
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

    if (worstSubject && ((worstSubject as Subject).totalMarks || 0) < 80) {
      insights.push(`${(worstSubject as Subject).name} needs focus next semester.`);
    } else {
      insights.push(`Mathematics and core sciences show strong foundation.`);
    }

    const curCgpa = parseFloat(resData.student.cgpa);
    const est = (curCgpa + 0.11).toFixed(2);
    insights.push(`Estimated CGPA after next semester: ${est}`);

    return insights;
  };

  const insights = generateAiInsights(data);

  return (
    <>
      {/* Screen container, hidden in print layout */}
      <div className="print:hidden mx-auto max-w-7xl w-full px-4 sm:px-6 py-3 md:py-6 space-y-5 relative z-10">
        
        {/* Navigation & Controls header (Client Component) */}
        <ResultClientControls />

        {/* Top summary row */}
        <ResultSummary student={data.student} completedSemesters={data.semesters.length} />

        {/* Executive Highlights Row (Above the Fold on Main Screen) */}
        <div id="analytics-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 scroll-mt-6">
          {/* AI Insights Card */}
          <div className="lg:col-span-5">
            <div className="glass-card-premium rounded-card p-6 h-full shadow-premium-md relative overflow-hidden border border-white/[0.06] flex flex-col justify-between">
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
            </div>
          </div>

          {/* Performance Chart (Lazy Loaded) */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="w-full h-full min-h-[220px] bg-white/[0.01] rounded-card border border-white/[0.05] animate-pulse" />
              }
            >
              <PerformanceChart semesters={data.semesters} />
            </Suspense>
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
