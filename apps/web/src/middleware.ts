import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

/**
 * MIDDLEWARE - PROTECTED ROUTES
 * Authentication kontrolü yapar
 */

// Protected routes listesi
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/upload',
  '/notes/create',
  '/settings',
];

// Admin-only routes
const adminRoutes = [
  '/admin',
];

// Public routes (authentication olmaması gereken)
const publicRoutes = [
  '/login',
  '/register',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get session
  const session = await auth();

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !session) {
    const url = new URL('/login', req.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // Redirect to dashboard if accessing public route with auth
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Admin route check
  if (isAdminRoute && (!session || session.user.role !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

// Middleware config
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - course-hero-dashboard (new dashboard - exempt from middleware)
     * - test-page (test page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logo.svg|karga-logo.png|course-hero-dashboard|test-page|videos).*)',
  ],
};
