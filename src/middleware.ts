import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/middleware';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createClient(req, res);
  const { data: { session } } = await supabase.auth.getSession();

  // Get the pathname from the URL
  const path = req.nextUrl.pathname;

  // Check if the path is a protected route
  const isProtectedRoute = path.startsWith('/dashboard') || 
                          path.startsWith('/students') || 
                          path.startsWith('/academics') || 
                          path.startsWith('/timetable') || 
                          path.startsWith('/exams') || 
                          path.startsWith('/finance') || 
                          path.startsWith('/settings');

  // Check if the path is an auth route
  const isAuthRoute = path.startsWith('/login') || path.startsWith('/register');

  // If the route is protected and the user is not authenticated, redirect to login
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(redirectUrl);
  }

  // If the user is authenticated and trying to access an auth route, redirect to dashboard
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If the user is authenticated and trying to access the root path, redirect to dashboard
  if (path === '/' && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

