"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

export default function LecturersCarousel() {
  const { lang } = useLanguage();
  const t = useT(lang).lecturers;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const items = t.items;
  // Map index to the copied image files
  const lecturerImages = [
    "/dosen1.png",
    "/dosen2.png",
    "/dosen3.png",
    "/dosen4.png",
    "/dosen5.png",
  ];

  // Update visible items count based on responsive window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Make sure current index is in bounds after screen size change
  useEffect(() => {
    const maxIndex = Math.max(0, items.length - visibleCount);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, items.length, currentIndex]);

  const maxIndex = Math.max(0, items.length - visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const translatePercent = currentIndex * (100 / visibleCount);

  return (
    <section className="py-24 bg-slate-50 dark:bg-brand-navy-950 border-t border-slate-200/50 dark:border-slate-800/50 overflow-hidden" id="lecturers">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-brand-cyan-600 dark:text-brand-cyan-400 uppercase tracking-widest bg-brand-cyan-100 dark:bg-brand-cyan-600/10 px-4 py-1.5 rounded-full mb-3">
              <GraduationCap className="h-3.5 w-3.5" />
              {t.badge}
            </span>
            <h2 className="text-3xl font-black text-brand-navy-950 dark:text-white sm:text-4xl tracking-tight uppercase">
              {t.title}
            </h2>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
              {t.subtitle}
            </p>
          </div>

          {/* Controls */}
          {maxIndex > 0 && (
            <div className="flex gap-3 mt-6 md:mt-0">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`h-11 w-11 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-900 shadow-sm text-slate-700 dark:text-slate-300 transition-all ${
                  currentIndex === 0
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-brand-cyan-500 hover:text-white hover:border-brand-cyan-500 dark:hover:bg-brand-cyan-500 dark:hover:text-white dark:hover:border-brand-cyan-500"
                }`}
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex === maxIndex}
                className={`h-11 w-11 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-900 shadow-sm text-slate-700 dark:text-slate-300 transition-all ${
                  currentIndex === maxIndex
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-brand-cyan-500 hover:text-white hover:border-brand-cyan-500 dark:hover:bg-brand-cyan-500 dark:hover:text-white dark:hover:border-brand-cyan-500"
                }`}
                aria-label="Next Slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel Outer Track */}
        <div className="relative overflow-hidden">
          <div className="overflow-hidden select-none -mx-3">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${translatePercent}%)` }}
            >
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3 py-4"
                >
                  <div className="group h-full flex flex-col bg-white dark:bg-brand-navy-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    
                    {/* Decorative abstract mesh circle inside card */}
                    <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-brand-cyan-500/5 dark:bg-brand-cyan-500/10 group-hover:scale-110 transition-transform duration-500" />
                    
                    {/* Profile Header Block */}
                    <div className="flex items-center gap-4.5 mb-5 relative z-10">
                      {/* Avatar container with decorative border and gradient background */}
                      <div className="relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden bg-gradient-to-tr from-brand-cyan-100 to-brand-cyan-50 dark:from-brand-navy-800 dark:to-brand-navy-950 border border-slate-150 dark:border-slate-800">
                        <img
                          src={lecturerImages[idx % lecturerImages.length]}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      
                      <div className="min-w-0">
                        <h3 className="text-base font-extrabold text-brand-navy-950 dark:text-white leading-tight group-hover:text-brand-cyan-500 transition-colors duration-300">
                          {item.name}
                        </h3>
                        <p className="text-xs font-semibold text-brand-cyan-600 dark:text-brand-cyan-400 mt-1 leading-snug">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    {/* Biography / Description */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1 italic font-medium">
                      "{item.desc}"
                    </p>

                    {/* Small tag badge inside card */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                      <span>STIMI YAPMI</span>
                      <span className="text-brand-cyan-500/80 dark:text-brand-cyan-400/80">FACULTY</span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicators Dots */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: items.length - visibleCount + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-8 bg-brand-cyan-500"
                    : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
