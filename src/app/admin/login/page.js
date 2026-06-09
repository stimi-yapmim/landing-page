"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, Eye, EyeOff, Loader2, ShieldAlert, ArrowLeft, ShieldCheck } from "lucide-react";
import { loginAction } from "@/app/actions/authActions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Semua field wajib diisi.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await loginAction(username, password);
      if (result.success) {
        // Redirect to admin dashboard
        router.push("/admin");
      } else {
        setError(result.error || "Gagal masuk. Silakan coba lagi.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan koneksi server.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-900 text-white overflow-hidden font-sans">
      {/* ── Background Glowing Orbs ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-cyan-500/20 blur-[120px] animate-pulse duration-[8000ms] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-cyan-600/15 blur-[120px] animate-pulse duration-[6000ms] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-gold-500/10 blur-[100px] pointer-events-none" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Floating Header Actions */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors py-2 px-4 rounded-full bg-slate-800/30 border border-slate-700/50 backdrop-blur-md"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Website</span>
        </Link>
      </div>

      {/* Login Card wrapper */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-cyan-600 to-brand-cyan-400 p-3 shadow-lg shadow-brand-cyan-500/20 mb-4">
            <ShieldCheck className="h-9 w-9 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight uppercase">
            STIMI YAPMI MAKASSAR
          </h1>
          <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase mt-1">
            Portal Administrasi Berita & Kegiatan
          </p>
        </div>

        {/* Form Card (Glassmorphic) */}
        <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          <h2 className="text-lg font-extrabold text-white mb-6">
            Masuk sebagai Admin
          </h2>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/45 text-red-400 border border-red-900/50 flex items-start gap-2.5 text-xs font-semibold">
              <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-black">Gagal Masuk:</span>
                <p className="mt-0.5 text-red-300/90 font-medium leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-450">
                  <User className="h-4 w-4 text-slate-500" />
                </span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username admin"
                  disabled={loading}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-700 focus:border-brand-cyan-500 focus:ring-2 focus:ring-brand-cyan-500/10 rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-all font-semibold"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-450">
                  <Lock className="h-4 w-4 text-slate-500" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password admin"
                  disabled={loading}
                  required
                  className="w-full pl-11 pr-11 py-3 bg-slate-900/60 border border-slate-700 focus:border-brand-cyan-500 focus:ring-2 focus:ring-brand-cyan-500/10 rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-all font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan-600 to-brand-cyan-400 hover:from-brand-cyan-550 hover:to-brand-cyan-350 text-white font-extrabold py-3.5 shadow-lg shadow-brand-cyan-500/10 hover:shadow-brand-cyan-500/20 active:translate-y-0 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memverifikasi...
                  </>
                ) : (
                  "Masuk Sekarang"
                )}
              </button>
            </div>
          </form>

        </div>

        {/* Footer Info */}
        <p className="text-center text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-8">
          © {new Date().getFullYear()} STIMI YAPMI Makassar • Humas Team
        </p>

      </div>
    </div>
  );
}
