"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

export default function PartnersList() {
  const { lang } = useLanguage();
  const t = useT(lang).partners;

  // We duplicate the partner list twice to ensure we have a seamless infinite loop
  const marqueeItems = [...t.list, ...t.list];

  return (
    <section className="py-20 bg-white dark:bg-brand-navy-900 border-t border-slate-200/50 dark:border-slate-800/50 overflow-hidden" id="partners">
      
      {/* Inject Scoped CSS for Infinite Marquee Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes partnersMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-partners-marquee {
          display: flex;
          width: max-content;
          animation: partnersMarquee 35s linear infinite;
        }
      `}} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-brand-cyan-600 dark:text-brand-cyan-400 uppercase tracking-widest bg-brand-cyan-100 dark:bg-brand-cyan-600/10 px-4 py-1.5 rounded-full mb-3">
            {t.badge}
          </span>
          <h2 className="text-3xl font-black text-brand-navy-950 dark:text-white sm:text-4xl tracking-tight uppercase">
            {t.title}
          </h2>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Marquee Wrapper Container */}
        <div className="relative w-full overflow-hidden select-none py-4">
          
          {/* Gradient Masks (Fade edges in light & dark modes) */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-brand-navy-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-brand-navy-900 to-transparent z-10 pointer-events-none" />

          {/* Running Track */}
          <div className="animate-partners-marquee hover:[animation-play-state:paused] gap-6">
            {marqueeItems.map((partner, idx) => {
              return (
                <div
                  key={idx}
                  className="group w-44 md:w-52 shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-brand-navy-950/40 border border-slate-150 dark:border-slate-800/60 hover:bg-white dark:hover:bg-brand-navy-950/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center"
                >
                  {/* Logo Image wrapper */}
                  <div className="h-16 w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 mb-4">
                    <img
                      src={`/kerjasama/${partner.image}`}
                      alt={partner.name}
                      className="h-12 w-auto max-w-full object-contain grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 dark:opacity-50 dark:group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>

                  {/* Partner Name */}
                  <h3 className="text-xs font-extrabold text-slate-700 dark:text-slate-350 group-hover:text-brand-cyan-600 dark:group-hover:text-brand-cyan-400 transition-colors leading-snug truncate w-full px-1">
                    {partner.name}
                  </h3>
                  
                  {/* Partner Role */}
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1.5">
                    {partner.role}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
