import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProofStats from "@/components/ProofStats";
import Programs from "@/components/Programs";
import WhyChooseUs from "@/components/WhyChooseUs";
import CampusLife from "@/components/CampusLife";
import EventsList from "@/components/EventsList";
import Admissions from "@/components/Admissions";
import Testimonials from "@/components/Testimonials";
import NewsEvents from "@/components/NewsEvents";
import Footer from "@/components/Footer";

// Schema JSON-LD for Education Organization SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "STIMI YAPMI Makassar",
  alternateName: "Sekolah Tinggi Ilmu Manajemen Indonesia YAPMI Makassar",
  url: "https://stimi-yapmi.ac.id",
  description:
    "Sekolah Tinggi Ilmu Manajemen Indonesia (STIMI) YAPMI Makassar. Penyelenggara kuliah S1 Manajemen terakreditasi Baik Sekali oleh BAN-PT di Kota Makassar.",
  logo: "https://stimi-yapmi.ac.id/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Perintis Kemerdekaan Km. 09, Tamalanrea",
    addressLocality: "Makassar",
    addressRegion: "Sulawesi Selatan",
    postalCode: "90245",
    addressCountry: "ID",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+62-812-4134-130",
    contactType: "admissions",
    areaServed: "ID",
    availableLanguage: "Indonesian",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Yayasan Pembangunan Manajemen Indonesia (YAPMI)",
  },
  offers: {
    "@type": "Offer",
    category: "S1 Manajemen",
    description:
      "Konsentrasi Manajemen Sumber Daya Manusia (SDM), Manajemen Keuangan, Pemasaran, dan Bisnis",
  },
};

export default function Home() {
  return (
    <>
      {/* Inject Structured Data Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-1">
        <Hero />
        <ProofStats />
        <Programs />
        <WhyChooseUs />
        <CampusLife />
        <EventsList />
        <Admissions />
        <Testimonials />
        <NewsEvents />
      </main>

      <Footer />
    </>
  );
}
