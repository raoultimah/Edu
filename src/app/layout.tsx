import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EDU-WISE BASIC - School Management System',
  description: 'A modern school management system built with Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

