"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle, Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

export default function Admissions() {
  const { lang } = useLanguage();
  const t = useT(lang).admissions;

  return (
    <section className="py-24 bg-brand-navy-50 dark:bg-brand-navy-950 border-t border-slate-100 dark:border-slate-800" id="admissions">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-brand-cyan-600 dark:text-brand-cyan-400 uppercase tracking-widest bg-brand-cyan-100 dark:bg-brand-cyan-600/10 px-4 py-1.5 rounded-full self-center lg:self-start mb-4">
              {t.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy-950 dark:text-white uppercase tracking-tight leading-snug">
              {t.title1}
              <br />
              <span className="text-brand-cyan-500">{t.title2}</span>
            </h2>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
              {t.subtitle}{" "}
              <strong className="text-slate-700 dark:text-slate-200">{t.subtitleAccent}</strong>
              {t.subtitleEnd}
            </p>

            <ul className="mt-6 space-y-2.5 text-left self-center lg:self-start">
              {t.highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle className="h-4 w-4 text-brand-cyan-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 relative w-full aspect-[16/10] overflow-hidden rounded-3xl bg-slate-50 dark:bg-brand-navy-900 shadow-lg border border-slate-200/50 dark:border-slate-800/50">
              <Image
                src="/alur_pendaftaran_transparrent.png"
                alt={t.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain p-6 transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column – CTA Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white dark:bg-brand-navy-900 shadow-xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">

              <div className="bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 px-8 py-7 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:14px_14px]" />
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-cyan-500/10 blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <p className="text-xs font-black text-brand-cyan-400 uppercase tracking-widest mb-2">{t.cardYear}</p>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-snug">
                    {t.cardTitle1}<br />{t.cardTitle2}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400">{t.cardSub}</p>
                </div>
              </div>

              <div className="px-8 py-6 space-y-5">
                {t.steps.map((step, index) => (
                  <div key={step.number} className="flex items-start gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cyan-500 text-white text-xs font-black shadow-md">
                        {step.number}
                      </div>
                      {index < t.steps.length - 1 && (
                        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mt-1" />
                      )}
                    </div>
                    <div className="pb-1">
                      <h4 className="text-sm font-black text-brand-navy-950 dark:text-white">{step.title}</h4>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-8 pb-8 space-y-3">
                <a
                  href="https://pmb.stimiyapmim.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="admissions-portal-btn"
                  className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-brand-cyan-500 hover:bg-brand-cyan-400 active:bg-brand-cyan-600 text-white font-extrabold py-4 px-6 shadow-lg shadow-brand-cyan-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-wider text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t.registerBtn}
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </a>
                <a
                  href="tel:08124134130"
                  id="admissions-call-btn"
                  className="w-full flex items-center justify-center gap-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 hover:bg-white dark:hover:bg-brand-navy-800 text-slate-700 dark:text-slate-200 font-bold py-3.5 px-6 transition-all text-sm"
                >
                  <Phone className="h-4 w-4 text-brand-cyan-500" />
                  {t.callBtn}
                </a>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 px-8 py-4 bg-slate-50/50 dark:bg-brand-navy-950/40 flex flex-wrap gap-4 text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-brand-cyan-500" />{t.address}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-brand-cyan-500" />{t.hours}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
