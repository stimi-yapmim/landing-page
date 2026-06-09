"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, AlertCircle, Upload, Trash, Image as ImageIcon } from "lucide-react";
import { createArticleAction, uploadImageAction } from "@/app/actions/newsActions";
import RichEditor from "@/components/RichEditor";

export default function NewNewsPage() {
  const router = useRouter();
  const thumbnailInputRef = useRef(null);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Akademik",
    author: "Humas STIMI YAPMI",
    excerpt: "",
    content: "",
    tags: "",
    coverGradient: "from-brand-navy-950 via-brand-navy-800 to-brand-cyan-600",
    coverAccent: "#00bacf",
    coverImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingThumbnail(true);
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const res = await uploadImageAction(event.target.result);
          if (res.success) {
            setFormData(prev => ({ ...prev, coverImage: res.url }));
          } else {
            alert("Gagal mengunggah thumbnail: " + res.error);
          }
        } catch (err) {
          console.error(err);
          alert("Kesalahan koneksi saat mengunggah thumbnail.");
        } finally {
          setUploadingThumbnail(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      
      // Auto-set gradient and accent based on category for ease of use
      if (name === "category") {
        if (value === "Kuliah Umum") {
          updated.coverGradient = "from-brand-navy-950 via-brand-navy-800 to-brand-gold-600";
          updated.coverAccent = "#f59e0b";
        } else if (value === "Pendaftaran") {
          updated.coverGradient = "from-brand-navy-950 via-brand-navy-800 to-emerald-600";
          updated.coverAccent = "#10b981";
        } else if (value === "Fasilitas") {
          updated.coverGradient = "from-brand-navy-950 via-brand-navy-800 to-purple-600";
          updated.coverAccent = "#7c3aed";
        } else if (value === "Beasiswa") {
          updated.coverGradient = "from-brand-navy-950 via-brand-navy-800 to-orange-600";
          updated.coverAccent = "#ea580c";
        } else {
          updated.coverGradient = "from-brand-navy-950 via-brand-navy-800 to-brand-cyan-600";
          updated.coverAccent = "#00bacf";
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setError("Judul dan Konten berita wajib diisi!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await createArticleAction(formData);
      if (res.success) {
        router.push("/admin/news");
      } else {
        setError("Gagal membuat berita: " + res.error);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Kesalahan sistem saat membuat berita.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header & Back Button */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/news"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-900 hover:bg-slate-100 text-slate-750 dark:text-slate-350 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-brand-navy-950 dark:text-white uppercase tracking-tight">
            Tulis Berita Baru
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Buat artikel berita atau liputan kegiatan akademik baru.
          </p>
        </div>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Content Card */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-brand-navy-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/50 dark:border-slate-800/50 space-y-6">
            
            {error && (
              <div className="p-4 rounded-xl bg-red-100 text-red-800 dark:bg-red-955/35 dark:text-red-400 border border-red-200 flex items-center gap-2 text-sm font-semibold">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Judul Berita *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Masukkan judul berita utama..."
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 focus:border-brand-cyan-500 font-bold"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Kutipan / Ringkasan Singkat
              </label>
              <input
                type="text"
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Ringkasan singkat berita untuk card halaman depan..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 focus:border-brand-cyan-500"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Konten Berita *
              </label>
              <RichEditor
                value={formData.content}
                onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Tag Berita (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="contoh: Beasiswa, KIP Kuliah, PMB, Akademik"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 focus:border-brand-cyan-500"
              />
            </div>

          </div>
        </div>

        {/* Right: Sidebar Metadata */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Meta Card */}
          <div className="bg-white dark:bg-brand-navy-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 space-y-5">
            <h3 className="text-xs font-black text-brand-navy-950 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3">
              Metadata Berita
            </h3>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Kategori Berita
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 font-bold"
              >
                <option value="Akademik">Akademik</option>
                <option value="Kuliah Umum">Kuliah Umum</option>
                <option value="Pendaftaran">Pendaftaran</option>
                <option value="Fasilitas">Fasilitas</option>
                <option value="Beasiswa">Beasiswa</option>
                <option value="Wisuda">Wisuda</option>
              </select>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Thumbnail / Cover Berita
              </label>
              
              <input
                type="file"
                ref={thumbnailInputRef}
                onChange={handleThumbnailUpload}
                accept="image/*"
                className="hidden"
              />

              {formData.coverImage ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950/20 aspect-video group">
                  <img
                    src={formData.coverImage}
                    alt="Thumbnail Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => thumbnailInputRef.current?.click()}
                      className="p-2 bg-white text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Ubah Gambar"
                    >
                      <Upload className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, coverImage: "" }))}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors cursor-pointer"
                      title="Hapus Gambar"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => thumbnailInputRef.current?.click()}
                  disabled={uploadingThumbnail}
                  className="w-full h-24 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-brand-cyan-500/50 flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-brand-cyan-500 transition-all cursor-pointer bg-slate-50 dark:bg-brand-navy-950"
                >
                  {uploadingThumbnail ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin text-brand-cyan-500" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Mengunggah...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Pilih Cover Gambar</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Penulis / Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Humas STIMI YAPMI"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20"
              />
            </div>

            {/* Accent Color */}
            <div>
              <label htmlFor="coverAccent" className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Warna Aksen Banner (Hex)
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="coverAccent"
                  value={formData.coverAccent}
                  onChange={handleChange}
                  className="h-9 w-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 p-1 cursor-pointer shrink-0"
                />
                <input
                  type="text"
                  id="coverAccent"
                  name="coverAccent"
                  value={formData.coverAccent}
                  onChange={handleChange}
                  placeholder="#00bacf"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 font-mono"
                />
              </div>
            </div>

            {/* Gradient Path */}
            <div>
              <label htmlFor="coverGradient" className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Gradien Banner (Tailwind)
              </label>
              <input
                type="text"
                id="coverGradient"
                name="coverGradient"
                value={formData.coverGradient}
                onChange={handleChange}
                placeholder="from-brand-navy-950 to-brand-cyan-600"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 font-mono"
              />
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link
              href="/admin/news"
              className="flex-1 inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-900 text-xs font-bold text-slate-600 py-3 uppercase tracking-wider hover:bg-slate-50 transition-colors"
            >
              BATAL
            </Link>
            <button
              type="submit"
              disabled={loading}
              id="admin-submit-news-btn"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-cyan-500 hover:bg-brand-cyan-600 text-xs font-extrabold text-white py-3 uppercase tracking-wider shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  MEMBUAT...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  SIMPAN
                </>
              )}
            </button>
          </div>

        </div>

      </form>

    </div>
  );
}
