"use client";

import { useState } from "react";
import { X, Send, CheckCircle } from "lucide-react";

export default function ContactFormModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    originSchool: "",
    concentration: "sdm",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all dark:bg-brand-navy-900 border border-slate-100 dark:border-slate-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          aria-label="Tutup"
          id="close-modal-btn"
        >
          <X className="h-6 w-6" />
        </button>

        {!submitted ? (
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Formulir Konsultasi & Pendaftaran
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
              Isi data diri Anda di bawah ini. Tim Admisi STIMI YAPMI Makassar akan segera menghubungi Anda melalui WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-brand-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-navy-700/20 dark:border-slate-700 dark:bg-brand-navy-950 dark:text-white dark:focus:border-brand-gold-500 dark:focus:ring-brand-gold-500/20"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    No. WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-brand-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-navy-700/20 dark:border-slate-700 dark:bg-brand-navy-950 dark:text-white dark:focus:border-brand-gold-500 dark:focus:ring-brand-gold-500/20"
                    placeholder="Contoh: 08123456789"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-brand-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-navy-700/20 dark:border-slate-700 dark:bg-brand-navy-950 dark:text-white dark:focus:border-brand-gold-500 dark:focus:ring-brand-gold-500/20"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="originSchool" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Asal Sekolah/Instansi *
                  </label>
                  <input
                    type="text"
                    name="originSchool"
                    id="originSchool"
                    required
                    value={formData.originSchool}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-brand-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-navy-700/20 dark:border-slate-700 dark:bg-brand-navy-950 dark:text-white dark:focus:border-brand-gold-500 dark:focus:ring-brand-gold-500/20"
                    placeholder="SMA/SMK asal atau perusahaan"
                  />
                </div>

                <div>
                  <label htmlFor="concentration" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Minat Konsentrasi *
                  </label>
                  <select
                    name="concentration"
                    id="concentration"
                    value={formData.concentration}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-brand-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-navy-700/20 dark:border-slate-700 dark:bg-brand-navy-950 dark:text-white dark:focus:border-brand-gold-500 dark:focus:ring-brand-gold-500/20"
                  >
                    <option value="sdm">Manajemen SDM</option>
                    <option value="keuangan">Manajemen Keuangan</option>
                    <option value="pemasaran">Manajemen Pemasaran</option>
                    <option value="bisnis">Manajemen Bisnis</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Pertanyaan Tambahan (Opsional)
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-brand-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-navy-700/20 dark:border-slate-700 dark:bg-brand-navy-950 dark:text-white dark:focus:border-brand-gold-500 dark:focus:ring-brand-gold-500/20 resize-none"
                  placeholder="Tuliskan pertanyaan Anda mengenai jadwal kuliah, biaya, dll."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-semibold py-3 px-4 shadow-md transition-colors dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 dark:text-brand-navy-950 disabled:opacity-50"
                id="submit-modal-btn"
              >
                {isSubmitting ? (
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-brand-navy-950 dark:border-t-transparent" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Kirim Formulir
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-8">
            <CheckCircle className="h-16 w-16 text-emerald-500 mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Pendaftaran Terkirim!
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-sm">
              Terima kasih, <strong>{formData.name}</strong>. Data Anda telah kami terima. Tim Admisi STIMI YAPMI akan segera menghubungi Anda di nomor <strong>{formData.phone}</strong>.
            </p>
            <a
              href="https://pmb.stimiyapmim.ac.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-lg bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-semibold py-3 px-4 shadow-md transition-colors dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 dark:text-brand-navy-950 text-center block mb-4 text-sm"
              id="modal-portal-redirect-btn"
            >
              Buka Portal PMB Online Resmi
            </a>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  phone: "",
                  email: "",
                  originSchool: "",
                  concentration: "sdm",
                  message: "",
                });
                onClose();
              }}
              className="rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-brand-navy-950 dark:hover:bg-brand-navy-800 text-slate-800 dark:text-white font-medium py-2 px-6 transition-colors text-sm"
              id="close-success-modal-btn"
            >
              Tutup Halaman
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
