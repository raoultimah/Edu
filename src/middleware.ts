import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createClient(request, res);
  
  const { data: { user } } = await supabase.auth.getUser();
  
  // Check if user is authenticated
  const isAuthenticated = !!user;
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || 
                      request.nextUrl.pathname.startsWith('/register') || 
                      request.nextUrl.pathname.startsWith('/forgot-password');
  
  // Redirect unauthenticated users to login
  if (!isAuthenticated && !isAuthRoute && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Redirect authenticated users away from auth routes
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Check role-based access
  if (isAuthenticated && user.user_metadata?.role) {
    const userRole = user.user_metadata.role;
    const path = request.nextUrl.pathname;
    
    const roleRoutes = {
      admin: ['/admin', '/settings'],
      teacher: ['/teacher', '/marks'],
      finance: ['/finance', '/payments'],
      parent: ['/parent', '/children'],
      student: ['/student', '/results']
    };
    
    for (const [role, routes] of Object.entries(roleRoutes)) {
      if (routes.some(route => path.startsWith(route)) && userRole !== role) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
  }
  
  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

