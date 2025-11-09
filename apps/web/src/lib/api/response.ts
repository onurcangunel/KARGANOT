// KARGANOT MVP - API Response Helpers
// Standard response format for all API endpoints

import { NextResponse } from 'next/server';

export interface ApiSuccessResponse<T = any> {
  ok: true;
  data: T;
}

export interface ApiErrorResponse {
  ok: false;
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Success response helper
 */
export function apiSuccess<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json<ApiSuccessResponse<T>>(
    { ok: true, data },
    { status }
  );
}

/**
 * Error response helper
 */
export function apiError(
  code: string,
  message: string,
  status: number = 400,
  fields?: Record<string, string>
): NextResponse {
  return NextResponse.json<ApiErrorResponse>(
    {
      ok: false,
      error: { code, message, fields },
    },
    { status }
  );
}

/**
 * Common error responses
 */
export const ApiErrors = {
  UNAUTHORIZED: (message: string = 'Oturum açmanız gerekiyor') => 
    apiError('UNAUTHORIZED', message, 401),
  FORBIDDEN: (message: string = 'Bu işlemi yapmaya yetkiniz yok') => 
    apiError('FORBIDDEN', message, 403),
  NOT_FOUND: (resource: string = 'Kayıt') =>
    apiError('NOT_FOUND', `${resource} bulunamadı`, 404),
  VALIDATION_ERROR: (fields: Record<string, string>) =>
    apiError('VALIDATION_ERROR', 'Doğrulama hatası', 422, fields),
  QUOTA_EXCEEDED: () =>
    apiError('QUOTA_EXCEEDED', 'Aylık indirme kotanız doldu', 429),
  RATE_LIMIT: () =>
    apiError('RATE_LIMIT', 'Çok fazla istek gönderdiniz, lütfen bekleyin', 429),
  INTERNAL_ERROR: (message: string = 'Bir hata oluştu') =>
    apiError('INTERNAL_ERROR', message, 500),
};
