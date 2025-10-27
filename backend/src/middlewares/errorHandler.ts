// KARGANOT MVP Build - by Onur & Copilot
// Global Error Handler

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

/**
 * Global error handler middleware
 */
export function errorHandler(
  err: AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log error
  console.error('[Error]', {
    path: req.path,
    method: req.method,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Doğrulama hatası',
      errors: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  // Custom app errors
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Sunucu hatası oluştu';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

/**
 * 404 Not Found handler
 */
export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: 'Endpoint bulunamadı',
    path: req.path,
  });
}

/**
 * Custom error creator
 */
export function createError(message: string, statusCode: number = 400): AppError {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  return error;
}
