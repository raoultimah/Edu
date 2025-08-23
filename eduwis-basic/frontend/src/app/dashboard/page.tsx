import { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard | EDU-WISE BASIC',
  description: 'EDU-WISE BASIC School Management System Dashboard',
};

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Quick Stats Cards */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Students</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Total enrolled students</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Teachers</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Active teaching staff</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Classes</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Active classes</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Events</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Upcoming events</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-gray-500 dark:text-gray-400 italic">No recent activity to display.</p>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/students" className="text-blue-600 dark:text-blue-400 hover:underline">Manage Students</a>
            </li>
            <li>
              <a href="/teachers" className="text-blue-600 dark:text-blue-400 hover:underline">Manage Teachers</a>
            </li>
            <li>
              <a href="/classes" className="text-blue-600 dark:text-blue-400 hover:underline">Manage Classes</a>
            </li>
            <li>
              <a href="/settings" className="text-blue-600 dark:text-blue-400 hover:underline">System Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

