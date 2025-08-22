'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import {
  Users,
  BookOpen,
  Calendar,
  FileText,
  DollarSign,
  Settings,
  Menu,
  X,
  LogOut,
  Home,
  Bell,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}

const NavItem = ({ href, icon, label, active, onClick }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
        active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
      )}
      onClick={onClick}
    >
      {icon}
      {label}
    </Link>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, role, signOut } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 md:px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-bold">EDU-WISE BASIC</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="hidden text-sm md:block">
                <div className="font-medium">
                  {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                </div>
                <div className="text-xs text-muted-foreground capitalize">
                  {role || 'User'}
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-background pt-16 transition-transform md:static md:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex h-[60px] items-center border-b px-6 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={closeSidebar}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close Menu</span>
            </Button>
            <span className="text-lg font-bold">Menu</span>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            <NavItem
              href="/dashboard"
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
              active={pathname === '/dashboard'}
              onClick={closeSidebar}
            />
            <NavItem
              href="/students"
              icon={<Users className="h-5 w-5" />}
              label="Students"
              active={pathname.startsWith('/students')}
              onClick={closeSidebar}
            />
            <NavItem
              href="/academics"
              icon={<BookOpen className="h-5 w-5" />}
              label="Academics"
              active={pathname.startsWith('/academics')}
              onClick={closeSidebar}
            />
            <NavItem
              href="/timetable"
              icon={<Calendar className="h-5 w-5" />}
              label="Timetable"
              active={pathname.startsWith('/timetable')}
              onClick={closeSidebar}
            />
            <NavItem
              href="/exams"
              icon={<FileText className="h-5 w-5" />}
              label="Exams"
              active={pathname.startsWith('/exams')}
              onClick={closeSidebar}
            />
            <NavItem
              href="/finance"
              icon={<DollarSign className="h-5 w-5" />}
              label="Finance"
              active={pathname.startsWith('/finance')}
              onClick={closeSidebar}
            />
            <NavItem
              href="/settings"
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              active={pathname.startsWith('/settings')}
              onClick={closeSidebar}
            />
          </nav>
          <div className="border-t p-3">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </aside>
        <div
          className={cn(
            'fixed inset-0 z-10 bg-background/80 backdrop-blur-sm md:hidden',
            sidebarOpen ? 'block' : 'hidden'
          )}
          onClick={closeSidebar}
        ></div>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

