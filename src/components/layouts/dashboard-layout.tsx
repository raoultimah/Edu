'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronDown,
  Search,
  BarChart2,
  Layers,
  CreditCard,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Toaster } from 'sonner';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
  badge?: number;
}

const NavItem = ({ href, icon, label, active, onClick, badge }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all',
        active
          ? 'bg-primary text-primary-foreground shadow-inner'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {badge ? (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-xs font-medium">
          {badge}
        </div>
      ) : null}
    </Link>
  );
};

const NavSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-1">
      <h3 className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
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
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (!mounted) {
    return null;
  }

  const userInitials = user?.user_metadata?.first_name && user?.user_metadata?.last_name
    ? `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`
    : 'U';

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/80 backdrop-blur-md px-4 md:px-6">
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
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-lg font-bold text-primary-foreground">E</span>
              </div>
              <span className="text-xl font-bold hidden md:inline-block">EDU-WISE</span>
            </Link>
          </div>
          
          <div className="relative mx-4 hidden md:block flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-full border border-input bg-background py-2 pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {notifications}
                </span>
              )}
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
              <Avatar>
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={closeSidebar}
            ></motion.div>
          )}
        </AnimatePresence>
        
        <motion.aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-64 border-r bg-card p-4 pt-16 md:static md:z-0 md:block md:pt-0',
            sidebarOpen ? 'block' : 'hidden'
          )}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex h-[60px] items-center justify-between border-b mb-4 md:hidden">
            <span className="text-lg font-bold">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeSidebar}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close Menu</span>
            </Button>
          </div>
          
          <div className="space-y-6">
            <NavSection title="Main">
              <NavItem
                href="/dashboard"
                icon={<Home className="h-4 w-4" />}
                label="Dashboard"
                active={pathname === '/dashboard'}
                onClick={closeSidebar}
              />
              <NavItem
                href="/analytics"
                icon={<BarChart2 className="h-4 w-4" />}
                label="Analytics"
                active={pathname === '/analytics'}
                onClick={closeSidebar}
              />
            </NavSection>
            
            <NavSection title="Management">
              <NavItem
                href="/students"
                icon={<Users className="h-4 w-4" />}
                label="Students"
                active={pathname.startsWith('/students')}
                onClick={closeSidebar}
                badge={12}
              />
              <NavItem
                href="/academics"
                icon={<BookOpen className="h-4 w-4" />}
                label="Academics"
                active={pathname.startsWith('/academics')}
                onClick={closeSidebar}
              />
              <NavItem
                href="/timetable"
                icon={<Calendar className="h-4 w-4" />}
                label="Timetable"
                active={pathname.startsWith('/timetable')}
                onClick={closeSidebar}
              />
              <NavItem
                href="/exams"
                icon={<FileText className="h-4 w-4" />}
                label="Exams"
                active={pathname.startsWith('/exams')}
                onClick={closeSidebar}
              />
            </NavSection>
            
            <NavSection title="Finance">
              <NavItem
                href="/finance"
                icon={<DollarSign className="h-4 w-4" />}
                label="Overview"
                active={pathname === '/finance'}
                onClick={closeSidebar}
              />
              <NavItem
                href="/finance/fees"
                icon={<Layers className="h-4 w-4" />}
                label="Fee Structure"
                active={pathname === '/finance/fees'}
                onClick={closeSidebar}
              />
              <NavItem
                href="/finance/payments"
                icon={<CreditCard className="h-4 w-4" />}
                label="Payments"
                active={pathname === '/finance/payments'}
                onClick={closeSidebar}
              />
            </NavSection>
            
            <NavSection title="System">
              <NavItem
                href="/settings"
                icon={<Settings className="h-4 w-4" />}
                label="Settings"
                active={pathname.startsWith('/settings')}
                onClick={closeSidebar}
              />
              <NavItem
                href="/help"
                icon={<HelpCircle className="h-4 w-4" />}
                label="Help & Support"
                active={pathname.startsWith('/help')}
                onClick={closeSidebar}
              />
            </NavSection>
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 border-t p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </motion.aside>
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

