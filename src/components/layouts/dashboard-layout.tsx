'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/auth-context';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileText,
  DollarSign,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
}

function SidebarItem({ href, icon, title, isActive }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
        isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
      )}
    >
      {icon}
      {title}
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, role, signOut } = useAuthContext();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    {
      href: '/dashboard',
      icon: <LayoutDashboard className="h-4 w-4" />,
      title: 'Dashboard',
      roles: ['admin', 'teacher', 'student', 'parent', 'finance'],
    },
    {
      href: '/students',
      icon: <Users className="h-4 w-4" />,
      title: 'Students',
      roles: ['admin', 'teacher'],
    },
    {
      href: '/academics',
      icon: <BookOpen className="h-4 w-4" />,
      title: 'Academics',
      roles: ['admin', 'teacher', 'student'],
    },
    {
      href: '/timetable',
      icon: <Calendar className="h-4 w-4" />,
      title: 'Timetable',
      roles: ['admin', 'teacher', 'student'],
    },
    {
      href: '/exams',
      icon: <FileText className="h-4 w-4" />,
      title: 'Exams & Results',
      roles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      href: '/finance',
      icon: <DollarSign className="h-4 w-4" />,
      title: 'Finance',
      roles: ['admin', 'finance', 'parent'],
    },
    {
      href: '/settings',
      icon: <Settings className="h-4 w-4" />,
      title: 'Settings',
      roles: ['admin'],
    },
  ];

  const filteredNavItems = navItems.filter((item) => 
    !role || item.roles.includes(role)
  );

  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">EDU-WISE BASIC</h1>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:static md:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex h-14 items-center border-b px-4">
            <div className="flex flex-1 items-center gap-2">
              <span className="text-lg font-semibold">EDU-WISE BASIC</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close Menu</span>
            </Button>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            {filteredNavItems.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                title={item.title}
                isActive={pathname === item.href}
              />
            ))}
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-3 px-3 py-2 text-sm text-muted-foreground"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

