// KARGANOT MVP - Auth Middleware
// JWT validation and role-based access helpers

import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

export interface AuthContext {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    plan: string;
  };
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-min-32-characters-long'
);

/**
 * Extract and verify Bearer access token from request headers
 */
async function verifyAccessToken(req: NextRequest): Promise<{
  userId: string;
  email?: string;
  role?: string;
  plan?: string;
} | null> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.substring(7);
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.userId as string | undefined;
    if (!userId) return null;
    return {
      userId,
      email: payload.email as string | undefined,
      role: payload.role as string | undefined,
      plan: payload.plan as string | undefined,
    };
  } catch {
    return null;
  }
}

/**
 * Verify user authentication
 */
export async function requireAuth(req: NextRequest): Promise<AuthContext | null> {
  try {
    const token = await verifyAccessToken(req);
    if (!token) return null;

    const user = await prisma.user.findUnique({
      where: { id: token.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        plan: true,
        status: true,
      },
    });

    if (!user || user.status !== 'ACTIVE') return null;

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        plan: user.plan,
      },
    };
  } catch (error) {
    console.error('[requireAuth] Error:', error);
    return null;
  }
}

/**
 * Require specific role
 */
export async function requireRole(
  req: NextRequest,
  allowedRoles: string[]
): Promise<AuthContext | null> {
  const auth = await requireAuth(req);
  if (!auth) return null;
  if (!allowedRoles.includes(auth.user.role)) return null;
  return auth;
}

/**
 * Require admin role
 */
export async function requireAdmin(req: NextRequest): Promise<AuthContext | null> {
  return requireRole(req, ['ADMIN']);
}

/**
 * Require moderator or admin role
 */
export async function requireModerator(req: NextRequest): Promise<AuthContext | null> {
  return requireRole(req, ['MODERATOR', 'ADMIN']);
}
