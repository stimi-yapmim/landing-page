"use server";

import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { generatePresignedUrl, uploadToS3 } from "@/lib/s3";

// Helper function: Map Mongo _id to id string for codebase compatibility and sign S3 URLs
async function mapDocument(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  const mapped = { id: _id.toString(), ...rest };
  if (mapped.coverImage) {
    mapped.coverImage = await generatePresignedUrl(mapped.coverImage);
  }
  return mapped;
}

// Helper function: Map Mongo _id to id string for category documents
function mapCategory(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
}

// Helper: Format today's date in Indonesian style
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

// Helper: Strip HTML tags to get clean plain text
function stripHtmlTags(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Helper: Estimate reading time based on content (array or string)
function estimateReadingTime(content) {
  let text = "";
  if (Array.isArray(content)) {
    text = content.join(" ");
  } else {
    text = stripHtmlTags(content);
  }
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} menit`;
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

// 1. Get All Articles (with Seeding)
export async function getAllArticlesAction() {
  try {
    const client = await clientPromise;
    const db = client.db("humas-stimi");
    const collection = db.collection("articles");

    const count = await collection.countDocuments();
    if (count === 0) {
      // Seed Database with mock data if empty
      const { articles: staticArticles } = await import("@/lib/articles");
      const seedData = Object.entries(staticArticles).map(([id, data]) => ({
        _id: id,
        ...data,
      }));
      await collection.insertMany(seedData);
      console.log("Database seeded successfully with static articles.");
    }

    const docs = await collection.find({}).toArray();
    const mappedDocs = await Promise.all(docs.map(mapDocument));
    return mappedDocs
      .sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO));
  } catch (error) {
    console.error("Failed to fetch articles from MongoDB:", error);
    // Fallback to static mock articles
    const { getAllArticles } = await import("@/lib/articles");
    return getAllArticles();
  }
}

// 2. Get Article By ID / Slug
export async function getArticleByIdAction(id) {
  try {
    const client = await clientPromise;
    const db = client.db("humas-stimi");
    const collection = db.collection("articles");

    const doc = await collection.findOne({ _id: id });
    if (doc) return await mapDocument(doc);

    // Fallback search in static list
    const { articles: staticArticles } = await import("@/lib/articles");
    if (staticArticles[id]) {
      return { id, ...staticArticles[id] };
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch article with ID ${id}:`, error);
    const { articles: staticArticles } = await import("@/lib/articles");
    if (staticArticles[id]) {
      return { id, ...staticArticles[id] };
    }
    return null;
  }
}

// 3. Create Article
export async function createArticleAction(data) {
  try {
    const client = await clientPromise;
    const db = client.db("humas-stimi");
    const collection = db.collection("articles");

    const title = data.title || "Judul Berita Baru";
    let slug = generateSlug(title);

    // Ensure slug is unique
    let existing = await collection.findOne({ _id: slug });
    let counter = 1;
    while (existing) {
      slug = `${generateSlug(title)}-${counter}`;
      existing = await collection.findOne({ _id: slug });
      counter++;
    }

    const dateISO = data.dateISO || new Date().toISOString().split("T")[0];
    const dateStr = formatIndoDate(new Date(dateISO));

    // Use HTML content string directly from rich editor
    const content = data.content || "<p>Konten berita.</p>";

    // Calculate plain text for excerpt
    const plainText = stripHtmlTags(content);
    const excerpt = data.excerpt || (plainText ? plainText.substring(0, 150) + "..." : "");

    const tags = data.tags
      ? data.tags.split(",").map(t => t.trim()).filter(Boolean)
      : [];

    const categoryColor = data.categoryColor || "cyan";

    const newDoc = {
      _id: slug,
      title,
      category: data.category || "Akademik",
      categoryColor,
      date: dateStr,
      dateISO,
      author: data.author || "Humas STIMI YAPMI",
      readingTime: estimateReadingTime(content),
      excerpt,
      coverGradient: data.coverGradient || "from-brand-navy-950 via-brand-navy-800 to-brand-cyan-600",
      coverAccent: data.coverAccent || "#00bacf",
      coverImage: data.coverImage ? data.coverImage.split("?")[0] : "",
      content,
      tags,
    };

    await collection.insertOne(newDoc);

    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath(`/news/${slug}`);

    return { success: true, slug };
  } catch (error) {
    console.error("Failed to create article:", error);
    return { success: false, error: error.message };
  }
}

// 4. Update Article
export async function updateArticleAction(id, data) {
  try {
    const client = await clientPromise;
    const db = client.db("humas-stimi");
    const collection = db.collection("articles");

    // Use HTML content string directly from rich editor
    const content = data.content || "<p>Konten berita.</p>";

    // Calculate plain text for excerpt if needed
    const plainText = stripHtmlTags(content);
    const excerpt = data.excerpt || (plainText ? plainText.substring(0, 150) + "..." : "");

    const tags = data.tags
      ? data.tags.split(",").map(t => t.trim()).filter(Boolean)
      : [];

    const categoryColor = data.categoryColor || "cyan";

    const updateFields = {
      title: data.title,
      category: data.category || "Akademik",
      categoryColor,
      author: data.author || "Humas STIMI YAPMI",
      readingTime: estimateReadingTime(content),
      excerpt,
      coverGradient: data.coverGradient || "from-brand-navy-950 via-brand-navy-800 to-brand-cyan-600",
      coverAccent: data.coverAccent || "#00bacf",
      coverImage: data.coverImage ? data.coverImage.split("?")[0] : "",
      content,
      tags,
    };

    // If date ISO is provided, keep it, otherwise do not update dates to preserve publish times
    if (data.dateISO) {
      updateFields.dateISO = data.dateISO;
      updateFields.date = formatIndoDate(new Date(data.dateISO));
    }

    const result = await collection.updateOne(
      { _id: id },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return { success: false, error: "Article not found in database" };
    }

    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath(`/news/${id}`);

    return { success: true };
  } catch (error) {
    console.error(`Failed to update article ${id}:`, error);
    return { success: false, error: error.message };
  }
}

// 5. Delete Article
export async function deleteArticleAction(id) {
  try {
    const client = await clientPromise;
    const db = client.db("humas-stimi");
    const collection = db.collection("articles");

    const result = await collection.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return { success: false, error: "Article not found in database" };
    }

    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath(`/news/${id}`);

    return { success: true };
  } catch (error) {
    console.error(`Failed to delete article ${id}:`, error);
    return { success: false, error: error.message };
  }
}

// 6. Upload Content Image to MinIO
export async function uploadImageAction(base64Data) {
  try {
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return { success: false, error: "Format base64 salah." };
    }
    
    const mimeType = matches[1];
    const base64Buffer = Buffer.from(matches[2], "base64");
    
    let ext = "png";
    if (mimeType.includes("jpeg") || mimeType.includes("jpg")) ext = "jpg";
    else if (mimeType.includes("gif")) ext = "gif";
    else if (mimeType.includes("webp")) ext = "webp";
    
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const key = `images/${uniqueName}`;
    
    const fileUrl = await uploadToS3(base64Buffer, key, mimeType);
    const previewUrl = await generatePresignedUrl(fileUrl);
    
    return { success: true, url: previewUrl };
  } catch (error) {
    console.error("Failed to upload image file to MinIO:", error);
    return { success: false, error: error.message };
  }
}

// 7. Get All News Categories (with Seeding)
export async function getNewsCategoriesAction() {
  try {
    const client = await clientPromise;
    const db = client.db("humas-stimi");
    const collection = db.collection("news_categories");

    const count = await collection.countDocuments();
    if (count === 0) {
      // Seed default categories
      const defaultCategories = [
        { _id: "akademik", name: "Akademik", color: "cyan" },
        { _id: "kuliah-umum", name: "Kuliah Umum", color: "gold" },
        { _id: "pendaftaran", name: "Pendaftaran", color: "emerald" },
        { _id: "fasilitas", name: "Fasilitas", color: "purple" },
        { _id: "beasiswa", name: "Beasiswa", color: "orange" },
        { _id: "wisuda", name: "Wisuda", color: "cyan" },
      ];
      await collection.insertMany(defaultCategories);
      console.log("Database seeded successfully with default categories.");
    }

    const docs = await collection.find({}).toArray();
    return docs.map(mapCategory);
  } catch (error) {
    console.error("Failed to fetch news categories from MongoDB:", error);
    // Fallback to defaults
    return [
      { id: "akademik", name: "Akademik", color: "cyan" },
      { id: "kuliah-umum", name: "Kuliah Umum", color: "gold" },
      { id: "pendaftaran", name: "Pendaftaran", color: "emerald" },
      { id: "fasilitas", name: "Fasilitas", color: "purple" },
      { id: "beasiswa", name: "Beasiswa", color: "orange" },
      { id: "wisuda", name: "Wisuda", color: "cyan" },
    ];
  }
}

// 8. Create News Category
export async function createNewsCategoryAction(data) {
  try {
    const client = await clientPromise;
    const db = client.db("humas-stimi");
    const collection = db.collection("news_categories");

    const name = data.name ? data.name.trim() : "";
    const color = data.color || "cyan";

    if (!name) {
      return { success: false, error: "Nama kategori tidak boleh kosong." };
    }

    const id = generateSlug(name);

    // Check if category already exists
    const existing = await collection.findOne({ _id: id });
    if (existing) {
      return { success: false, error: "Kategori dengan nama tersebut sudah ada." };
    }

    await collection.insertOne({
      _id: id,
      name,
      color,
    });

    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath("/admin/news/new");
    revalidatePath("/admin/news/edit/[id]", "page");

    return { success: true, category: { id, name, color } };
  } catch (error) {
    console.error("Failed to create news category:", error);
    return { success: false, error: error.message };
  }
}
