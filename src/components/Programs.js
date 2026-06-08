"use client";

import { UserCheck, Landmark, BarChart3, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

const icons = [UserCheck, Landmark, BarChart3, Briefcase];

export default function Programs() {
  const { lang } = useLanguage();
  const t = useT(lang).programs;

  return (
    <section className="py-24 bg-brand-navy-50 dark:bg-brand-navy-950" id="programs">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.items.map((program, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-brand-navy-900 border border-slate-200/50 dark:border-slate-800/50"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-cyan-100 text-brand-cyan-600 group-hover:bg-brand-cyan-500 group-hover:text-white transition-colors dark:bg-brand-cyan-600/10 dark:text-brand-cyan-400 dark:group-hover:bg-brand-cyan-500 dark:group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-black text-brand-navy-950 dark:text-white group-hover:text-brand-cyan-600 dark:group-hover:text-brand-cyan-400 transition-colors">
                  {program.title}
                </h3>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[64px]">
                  {program.description}
                </p>
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest block mb-2">
                    {t.careerPaths}
                  </span>
                  <ul className="space-y-1.5">
                    {program.prospects.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
