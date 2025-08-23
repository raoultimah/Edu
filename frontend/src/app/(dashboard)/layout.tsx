'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from '@/context/auth-context';
import { AuthProvider } from '@/context/auth-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuthContext();
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading) {
      // If user is not authenticated, redirect to login
      if (!user) {
        router.push('/login');
      }
    }
  }, [user, loading, router, mounted]);

  // Show loading state or render children
  if (loading || !mounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, don't render children
  if (!user) {
    return null;
  }

  return <>{children}</>;
}

