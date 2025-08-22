import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Update the session
  const response = await updateSession(request);
  
  // Get the pathname
  const pathname = request.nextUrl.pathname;
  
  // Get the session from the request
  const authCookie = request.cookies.get('sb-auth-token');
  const isAuthenticated = !!authCookie;
  
  // Auth routes - redirect to dashboard if authenticated
  if (pathname === '/login' || pathname === '/register') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return response;
  }
  
  // Protected routes - redirect to login if not authenticated
  if (
    pathname === '/dashboard' ||
    pathname.startsWith('/students') ||
    pathname.startsWith('/academics') ||
    pathname.startsWith('/timetable') ||
    pathname.startsWith('/exams') ||
    pathname.startsWith('/finance') ||
    pathname.startsWith('/settings')
  ) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return response;
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
};

