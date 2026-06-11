"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search, Phone, Globe, ChevronDown, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = useT(lang).nav;
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.links.programs, href: isHomepage ? "#programs" : "/#programs" },
    { name: t.links.whyChooseUs, href: isHomepage ? "#why-choose-us" : "/#why-choose-us" },
    { name: t.links.admissions, href: isHomepage ? "#admissions" : "/#admissions" },
    { name: t.links.campusLife, href: isHomepage ? "#campus-life" : "/#campus-life" },
    { name: t.links.events, href: isHomepage ? "#events" : "/#events" },
    { name: t.links.onlineServices, href: isHomepage ? "#online-services" : "/#online-services" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">

      {/* Top Bar */}
      <div className="hidden md:block bg-brand-navy-900 border-b border-white/10 py-2.5 px-4 text-xs font-semibold text-slate-300">
        <div className="mx-auto max-w-7xl flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <div>{t.welcome}</div>
          <div className="flex gap-6 items-center">
            <a href="#campus-life" className="hover:text-brand-cyan-500 transition-colors">{t.campusLife}</a>
            <span className="text-white/20">|</span>
            <a href="#programs" className="hover:text-brand-cyan-500 transition-colors">{t.academic}</a>
            <span className="text-white/20">|</span>
            <a href="tel:08124134130" className="flex items-center gap-1.5 hover:text-brand-cyan-500 transition-colors">
              <Phone className="h-3.5 w-3.5 text-brand-cyan-500" />
              <span>{t.phone}</span>
            </a>
            {/* Language Switcher (Top Bar) */}
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1 bg-white/5 rounded-full px-2 py-1">
              <Globe className="h-3.5 w-3.5 text-brand-cyan-400" />
              <button
                onClick={() => setLang("id")}
                id="lang-id-btn"
                className={`px-2 py-0.5 rounded-full text-[11px] font-black transition-all ${
                  lang === "id"
                    ? "bg-brand-cyan-500 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLang("en")}
                id="lang-en-btn"
                className={`px-2 py-0.5 rounded-full text-[11px] font-black transition-all ${
                  lang === "en"
                    ? "bg-brand-cyan-500 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-brand-navy-950/95 shadow-lg border-b border-slate-200/50 dark:border-slate-800/50 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-between">

            {/* Logo */}
            <a href="#" className="flex items-center group" id="brand-logo-link">
              <img
                src="/logo_stimi.svg"
                alt="Logo STIMI YAPMI Makassar"
                className="h-14 w-auto object-contain transition-transform group-hover:scale-105 dark:hidden"
              />
              <img
                src="/logo_stimi_dark.png"
                alt="Logo STIMI YAPMI Makassar"
                className="h-14 w-auto object-contain transition-transform group-hover:scale-105 hidden dark:block"
              />
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {/* Dropdown Tentang */}
              <div
                className="relative"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <button
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                  className={`flex items-center gap-1.5 text-sm font-bold tracking-wide transition-colors cursor-pointer outline-none ${
                    scrolled
                      ? "text-slate-700 hover:text-brand-cyan-600 dark:text-slate-300 dark:hover:text-brand-cyan-500"
                      : "text-slate-700 hover:text-brand-cyan-600 dark:text-slate-300 md:text-slate-100 md:hover:text-brand-cyan-400"
                  }`}
                  id="nav-link-about-trigger"
                >
                  <span>{t.links.about}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isAboutOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown panel */}
                <div
                  className={`absolute left-0 top-full pt-2 w-56 z-50 transition-all duration-205 origin-top-left ${
                    isAboutOpen
                      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                      : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="rounded-2xl bg-white dark:bg-brand-navy-900 shadow-xl border border-slate-200/50 dark:border-slate-800/50 py-2.5">
                    <Link
                      href="/about/welcome"
                      className="block px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-brand-navy-800 hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400 transition-colors"
                      id="dropdown-welcome-link"
                    >
                      {t.links.welcome}
                    </Link>
                    <Link
                      href="/about/vision-mission"
                      className="block px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-brand-navy-800 hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400 transition-colors"
                      id="dropdown-vision-link"
                    >
                      {t.links.visionMission}
                    </Link>
                    <Link
                      href="/about/history"
                      className="block px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-brand-navy-800 hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400 transition-colors"
                      id="dropdown-history-link"
                    >
                      {t.links.history}
                    </Link>
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-bold tracking-wide transition-colors ${
                    scrolled
                      ? "text-slate-700 hover:text-brand-cyan-600 dark:text-slate-300 dark:hover:text-brand-cyan-500"
                      : "text-slate-700 hover:text-brand-cyan-600 dark:text-slate-300 md:text-slate-100 md:hover:text-brand-cyan-400"
                  }`}
                  id={`nav-link-${link.href.replace("/", "").replace("#", "")}`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button
                className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-brand-navy-900 transition-colors ${
                  scrolled ? "text-slate-600 dark:text-slate-300" : "text-slate-600 dark:text-slate-300 md:text-slate-200"
                }`}
                aria-label="Cari"
                id="search-toggle-btn"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-brand-navy-900 transition-colors cursor-pointer ${
                  scrolled ? "text-slate-600 dark:text-slate-300" : "text-slate-600 dark:text-slate-300 md:text-slate-200"
                }`}
                aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                id="theme-toggle-btn"
              >
                {theme === null ? (
                  <div className="h-5 w-5" />
                ) : theme === "dark" ? (
                  <Sun className="h-5 w-5 text-brand-gold-500" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              <a
                href="https://pmb.stimiyapmim.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand-cyan-500 hover:bg-brand-cyan-600 px-6 py-3 text-sm font-extrabold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-wider text-center"
                id="navbar-cta-btn"
              >
                {t.applyNow}
              </a>
            </div>

            {/* Mobile: language toggle + theme toggle + hamburger */}
            <div className="flex md:hidden items-center gap-3">
              {/* Mobile language switcher */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-brand-navy-800 rounded-full px-2 py-1">
                <button
                  onClick={() => setLang("id")}
                  id="mobile-lang-id-btn"
                  className={`px-2 py-0.5 rounded-full text-[11px] font-black transition-all ${
                    lang === "id"
                      ? "bg-brand-cyan-500 text-white"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  }`}
                >
                  ID
                </button>
                <button
                  onClick={() => setLang("en")}
                  id="mobile-lang-en-btn"
                  className={`px-2 py-0.5 rounded-full text-[11px] font-black transition-all ${
                    lang === "en"
                      ? "bg-brand-cyan-500 text-white"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Mobile theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-brand-navy-900 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                id="mobile-theme-toggle-btn"
              >
                {theme === null ? (
                  <div className="h-5 w-5" />
                ) : theme === "dark" ? (
                  <Sun className="h-5 w-5 text-brand-gold-500" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-brand-navy-900 dark:hover:text-white focus:outline-none"
                aria-expanded={isOpen}
                id="mobile-menu-toggle-btn"
              >
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-950 px-4 py-4"
            : "max-h-0"
        }`}
      >
        <div className="space-y-1.5 pb-3 pt-2">
          {/* Mobile Dropdown Tentang */}
          <div className="border-b border-slate-100 dark:border-slate-900/50 pb-2.5 mb-2.5">
            <button
              onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-cyan-600 dark:text-slate-300 dark:hover:bg-brand-navy-900 dark:hover:text-white"
              id="mobile-nav-link-about-trigger"
            >
              <span>{t.links.about}</span>
              <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isMobileAboutOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`pl-6 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                isMobileAboutOpen ? "max-h-48 mt-1 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <Link
                href="/about/welcome"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-cyan-600 dark:text-slate-400 dark:hover:bg-brand-navy-900 dark:hover:text-white"
                id="mobile-dropdown-welcome-link"
              >
                {t.links.welcome}
              </Link>
              <Link
                href="/about/vision-mission"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-cyan-600 dark:text-slate-400 dark:hover:bg-brand-navy-900 dark:hover:text-white"
                id="mobile-dropdown-vision-link"
              >
                {t.links.visionMission}
              </Link>
              <Link
                href="/about/history"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-cyan-600 dark:text-slate-400 dark:hover:bg-brand-navy-900 dark:hover:text-white"
                id="mobile-dropdown-history-link"
              >
                {t.links.history}
              </Link>
            </div>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-cyan-600 dark:text-slate-300 dark:hover:bg-brand-navy-900 dark:hover:text-white"
              id={`mobile-nav-link-${link.href.replace("/", "").replace("#", "")}`}
            >
              {link.name}
            </a>
          ))}
          <div className="border-t border-slate-200 dark:border-slate-800 my-4 pt-4 flex flex-col gap-4">
            <a
              href="tel:08124134130"
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300"
              id="mobile-call-link"
            >
              <Phone className="h-4 w-4" />
              <span>0812-4134-130</span>
            </a>
            <a
              href="https://pmb.stimiyapmim.ac.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-brand-cyan-500 py-3 text-center text-sm font-extrabold text-white uppercase tracking-wider block"
              id="mobile-navbar-cta-btn"
            >
              {t.applyNow}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
