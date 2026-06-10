import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3Client = new S3Client({
    endpoint: process.env.MINIO_ENDPOINT ?? "",
    region: "us-east-1", // Minio mengabaikan ini, tapi tetap wajib diisi
    credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY ?? "",
        secretAccessKey: process.env.MINIO_SECRET_KEY ?? "",
    },
    forcePathStyle: true, // Wajib true untuk Minio
});

/**
 * Menerima URL file mentah, jika URL tersebut dari MinIO, 
 * akan mengembalikan Signed URL sementara yang bisa diakses publik.
 */
export async function generatePresignedUrl(fileUrl) {
    if (!fileUrl || !process.env.MINIO_ENDPOINT) return fileUrl;

    try {
        const prefix = `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET}/`;
        if (fileUrl.startsWith(prefix)) {
            const key = fileUrl.replace(prefix, "");
            const command = new GetObjectCommand({
                Bucket: process.env.MINIO_BUCKET ?? "",
                Key: decodeURIComponent(key),
            });
            return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        }
    } catch (err) {
        console.error("Gagal generate signed URL:", err);
    }
    
    return fileUrl;
}

/**
 * Mengunggah buffer file ke MinIO / S3 bucket.
 * @param {Buffer} buffer 
 * @param {string} key 
 * @param {string} contentType 
 * @returns {Promise<string>} URL mentah file di MinIO
 */
export async function uploadToS3(buffer, key, contentType) {
    const bucket = process.env.MINIO_BUCKET ?? "";
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
    });
    
    await s3Client.send(command);
    
    // Kembalikan URL mentah file
    return `${process.env.MINIO_ENDPOINT}/${bucket}/${key}`;
}