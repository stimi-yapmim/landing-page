import Link from "next/link";
import { notFound } from "next/navigation";
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
import NavbarWrapper from "./NavbarWrapper";
import Footer from "@/components/Footer";
import { getArticleByIdAction, getAllArticlesAction } from "@/app/actions/newsActions";

// Category badge styles per color token
const categoryStyles = {
  cyan: "bg-brand-cyan-100 text-brand-cyan-700 dark:bg-brand-cyan-600/15 dark:text-brand-cyan-400",
  gold: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
};

export async function generateStaticParams() {
  try {
    const list = await getAllArticlesAction();
    return list.map((a) => ({ id: a.id }));
  } catch (err) {
    console.error("Static params fallback:", err);
    const { articles: mockArticles } = await import("@/lib/articles");
    return Object.keys(mockArticles).map((id) => ({ id }));
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = await getArticleByIdAction(id);

  if (!article) {
    return { title: "Berita Tidak Ditemukan - STIMI YAPMI Makassar" };
  }

  return {
    title: `${article.title} | STIMI YAPMI Makassar`,
    description: article.excerpt,
    keywords: article.tags?.join(", "),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.dateISO,
      authors: [article.author],
      siteName: "STIMI YAPMI Makassar",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function NewsDetailPage({ params }) {
  const { id } = await params;
  const article = await getArticleByIdAction(id);

  if (!article) notFound();

  const allArticles = await getAllArticlesAction();
  const relatedArticles = allArticles.filter((a) => a.id !== id).slice(0, 3);
  const badgeStyle = categoryStyles[article.categoryColor] || categoryStyles.cyan;

  // JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.dateISO,
    author: { "@type": "Organization", name: article.author },
    publisher: {
      "@type": "EducationalOrganization",
      name: "STIMI YAPMI Makassar",
      url: "https://stimiyapmim.ac.id",
    },
    keywords: article.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <NavbarWrapper />

      <main className="flex-1 bg-slate-50 dark:bg-brand-navy-950">

        {/* Article Hero Banner */}
        <div
          className={`relative pt-32 pb-14 bg-gradient-to-br ${article.coverGradient} overflow-hidden`}
        >
          {article.coverImage && (
            <>
              <img
                src={article.coverImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-20 pointer-events-none"
              />
              <div className="absolute inset-0 bg-brand-navy-950/15 pointer-events-none" />
            </>
          )}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:18px_18px] z-10" />
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-25 -translate-y-1/3 translate-x-1/3 z-10"
            style={{ backgroundColor: article.coverAccent }}
          />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/4 z-10"
            style={{ backgroundColor: article.coverAccent }}
          />

          <div className="relative z-20 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-white/50 mb-6">
              <Link href="/" className="hover:text-white/80 transition-colors">Beranda</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/news" className="hover:text-white/80 transition-colors">Berita</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white/70 line-clamp-1 max-w-xs">{article.title}</span>
            </nav>
 
            {/* Category badge */}
            <div className="mb-5">
              <span
                className={`inline-block font-black uppercase tracking-wider rounded-full px-4 py-1.5 text-xs ${badgeStyle}`}
              >
                {article.category}
              </span>
            </div>
 
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {article.title}
            </h1>
 
            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-white/60">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-white/40" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-white/40" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-white/40" />
                {article.readingTime} baca
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

          {/* Back button */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400 transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Semua Berita
          </Link>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* ── Left / Article Body ── */}
            <article className="lg:col-span-8">
              <div className="bg-white dark:bg-brand-navy-900 rounded-3xl shadow-sm border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">

                {/* Decorative cover stripe */}
                <div
                  className={`h-2 w-full bg-gradient-to-r ${article.coverGradient}`}
                  style={{ opacity: 0.8 }}
                />

                <div className="p-7 sm:p-10">
                  {/* Lead / Excerpt */}
                  <p className="text-lg font-semibold text-slate-600 dark:text-slate-300 leading-relaxed border-l-4 border-brand-cyan-500 pl-5 mb-10 italic">
                    {article.excerpt}
                  </p>

                   {/* Body Content */}
                  <div className="space-y-6 text-slate-600 dark:text-slate-300 text-[15px] leading-[1.9] font-sans prose dark:prose-invert max-w-none prose-slate prose-headings:font-black prose-headings:text-brand-navy-950 dark:prose-headings:text-white prose-a:text-brand-cyan-500 hover:prose-a:text-brand-cyan-400 prose-blockquote:border-l-4 prose-blockquote:border-brand-cyan-500 prose-blockquote:pl-4 prose-blockquote:italic">
                    {Array.isArray(article.content) ? (
                      article.content.map((paragraph, index) => (
                        <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                      ))
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    )}
                  </div>

                  {/* Tags */}
                  {article.tags && (
                    <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center flex-wrap gap-2">
                        <Tag className="h-4 w-4 text-slate-400 shrink-0" />
                        {article.tags.map((tag) => (
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

                  {/* Share row */}
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Bagikan:
                    </span>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://stimiyapmim.ac.id/news/${id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`share-facebook-${id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                    >
                      Facebook
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${article.title} - https://stimiyapmim.ac.id/news/${id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`share-whatsapp-${id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://stimiyapmim.ac.id/news/${id}`)}`}
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

              {/* Related Articles (horizontal cards below body on mobile) */}
              {relatedArticles.length > 0 && (
                <div className="mt-10 lg:hidden">
                  <h3 className="text-sm font-black text-brand-navy-950 dark:text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-cyan-500" />
                    Berita Lainnya
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {relatedArticles.slice(0, 2).map((other) => (
                      <Link
                        key={other.id}
                        href={`/news/${other.id}`}
                        className="group flex items-start gap-4 bg-white dark:bg-brand-navy-900 rounded-2xl p-4 shadow-sm border border-slate-200/50 dark:border-slate-800/50 hover:shadow-md transition-shadow"
                      >
                        <div
                          className={`shrink-0 h-14 w-14 rounded-xl bg-gradient-to-br ${other.coverGradient} flex items-center justify-center overflow-hidden relative`}
                        >
                          {other.coverImage ? (
                            <img
                              src={other.coverImage}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:8px_8px]" />
                          )}
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-brand-cyan-600 dark:text-brand-cyan-400 uppercase tracking-widest">
                            {other.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-cyan-600 transition-colors line-clamp-2 leading-snug mt-0.5">
                            {other.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* ── Right / Sidebar ── */}
            <aside className="lg:col-span-4 space-y-7 sticky top-24">

              {/* Document Downloads */}
              <div className="bg-white dark:bg-brand-navy-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50">
                <h3 className="text-xs font-black text-brand-navy-950 dark:text-white uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-cyan-500" />
                  Dokumen Penting
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Brosur PMB 2026/2027", size: "4.2 MB" },
                    { name: "Panduan KIP-Kuliah", size: "1.8 MB" },
                    { name: "Struktur Biaya Kuliah", size: "680 KB" },
                  ].map((doc) => (
                    <a
                      key={doc.name}
                      href="#"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-brand-navy-950 group transition-colors"
                    >
                      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-cyan-100 text-brand-cyan-600 dark:bg-brand-cyan-600/10 dark:text-brand-cyan-400 shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-cyan-600 transition-colors truncate">
                          {doc.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">PDF • {doc.size}</p>
                      </div>
                      <Download className="h-4 w-4 text-slate-400 group-hover:text-brand-cyan-600 ml-auto transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Related Articles (desktop sidebar) */}
              {relatedArticles.length > 0 && (
                <div className="hidden lg:block bg-white dark:bg-brand-navy-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50">
                  <h3 className="text-xs font-black text-brand-navy-950 dark:text-white uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-cyan-500" />
                    Berita Lainnya
                  </h3>
                  <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800/50">
                    {relatedArticles.map((other, index) => (
                      <div
                        key={other.id}
                        className={`group ${index > 0 ? "pt-4" : ""}`}
                      >
                        <Link href={`/news/${other.id}`}>
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`h-2 w-2 rounded-full shrink-0`}
                              style={{ backgroundColor: other.coverAccent }}
                            />
                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                              {other.category}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-cyan-600 dark:group-hover:text-brand-cyan-400 transition-colors line-clamp-2 leading-snug">
                            {other.title}
                          </h4>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] text-slate-400 font-semibold">
                              {other.date}
                            </span>
                            <span className="text-[10px] font-black text-brand-cyan-600 dark:text-brand-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                              Baca <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/news"
                    className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 py-2.5 text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-brand-navy-950 transition-colors uppercase tracking-wider"
                    id="sidebar-all-news-link"
                  >
                    Lihat Semua Berita
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}

              {/* PMB CTA Card */}
              <div className="rounded-3xl bg-gradient-to-br from-brand-navy-900 to-brand-navy-950 p-8 text-white relative overflow-hidden border border-slate-800">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px]" />
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 -translate-y-1/2 translate-x-1/2"
                  style={{ backgroundColor: "#00bacf" }}
                />
                <div className="relative z-10 text-center">
                  <h3 className="text-base font-black uppercase tracking-wider leading-snug">
                    Admission Open
                    <br />
                    <span className="text-brand-cyan-400">TA 2026/2027</span>
                  </h3>
                  <p className="mt-3 text-[11px] text-slate-300 leading-relaxed">
                    Daftar sekarang secara online melalui portal PMB resmi STIMI YAPMI Makassar.
                  </p>
                  <a
                    href="https://pmb.stimiyapmim.ac.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="sidebar-pmb-cta-btn"
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-cyan-500 hover:bg-brand-cyan-400 text-white font-extrabold py-3 px-4 shadow-md transition-all uppercase tracking-wider text-[11px]"
                  >
                    Buka Portal PMB
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
