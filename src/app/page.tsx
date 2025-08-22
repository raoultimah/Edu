'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  ChevronRight,
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  BarChart2,
  CheckCircle,
  Menu,
  X,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const features = [
    {
      title: 'Student Management',
      description:
        'Efficiently manage student records, attendance, and academic performance tracking.',
      icon: <Users className="h-12 w-12 text-primary" />,
    },
    {
      title: 'Academic Planning',
      description:
        'Create and manage timetables, curriculum planning, and examination schedules.',
      icon: <BookOpen className="h-12 w-12 text-primary" />,
    },
    {
      title: 'Event Scheduling',
      description:
        'Organize school events, parent-teacher meetings, and extracurricular activities.',
      icon: <Calendar className="h-12 w-12 text-primary" />,
    },
    {
      title: 'Financial Management',
      description:
        'Track fees, manage payments, and generate comprehensive financial reports.',
      icon: <DollarSign className="h-12 w-12 text-primary" />,
    },
    {
      title: 'Analytics & Reporting',
      description:
        'Gain insights with powerful analytics and generate detailed reports on all aspects.',
      icon: <BarChart2 className="h-12 w-12 text-primary" />,
    },
    {
      title: 'Role-Based Access',
      description:
        'Secure access control with different permission levels for administrators, teachers, and parents.',
      icon: <CheckCircle className="h-12 w-12 text-primary" />,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-lg font-bold text-primary-foreground">E</span>
            </div>
            <span className="text-xl font-bold">EDU-WISE BASIC</span>
          </div>

          <nav className="hidden md:flex md:items-center md:gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="hidden md:flex md:items-center md:gap-2">
              <Link href="/login">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto bg-background p-6 md:hidden">
          <nav className="flex flex-col space-y-6">
            <Link
              href="#features"
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Sign in
                </Button>
              </Link>
              <Link href="/register">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background" />
          <div className="container relative">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6"
              >
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Simplify School Management with{' '}
                  <span className="gradient-text">EDU-WISE BASIC</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  A comprehensive school management system designed specifically for
                  basic education institutions.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Sign in
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative mx-auto aspect-video w-full max-w-lg rounded-xl bg-gradient-to-br from-primary to-purple-600 p-1 shadow-2xl"
              >
                <div className="h-full w-full rounded-lg bg-card p-4">
                  <div className="flex h-full flex-col rounded-md border bg-background p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                      </div>
                      <div className="h-6 w-64 rounded-md bg-muted" />
                    </div>
                    <div className="flex flex-1 gap-4">
                      <div className="w-48 rounded-md bg-muted/50" />
                      <div className="flex-1 space-y-4">
                        <div className="h-8 rounded-md bg-muted/80" />
                        <div className="grid grid-cols-2 gap-4">
                          <div className="h-24 rounded-md bg-primary/10" />
                          <div className="h-24 rounded-md bg-primary/10" />
                          <div className="h-24 rounded-md bg-primary/10" />
                          <div className="h-24 rounded-md bg-primary/10" />
                        </div>
                        <div className="h-32 rounded-md bg-muted/50" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Comprehensive Features
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to efficiently manage your school in one integrated
                platform.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="rounded-2xl bg-gradient-to-r from-primary to-purple-600 p-8 md:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to transform your school management?
                </h2>
                <p className="mt-4 text-lg text-white/90">
                  Join thousands of schools already using EDU-WISE BASIC to streamline
                  their operations and improve educational outcomes.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="/register">
                    <Button size="lg" variant="secondary">
                      Get Started for Free
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                  <span className="text-lg font-bold text-primary-foreground">E</span>
                </div>
                <span className="text-xl font-bold">EDU-WISE BASIC</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                A comprehensive school management system designed for basic education
                institutions.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-foreground">
                    Request Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} EDU-WISE BASIC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

