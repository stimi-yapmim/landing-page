"use client";

import { useState, useEffect } from "react";
import { Play, Calendar, Download, FileText } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";
import { getAllAnnouncementsAction } from "@/app/actions/announcementActions";

export default function Hero() {
  const { lang } = useLanguage();
  const t = useT(lang).hero;

  const [notices, setNotices] = useState(t.notices || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotices() {
      try {
        const data = await getAllAnnouncementsAction();
        if (data && data.length > 0) {
          const mapped = data.slice(0, 3).map(item => {
            const loc = item[lang] || item.id;
            return {
              id: item.slug,
              title: loc.title,
              date: lang === "en" ? item.dateEN : item.date,
              docId: item.docId
            };
          });
          setNotices(mapped);
        } else {
          setNotices(t.notices);
        }
      } catch (err) {
        console.error("Failed to load announcements on Hero:", err);
        setNotices(t.notices);
      } finally {
        setLoading(false);
      }
    }
    loadNotices();
  }, [lang, t.notices]);


  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 bg-brand-navy-900 overflow-hidden" id="hero">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25" style={{ backgroundImage: `url('/hero-campus.png')` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-950 via-brand-navy-900 to-transparent" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-radial-gradient from-brand-cyan-500/10 to-transparent opacity-60 -z-0" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mt-12 md:mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Play button */}
            <div className="mb-8 relative flex items-center justify-center">
              <span className="absolute animate-ping inline-flex h-16 w-16 rounded-full bg-brand-cyan-500/30 opacity-75" />
              <span className="absolute animate-pulse inline-flex h-20 w-20 rounded-full bg-brand-cyan-500/20" />
              <a
                href="https://www.youtube.com/watch?v=go7QYaQR494"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand-cyan-500 hover:bg-brand-cyan-400 text-white shadow-xl transition-transform hover:scale-105"
                aria-label="Putar Video Profil"
                id="play-video-btn"
              >
                <Play className="h-6 w-6 fill-white ml-1" />
              </a>
            </div>

            <span className="flex items-center gap-2 text-sm font-black text-brand-cyan-400 uppercase tracking-widest mb-4">
              <span>{t.welcome}</span>
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-xl">
              {t.headline}
            </h1>

            <div className="mt-10">
              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-cyan-500 hover:bg-brand-cyan-600 px-8 py-4 text-base font-extrabold text-white uppercase tracking-wider shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
                id="hero-discover-programs-btn"
              >
                <span>{t.discoverBtn}</span>
              </a>
            </div>
          </div>

          {/* Right Column – Notice Board */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:mx-0">
            <div className="overflow-hidden rounded-2xl bg-white/95 dark:bg-brand-navy-950/95 shadow-2xl border border-slate-200/40 dark:border-slate-800/40">

              <div className="bg-brand-navy-900/90 dark:bg-brand-navy-950/80 px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <span className="h-3.5 w-3.5 rounded-full bg-brand-cyan-500 animate-pulse" />
                <h2 className="text-lg font-black tracking-wide text-white uppercase">{t.noticeHeader}</h2>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 px-6 py-4">
                {notices.map((notice, i) => (
                  <div key={i} className="py-4 first:pt-1 last:pb-1">
                    <Link href={`/announcements/${notice.id}`}>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400 cursor-pointer transition-colors leading-snug">
                        {notice.title}
                      </h3>
                    </Link>
                    <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-brand-cyan-500" />
                        {notice.date}
                      </span>
                      <span className="text-[10px] bg-slate-100 dark:bg-brand-navy-800 px-1.5 py-0.5 rounded font-mono">
                        {notice.docId}
                      </span>
                      <Link href={`/announcements/${notice.id}`} className="flex items-center gap-1 text-brand-cyan-600 hover:text-brand-cyan-500 font-bold" aria-label="Detail">
                        <span>Detail</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-slate-50/50 dark:bg-brand-navy-900/40 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="https://pmb.stimiyapmim.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-cyan-500 hover:bg-brand-cyan-600 text-white font-extrabold py-3.5 px-4 shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-wider text-xs"
                  id="notice-admission-open-btn"
                >
                  <FileText className="h-4 w-4" />
                  {t.admissionOpen}
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
