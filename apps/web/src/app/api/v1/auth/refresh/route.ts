import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';
import { apiSuccess, ApiErrors } from '@/lib/api/response';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-min-32-characters-long'
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return ApiErrors.VALIDATION_ERROR({
        refreshToken: 'Refresh token gerekli'
      });
    }

    // Refresh token'ı doğrula
    let payload;
    try {
      const { payload: verified } = await jwtVerify(refreshToken, JWT_SECRET);
      payload = verified;
    } catch (error) {
      return ApiErrors.UNAUTHORIZED('Geçersiz veya süresi dolmuş refresh token');
    }

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string }
    });

    if (!user) {
      return ApiErrors.UNAUTHORIZED('Kullanıcı bulunamadı');
    }

    // Kullanıcı durumunu kontrol et
    if (user.status === 'BANNED') {
      return ApiErrors.FORBIDDEN('Hesabınız yasaklandı');
    }

    if (user.status === 'SUSPENDED') {
      return ApiErrors.FORBIDDEN('Hesabınız askıya alındı');
    }

    // Yeni access token oluştur
    const { SignJWT } = await import('jose');
    
    const accessToken = await new SignJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
      plan: user.plan
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(JWT_SECRET);

    return apiSuccess({
      accessToken,
      expiresIn: 900, // 15 dakika
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        plan: user.plan
      }
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    return ApiErrors.INTERNAL_ERROR('Token yenileme sırasında hata oluştu');
  }
}
