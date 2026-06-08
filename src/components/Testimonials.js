"use client";

import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

export default function Testimonials() {
  const { lang } = useLanguage();
  const t = useT(lang).testimonials;

  return (
    <section className="py-24 bg-white dark:bg-brand-navy-950 border-t border-slate-100 dark:border-slate-800" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-brand-gold-600 dark:text-brand-gold-400 uppercase tracking-widest">
            {t.badge}
          </h2>
          <p className="mt-3 text-3xl font-extrabold text-brand-navy-950 dark:text-white sm:text-4xl tracking-tight">
            {t.title}
          </p>
          <p className="mt-4 text-base text-slate-500 dark:text-slate-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl bg-slate-50 p-8 shadow-sm dark:bg-brand-navy-900 border border-slate-100 dark:border-slate-800 relative hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-gold-500 text-brand-gold-500" />
                  ))}
                </div>
                <Quote className="absolute top-8 right-8 h-10 w-10 text-slate-200 dark:text-brand-navy-800 -z-0" />
                <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed relative z-10">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/60 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy-900 text-white font-bold text-sm dark:bg-brand-gold-500 dark:text-brand-navy-950">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-navy-950 dark:text-white">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                    {item.classYear} • {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
