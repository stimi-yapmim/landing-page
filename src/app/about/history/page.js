"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export default function HistoryPage() {
  const { lang } = useLanguage();
  const t = useT(lang).about.history;

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
              <span className="text-slate-655">/</span>
              <span className="text-slate-400">{lang === "en" ? "About" : "Tentang"}</span>
              <span className="text-slate-655">/</span>
              <span className="text-white font-bold">{t.title}</span>
            </div>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-brand-cyan-400 uppercase tracking-widest bg-brand-cyan-500/10 px-4 py-1.5 rounded-full mb-4">
                {lang === "en" ? "Our Journey" : "Perjalanan Kami"}
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left Column: Chronological Timeline */}
            <div className="w-full lg:w-7/12 relative">
              <h2 className="text-xl sm:text-2xl font-black text-brand-navy-950 dark:text-white mb-10 uppercase tracking-tight flex items-center gap-3">
                <Calendar className="h-6 w-6 text-brand-cyan-500" />
                <span>{lang === "en" ? "Milestones" : "Tonggak Sejarah"}</span>
              </h2>

              {/* Timeline Line */}
              <div className="absolute left-6 top-16 bottom-8 w-0.5 bg-slate-200 dark:bg-slate-800/80" />

              <div className="space-y-10 relative">
                {t.timeline.map((event, idx) => {
                  return (
                    <div key={idx} className="flex gap-6 items-start relative group">
                      
                      {/* Timeline Dot / Icon */}
                      <div className="h-12 w-12 rounded-full bg-white dark:bg-brand-navy-900 border-2 border-brand-cyan-500 dark:border-brand-cyan-400 flex items-center justify-center text-brand-cyan-600 dark:text-brand-cyan-400 z-10 shrink-0 group-hover:bg-brand-cyan-500 group-hover:text-white transition-all duration-300 shadow-md">
                        <span className="text-xs font-extrabold">{event.year}</span>
                      </div>

                      {/* Timeline Card */}
                      <div className="flex-1 bg-white dark:bg-brand-navy-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-brand-cyan-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                        <h3 className="text-base sm:text-lg font-black text-brand-navy-950 dark:text-white">
                          {event.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">
                          {event.description}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Narrative Content & Visual Panel */}
            <div className="w-full lg:w-5/12 lg:sticky lg:top-28 space-y-8">
              
              {/* History Text */}
              <div className="bg-white dark:bg-brand-navy-900 rounded-3xl p-8 shadow-md border border-slate-200/50 dark:border-slate-800/50 space-y-6">
                <h2 className="text-lg sm:text-xl font-black text-brand-navy-950 dark:text-white uppercase tracking-tight border-b border-slate-100 dark:border-slate-800 pb-4">
                  {lang === "en" ? "Overview" : "Sekilas Sejarah"}
                </h2>
                {t.content.map((paragraph, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Quote/Highlight Panel */}
              <div className="bg-brand-cyan-500 text-white rounded-3xl p-8 shadow-md border border-brand-cyan-600 relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
                <h3 className="text-lg font-black tracking-tight uppercase leading-snug">
                  {lang === "en" ? "Accredited 'Excellent'" : "Terakreditasi 'Baik Sekali'"}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-brand-cyan-50 leading-relaxed font-semibold">
                  {lang === "en"
                    ? "In 2026, STIMI YAPMI Makassar officially achieved institutional accreditation with the 'Excellent' predicate from BAN-PT, reflecting our commitment to the highest quality standards."
                    : "Pada tahun 2026, STIMI YAPMI Makassar secara resmi memperoleh akreditasi institusi peringkat 'Baik Sekali' dari BAN-PT, mencerminkan komitmen terhadap standar mutu tertinggi."
                  }
                </p>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
