"use client";

import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

export default function CampusLife() {
  const { lang } = useLanguage();
  const t = useT(lang).campus;

  return (
    <section className="py-24 bg-brand-navy-50 dark:bg-brand-navy-950" id="campus-life">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-brand-cyan-600 dark:text-brand-cyan-400 uppercase tracking-widest bg-brand-cyan-100 dark:bg-brand-cyan-600/10 px-4 py-1.5 rounded-full mb-3">
            {t.badge}
          </span>
          <h2 className="text-3xl font-black text-brand-navy-950 dark:text-white sm:text-4xl tracking-tight uppercase">
            {t.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {t.galleries.map((item, index) => {
            const isMiddle = index === 1;
            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-3xl bg-brand-navy-900/10 shadow-lg border border-slate-200/50 dark:border-slate-800/50 group transition-all duration-500 hover:shadow-2xl ${
                  isMiddle ? "h-[380px] md:h-[420px]" : "h-[320px] md:h-[350px]"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-750 group-hover:scale-105"
                  style={{ backgroundImage: `url('/hero-campus.png')` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isMiddle ? "from-brand-navy-950/90 to-brand-navy-900/50" : "from-brand-navy-950/80 to-brand-navy-900/40"} transition-opacity duration-300`} />

                {isMiddle && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="relative flex items-center justify-center">
                      <span className="absolute animate-ping inline-flex h-12 w-12 rounded-full bg-brand-cyan-500/30 opacity-75" />
                      <a
                        href="https://www.youtube.com/watch?v=go7QYaQR494"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-cyan-500 hover:bg-brand-cyan-400 text-white shadow-xl"
                        aria-label="Putar Video"
                      >
                        <Play className="h-5 w-5 fill-white ml-0.5" />
                      </a>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end z-10">
                  <h3 className="text-lg font-black text-white leading-tight">{item.title}</h3>
                  <p className="mt-2 text-xs text-slate-300 font-medium">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
