"use client";

import { Wallet, BookOpen, Smile } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

const icons = [Wallet, BookOpen, Smile];

export default function WhyChooseUs() {
  const { lang } = useLanguage();
  const t = useT(lang).why;

  return (
    <section className="py-24 bg-white dark:bg-brand-navy-950" id="why-choose-us">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-brand-cyan-600 dark:text-brand-cyan-400 uppercase tracking-widest bg-brand-cyan-100 dark:bg-brand-cyan-600/10 px-4 py-1.5 rounded-full mb-3">
            {t.badge}
          </span>
          <h2 className="text-3xl font-black text-brand-navy-950 dark:text-white sm:text-4xl tracking-tight uppercase">
            {t.title}
          </h2>
          <p className="mt-4 text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.reasons.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-brand-navy-50 hover:bg-white dark:bg-brand-navy-900/50 dark:hover:bg-brand-navy-900 hover:shadow-lg border border-transparent hover:border-slate-200/50 dark:hover:border-slate-800/50 transition-all duration-300 group"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-cyan-600 shadow-md group-hover:bg-brand-cyan-500 group-hover:text-white transition-colors dark:bg-brand-navy-950 dark:text-brand-cyan-400 dark:group-hover:bg-brand-cyan-500">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-black text-brand-navy-950 dark:text-white group-hover:text-brand-cyan-600 dark:group-hover:text-brand-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
