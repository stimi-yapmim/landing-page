import { notFound } from "next/navigation";
import NavbarWrapper from "./NavbarWrapper";
import Footer from "@/components/Footer";
import AnnouncementContent from "./AnnouncementContent";
import { getAnnouncementBySlugAction, getAllAnnouncementsAction } from "@/app/actions/announcementActions";

// Define static params for Next.js to pre-render the pages at build time
export async function generateStaticParams() {
  try {
    const list = await getAllAnnouncementsAction();
    return list.map((a) => ({ id: a.slug }));
  } catch (err) {
    console.error("Static params fallback:", err);
    const { announcements: mockAnnouncements } = await import("@/lib/announcements");
    return Object.keys(mockAnnouncements).map((id) => ({ id }));
  }
}

// Generate SEO Metadata dynamically
export async function generateMetadata({ params }) {
  const { id } = await params;
  const announcement = await getAnnouncementBySlugAction(id);

  if (!announcement) {
    return { title: "Pengumuman Tidak Ditemukan - STIMI YAPMI Makassar" };
  }

  const localized = announcement.id || announcement.en;

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
  const announcement = await getAnnouncementBySlugAction(id);

  if (!announcement) notFound();

  const allAnn = await getAllAnnouncementsAction();
  const relatedAnnouncements = allAnn.filter((a) => a.slug !== id).slice(0, 2);

  const localized = announcement.id || announcement.en;

  // JSON-LD schema for search engines (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: localized.title,
    description: localized.excerpt,
    datePublished: announcement.dateISO,
    author: { "@type": "Organization", name: announcement.author },
    publisher: {
      "@type": "EducationalOrganization",
      name: "STIMI YAPMI Makassar",
      url: "https://stimiyapmim.ac.id",
    },
    keywords: localized.tags?.join(", "),
  };

  return (
    <>
      {/* Inject Structured Data Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <NavbarWrapper />

      <AnnouncementContent 
        id={id} 
        initialAnn={announcement} 
        relatedAnnouncements={relatedAnnouncements} 
      />

      <Footer />
    </>
  );
}
