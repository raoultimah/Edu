import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type Table = 
  | 'academic_years'
  | 'terms'
  | 'classes'
  | 'sections'
  | 'subjects'
  | 'subject_assignments'
  | 'students'
  | 'guardians'
  | 'employees'
  | 'attendance'
  | 'exams'
  | 'marks'
  | 'fees'
  | 'payments';

type Event = 'INSERT' | 'UPDATE' | 'DELETE' | '*';

interface UseRealtimeDataOptions<T> {
  table: Table;
  event?: Event;
  initialData?: T[];
  filter?: string;
  filterValue?: string | number;
}

export function useRealtimeData<T>({
  table,
  event = '*',
  initialData = [],
  filter,
  filterValue,
}: UseRealtimeDataOptions<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  useEffect(() => {
    let channel: RealtimeChannel;

    const fetchData = async () => {
      try {
        setLoading(true);
        let query = supabase.from(table).select('*');
        
        if (filter && filterValue !== undefined) {
          query = query.eq(filter, filterValue);
        }
        
        const { data: fetchedData, error: fetchError } = await query;
        
        if (fetchError) {
          throw fetchError;
        }
        
        setData(fetchedData as T[]);
      } catch (err) {
        setError(err as Error);
        console.error(`Error fetching data from ${table}:`, err);
      } finally {
        setLoading(false);
      }
    };

    const setupSubscription = async () => {
      channel = supabase
        .channel(`${table}-changes`)
        .on(
          'postgres_changes',
          {
            event,
            schema: 'public',
            table,
          },
          async (payload: RealtimePostgresChangesPayload<T>) => {
            // Handle different events
            if (payload.eventType === 'INSERT') {
              // If there's a filter, check if the new record matches
              if (filter && filterValue !== undefined) {
                if ((payload.new as any)[filter] === filterValue) {
                  setData((currentData) => [...currentData, payload.new]);
                }
              } else {
                setData((currentData) => [...currentData, payload.new]);
              }
            } else if (payload.eventType === 'UPDATE') {
              setData((currentData) =>
                currentData.map((item) =>
                  (item as any).id === (payload.new as any).id ? payload.new : item
                )
              );
            } else if (payload.eventType === 'DELETE') {
              setData((currentData) =>
                currentData.filter((item) => (item as any).id !== (payload.old as any).id)
              );
            }
          }
        )
        .subscribe();
    };

    fetchData();
    setupSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [table, event, filter, filterValue, supabase]);

  // Function to add a new item with optimistic update
  const addItem = async (newItem: Partial<T>) => {
    try {
      // Optimistic update
      const tempId = `temp-${Date.now()}`;
      const optimisticItem = { ...newItem, id: tempId } as T;
      
      setData((currentData) => [...currentData, optimisticItem]);
      
      // Actual API call
      const { data: insertedData, error: insertError } = await supabase
        .from(table)
        .insert(newItem)
        .select()
        .single();
      
      if (insertError) {
        throw insertError;
      }
      
      // Update with actual data
      setData((currentData) =>
        currentData.map((item) =>
          (item as any).id === tempId ? insertedData : item
        )
      );
      
      return insertedData;
    } catch (err) {
      // Revert optimistic update on error
      setData((currentData) =>
        currentData.filter((item) => (item as any).id !== `temp-${Date.now()}`)
      );
      
      setError(err as Error);
      console.error(`Error adding item to ${table}:`, err);
      throw err;
    }
  };

  // Function to update an item with optimistic update
  const updateItem = async (id: string, updates: Partial<T>) => {
    try {
      // Store original item for rollback
      const originalItem = data.find((item) => (item as any).id === id);
      
      // Optimistic update
      setData((currentData) =>
        currentData.map((item) =>
          (item as any).id === id ? { ...item, ...updates } : item
        )
      );
      
      // Actual API call
      const { data: updatedData, error: updateError } = await supabase
        .from(table)
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (updateError) {
        throw updateError;
      }
      
      // Update with actual data
      setData((currentData) =>
        currentData.map((item) =>
          (item as any).id === id ? updatedData : item
        )
      );
      
      return updatedData;
    } catch (err) {
      // Revert optimistic update on error
      const originalItem = data.find((item) => (item as any).id === id);
      
      if (originalItem) {
        setData((currentData) =>
          currentData.map((item) =>
            (item as any).id === id ? originalItem : item
          )
        );
      }
      
      setError(err as Error);
      console.error(`Error updating item in ${table}:`, err);
      throw err;
    }
  };

  // Function to delete an item with optimistic update
  const deleteItem = async (id: string) => {
    try {
      // Store original item for rollback
      const originalItem = data.find((item) => (item as any).id === id);
      
      // Optimistic update
      setData((currentData) =>
        currentData.filter((item) => (item as any).id !== id)
      );
      
      // Actual API call
      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      
      if (deleteError) {
        throw deleteError;
      }
      
      return true;
    } catch (err) {
      // Revert optimistic update on error
      const originalItem = data.find((item) => (item as any).id === id);
      
      if (originalItem) {
        setData((currentData) => [...currentData, originalItem]);
      }
      
      setError(err as Error);
      console.error(`Error deleting item from ${table}:`, err);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
  };
}

