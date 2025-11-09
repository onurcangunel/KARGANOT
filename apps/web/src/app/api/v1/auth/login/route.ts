// KARGANOT MVP - Auth API: Login
// POST /api/v1/auth/login

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiSuccess, apiError, ApiErrors } from '@/lib/api/response';
import { LoginSchema } from '@/lib/api/schemas/validation';
import bcryptjs from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-min-32-chars'
);

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const validation = LoginSchema.safeParse(body);
    
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      return ApiErrors.VALIDATION_ERROR(fieldErrors);
    }
    
    const { email, password } = validation.data;
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        passwordHash: true,
        role: true,
        plan: true,
        status: true,
        monthlyDownloadQuota: true,
        monthlyDownloadUsed: true,
      },
    });
    
    if (!user) {
      return apiError(
        'INVALID_CREDENTIALS',
        'E-posta veya şifre hatalı',
        401
      );
    }
    
    // Check if user is banned
    if (user.status === 'BANNED' || user.status === 'SUSPENDED') {
      return apiError(
        'ACCOUNT_SUSPENDED',
        'Hesabınız askıya alınmış',
        403
      );
    }
    
    // Verify password
    if (!user.passwordHash) {
      return apiError(
        'NO_PASSWORD',
        'Bu hesap OAuth ile oluşturulmuş',
        400
      );
    }
    
    const isValidPassword = await bcryptjs.compare(password, user.passwordHash);
    
    if (!isValidPassword) {
      return apiError(
        'INVALID_CREDENTIALS',
        'E-posta veya şifre hatalı',
        401
      );
    }
    
    // Generate JWT tokens
    const accessToken = await new SignJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
      plan: user.plan,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(JWT_SECRET);
    
    const refreshToken = await new SignJWT({
      userId: user.id,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(JWT_SECRET);
    
    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    
    // Remove sensitive data
    const { passwordHash, ...userWithoutPassword } = user;
    
    return apiSuccess({
      user: userWithoutPassword,
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 minutes in seconds
    });
  } catch (error) {
    console.error('[Auth/Login] Error:', error);
    return ApiErrors.INTERNAL_ERROR('Giriş işlemi sırasında bir hata oluştu');
  }
}
