import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import type { Database } from '@/types/supabase';

export const createClient = (req: NextRequest, res: NextResponse) => {
  return createMiddlewareClient<Database>({ req, res });
}

