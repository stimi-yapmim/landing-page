"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight, Search, Tag, ArrowLeft, BookOpen } from "lucide-react";
import { getAllArticles, getCategories } from "@/lib/articles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Category badge colors
const categoryStyles = {
  cyan: "bg-brand-cyan-100 text-brand-cyan-700 dark:bg-brand-cyan-600/15 dark:text-brand-cyan-400",
  gold: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
};

function CategoryBadge({ category, color = "cyan", small = false }) {
  const style = categoryStyles[color] || categoryStyles.cyan;
  return (
    <span
      className={`inline-block font-black uppercase tracking-wider rounded-full ${
        small ? "px-2.5 py-1 text-[10px]" : "px-3.5 py-1.5 text-xs"
      } ${style}`}
    >
      {category}
    </span>
  );
}

function ArticleCardFeatured({ article }) {
  return (
    <Link
      href={`/news/${article.id}`}
      id={`featured-article-${article.id}`}
      className="group relative flex flex-col lg:flex-row overflow-hidden rounded-3xl bg-white dark:bg-brand-navy-900 shadow-md border border-slate-200/50 dark:border-slate-800/50 hover:shadow-xl transition-all duration-300"
    >
      {/* Cover Image */}
      <div
        className={`relative w-full lg:w-5/12 min-h-[240px] lg:min-h-[360px] bg-gradient-to-br ${article.coverGradient} flex-shrink-0 overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-8 gap-3">
          <CategoryBadge category={article.category} color={article.categoryColor} />
          <div className="flex items-center gap-2 text-[10px] font-semibold text-white/60">
            <Calendar className="h-3.5 w-3.5" />
            <span>{article.date}</span>
            <span className="mx-1">•</span>
            <Clock className="h-3.5 w-3.5" />
            <span>{article.readingTime} baca</span>
          </div>
        </div>
        {/* Accent glow top-right */}
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-30 -translate-y-1/3 translate-x-1/3"
          style={{ backgroundColor: article.coverAccent }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center p-8 lg:p-10 gap-4">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-brand-gold-600 dark:text-brand-gold-400 uppercase tracking-widest">
          <BookOpen className="h-3.5 w-3.5" />
          Artikel Pilihan
        </div>
        <h2 className="text-2xl lg:text-3xl font-black text-brand-navy-950 dark:text-white leading-tight group-hover:text-brand-cyan-600 dark:group-hover:text-brand-cyan-400 transition-colors">
          {article.title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
          <User className="h-3.5 w-3.5" />
          <span>{article.author}</span>
        </div>
        <div className="mt-2 inline-flex items-center gap-2 text-sm font-black text-brand-cyan-600 dark:text-brand-cyan-400 group-hover:gap-3 transition-all">
          <span>Baca Selengkapnya</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ article }) {
  return (
    <Link
      href={`/news/${article.id}`}
      id={`article-card-${article.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-brand-navy-900 shadow-sm border border-slate-200/50 dark:border-slate-800/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover */}
      <div
        className={`relative h-44 bg-gradient-to-br ${article.coverGradient} flex items-end p-5 overflow-hidden flex-shrink-0`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:16px_16px]" />
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-30 -translate-y-1/3 translate-x-1/3"
          style={{ backgroundColor: article.coverAccent }}
        />
        <CategoryBadge category={article.category} color={article.categoryColor} small />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {article.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readingTime}
          </span>
        </div>

        <h3 className="text-base font-black text-brand-navy-950 dark:text-white line-clamp-2 leading-snug group-hover:text-brand-cyan-600 dark:group-hover:text-brand-cyan-400 transition-colors mb-3">
          {article.title}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
            <User className="h-3 w-3" />
            {article.author}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-black text-brand-cyan-600 dark:text-brand-cyan-400 group-hover:gap-2 transition-all">
            Baca
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function NewsIndexPage() {
  const allArticles = getAllArticles();
  const categories = getCategories();
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return allArticles.filter((a) => {
      const matchCat =
        selectedCategory === "Semua" || a.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  const featuredArticle = filteredArticles[0];
  const restArticles = filteredArticles.slice(1);

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-slate-50 dark:bg-brand-navy-950 min-h-screen">

        {/* Page Hero / Header */}
        <div className="bg-brand-navy-900 relative overflow-hidden pt-32 pb-16">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-cyan-500/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
              <Link href="/" className="hover:text-brand-cyan-400 transition-colors flex items-center gap-1">
                <ArrowLeft className="h-3.5 w-3.5" />
                Beranda
              </Link>
              <span className="text-slate-600">/</span>
              <span className="text-white">Berita & Kegiatan</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-brand-cyan-400 uppercase tracking-widest bg-brand-cyan-500/10 px-4 py-1.5 rounded-full mb-4">
                  Berita & Kegiatan Kampus
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Informasi Terbaru
                  <br />
                  <span className="text-brand-cyan-400">STIMI YAPMI</span>
                </h1>
                <p className="mt-4 text-sm text-slate-400 max-w-xl leading-relaxed">
                  Ikuti perkembangan terkini seputar kegiatan akademik, kemahasiswaan, penerimaan mahasiswa baru, dan pencapaian kampus.
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-3xl font-black text-white">{allArticles.length}</p>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Total Artikel</p>
                </div>
                <div className="w-px bg-slate-700" />
                <div className="text-center">
                  <p className="text-3xl font-black text-white">{categories.length - 1}</p>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Kategori</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-0 z-30 bg-white/95 dark:bg-brand-navy-950/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

              {/* Category Pills */}
              <div className="flex items-center gap-2 flex-wrap flex-1">
                <Tag className="h-4 w-4 text-slate-400 shrink-0" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                      selectedCategory === cat
                        ? "bg-brand-cyan-500 text-white shadow-md"
                        : "bg-slate-100 dark:bg-brand-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-brand-navy-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id="news-search-input"
                  className="w-full pl-9 pr-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-900 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/30 focus:border-brand-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Articles Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {filteredArticles.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="h-20 w-20 rounded-full bg-slate-100 dark:bg-brand-navy-900 flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-black text-slate-700 dark:text-slate-200">Berita tidak ditemukan</h3>
              <p className="mt-2 text-sm text-slate-400 max-w-xs">
                Coba ganti kata kunci pencarian atau pilih kategori lain.
              </p>
              <button
                onClick={() => { setSelectedCategory("Semua"); setSearchQuery(""); }}
                className="mt-6 px-6 py-2.5 rounded-full bg-brand-cyan-500 text-white text-xs font-black uppercase tracking-wider hover:bg-brand-cyan-600 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Article */}
              {featuredArticle && (
                <div>
                  <ArticleCardFeatured article={featuredArticle} />
                </div>
              )}

              {/* Grid: Rest of Articles */}
              {restArticles.length > 0 && (
                <div>
                  <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                    <span>Berita Lainnya</span>
                    <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                    <span className="text-slate-300 dark:text-slate-600">{restArticles.length} artikel</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                    {restArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-brand-navy-900 relative overflow-hidden py-16 mt-8">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="absolute bottom-0 left-1/2 w-96 h-64 -translate-x-1/2 translate-y-1/3 rounded-full bg-brand-cyan-500/10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-snug">
              Bergabung Bersama Kami
              <br />
              <span className="text-brand-cyan-400">TA 2026/2027 Masih Terbuka</span>
            </h2>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
              Daftarkan diri Anda sekarang melalui portal PMB resmi STIMI YAPMI Makassar dan mulai perjalanan akademik Anda.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://pmb.stimiyapmim.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                id="news-page-pmb-cta"
                className="inline-flex items-center gap-2 rounded-full bg-brand-cyan-500 hover:bg-brand-cyan-400 text-white font-black py-3.5 px-8 text-sm uppercase tracking-wider shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Daftar Sekarang
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-bold py-3.5 px-8 text-sm uppercase tracking-wider transition-all"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
