// Global API & domain types for KARGANOT
// Single source of truth for client layer

import type { z } from 'zod';

// Standard API response
export type IApiResponse<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string; fields?: Record<string, string> } };

// Pagination common shape
export interface IPagination {
  page: number;
  limit: number;
  total: number;
}

// Minimal domain models (aligned with Prisma schema fields used on UI)
export interface IUser {
  id: string;
  email: string;
  name: string | null;
  role: 'USER' | 'ADMIN';
  createdAt?: string;
}

export interface IUniversity {
  id: string;
  name: string;
  slug: string;
  city?: string | null;
}

export interface INote {
  id: string;
  title: string;
  description?: string | null;
  price?: number | null;
  authorId: string;
  universityId?: string | null;
  tags?: string[] | null;
  avgRating?: number | null;
  ratingCount?: number | null;
  views?: number | null;
  downloads?: number | null;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt?: string;
}

export interface IRating {
  id: string;
  noteId: string;
  userId: string;
  rating: number; // 1-5
  comment?: string | null;
  createdAt?: string;
}

export interface IReport {
  id: string;
  noteId: string;
  userId: string;
  reason: string;
  status: 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'REJECTED';
  createdAt?: string;
}

// Helpers
export type InferApi<T extends z.ZodTypeAny> = z.infer<T>;
