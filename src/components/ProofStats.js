"use client";

import { Award, Calendar, Users, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

const icons = [Award, Calendar, Users, Briefcase];

export default function ProofStats() {
  const { lang } = useLanguage();
  const stats = useT(lang).stats;

  return (
    <section className="relative -mt-12 z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="proof-stats">
      <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-brand-navy-900 border border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
          {stats.map((stat, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center p-4 ${idx > 0 ? "pt-8 md:pt-4 lg:pt-4" : ""}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy-50 text-brand-navy-700 mb-4 dark:bg-brand-navy-950 dark:text-brand-gold-500">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-black text-brand-navy-950 dark:text-white tracking-tight">{stat.value}</h3>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-2">{stat.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
