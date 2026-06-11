"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, AlertCircle, Globe, FileText, Upload, Trash2 } from "lucide-react";
import { createAnnouncementAction, uploadAttachmentAction } from "@/app/actions/announcementActions";

export default function NewAnnouncementPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("id"); // "id" or "en"

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  const [formData, setFormData] = useState({
    idTitle: "",
    idCategory: "Akademik",
    idExcerpt: "",
    idContent: "",
    idTags: "",
    
    enTitle: "",
    enCategory: "Academic",
    enExcerpt: "",
    enContent: "",
    enTags: "",
    
    slug: "",
    docId: "",
    author: "Humas STIMI YAPMI",
    coverGradient: "from-brand-navy-950 via-brand-navy-800 to-brand-cyan-600",
    coverAccent: "#00bacf",
    dateISO: getTodayString(),
    attachmentUrl: "",
    attachmentName: "",
    attachmentSize: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploadError, setUploadError] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Ukuran file maksimal adalah 10MB");
      return;
    }

    setUploading(true);
    setUploadError("");

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const base64Data = event.target.result;
        const res = await uploadAttachmentAction(base64Data, file.name);
        if (res.success) {
          setFormData((prev) => ({
            ...prev,
            attachmentUrl: res.url,
            attachmentName: res.name,
            attachmentSize: res.size,
          }));
        } else {
          setUploadError("Gagal mengunggah file: " + res.error);
        }
      } catch (err) {
        console.error(err);
        setUploadError("Terjadi kesalahan saat mengunggah file.");
      } finally {
        setUploading(false);
      }
    };
    reader.onerror = () => {
      setUploadError("Gagal membaca file.");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({
      ...prev,
      attachmentUrl: "",
      attachmentName: "",
      attachmentSize: "",
    }));
    setUploadError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      
      // Auto-set gradient and accent based on category for ease of use
      if (name === "idCategory") {
        if (value === "Seminar") {
          updated.coverGradient = "from-brand-navy-950 via-brand-navy-800 to-brand-gold-600";
          updated.coverAccent = "#f59e0b";
          updated.enCategory = "Seminar";
        } else if (value === "Penerimaan") {
          updated.coverGradient = "from-brand-navy-950 via-brand-navy-800 to-emerald-600";
          updated.coverAccent = "#10b981";
          updated.enCategory = "Admissions";
        } else if (value === "Perpustakaan") {
          updated.coverGradient = "from-brand-navy-950 via-brand-navy-800 to-brand-cyan-600";
          updated.coverAccent = "#00bacf";
          updated.enCategory = "Library";
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
    if (!formData.idTitle || !formData.idContent) {
      setError("Judul dan Konten Bahasa Indonesia wajib diisi!");
      setActiveTab("id");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await createAnnouncementAction(formData);
      if (res.success) {
        router.push("/admin/announcements");
      } else {
        setError("Gagal membuat pengumuman: " + res.error);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Kesalahan sistem saat membuat pengumuman.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header & Back Button */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/announcements"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-900 hover:bg-slate-100 text-slate-750 dark:text-slate-350 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-brand-navy-950 dark:text-white uppercase tracking-tight">
            Tulis Pengumuman Baru
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Buat pengumuman akademik, kemahasiswaan, atau liputan resmi baru.
          </p>
        </div>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Multilingual Content Card */}
        <div className="lg:col-span-8 space-y-6">
          
          {error && (
            <div className="p-4 rounded-xl bg-red-100 text-red-800 dark:bg-red-955/35 dark:text-red-400 border border-red-200 flex items-center gap-2 text-sm font-semibold">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
              {error}
            </div>
          )}

          {/* Bilingual Tabs Header */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("id")}
              className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                activeTab === "id"
                  ? "border-brand-cyan-500 text-brand-cyan-600 dark:text-brand-cyan-400"
                  : "border-transparent text-slate-400 hover:text-slate-650"
              }`}
            >
              🇮🇩 Bahasa Indonesia (Utama)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("en")}
              className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                activeTab === "en"
                  ? "border-brand-cyan-500 text-brand-cyan-600 dark:text-brand-cyan-400"
                  : "border-transparent text-slate-400 hover:text-slate-650"
              }`}
            >
              🇬🇧 English (Translation)
            </button>
          </div>

          <div className="bg-white dark:bg-brand-navy-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/50 dark:border-slate-800/50 space-y-6">
            
            {/* Indonesian Form Section */}
            {activeTab === "id" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label htmlFor="idTitle" className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                    Judul Pengumuman (ID) *
                  </label>
                  <input
                    type="text"
                    id="idTitle"
                    name="idTitle"
                    value={formData.idTitle}
                    onChange={handleChange}
                    placeholder="Contoh: Ketersediaan E-Library Digital Kampus..."
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 focus:border-brand-cyan-500 font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="idCategory" className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                      Kategori (ID)
                    </label>
                    <select
                      id="idCategory"
                      name="idCategory"
                      value={formData.idCategory}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 focus:border-brand-cyan-500 font-bold"
                    >
                      <option value="Akademik">Akademik</option>
                      <option value="Perpustakaan">Perpustakaan</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Penerimaan">Penerimaan</option>
                      <option value="Kegiatan">Kegiatan</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="idTags" className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                      Tags (ID, pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      id="idTags"
                      name="idTags"
                      value={formData.idTags}
                      onChange={handleChange}
                      placeholder="Contoh: E-Library, Perpustakaan, Digital"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 focus:border-brand-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="idExcerpt" className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                    Kutipan Singkat / Excerpt (ID)
                  </label>
                  <input
                    type="text"
                    id="idExcerpt"
                    name="idExcerpt"
                    value={formData.idExcerpt}
                    onChange={handleChange}
                    placeholder="Ringkasan singkat satu kalimat pengumuman..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 focus:border-brand-cyan-500"
                  />
                </div>

                <div>
                  <label htmlFor="idContent" className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                    Isi Pengumuman (ID) *
                  </label>
                  <p className="text-[10px] text-slate-400 mb-2 italic">
                    Catatan: Setiap baris baru (tombol Enter) otomatis diparsing menjadi paragraf terpisah.
                  </p>
                  <textarea
                    id="idContent"
                    name="idContent"
                    value={formData.idContent}
                    onChange={handleChange}
                    rows={12}
                    required
                    placeholder="Tuliskan isi pengumuman lengkap di sini. Tekan Enter untuk membuat paragraf baru..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 focus:border-brand-cyan-500 font-sans leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* English Form Section */}
            {activeTab === "en" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label htmlFor="enTitle" className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                    Announcement Title (EN)
                  </label>
                  <input
                    type="text"
                    id="enTitle"
                    name="enTitle"
                    value={formData.enTitle}
                    onChange={handleChange}
                    placeholder="Example: Digital E-Library Campus Availability..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 focus:border-brand-cyan-500 font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="enCategory" className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                      Category (EN)
                    </label>
                    <input
                      type="text"
                      id="enCategory"
                      name="enCategory"
                      value={formData.enCategory}
                      onChange={handleChange}
                      placeholder="Example: Library, Academic, Admissions"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 focus:border-brand-cyan-500 font-bold"
                    />
                  </div>
                  <div>
                    <label htmlFor="enTags" className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                      Tags (EN, comma separated)
                    </label>
                    <input
                      type="text"
                      id="enTags"
                      name="enTags"
                      value={formData.enTags}
                      onChange={handleChange}
                      placeholder="Example: E-Library, Library, Digital, Academic"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 focus:border-brand-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="enExcerpt" className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                    Short Excerpt (EN)
                  </label>
                  <input
                    type="text"
                    id="enExcerpt"
                    name="enExcerpt"
                    value={formData.enExcerpt}
                    onChange={handleChange}
                    placeholder="Short summary of announcement in one sentence..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 focus:border-brand-cyan-500"
                  />
                </div>

                <div>
                  <label htmlFor="enContent" className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                    Announcement Content (EN)
                  </label>
                  <p className="text-[10px] text-slate-400 mb-2 italic">
                    Note: Each line break automatically parses into a paragraph string.
                  </p>
                  <textarea
                    id="enContent"
                    name="enContent"
                    value={formData.enContent}
                    onChange={handleChange}
                    rows={12}
                    placeholder="Type the full announcement content in English here. Press Enter to create new paragraphs..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 focus:border-brand-cyan-500 font-sans leading-relaxed"
                  />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right: Sidebar Metadata */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Meta Card */}
          <div className="bg-white dark:bg-brand-navy-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 space-y-5">
            <h3 className="text-xs font-black text-brand-navy-950 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3">
              Informasi Dokumen SK
            </h3>

            {/* Document ID */}
            <div>
              <label htmlFor="docId" className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                No. Dokumen / SK Pengumuman
              </label>
              <input
                type="text"
                id="docId"
                name="docId"
                value={formData.docId}
                onChange={handleChange}
                placeholder="YAPMI/REG/LIB/0023/2026"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 font-bold"
              />
            </div>

            {/* Custom URL Slug */}
            <div>
              <label htmlFor="slug" className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Custom URL Slug (Opsional)
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="lib-availability"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 font-mono"
              />
              <p className="text-[9px] text-slate-400 mt-1">
                Jika dikosongkan, slug akan di-generate otomatis dari judul Bahasa Indonesia.
              </p>
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Penulis / Penerbit
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

            {/* Publish Date */}
            <div>
              <label htmlFor="dateISO" className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Tanggal Publikasi
              </label>
              <input
                type="date"
                id="dateISO"
                name="dateISO"
                value={formData.dateISO}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-xs text-slate-700 dark:text-slate-250 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 font-bold"
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
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950 text-xs text-slate-750 dark:text-slate-250 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500/20 font-mono"
              />
            </div>

          </div>

          {/* File Attachment Card */}
          <div className="bg-white dark:bg-brand-navy-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 space-y-4">
            <h3 className="text-xs font-black text-brand-navy-950 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-cyan-500" />
              File Lampiran (PDF / Dokumen)
            </h3>
            
            {uploadError && (
              <div className="p-3 rounded-xl bg-red-100 text-red-800 dark:bg-red-955/35 dark:text-red-400 border border-red-200 text-xs font-semibold">
                {uploadError}
              </div>
            )}

            {formData.attachmentUrl ? (
              <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-brand-navy-950">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-600/10 dark:text-emerald-400 shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {formData.attachmentName}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{formData.attachmentSize}</p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="h-8 w-8 flex items-center justify-center rounded-full text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-brand-navy-900 transition-colors shrink-0 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-brand-cyan-500 dark:hover:border-brand-cyan-500 rounded-2xl p-6 transition-colors text-center">
                <input
                  type="file"
                  id="attachment"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                {uploading ? (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Loader2 className="h-8 w-8 text-brand-cyan-500 animate-spin" />
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Mengunggah file...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-8 w-8 text-slate-400" />
                    <p className="text-xs font-bold text-slate-650 dark:text-slate-350">
                      Pilih atau Drop File di Sini
                    </p>
                    <p className="text-[9px] text-slate-400">
                      PDF, DOCX, XLSX, ZIP (Max. 10MB)
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link
              href="/admin/announcements"
              className="flex-1 inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-900 text-xs font-bold text-slate-650 py-3 uppercase tracking-wider hover:bg-slate-50 transition-colors"
            >
              BATAL
            </Link>
            <button
              type="submit"
              disabled={loading}
              id="admin-submit-announcement-btn"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-cyan-500 hover:bg-brand-cyan-600 text-xs font-extrabold text-white py-3 uppercase tracking-wider shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  MEMPROSES...
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
