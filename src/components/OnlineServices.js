"use client";

import { Database, Laptop, BookOpen, FileText, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

const icons = [Database, Laptop, BookOpen, FileText];

export default function OnlineServices() {
  const { lang } = useLanguage();
  const t = useT(lang).services;

  return (
    <section className="py-24 bg-white dark:bg-brand-navy-950 border-t border-slate-250/50 dark:border-slate-800/50" id="online-services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-brand-cyan-600 dark:text-brand-cyan-400 uppercase tracking-widest bg-brand-cyan-100 dark:bg-brand-cyan-600/10 px-4 py-1.5 rounded-full mb-3">
            {t.badge}
          </span>
          <h2 className="text-3xl font-black text-brand-navy-950 dark:text-white sm:text-4xl tracking-tight uppercase">
            {t.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.items.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-50 dark:bg-brand-navy-900 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-200/40 dark:border-slate-800/40 hover:border-brand-cyan-500/30 transition-all duration-300 overflow-hidden"
                id={`online-service-card-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {/* Visual hover background accent */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-cyan-500/5 dark:bg-brand-cyan-500/10 blur-xl group-hover:scale-110 transition-transform duration-500" />
                
                <div>
                  {/* Icon Box */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-cyan-100 dark:bg-brand-cyan-600/10 text-brand-cyan-600 dark:text-brand-cyan-400 group-hover:bg-brand-cyan-500 group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  {/* Name and Fullname */}
                  <h3 className="mt-5 text-xl font-extrabold text-brand-navy-950 dark:text-white group-hover:text-brand-cyan-600 dark:group-hover:text-brand-cyan-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 mt-1">
                    {item.fullname}
                  </p>
                  
                  {/* Description */}
                  <p className="mt-4 text-xs text-slate-550 dark:text-slate-400 leading-relaxed min-h-[72px]">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs font-black text-slate-750 dark:text-slate-350 group-hover:text-brand-cyan-600 dark:group-hover:text-brand-cyan-400 transition-colors">
                  <span className="uppercase tracking-widest">{t.visitBtn}</span>
                  <ExternalLink className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
