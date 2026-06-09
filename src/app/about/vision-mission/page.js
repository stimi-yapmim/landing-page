"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";
import Link from "next/link";
import { ArrowLeft, Target, Compass, Award, CheckCircle2 } from "lucide-react";

export default function VisionMissionPage() {
  const { lang } = useLanguage();
  const t = useT(lang).about.visionMission;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-slate-50 dark:bg-brand-navy-950 min-h-screen">
        {/* Page Hero Header */}
        <div className="bg-brand-navy-900 relative overflow-hidden pt-32 pb-16">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-cyan-500/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
              <Link href="/" className="hover:text-brand-cyan-400 transition-colors flex items-center gap-1">
                <ArrowLeft className="h-3.5 w-3.5" />
                {lang === "en" ? "Home" : "Beranda"}
              </Link>
              <span className="text-slate-650">/</span>
              <span className="text-slate-400">{lang === "en" ? "About" : "Tentang"}</span>
              <span className="text-slate-650">/</span>
              <span className="text-white font-bold">{t.title}</span>
            </div>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-brand-cyan-400 uppercase tracking-widest bg-brand-cyan-500/10 px-4 py-1.5 rounded-full mb-4">
                {lang === "en" ? "Strategic Plan" : "Rencana Strategis"}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {t.title}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                {t.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          
          {/* Vision Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 p-8 sm:p-12 text-white shadow-lg border border-brand-cyan-500/20 group">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-brand-cyan-500/10 blur-3xl group-hover:scale-110 transition-transform duration-500" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-brand-cyan-500/20 border border-brand-cyan-400/30 flex items-center justify-center text-brand-cyan-400">
                <Compass className="h-8 w-8" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-brand-cyan-400">
                  {t.vision.title}
                </span>
                <p className="mt-3 text-lg sm:text-2xl font-black leading-snug tracking-tight">
                  "{t.vision.text}"
                </p>
              </div>
            </div>
          </div>

          {/* Mission & Goals Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="bg-white dark:bg-brand-navy-900 rounded-3xl p-8 sm:p-10 shadow-md border border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-cyan-500" />
              <div className="flex items-center gap-4.5 mb-8">
                <div className="h-12 w-12 rounded-xl bg-brand-cyan-50 dark:bg-brand-cyan-600/10 border border-brand-cyan-100 dark:border-brand-cyan-900/50 flex items-center justify-center text-brand-cyan-600 dark:text-brand-cyan-400">
                  <Target className="h-6 w-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-brand-navy-950 dark:text-white uppercase tracking-tight">
                  {t.mission.title}
                </h2>
              </div>
              <ul className="space-y-6">
                {t.mission.items.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <CheckCircle2 className="h-5 w-5 text-brand-cyan-500 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-700 dark:text-slate-350 leading-relaxed font-semibold">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Goals Card */}
            <div className="bg-white dark:bg-brand-navy-900 rounded-3xl p-8 sm:p-10 shadow-md border border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500" />
              <div className="flex items-center gap-4.5 mb-8">
                <div className="h-12 w-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-900/50 flex items-center justify-center text-amber-605 dark:text-amber-400" style={{ color: "#d97706" }}>
                  <Award className="h-6 w-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-brand-navy-950 dark:text-white uppercase tracking-tight">
                  {t.goals.title}
                </h2>
              </div>
              <ul className="space-y-6">
                {t.goals.items.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="h-6 w-6 shrink-0 rounded-full bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-450 text-xs font-black">
                      {idx + 1}
                    </div>
                    <span className="text-sm sm:text-base text-slate-700 dark:text-slate-350 leading-relaxed font-semibold">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
