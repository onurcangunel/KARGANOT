// KARGANOT MVP - Auth API: Register
// POST /api/v1/auth/register

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiSuccess, apiError, ApiErrors } from '@/lib/api/response';
import { RegisterSchema } from '@/lib/api/schemas/validation';
import bcryptjs from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const validation = RegisterSchema.safeParse(body);
    
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      return ApiErrors.VALIDATION_ERROR(fieldErrors);
    }
    
    const { email, password, name, universityId, departmentId } = validation.data;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return apiError(
        'EMAIL_EXISTS',
        'Bu e-posta adresi zaten kullanılıyor',
        409
      );
    }
    
    // Hash password
    const passwordHash = await bcryptjs.hash(password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        universityId,
        departmentId,
        role: 'USER',
        plan: 'FREE',
        status: 'ACTIVE',
        monthlyDownloadQuota: 3,
        monthlyDownloadUsed: 0,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        plan: true,
        createdAt: true,
      },
    });
    
    return apiSuccess(
      {
        user,
        message: 'Kayıt başarılı! Giriş yapabilirsiniz.',
      },
      201
    );
  } catch (error) {
    console.error('[Auth/Register] Error:', error);
    return ApiErrors.INTERNAL_ERROR('Kayıt işlemi sırasında bir hata oluştu');
  }
}
