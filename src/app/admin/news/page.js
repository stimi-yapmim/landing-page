"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Calendar, Tag, FileText, ArrowLeft, RefreshCw, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { getPaginatedArticlesAction, getNewsCategoriesAction, deleteArticleAction } from "@/app/actions/newsActions";

export default function AdminNewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);

  async function loadArticles() {
    setLoading(true);
    try {
      const result = await getPaginatedArticlesAction({ page: currentPage, limit: 10 });
      if (result.success) {
        setArticles(result.articles);
        setTotalArticles(result.totalArticles);
        setTotalPages(result.totalPages);
      } else {
        throw new Error("Failed to fetch articles");
      }
    } catch (err) {
      console.error(err);
      setError("Gagal memuat berita dari database.");
    } finally {
      setLoading(false);
    }
  }

  // Fetch categories count on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await getNewsCategoriesAction();
        setCategoriesCount(cats.length);
      } catch (err) {
        console.error(err);
        setCategoriesCount(0);
      }
    }
    loadCategories();
  }, []);

  // Fetch articles on page change
  useEffect(() => {
    loadArticles();
  }, [currentPage]);

  async function handleDelete(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini secara permanen?")) return;
    try {
      const res = await deleteArticleAction(id);
      if (res.success) {
        setMessage("Berita berhasil dihapus!");
        if (articles.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        } else {
          loadArticles();
        }
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError("Gagal menghapus berita: " + res.error);
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setError("Kesalahan saat menghapus data.");
      setTimeout(() => setError(""), 3000);
    }
  }

  const totalNews = totalArticles;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-brand-navy-950 dark:text-white uppercase tracking-tight">
            Kelola Artikel Berita
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tulis, perbarui, dan hapus artikel atau kegiatan resmi yang terpublikasi.
          </p>
        </div>
        
        <Link
          href="/admin/news/new"
          id="admin-add-new-btn"
          className="inline-flex items-center gap-2 rounded-full bg-brand-cyan-500 hover:bg-brand-cyan-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-md hover:shadow-lg transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          TULIS BERITA BARU
        </Link>
      </div>

      {/* Alert messages */}
      {message && (
        <div className="p-4 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/35 dark:text-emerald-400 border border-emerald-200 flex items-center gap-2 text-sm font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
          {message}
        </div>
      )}
      {error && (
        <div className="p-4 rounded-xl bg-red-100 text-red-800 dark:bg-red-950/35 dark:text-red-400 border border-red-200 flex items-center gap-2 text-sm font-semibold">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
          {error}
        </div>
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-brand-navy-900 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-brand-cyan-50 dark:bg-brand-cyan-600/10 flex items-center justify-center text-brand-cyan-500">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-brand-navy-950 dark:text-white">{totalNews}</p>
            <p className="text-xs text-slate-450 font-bold uppercase tracking-wider mt-0.5">Total Artikel Berita</p>
          </div>
        </div>
        <div className="bg-white dark:bg-brand-navy-900 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-550">
            <Tag className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-brand-navy-950 dark:text-white">{categoriesCount}</p>
            <p className="text-xs text-slate-450 font-bold uppercase tracking-wider mt-0.5">Kategori Aktif</p>
          </div>
        </div>
        <div className="bg-white dark:bg-brand-navy-900 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 flex items-center gap-4">
          <button 
            onClick={loadArticles}
            className="h-12 w-12 rounded-xl bg-slate-50 dark:bg-brand-navy-800 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-brand-navy-700 transition-colors border border-slate-200 dark:border-slate-750"
            title="Refresh data"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin text-brand-cyan-500" : ""}`} />
          </button>
          <div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Database Status</p>
            <p className="text-[10px] font-black uppercase text-brand-cyan-550 mt-0.5">TERKONEKSI (MONGODB)</p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-brand-navy-900 rounded-3xl shadow-sm border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
        {loading && articles.length === 0 ? (
          <div className="py-20 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-cyan-500 border-r-transparent align-[-0.125em]" />
            <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Mengambil database berita...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="py-20 text-center">
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Belum ada berita di database</h3>
            <p className="mt-2 text-xs text-slate-400 max-w-xs mx-auto">
              Tulis artikel pertama Anda menggunakan tombol "Tulis Berita Baru" di atas.
            </p>
          </div>
        ) : (
          <div>
            <div className={`overflow-x-auto transition-all duration-300 ${loading ? "opacity-50 pointer-events-none filter blur-[0.5px]" : "opacity-100"}`}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-brand-navy-800/50 border-b border-slate-150 dark:border-slate-800/80 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-4">Judul Berita</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Tanggal Publish</th>
                    <th className="px-6 py-4">Estimasi Baca</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-slate-50/50 dark:hover:bg-brand-navy-950/20 transition-colors">
                      <td className="px-6 py-4 max-w-sm">
                        <Link href={`/news/${article.id}`} target="_blank" className="font-extrabold text-brand-navy-950 dark:text-white hover:text-brand-cyan-500 transition-colors line-clamp-1">
                          {article.title}
                        </Link>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 truncate">Slug: {article.id}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-cyan-550/10 text-brand-cyan-600 dark:text-brand-cyan-400">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-400 dark:text-slate-400">
                        <span>{article.date}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-400 dark:text-slate-505">
                        {article.readingTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/news/edit/${article.id}`}
                            id={`edit-news-${article.id}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 hover:bg-brand-cyan-500 hover:text-white dark:bg-brand-navy-800 text-slate-600 dark:text-slate-300 transition-colors"
                            title="Edit berita"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id)}
                            id={`delete-news-${article.id}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 hover:bg-red-500 hover:text-white dark:bg-red-950/20 text-red-650 dark:text-red-400 transition-colors cursor-pointer"
                            title="Hapus berita"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Pagination */}
            {totalPages > 1 && (
              <div className="border-t border-slate-100 dark:border-slate-800/60 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30 dark:bg-brand-navy-900/30">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-405">
                  Menampilkan <span className="text-brand-navy-950 dark:text-white font-extrabold">{(currentPage - 1) * 10 + 1}</span> - <span className="text-brand-navy-950 dark:text-white font-extrabold">{Math.min(totalArticles, currentPage * 10)}</span> dari <span className="text-brand-navy-950 dark:text-white font-extrabold">{totalArticles}</span> artikel
                </div>
                <div className="flex items-center gap-1.5">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1 || loading}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-brand-navy-800/80 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-transparent disabled:pointer-events-none cursor-pointer"
                    title="Halaman Sebelumnya"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {/* Page Numbers */}
                  {(() => {
                    const range = [];
                    const delta = 1;
                    for (let i = 1; i <= totalPages; i++) {
                      if (
                        i === 1 ||
                        i === totalPages ||
                        (i >= currentPage - delta && i <= currentPage + delta)
                      ) {
                        range.push(i);
                      } else if (range[range.length - 1] !== "...") {
                        range.push("...");
                      }
                    }
                    return range.map((item, idx) => {
                      if (item === "...") {
                        return (
                          <span
                            key={`dots-${idx}`}
                            className="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-400 dark:text-slate-600"
                          >
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={item}
                          onClick={() => setCurrentPage(item)}
                          disabled={loading}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                            currentPage === item
                              ? "bg-brand-cyan-500 text-white shadow-sm font-extrabold"
                              : "bg-slate-100 dark:bg-brand-navy-800 text-slate-600 dark:text-slate-305 hover:bg-slate-200 dark:hover:bg-brand-navy-700 font-bold"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    });
                  })()}

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || loading}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-305 hover:bg-slate-100 dark:hover:bg-brand-navy-800/80 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-transparent disabled:pointer-events-none cursor-pointer"
                    title="Halaman Berikutnya"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
