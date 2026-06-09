"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";
import Link from "next/link";
import { ArrowLeft, Quote, Award } from "lucide-react";

export default function WelcomePage() {
  const { lang } = useLanguage();
  const t = useT(lang).about.welcome;

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
                {lang === "en" ? "About Campus" : "Tentang Kampus"}
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
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left Column: Welcome Speech Text */}
            <div className="w-full lg:w-7/12 space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              <div className="font-extrabold text-brand-navy-950 dark:text-white text-lg">
                {t.greeting}
              </div>
              
              {t.paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <p className="font-bold text-slate-500 dark:text-slate-400">{t.closing}</p>
                <div className="mt-4">
                  <p className="font-black text-lg text-brand-navy-950 dark:text-white">{t.signature}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-cyan-600 dark:text-brand-cyan-400 mt-1">{t.role}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Card */}
            <div className="w-full lg:w-5/12 lg:sticky lg:top-28">
              <div className="bg-white dark:bg-brand-navy-900 rounded-3xl p-8 shadow-md border border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-brand-cyan-500/5 blur-xl group-hover:scale-110 transition-transform duration-500" />
                
                {/* Photo & Profile Header */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                  <div className="relative h-32 w-32 shrink-0 rounded-2xl overflow-hidden bg-gradient-to-tr from-brand-cyan-100 to-brand-cyan-50 dark:from-brand-navy-800 dark:to-brand-navy-950 border border-slate-150 dark:border-slate-800 shadow-inner">
                    <img
                      src="/dosen1.png"
                      alt={t.signature}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-extrabold text-brand-navy-950 dark:text-white leading-tight">
                      {t.signature}
                    </h3>
                    <p className="text-sm font-semibold text-brand-cyan-600 dark:text-brand-cyan-400 mt-1">
                      {t.role}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1.5 bg-brand-cyan-100 dark:bg-brand-cyan-600/15 px-3 py-1 rounded-full text-[10px] font-black text-brand-cyan-700 dark:text-brand-cyan-400 uppercase tracking-wider">
                      <Award className="h-3.5 w-3.5 shrink-0" />
                      {lang === "en" ? "Accredited Excellent" : "Akreditasi Baik Sekali"}
                    </div>
                  </div>
                </div>

                {/* Info Block */}
                <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-450">
                  <div className="flex items-start gap-3">
                    <Quote className="h-5 w-5 text-brand-cyan-500 shrink-0 transform rotate-180 opacity-60" />
                    <p className="italic leading-relaxed">
                      {lang === "en" 
                        ? "Shaping visionary managers and entrepreneurs with global standards, right from the heart of Makassar."
                        : "Membentuk manajer dan wirausahawan visioner berstandar global, langsung dari jantung Kota Makassar."
                      }
                    </p>
                  </div>
                  <div className="pt-4 flex flex-col gap-2.5 text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <p>Institution: STIMI YAPMI Makassar</p>
                    <p>Founded: 1968 (APP) / 1986 (STIMI)</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
