import { notFound } from "next/navigation";
import NavbarWrapper from "./NavbarWrapper";
import Footer from "@/components/Footer";
import AnnouncementContent from "./AnnouncementContent";
import { announcements } from "@/lib/announcements";

// Define static params for Next.js to pre-render the pages at build time
export async function generateStaticParams() {
  return Object.keys(announcements).map((id) => ({ id }));
}

// Generate SEO Metadata dynamically
export async function generateMetadata({ params }) {
  const { id } = await params;
  const announcement = announcements[id];

  if (!announcement) {
    return { title: "Pengumuman Tidak Ditemukan - STIMI YAPMI Makassar" };
  }

  const localized = announcement.id; // Default to ID for search metadata

  return {
    title: `${localized.title} | STIMI YAPMI Makassar`,
    description: localized.excerpt,
    keywords: localized.tags?.join(", "),
    openGraph: {
      title: localized.title,
      description: localized.excerpt,
      type: "article",
      publishedTime: announcement.dateISO,
      authors: [announcement.author],
      siteName: "STIMI YAPMI Makassar",
    },
    twitter: {
      card: "summary_large_image",
      title: localized.title,
      description: localized.excerpt,
    },
  };
}

export default async function AnnouncementDetailPage({ params }) {
  const { id } = await params;
  const announcement = announcements[id];

  if (!announcement) notFound();

  // JSON-LD schema for search engines (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: announcement.id.title,
    description: announcement.id.excerpt,
    datePublished: announcement.dateISO,
    author: { "@type": "Organization", name: announcement.author },
    publisher: {
      "@type": "EducationalOrganization",
      name: "STIMI YAPMI Makassar",
      url: "https://stimi-yapmi.ac.id",
    },
    keywords: announcement.id.tags?.join(", "),
  };

  return (
    <>
      {/* Inject Structured Data Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <NavbarWrapper />

      <AnnouncementContent id={id} initialAnn={announcement} />

      <Footer />
    </>
  );
}
