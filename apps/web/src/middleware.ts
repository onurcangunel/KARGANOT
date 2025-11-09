import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

export async function middleware(_req: NextRequest) {
  // JWT akışı client tarafında yönetildiğinden burada şimdilik yönlendirme yapmıyoruz.
  // İleride Authorization header kontrolü eklenebilir.
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
