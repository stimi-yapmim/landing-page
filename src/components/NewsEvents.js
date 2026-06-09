"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";
import { getAllArticlesAction } from "@/app/actions/newsActions";

export default function NewsEvents() {
  const { lang } = useLanguage();
  const t = useT(lang).news;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await getAllArticlesAction();
        if (data && data.length > 0) {
          // Take the 3 most recent articles
          setArticles(data.slice(0, 3));
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.error("Failed to load articles from DB:", err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  const displayArticles = articles.length > 0 ? articles : t.articles;

  return (
    <section className="py-24 bg-slate-50 dark:bg-brand-navy-950 border-t border-slate-100 dark:border-slate-800" id="news">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-3xl">
            <h2 className="text-sm font-bold text-brand-gold-600 dark:text-brand-gold-400 uppercase tracking-widest">
              {t.badge}
            </h2>
            <p className="mt-3 text-3xl font-extrabold text-brand-navy-950 dark:text-white sm:text-4xl tracking-tight">
              {t.title}
            </p>
          </div>
          <Link
            href="/news"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy-900 hover:text-brand-navy-800 dark:text-brand-gold-500 dark:hover:text-brand-gold-400 transition-colors"
            id="view-all-news-link"
          >
            {t.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayArticles.map((item, idx) => (
            <article
              key={item.id || idx}
              className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm dark:bg-brand-navy-900 border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow group"
            >
              <div 
                className={`h-48 w-full bg-gradient-to-br ${item.coverGradient || "from-brand-navy-900 to-brand-navy-850"} flex flex-col justify-between p-6 relative overflow-hidden`}
              >
                {item.coverImage && (
                  <>
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/35" />
                  </>
                )}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] z-10" />
                {item.coverAccent && (
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 -translate-y-1/3 translate-x-1/3 z-10"
                    style={{ backgroundColor: item.coverAccent }}
                  />
                )}
                <span className="relative z-20 self-start rounded-full bg-brand-gold-500 text-brand-navy-950 font-black px-3 py-1 text-xs uppercase tracking-wider">
                  {item.category}
                </span>
                <div className="relative z-20 flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                  <Calendar className="h-4 w-4 text-brand-gold-500" />
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-brand-navy-950 dark:text-white line-clamp-2 leading-snug group-hover:text-brand-cyan-600 dark:group-hover:text-brand-gold-450 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href={item.link || `/news/${item.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-brand-navy-900 dark:text-brand-gold-500 group-hover:underline uppercase tracking-wider"
                    id={`read-article-${item.id || idx}`}
                  >
                    {t.readMore}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
