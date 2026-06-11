import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "STIMI YAPMI Makassar - Kuliah Manajemen Terakreditasi Baik Sekali",
  description: "Sekolah Tinggi Ilmu Manajemen Indonesia (STIMI) YAPMI Makassar. Kuliah S1 Manajemen dengan konsentrasi SDM, Keuangan, Pemasaran, dan Bisnis. Terakreditasi Baik Sekali oleh BAN-PT.",
  keywords: [
    "stimi yapmi makassar",
    "yapmi makassar",
    "stimi yapmim",
    "sekolah tinggi ilmu manajemen indonesia",
    "kuliah manajemen makassar",
    "s1 manajemen makassar",
    "kelas karyawan makassar",
    "pendaftaran kuliah makassar"
  ].join(", "),
  authors: [{ name: "STIMI YAPMI Makassar" }],
  creator: "STIMI YAPMI Makassar",
  publisher: "STIMI YAPMI Makassar",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: "STIMI YAPMI Makassar - Pendaftaran Mahasiswa Baru",
    description: "Bergabunglah dengan STIMI YAPMI Makassar. Program S1 Manajemen Terakreditasi Baik Sekali dengan prospek karir cemerlang.",
    url: "https://stimiyapmim.ac.id",
    siteName: "STIMI YAPMI Makassar",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STIMI YAPMI Makassar - Kuliah S1 Manajemen Terbaik",
    description: "Membentuk Pemimpin Bisnis dan Manajemen Masa Depan. Terakreditasi Baik Sekali BAN-PT.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${jakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans text-slate-900 bg-slate-50 dark:bg-brand-navy-950 dark:text-slate-100">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

