"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

const footerHrefs = ["#hero", "#programs", "#why-choose-us", "#admissions", "#testimonials"];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();
  const t = useT(lang).footer;

  return (
    <footer className="bg-brand-navy-900 text-slate-300 border-t border-slate-950 pt-16 pb-8" id="footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">

          {/* Column 1: Brand */}
          <div className="space-y-4">
            <a href="#" className="flex items-start" id="footer-logo-link">
              <img
                src="/logo_stimi.svg"
                alt="Logo STIMI YAPMI Makassar"
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </a>
            <p className="text-sm text-slate-400 leading-relaxed pt-2">{t.about}</p>
            <div className="flex gap-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold-500 transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold-500 transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.752.054 2.6.12 3.784 1.32 3.904 3.903.045.968.054 1.32.054 3.753 0 2.43-.01 2.784-.054 3.752-.12 2.6-1.32 3.784-3.903 3.904-.968.045-1.32.054-3.753.054-2.43 0-2.784-.01-3.752-.054-2.6-.12-3.784-1.32-3.904-3.903C5.91 15.284 5.9 14.933 5.9 12.515c0-2.408.01-2.693.053-3.642.097-2.126.902-2.923 3.02-3.02.949-.043 1.234-.053 3.642-.053zM12 8.13c-2.42 0-4.385 1.964-4.385 4.385 0 2.42 1.965 4.385 4.385 4.385 2.42 0 4.385-1.965 4.385-4.385 0-2.42-1.965-4.385-4.385-4.385zm4.84-8.83a.96.96 0 100 1.92.96.96 0 000-1.92z" clipRule="evenodd" /></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold-500 transition-colors" aria-label="Youtube">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.42 4.814a2.503 2.503 0 01-1.768 1.768c-1.56.419-7.812.419-7.812.419s-6.253 0-7.812-.419a2.503 2.503 0 01-1.768-1.768C3 15.255 3 12 3 12s0-3.255.42-4.814a2.507 2.507 0 011.768-1.768C6.747 5 13 5 13 5s6.253 0 7.812.418zM9.5 15.5l6.5-3.5-6.5-3.5v7z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">{t.quickLinks}</h3>
            <ul className="space-y-3.5 text-sm">
              {t.links.map((label, idx) => (
                <li key={idx}>
                  <a href={footerHrefs[idx]} className="hover:text-brand-gold-500 transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">{t.contact}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-gold-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">Jl. Perintis Kemerdekaan Km. 09, Tamalanrea, Kota Makassar, Sulawesi Selatan, 90245.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-gold-500 shrink-0" />
                <a href="tel:08124134130" className="hover:underline">0812-4134-130</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-gold-500 shrink-0" />
                <a href="mailto:info@yapmi.ac.id" className="hover:underline">info@yapmi.ac.id</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">{t.hours}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-brand-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">{t.weekdays}</p>
                  <p className="text-xs text-slate-400 mt-1">08:00 – 16:00 WITA</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-brand-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">{t.saturday}</p>
                  <p className="text-xs text-slate-400 mt-1">08:00 – 12:00 WITA</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-900/60 pt-8 mt-12 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} {t.copyright}</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 transition-colors">{t.accreditation}</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors">{t.privacy}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
