"use client";

import Link from "next/link";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Download,
  FileText,
  ChevronRight,
  Tag,
  Share2,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { announcements, getRelatedAnnouncements } from "@/lib/announcements";

// Localized labels inside the component
const labels = {
  id: {
    back: "Kembali ke Beranda",
    docHeader: "Dokumen Resmi",
    docSub: "Unduh file salinan surat keputusan resmi.",
    download: "Unduh PDF Resmi",
    otherAnnouncements: "Pengumuman Lainnya",
    otherAnnouncementsSub: "Informasi terbaru dari STIMI YAPMI",
    readBtn: "Baca Selengkapnya",
    share: "Bagikan:",
    pmbTitle: "Penerimaan Mahasiswa Baru",
    pmbSubtitle: "Tahun Akademik 2026/2027",
    pmbDesc: "Daftar sekarang secara online melalui portal PMB resmi STIMI YAPMI Makassar.",
    pmbBtn: "Buka Portal PMB",
    home: "Beranda",
    announcement: "Pengumuman",
  },
  en: {
    back: "Back to Home",
    docHeader: "Official Documents",
    docSub: "Download copy of the official decree document.",
    download: "Download Official PDF",
    otherAnnouncements: "Other Announcements",
    otherAnnouncementsSub: "Latest updates from STIMI YAPMI",
    readBtn: "Read More",
    share: "Share:",
    pmbTitle: "New Student Admissions",
    pmbSubtitle: "Academic Year 2026/2027",
    pmbDesc: "Register now online through the official PMB portal of STIMI YAPMI Makassar.",
    pmbBtn: "Open PMB Portal",
    home: "Home",
    announcement: "Announcement",
  }
};

const categoryStyles = {
  perpustakaan: "bg-brand-cyan-100 text-brand-cyan-700 dark:bg-brand-cyan-600/15 dark:text-brand-cyan-400",
  library: "bg-brand-cyan-100 text-brand-cyan-700 dark:bg-brand-cyan-600/15 dark:text-brand-cyan-400",
  seminar: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  penerimaan: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  admissions: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
};

export default function AnnouncementContent({ id, initialAnn, relatedAnnouncements = [] }) {
  const { lang } = useLanguage();
  const lbl = labels[lang] || labels.id;
  
  // Dynamic lookup
  const announcement = initialAnn || announcements[id];
  if (!announcement) return null;

  // Language-specific details
  const localized = announcement[lang] || announcement.id;
  const displayDate = lang === "en" ? announcement.dateEN : announcement.date;
  const displayReadingTime = lang === "en" ? announcement.readingTimeEN : announcement.readingTime;

  const relatedList = relatedAnnouncements.length > 0 ? relatedAnnouncements : getRelatedAnnouncements(id, 2);
  const badgeStyle = categoryStyles[localized.category.toLowerCase()] || categoryStyles.perpustakaan;

  return (
    <main className="flex-1 bg-slate-50 dark:bg-brand-navy-950">
      
      {/* Announcement Hero Banner */}
      <div className={`relative pt-32 pb-14 bg-gradient-to-br ${announcement.coverGradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:18px_18px]" />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-25 -translate-y-1/3 translate-x-1/3"
          style={{ backgroundColor: announcement.coverAccent }}
        />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/4"
          style={{ backgroundColor: announcement.coverAccent }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">{lbl.home}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/50">{lbl.announcement}</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/70 line-clamp-1 max-w-xs">{localized.title}</span>
          </nav>

          {/* Category badge */}
          <div className="mb-5">
            <span className={`inline-block font-black uppercase tracking-wider rounded-full px-4 py-1.5 text-xs ${badgeStyle}`}>
              {localized.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            {localized.title}
          </h1>

          {/* Meta info */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-white/60">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-white/40" />
              {displayDate}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-white/40" />
              {announcement.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-white/40" />
              {displayReadingTime}
            </span>
            <span className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded font-mono border border-white/10">
              {announcement.docId}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400 transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          {lbl.back}
        </Link>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left / Announcement Body */}
          <article className="lg:col-span-8">
            <div className="bg-white dark:bg-brand-navy-900 rounded-3xl shadow-sm border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">

              {/* Decorative cover stripe */}
              <div
                className={`h-2 w-full bg-gradient-to-r ${announcement.coverGradient}`}
                style={{ opacity: 0.8 }}
              />

              <div className="p-7 sm:p-10">
                {/* Excerpt */}
                <p className="text-lg font-semibold text-slate-600 dark:text-slate-300 leading-relaxed border-l-4 border-brand-cyan-500 pl-5 mb-10 italic">
                  {localized.excerpt}
                </p>

                {/* Body Paragraphs */}
                <div className="space-y-6 text-slate-600 dark:text-slate-300 text-[15px] leading-[1.9] font-sans">
                  {localized.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Tags */}
                {localized.tags && (
                  <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center flex-wrap gap-2">
                      <Tag className="h-4 w-4 text-slate-400 shrink-0" />
                      {localized.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-slate-100 dark:bg-brand-navy-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Row */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    {lbl.share}
                  </span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://stimiyapmim.ac.id/announcements/${id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`share-facebook-${id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${localized.title} - https://stimiyapmim.ac.id/announcements/${id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`share-whatsapp-${id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(localized.title)}&url=${encodeURIComponent(`https://stimiyapmim.ac.id/announcements/${id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`share-twitter-${id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                  >
                    X / Twitter
                  </a>
                </div>

              </div>
            </div>
          </article>

          {/* Right / Sidebar */}
          <aside className="lg:col-span-4 space-y-7 sticky top-24">

            {/* Official PDF Document Downloads */}
            {announcement.attachmentUrl && (
              <div className="bg-white dark:bg-brand-navy-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50">
                <h3 className="text-xs font-black text-brand-navy-950 dark:text-white uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-cyan-500" />
                  {lbl.docHeader}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{lbl.docSub}</p>
                
                <a
                  href={announcement.attachmentUrl}
                  download={announcement.attachmentName || "SK_Pengumuman.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-brand-navy-950 group transition-colors border border-slate-100 dark:border-slate-800"
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-cyan-100 text-brand-cyan-600 dark:bg-brand-cyan-600/10 dark:text-brand-cyan-400 shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-cyan-600 transition-colors truncate">
                      {announcement.attachmentName || "SK_Pengumuman.pdf"}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {announcement.attachmentSize || "PDF"}
                    </p>
                  </div>
                  <Download className="h-4 w-4 text-slate-400 group-hover:text-brand-cyan-600 ml-auto transition-colors shrink-0" />
                </a>
              </div>
            )}

            {/* Related announcements (desktop sidebar) */}
            {relatedList.length > 0 && (
              <div className="bg-white dark:bg-brand-navy-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50">
                <h3 className="text-xs font-black text-brand-navy-950 dark:text-white uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-cyan-500" />
                  {lbl.otherAnnouncements}
                </h3>
                <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800/50">
                  {relatedList.map((other, index) => {
                    const otherLoc = other[lang] || other.id;
                    return (
                      <div
                        key={other.slug}
                        className={`group ${index > 0 ? "pt-4" : ""}`}
                      >
                        <Link href={`/announcements/${other.slug}`}>
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className="h-2 w-2 rounded-full shrink-0"
                              style={{ backgroundColor: other.coverAccent }}
                            />
                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                              {otherLoc.category}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-cyan-600 dark:group-hover:text-brand-cyan-400 transition-colors line-clamp-2 leading-snug">
                            {otherLoc.title}
                          </h4>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] text-slate-400 font-semibold">
                              {lang === "en" ? other.dateEN : other.date}
                            </span>
                            <span className="text-[10px] font-black text-brand-cyan-600 dark:text-brand-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                              {lbl.readBtn} <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PMB CTA Card */}
            <div className="rounded-3xl bg-gradient-to-br from-brand-navy-900 to-brand-navy-950 p-8 text-white relative overflow-hidden border border-slate-800">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px]" />
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 -translate-y-1/2 translate-x-1/2"
                style={{ backgroundColor: "#1252AA" }}
              />
              <div className="relative z-10 text-center">
                <h3 className="text-base font-black uppercase tracking-wider leading-snug">
                  {lbl.pmbTitle}
                  <br />
                  <span className="text-brand-cyan-400">{lbl.pmbSubtitle}</span>
                </h3>
                <p className="mt-3 text-[11px] text-slate-300 leading-relaxed">
                  {lbl.pmbDesc}
                </p>
                <a
                  href="https://pmb.stimiyapmim.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="sidebar-pmb-cta-btn"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-cyan-500 hover:bg-brand-cyan-400 text-white font-extrabold py-3 px-4 shadow-md transition-all uppercase tracking-wider text-[11px]"
                >
                  {lbl.pmbBtn}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}
