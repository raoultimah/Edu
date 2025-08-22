'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
        toast.error('Login failed', {
          description: error.message,
        });
      } else {
        toast.success('Login successful', {
          description: 'Redirecting to dashboard...',
        });
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      toast.error('Login failed', {
        description: err.message || 'An error occurred during login',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
                  <span className="text-lg font-bold text-primary-foreground">E</span>
                </div>
                <h2 className="text-2xl font-bold">EDU-WISE BASIC</h2>
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your credentials to access the school management system
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <div className="mt-6">
                <Form>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <FormField>
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="pl-10"
                          required
                        />
                      </div>
                    </FormField>

                    <FormField>
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <div className="text-sm">
                          <Link
                            href="/forgot-password"
                            className="font-medium text-primary hover:text-primary/90"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="pl-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormField>

                    {error && (
                      <FormMessage className="text-destructive">
                        {error}
                      </FormMessage>
                    )}

                    <div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? 'Signing in...' : 'Sign in'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary to-purple-600"
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
              <div className="max-w-2xl text-center text-white">
                <h1 className="text-4xl font-bold sm:text-5xl">
                  Welcome to EDU-WISE BASIC
                </h1>
                <p className="mt-4 text-xl">
                  A comprehensive school management system designed for basic education
                </p>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <h3 className="font-bold">Student Management</h3>
                    <p className="mt-2 text-sm">
                      Efficiently manage student records, attendance, and performance
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <h3 className="font-bold">Financial Management</h3>
                    <p className="mt-2 text-sm">
                      Track fees, payments, and generate financial reports
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <h3 className="font-bold">Academic Planning</h3>
                    <p className="mt-2 text-sm">
                      Manage timetables, exams, and curriculum planning
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

