// KARGANOT MVP Build - by Onur & Copilot
// Validation Schemas (Zod)

import { z } from 'zod';

// ─────────────────────────────────────────
// AUTH SCHEMAS
// ─────────────────────────────────────────

export const registerSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
  name: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
  universityId: z.string().uuid().optional(),
  facultyId: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(1, 'Şifre boş olamaz'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token gereklidir'),
});

// ─────────────────────────────────────────
// NOTE SCHEMAS
// ─────────────────────────────────────────

export const createNoteSchema = z.object({
  courseId: z.string().uuid('Geçerli bir ders ID giriniz'),
  title: z.string().min(5, 'Başlık en az 5 karakter olmalıdır'),
  description: z.string().optional(),
  type: z.enum(['VIZE', 'FINAL', 'ODEV', 'PROJE', 'QUIZ', 'OZET', 'SLAYT']),
  year: z.number().int().min(2000).max(2100).optional(),
  semester: z.string().optional(),
  tags: z.array(z.string()).optional(),
  price: z.number().min(0).max(1000).optional(),
});

export const rateNoteSchema = z.object({
  score: z.number().int().min(1).max(10, 'Puan 1-10 arasında olmalıdır'),
  comment: z.string().max(1000).optional(),
});

export const reportNoteSchema = z.object({
  reason: z.enum(['COPYRIGHT', 'INAPPROPRIATE', 'SPAM', 'LOW_QUALITY', 'OTHER']),
  details: z.string().max(500).optional(),
});

// ─────────────────────────────────────────
// QUERY SCHEMAS
// ─────────────────────────────────────────

export const searchNotesSchema = z.object({
  q: z.string().optional(),
  universityId: z.string().uuid().optional(),
  facultyId: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
  courseId: z.string().uuid().optional(),
  type: z.enum(['VIZE', 'FINAL', 'ODEV', 'PROJE', 'QUIZ', 'OZET', 'SLAYT']).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['createdAt', 'downloadCount', 'viewCount', 'price']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type RateNoteInput = z.infer<typeof rateNoteSchema>;
export type ReportNoteInput = z.infer<typeof reportNoteSchema>;
export type SearchNotesInput = z.infer<typeof searchNotesSchema>;
