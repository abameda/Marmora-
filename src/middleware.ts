import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const publicPaths = ['/login', '/api/auth/login'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  const isCronPath = pathname.startsWith('/api/cron/');
  const isNextInternalPath = pathname.startsWith('/_next/') || pathname === '/favicon.ico';
  
  if (isPublicPath || isCronPath || isNextInternalPath) {
    return NextResponse.next();
  }
  
  const sessionCookie = request.cookies.get('session');
  
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  const payload = await verifyJWT(sessionCookie.value);
  
  if (!payload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
