// KARGANOT MVP - Validation Schemas
// Zod schemas for request validation

import { z } from 'zod';

// ==========================================
// AUTH SCHEMAS
// ==========================================

export const RegisterSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(8, 'Şifre en az 8 karakter olmalı'),
  name: z.string().min(2, 'İsim en az 2 karakter olmalı'),
  universityId: z.string().optional(),
  departmentId: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(1, 'Şifre gerekli'),
});

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token gerekli'),
});

// ==========================================
// NOTE SCHEMAS
// ==========================================

export const CreateNoteSchema = z.object({
  courseId: z.string().min(1, 'Ders seçimi gerekli'),
  title: z.string().min(3, 'Başlık en az 3 karakter olmalı').max(200, 'Başlık çok uzun'),
  description: z.string().max(1000, 'Açıklama çok uzun').optional(),
  tags: z.array(z.string()).max(10, 'En fazla 10 etiket eklenebilir').optional(),
  fileExt: z.enum(['pdf', 'docx', 'pptx', 'jpg', 'png']),
});

export const UpdateNoteSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().max(1000).optional(),
  tags: z.array(z.string()).max(10).optional(),
});

export const NoteQuerySchema = z.object({
  courseId: z.string().optional(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'REMOVED']).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sort: z.enum(['recent', 'popular', 'rating']).default('recent'),
});

// ==========================================
// RATING SCHEMAS
// ==========================================

export const CreateRatingSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(500).optional(),
});

// ==========================================
// REPORT SCHEMAS
// ==========================================

export const CreateReportSchema = z.object({
  type: z.enum(['COPYRIGHT', 'SPAM', 'INAPPROPRIATE', 'OTHER']).default('OTHER'),
  detail: z.string().min(10, 'Açıklama en az 10 karakter olmalı').max(1000),
});

// ==========================================
// SEARCH SCHEMAS
// ==========================================

export const SearchSchema = z.object({
  q: z.string().min(1, 'Arama terimi gerekli'),
  universityId: z.string().optional(),
  facultyId: z.string().optional(),
  departmentId: z.string().optional(),
  courseId: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

// ==========================================
// ADMIN SCHEMAS
// ==========================================

export const ApproveNoteSchema = z.object({
  noteId: z.string().min(1),
});

export const RejectNoteSchema = z.object({
  noteId: z.string().min(1),
  reason: z.string().min(10, 'Ret nedeni en az 10 karakter olmalı'),
});

export const BanUserSchema = z.object({
  userId: z.string().min(1),
  reason: z.string().min(10, 'Ban nedeni en az 10 karakter olmalı'),
  duration: z.number().int().positive().optional(), // days
});

export const AdminNotesQuerySchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'REMOVED']).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

// ==========================================
// TYPE EXPORTS
// ==========================================

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type CreateNoteInput = z.infer<typeof CreateNoteSchema>;
export type CreateRatingInput = z.infer<typeof CreateRatingSchema>;
export type CreateReportInput = z.infer<typeof CreateReportSchema>;
export type SearchInput = z.infer<typeof SearchSchema>;
