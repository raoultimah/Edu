'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface UseRealtimeDataOptions {
  table: string;
  column?: string;
  value?: string | number;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
}

export function useRealtimeData<T>({
  table,
  column,
  value,
  orderBy,
  limit,
}: UseRealtimeDataOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  useEffect(() => {
    let subscription: RealtimeChannel;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        let query = supabase.from(table).select('*');
        
        if (column && value !== undefined) {
          query = query.eq(column, value);
        }
        
        if (orderBy) {
          query = query.order(orderBy.column, {
            ascending: orderBy.ascending ?? true,
          });
        }
        
        if (limit) {
          query = query.limit(limit);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        setData(data as T[]);
      } catch (err: any) {
        console.error(`Error fetching data from ${table}:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up realtime subscription
    subscription = supabase
      .channel(`${table}-changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setData((prev) => [...prev, payload.new as T]);
          } else if (payload.eventType === 'UPDATE') {
            setData((prev) =>
              prev.map((item) =>
                (item as any).id === payload.new.id ? (payload.new as T) : item
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setData((prev) =>
              prev.filter((item) => (item as any).id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [table, column, value, orderBy, limit, supabase]);

  return { data, loading, error };
}

