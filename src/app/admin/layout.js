"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  Globe, 
  LogOut, 
  Menu, 
  X, 
  User, 
  Database,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Lock
} from "lucide-react";
import { checkSessionAction, logoutAction } from "@/app/actions/authActions";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if we are on the login page
  const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/";

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    async function checkAuth() {
      try {
        const isLoggedIn = await checkSessionAction();
        if (isLoggedIn) {
          setAuthorized(true);
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        console.error("Session verification failed:", err);
        router.push("/admin/login");
      } finally {
        setCheckingAuth(false);
      }
    }

    checkAuth();
  }, [pathname, isLoginPage, router]);

  // Handle Logout action
  const handleLogout = async () => {
    if (!confirm("Apakah Anda yakin ingin keluar dari sesi admin?")) return;
    try {
      const res = await logoutAction();
      if (res.success) {
        router.push("/admin/login");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Close mobile sidebar on link clicks
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // If on login page, just render the child login component directly
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If checking credentials, show a beautiful loading transition screen
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white font-sans">
        <div className="relative flex flex-col items-center justify-center p-8 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-cyan-500/10 blur-[60px]" />
          <Loader2 className="h-10 w-10 animate-spin text-brand-cyan-500 mb-4 z-10" />
          <Lock className="h-6 w-6 text-slate-400 absolute mb-4 animate-pulse z-0" />
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-200">
            Mengotentikasi Sesi
          </h2>
          <p className="text-[10px] text-slate-500 mt-2 font-semibold">
            Menghubungkan ke gerbang keamanan STIMI YAPMI...
          </p>
        </div>
      </div>
    );
  }

  // If session is not authorized, block render (will redirect via useEffect)
  if (!authorized) {
    return null;
  }

  // Define sidebar navigation link arrays
  const sidebarLinks = [
    {
      name: "Dashboard Utama",
      href: "/admin",
      icon: LayoutDashboard,
      isActive: pathname === "/admin" || pathname === "/admin/"
    },
    {
      name: "Kelola Berita",
      href: "/admin/news",
      icon: FileText,
      isActive: pathname.startsWith("/admin/news")
    }
  ];

  const pageTitle = pathname.includes("/news/new")
    ? "Tulis Berita Baru"
    : pathname.includes("/news/edit")
    ? "Edit Berita"
    : pathname.startsWith("/admin/news")
    ? "Daftar Kelola Berita"
    : "Ringkasan Dashboard";

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-brand-navy-950 text-slate-800 dark:text-slate-100 overflow-hidden font-sans">
      
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex lg:flex-col lg:w-68 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0">
        
        {/* Brand Header */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800 bg-slate-950/40">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-brand-cyan-600 to-brand-cyan-400 flex items-center justify-center text-white shadow-md shadow-brand-cyan-500/15">
            <ShieldCheck className="h-5.5 w-5.5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-wider leading-none">STIMI YAPMI</h2>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 block">ADMIN PANEL</span>
          </div>
        </div>

        {/* User Card */}
        <div className="px-6 py-6 border-b border-slate-800 bg-slate-950/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-brand-cyan-400 border border-slate-700">
              <User className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black text-white truncate">Humas STIMI</p>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2.5 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 ${
                link.isActive
                  ? "bg-brand-cyan-600 text-white shadow-md shadow-brand-cyan-600/10"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <link.icon className="h-5 w-5 shrink-0" />
              <span>{link.name}</span>
            </Link>
          ))}

          <div className="h-px bg-slate-800 my-6" />

          {/* External Public Link */}
          <Link
            href="/"
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-extrabold text-slate-400 hover:bg-slate-800 hover:text-white uppercase tracking-wider transition-all"
          >
            <Globe className="h-5 w-5 text-slate-500" />
            <span>Kunjungi Website</span>
          </Link>
        </nav>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-extrabold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors uppercase tracking-wider cursor-pointer"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile Sidebar Drawer ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer content */}
          <div className="relative flex flex-col w-64 max-w-xs bg-slate-900 text-slate-300 border-r border-slate-800 z-10 animate-slide-in">
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Brand Header */}
            <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-brand-cyan-600 to-brand-cyan-400 flex items-center justify-center text-white">
                <ShieldCheck className="h-5.5 w-5.5" />
              </div>
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-wider">STIMI YAPMI</h2>
                <span className="text-[9px] font-bold text-slate-500 uppercase">ADMIN PANEL</span>
              </div>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                    link.isActive
                      ? "bg-brand-cyan-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              ))}

              <div className="h-px bg-slate-800 my-6" />

              <Link
                href="/"
                onClick={handleLinkClick}
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-extrabold text-slate-400 hover:bg-slate-800 hover:text-white uppercase tracking-wider"
              >
                <Globe className="h-5 w-5" />
                <span>Kunjungi Website</span>
              </Link>
            </nav>

            {/* Footer Logout */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/20">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-extrabold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors uppercase tracking-wider cursor-pointer"
              >
                <LogOut className="h-5 w-5" />
                <span>Keluar Sesi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content Container ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white dark:bg-brand-navy-900 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between px-6 z-10 shrink-0">
          
          <div className="flex items-center gap-4">
            {/* Hamburger button for mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-brand-navy-950 text-slate-600 dark:text-slate-300"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Title / Breadcrumbs */}
            <div>
              <h1 className="text-base sm:text-lg font-black text-brand-navy-950 dark:text-white uppercase tracking-tight leading-none">
                {pageTitle}
              </h1>
              <span className="text-[10px] text-slate-450 dark:text-slate-400 mt-1 font-semibold uppercase tracking-wider block hidden sm:block">
                Admin Panel / {pathname.replace("/admin", "").replace(/^\//, "").replace(/\//g, " / ") || "Dashboard"}
              </span>
            </div>
          </div>

          {/* Quick Stats / Indicators */}
          <div className="flex items-center gap-4">
            
            {/* Database indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/15 border border-emerald-200/60 dark:border-emerald-900/30">
              <Database className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                MongoDB Connected
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* User Indicator Badge */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-black text-slate-600 dark:text-slate-300 hidden sm:inline-block">
                Humas STIMI
              </span>
              <div className="h-8.5 w-8.5 rounded-xl bg-slate-100 dark:bg-brand-navy-800 text-brand-cyan-600 dark:text-brand-cyan-400 border border-slate-200/50 dark:border-slate-800/80 flex items-center justify-center">
                <User className="h-4.5 w-4.5" />
              </div>
            </div>

          </div>

        </header>

        {/* Dashboard Content area scrollable */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-brand-navy-950 p-6 sm:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
