"use server";

import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { generatePresignedUrl, uploadToS3 } from "@/lib/s3";

// Helper function: Map Mongo _id to slug string and sign S3 URLs
async function mapDocument(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  const mapped = { slug: _id.toString(), ...rest };
  if (mapped.attachmentUrl) {
    mapped.attachmentUrl = await generatePresignedUrl(mapped.attachmentUrl);
  }
  return mapped;
}

// Helper: Format Indonesian date
function formatIndoDate(date) {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0");
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

// Helper: Format English date
function formatEngDate(date) {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0");
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

// Helper: Estimate reading time
function estimateReadingTime(content, isEnglish = false) {
  let text = "";
  if (Array.isArray(content)) {
    text = content.join(" ");
  } else {
    text = content || "";
  }
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return isEnglish ? `${minutes} min read` : `${minutes} menit`;
}

// Helper: Generate URL slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 1. Get All Announcements (with Seeding)
export async function getAllAnnouncementsAction() {
  try {
    const client = await clientPromise;
    const db = client.db("humas-stimi");
    const collection = db.collection("announcements");

    const count = await collection.countDocuments();
    if (count === 0) {
      // Seed Database with mock data if empty
      const { announcements: staticAnnouncements } = await import("@/lib/announcements");
      const seedData = Object.entries(staticAnnouncements).map(([slug, data]) => ({
        _id: slug,
        ...data,
      }));
      await collection.insertMany(seedData);
      console.log("Database seeded successfully with static announcements.");
    }

    const docs = await collection.find({}).toArray();
    const mappedDocs = await Promise.all(docs.map(mapDocument));
    return mappedDocs
      .sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO));
  } catch (error) {
    console.error("Failed to fetch announcements from MongoDB:", error);
    // Fallback to static mock announcements
    const { getAllAnnouncements } = await import("@/lib/announcements");
    return getAllAnnouncements();
  }
}

// 2. Get Announcement by Slug
export async function getAnnouncementBySlugAction(slug) {
  try {
    const client = await clientPromise;
    const db = client.db("humas-stimi");
    const collection = db.collection("announcements");

    const doc = await collection.findOne({ _id: slug });
    if (doc) return await mapDocument(doc);

    // Fallback search in static list
    const { announcements: staticAnnouncements } = await import("@/lib/announcements");
    if (staticAnnouncements[slug]) {
      return { slug, ...staticAnnouncements[slug] };
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch announcement with slug ${slug}:`, error);
    const { announcements: staticAnnouncements } = await import("@/lib/announcements");
    if (staticAnnouncements[slug]) {
      return { slug, ...staticAnnouncements[slug] };
    }
    return null;
  }
}

// 3. Create Announcement
export async function createAnnouncementAction(data) {
  try {
    const client = await clientPromise;
    const db = client.db("humas-stimi");
    const collection = db.collection("announcements");

    const title = data.idTitle || "Pengumuman Baru";
    let slug = data.slug ? generateSlug(data.slug) : generateSlug(title);

    // Ensure slug is unique
    let existing = await collection.findOne({ _id: slug });
    let counter = 1;
    while (existing) {
      slug = `${data.slug ? generateSlug(data.slug) : generateSlug(title)}-${counter}`;
      existing = await collection.findOne({ _id: slug });
      counter++;
    }

    const today = new Date();
    const dateISO = today.toISOString().split("T")[0];
    const dateStr = formatIndoDate(today);
    const dateENStr = formatEngDate(today);

    // Split contents by line breaks into array of strings
    const parseContent = (contentStr) => {
      if (!contentStr) return [""];
      return contentStr.split(/\r?\n/).map(p => p.trim()).filter(Boolean);
    };

    const idContent = parseContent(data.idContent);
    const enContent = parseContent(data.enContent);

    const idTags = data.idTags
      ? data.idTags.split(",").map(t => t.trim()).filter(Boolean)
      : [];
    const enTags = data.enTags
      ? data.enTags.split(",").map(t => t.trim()).filter(Boolean)
      : [];

    const newDoc = {
      _id: slug,
      id: {
        title,
        category: data.idCategory || "Akademik",
        excerpt: data.idExcerpt || (idContent[0] ? idContent[0].substring(0, 150) + "..." : ""),
        content: idContent,
        tags: idTags,
      },
      en: {
        title: data.enTitle || title,
        category: data.enCategory || "Academic",
        excerpt: data.enExcerpt || (enContent[0] ? enContent[0].substring(0, 150) + "..." : ""),
        content: enContent,
        tags: enTags,
      },
      date: dateStr,
      dateEN: dateENStr,
      dateISO,
      docId: data.docId || `YAPMI/REG/GEN/${Date.now().toString().substring(8)}/2026`,
      author: data.author || "Humas STIMI YAPMI",
      readingTime: estimateReadingTime(idContent, false),
      readingTimeEN: estimateReadingTime(enContent, true),
      coverGradient: data.coverGradient || "from-brand-navy-950 via-brand-navy-800 to-brand-cyan-600",
      coverAccent: data.coverAccent || "#00bacf",
      attachmentUrl: data.attachmentUrl ? data.attachmentUrl.split("?")[0] : "",
      attachmentName: data.attachmentName || "",
      attachmentSize: data.attachmentSize || "",
    };

    await collection.insertOne(newDoc);

    revalidatePath("/");
    revalidatePath(`/announcements/${slug}`);

    return { success: true, slug };
  } catch (error) {
    console.error("Failed to create announcement:", error);
    return { success: false, error: error.message };
  }
}

// 4. Update Announcement
export async function updateAnnouncementAction(slug, data) {
  try {
    const client = await clientPromise;
    const db = client.db("humas-stimi");
    const collection = db.collection("announcements");

    // Split contents by line breaks into array of strings
    const parseContent = (contentStr) => {
      if (!contentStr) return [""];
      return contentStr.split(/\r?\n/).map(p => p.trim()).filter(Boolean);
    };

    const idContent = parseContent(data.idContent);
    const enContent = parseContent(data.enContent);

    const idTags = data.idTags
      ? data.idTags.split(",").map(t => t.trim()).filter(Boolean)
      : [];
    const enTags = data.enTags
      ? data.enTags.split(",").map(t => t.trim()).filter(Boolean)
      : [];

    const updateFields = {
      id: {
        title: data.idTitle,
        category: data.idCategory || "Akademik",
        excerpt: data.idExcerpt || (idContent[0] ? idContent[0].substring(0, 150) + "..." : ""),
        content: idContent,
        tags: idTags,
      },
      en: {
        title: data.enTitle,
        category: data.enCategory || "Academic",
        excerpt: data.enExcerpt || (enContent[0] ? enContent[0].substring(0, 150) + "..." : ""),
        content: enContent,
        tags: enTags,
      },
      docId: data.docId,
      author: data.author || "Humas STIMI YAPMI",
      readingTime: estimateReadingTime(idContent, false),
      readingTimeEN: estimateReadingTime(enContent, true),
      coverGradient: data.coverGradient || "from-brand-navy-950 via-brand-navy-800 to-brand-cyan-600",
      coverAccent: data.coverAccent || "#00bacf",
      attachmentUrl: data.attachmentUrl ? data.attachmentUrl.split("?")[0] : "",
      attachmentName: data.attachmentName || "",
      attachmentSize: data.attachmentSize || "",
    };

    // If dateISO is explicitly updated, recalculate formatted dates
    if (data.dateISO) {
      updateFields.dateISO = data.dateISO;
      const parsedDate = new Date(data.dateISO);
      updateFields.date = formatIndoDate(parsedDate);
      updateFields.dateEN = formatEngDate(parsedDate);
    }

    const result = await collection.updateOne(
      { _id: slug },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return { success: false, error: "Announcement not found in database" };
    }

    revalidatePath("/");
    revalidatePath(`/announcements/${slug}`);

    return { success: true };
  } catch (error) {
    console.error(`Failed to update announcement ${slug}:`, error);
    return { success: false, error: error.message };
  }
}

// 5. Delete Announcement
export async function deleteAnnouncementAction(slug) {
  try {
    const client = await clientPromise;
    const db = client.db("humas-stimi");
    const collection = db.collection("announcements");

    const result = await collection.deleteOne({ _id: slug });

    if (result.deletedCount === 0) {
      return { success: false, error: "Announcement not found in database" };
    }

    revalidatePath("/");
    revalidatePath(`/announcements/${slug}`);

    return { success: true };
  } catch (error) {
    console.error(`Failed to delete announcement ${slug}:`, error);
    return { success: false, error: error.message };
  }
}

// Helper to format bytes to human readable format
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

// 6. Upload Attachment Document (PDF, etc.) to MinIO
export async function uploadAttachmentAction(base64Data, fileName) {
  try {
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return { success: false, error: "Format file base64 salah." };
    }
    
    const contentType = matches[1];
    const base64Buffer = Buffer.from(matches[2], "base64");
    const bytes = base64Buffer.length;
    const formattedSize = formatBytes(bytes);

    // Clean fileName to avoid path traversal
    const cleanFileName = fileName.replace(/[^\w\s\.-]/gi, "_").replace(/[\s]+/g, "-");
    const uniqueName = `${Date.now()}-${cleanFileName}`;
    
    const key = `uploads/${uniqueName}`;
    const fileUrl = await uploadToS3(base64Buffer, key, contentType);
    const previewUrl = await generatePresignedUrl(fileUrl);
    
    return { 
      success: true, 
      url: previewUrl, 
      name: fileName, 
      size: formattedSize 
    };
  } catch (error) {
    console.error("Failed to upload attachment file to MinIO:", error);
    return { success: false, error: error.message };
  }
}
