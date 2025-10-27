// KARGANOT MVP Build - by Onur & Copilot
// Mock S3 Upload Service

import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'karganot-notes';
const MOCK_BASE_URL = `https://${BUCKET_NAME}.s3.eu-central-1.amazonaws.com`;

export interface UploadResult {
  key: string;
  url: string;
  size: number;
  mimetype: string;
}

/**
 * Mock S3 upload - simulates file upload to S3
 */
export async function uploadToS3(
  file: Express.Multer.File,
  folder: string = 'notes'
): Promise<UploadResult> {
  // Simulate upload delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const fileId = uuidv4();
  const ext = path.extname(file.originalname);
  const key = `${folder}/${fileId}${ext}`;
  const url = `${MOCK_BASE_URL}/${key}`;

  console.log('[S3 Mock] Uploaded:', { key, size: file.size, mimetype: file.mimetype });

  return {
    key,
    url,
    size: file.size,
    mimetype: file.mimetype,
  };
}

/**
 * Mock S3 delete - simulates file deletion
 */
export async function deleteFromS3(key: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  console.log('[S3 Mock] Deleted:', key);
}

/**
 * Generate presigned URL (mock)
 */
export function generatePresignedUrl(key: string, expiresIn: number = 3600): string {
  const url = `${MOCK_BASE_URL}/${key}?expires=${Date.now() + expiresIn * 1000}`;
  return url;
}
