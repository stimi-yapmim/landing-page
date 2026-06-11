const { MongoClient } = require("mongodb");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

// Load environment variables from .env.local manually
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach(line => {
    const parts = line.split("=");
    if (parts.length === 2) {
      process.env[parts[0].trim()] = parts[1].trim();
    }
  });
}

const mongoUri = process.env.MONGODB_URI;
const minioEndpoint = process.env.MINIO_ENDPOINT;
const minioAccessKey = process.env.MINIO_ACCESS_KEY;
const minioSecretKey = process.env.MINIO_SECRET_KEY;
const minioBucket = process.env.MINIO_BUCKET;

if (!mongoUri || !minioEndpoint || !minioAccessKey || !minioSecretKey || !minioBucket) {
  console.error("Kesalahan: Variabel lingkungan tidak lengkap di .env.local!");
  process.exit(1);
}

// Map extensions to content types
const mimeTypes = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".zip": "application/zip",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

const s3Client = new S3Client({
  endpoint: minioEndpoint,
  region: "us-east-1",
  credentials: {
    accessKeyId: minioAccessKey,
    secretAccessKey: minioSecretKey,
  },
  forcePathStyle: true,
});

async function runMigration() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log("Terhubung ke MongoDB.");
    
    const db = client.db("humas-stimi");
    const collection = db.collection("announcements");
    
    // Find all announcements that have local attachmentUrls
    const announcements = await collection.find({
      attachmentUrl: { $exists: true, $ne: "" }
    }).toArray();
    
    const legacyAnnouncements = announcements.filter(doc => {
      const url = doc.attachmentUrl;
      return url.startsWith("/uploads/") || url.startsWith("uploads/");
    });
    
    console.log(`Menemukan ${legacyAnnouncements.length} pengumuman dengan lampiran lokal.`);
    
    let migratedCount = 0;
    
    for (const doc of legacyAnnouncements) {
      const originalUrl = doc.attachmentUrl;
      // Extract filename from /uploads/filename or uploads/filename
      const filename = originalUrl.replace(/^\/?uploads\//, "");
      
      const localFilePath = path.join(process.cwd(), "public", "uploads", filename);
      
      if (!fs.existsSync(localFilePath)) {
        console.warn(`Peringatan: File lokal tidak ditemukan untuk ID ${doc._id}: ${localFilePath}`);
        continue;
      }
      
      console.log(`Memigrasikan file: ${filename} untuk pengumuman ID: ${doc._id}...`);
      
      const fileBuffer = fs.readFileSync(localFilePath);
      const ext = path.extname(filename).toLowerCase();
      const contentType = mimeTypes[ext] || "application/octet-stream";
      
      // Upload to MinIO
      const key = `uploads/${filename}`;
      const command = new PutObjectCommand({
        Bucket: minioBucket,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
      });
      
      await s3Client.send(command);
      console.log(`Berhasil mengunggah ${filename} ke MinIO.`);
      
      // Construct the raw URL to be stored in the DB (without signature query parameters)
      const rawMinioUrl = `${minioEndpoint}/${minioBucket}/${key}`;
      
      // Update DB record
      await collection.updateOne(
        { _id: doc._id },
        { $set: { attachmentUrl: rawMinioUrl } }
      );
      
      console.log(`Berhasil memperbarui database untuk ID ${doc._id}. URL baru: ${rawMinioUrl}`);
      migratedCount++;
    }
    
    console.log(`\nMigrasi selesai. ${migratedCount} lampiran berhasil dipindahkan ke MinIO.`);
  } catch (error) {
    console.error("Terjadi kesalahan saat migrasi:", error);
  } finally {
    await client.close();
  }
}

runMigration();
