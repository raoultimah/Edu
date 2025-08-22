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
import { Eye, EyeOff, Lock, Mail, User, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuthContext();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(email, password, {
        first_name: firstName,
        last_name: lastName,
      });
      
      if (error) {
        setError(error.message);
        toast.error('Registration failed', {
          description: error.message,
        });
      } else {
        toast.success('Registration successful', {
          description: 'Please check your email to verify your account',
        });
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
      toast.error('Registration failed', {
        description: err.message || 'An error occurred during registration',
      });
    } finally {
      setLoading(false);
    }
  };

  // Password strength requirements
  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'At least one uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'At least one lowercase letter', met: /[a-z]/.test(password) },
    { label: 'At least one number', met: /[0-9]/.test(password) },
    { label: 'At least one special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

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
                Create your account
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Register to access the school management system
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
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField>
                        <FormLabel htmlFor="firstName">First Name</FormLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First name"
                            className="pl-10"
                            required
                          />
                        </div>
                      </FormField>

                      <FormField>
                        <FormLabel htmlFor="lastName">Last Name</FormLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last name"
                            className="pl-10"
                            required
                          />
                        </div>
                      </FormField>
                    </div>

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
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a password"
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
                      <div className="mt-2 space-y-2">
                        {passwordRequirements.map((req, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-xs"
                          >
                            <CheckCircle
                              className={`h-3 w-3 ${
                                req.met ? 'text-green-500' : 'text-muted-foreground'
                              }`}
                            />
                            <span
                              className={
                                req.met ? 'text-green-500' : 'text-muted-foreground'
                              }
                            >
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                          className="pl-10"
                          required
                        />
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
                        {loading ? 'Creating account...' : 'Create account'}
                      </Button>
                    </div>

                    <div className="text-center text-sm">
                      Already have an account?{' '}
                      <Link
                        href="/login"
                        className="font-medium text-primary hover:text-primary/90"
                      >
                        Sign in
                      </Link>
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
                  Join EDU-WISE BASIC
                </h1>
                <p className="mt-4 text-xl">
                  Create your account to access all features of our school management system
                </p>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <h3 className="font-bold">Easy to Use</h3>
                    <p className="mt-2 text-sm">
                      Intuitive interface designed for all users regardless of technical expertise
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <h3 className="font-bold">Comprehensive</h3>
                    <p className="mt-2 text-sm">
                      All school management features in one integrated platform
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <h3 className="font-bold">Secure</h3>
                    <p className="mt-2 text-sm">
                      Advanced security measures to protect sensitive school data
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

