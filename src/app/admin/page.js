"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FileText, 
  Plus, 
  Globe, 
  RefreshCw, 
  TrendingUp, 
  Calendar, 
  ArrowRight,
  Edit2, 
  Trash2,
  AlertCircle,
  Tag
} from "lucide-react";
import { getAllArticlesAction, deleteArticleAction } from "@/app/actions/newsActions";

export default function AdminDashboardHome() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await getAllArticlesAction();
      setArticles(data);
    } catch (err) {
      console.error(err);
      setError("Gagal sinkronisasi data dari MongoDB.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini secara permanen?")) return;
    try {
      const res = await deleteArticleAction(id);
      if (res.success) {
        setMessage("Berita berhasil dihapus!");
        loadStats();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError("Gagal menghapus berita: " + res.error);
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setError("Kesalahan koneksi saat menghapus.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const totalNews = articles.length;
  const categoriesCount = new Set(articles.map(a => a.category)).size;
  const recentArticles = articles.slice(0, 5); // display 5 most recent

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* ── Welcome Banner ── */}
      <div className="bg-gradient-to-r from-brand-navy-900 to-brand-cyan-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-cyan-400/20 blur-3xl" />
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-cyan-200 bg-brand-cyan-500/20 px-3 py-1 rounded-full">
            Selamat Datang di Portal Admin
          </span>
          <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight mt-3">
            Halo, Humas STIMI YAPMI
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
            Melalui dashboard ini, Anda dapat mengelola publikasi artikel, pengumuman, dan berita resmi kampus STIMI YAPMI Makassar yang tersinkronisasi langsung dengan database MongoDB.
          </p>
        </div>
      </div>

      {/* Alert Messaging */}
      {message && (
        <div className="p-4 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/35 dark:text-emerald-400 border border-emerald-200 flex items-center gap-2 text-sm font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
          {message}
        </div>
      )}
      {error && (
        <div className="p-4 rounded-xl bg-red-100 text-red-800 dark:bg-red-955/35 dark:text-red-400 border border-red-200 flex items-center gap-2 text-sm font-semibold">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
          {error}
        </div>
      )}

      {/* ── Statistics Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Stat 1 */}
        <div className="bg-white dark:bg-brand-navy-900 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
              Total Berita
            </span>
            <h3 className="text-3xl font-black text-brand-navy-950 dark:text-white">
              {loading ? <LoaderIndicator /> : totalNews}
            </h3>
            <p className="text-[10px] font-bold text-slate-450 dark:text-slate-400">
              Artikel terpublikasi
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-brand-cyan-50 dark:bg-brand-cyan-600/10 flex items-center justify-center text-brand-cyan-500">
            <FileText className="h-6 w-6" />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white dark:bg-brand-navy-900 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
              Kategori Aktif
            </span>
            <h3 className="text-3xl font-black text-brand-navy-950 dark:text-white">
              {loading ? <LoaderIndicator /> : categoriesCount}
            </h3>
            <p className="text-[10px] font-bold text-slate-450 dark:text-slate-400">
              Pengelompokan berita
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-550">
            <Tag className="h-6 w-6" />
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white dark:bg-brand-navy-900 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
              Status Server
            </span>
            <h3 className="text-sm font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              ONLINE
            </h3>
            <p className="text-[10px] font-bold text-slate-450 dark:text-slate-400">
              MongoDB Terkoneksi
            </p>
          </div>
          <button 
            onClick={loadStats}
            disabled={loading}
            className="h-12 w-12 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-brand-navy-800 dark:hover:bg-brand-navy-750 flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-500 transition-colors cursor-pointer"
            title="Refresh database data"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin text-brand-cyan-500" : ""}`} />
          </button>
        </div>

      </div>

      {/* ── Quick Action Panel ── */}
      <div className="bg-white dark:bg-brand-navy-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/50 dark:border-slate-800/50">
        <h3 className="text-xs font-black text-brand-navy-950 dark:text-white uppercase tracking-wider mb-6 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-cyan-500" />
          Pintasan Aksi Cepat
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/news/new"
            className="flex items-center justify-between p-4 rounded-2xl bg-brand-cyan-500 hover:bg-brand-cyan-600 text-white font-extrabold transition-all group"
          >
            <div className="flex items-center gap-3">
              <Plus className="h-5 w-5 shrink-0" />
              <span className="text-xs uppercase tracking-wider">Tulis Berita Baru</span>
            </div>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/admin/news"
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-brand-navy-800 dark:hover:bg-brand-navy-750 text-slate-800 dark:text-white font-extrabold transition-all group border border-slate-200/40 dark:border-slate-700/30"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 shrink-0 text-brand-cyan-500" />
              <span className="text-xs uppercase tracking-wider font-extrabold">Semua Daftar Berita</span>
            </div>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-brand-navy-800 dark:hover:bg-brand-navy-750 text-slate-800 dark:text-white font-extrabold transition-all group border border-slate-200/40 dark:border-slate-700/30"
          >
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 shrink-0 text-amber-500" />
              <span className="text-xs uppercase tracking-wider font-extrabold">Lihat Web Publik</span>
            </div>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Recent Articles Section ── */}
      <div className="bg-white dark:bg-brand-navy-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/50 dark:border-slate-800/50">
        
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-black text-brand-navy-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-cyan-500" />
            5 Berita Terbaru
          </h3>
          <Link href="/admin/news" className="text-xs font-black text-brand-cyan-600 dark:text-brand-cyan-400 hover:text-brand-cyan-500 flex items-center gap-1 uppercase tracking-wider">
            <span>Kelola Semua</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading && articles.length === 0 ? (
          <div className="py-12 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-solid border-brand-cyan-500 border-r-transparent align-[-0.125em]" />
            <p className="mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Menghubungkan ke MongoDB...</p>
          </div>
        ) : recentArticles.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-xs font-bold text-slate-500">Belum ada berita terpublikasi.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-brand-navy-800/30 border-b border-slate-150 dark:border-slate-800/50 text-[9px] font-black uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3">Judul</th>
                  <th className="px-5 py-3">Kategori</th>
                  <th className="px-5 py-3">Tanggal</th>
                  <th className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-xs font-semibold text-slate-700 dark:text-slate-300">
                {recentArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/50 dark:hover:bg-brand-navy-950/10 transition-colors">
                    <td className="px-5 py-3 max-w-xs truncate">
                      <Link href={`/news/${article.id}`} target="_blank" className="font-extrabold text-brand-navy-950 dark:text-white hover:text-brand-cyan-500 transition-colors">
                        {article.title}
                      </Link>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-brand-cyan-50 dark:bg-brand-cyan-600/10 text-brand-cyan-600 dark:text-brand-cyan-400">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-slate-450 dark:text-slate-550 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      <span>{article.date}</span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-1.5">
                        <Link
                          href={`/admin/news/edit/${article.id}`}
                          id={`edit-recent-${article.id}`}
                          className="inline-flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-slate-100 hover:bg-brand-cyan-500 hover:text-white dark:bg-brand-navy-800 text-slate-600 dark:text-slate-300 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          id={`delete-recent-${article.id}`}
                          className="inline-flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-red-50 hover:bg-red-500 hover:text-white dark:bg-red-955/20 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}

function LoaderIndicator() {
  return (
    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-brand-cyan-500 border-r-transparent align-middle" />
  );
}
