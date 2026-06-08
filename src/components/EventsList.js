"use client";

import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

export default function EventsList() {
  const { lang } = useLanguage();
  const t = useT(lang).events;

  return (
    <section className="py-24 bg-white dark:bg-brand-navy-950 border-t border-slate-100 dark:border-slate-800" id="events">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-brand-cyan-600 dark:text-brand-cyan-400 uppercase tracking-widest bg-brand-cyan-100 dark:bg-brand-cyan-600/10 px-4 py-1.5 rounded-full mb-3">
              {t.badge}
            </span>
            <h2 className="text-3xl font-black text-brand-navy-950 dark:text-white sm:text-4xl tracking-tight uppercase">
              {t.title}
            </h2>
          </div>
          <a
            href="#"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-brand-navy-900/50 hover:bg-slate-50 dark:hover:bg-brand-navy-800/50 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200"
            id="view-more-events-btn"
          >
            <span>{t.viewMore}</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="space-y-6">
          {t.items.map((event, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl bg-slate-50 hover:bg-white dark:bg-brand-navy-900/40 dark:hover:bg-brand-navy-900 shadow-sm hover:shadow-md border border-transparent hover:border-slate-200/50 dark:hover:border-slate-800/50 transition-all duration-300 gap-6"
            >
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center justify-center h-20 w-20 shrink-0 rounded-2xl bg-brand-cyan-500 text-white shadow-md font-sans">
                  <span className="text-3xl font-black leading-none">{event.day}</span>
                  <span className="text-xs font-bold uppercase tracking-wider mt-1">{event.month}</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-brand-navy-950 dark:text-white hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400 cursor-pointer transition-colors leading-snug">
                    {event.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-brand-cyan-500" />{event.dateText}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-brand-cyan-500" />{event.timeText}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-brand-cyan-500" />{event.location}</span>
                  </div>
                </div>
              </div>
              <a
                href="#"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white hover:bg-brand-cyan-500 text-slate-700 hover:text-white shadow-sm border border-slate-200/60 dark:bg-brand-navy-950 dark:text-brand-cyan-400 dark:hover:bg-brand-cyan-500 dark:border-slate-800/60 transition-colors"
                aria-label="Detail"
                id={`event-detail-${idx}`}
              >
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
