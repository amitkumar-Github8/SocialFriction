'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="text-xl font-bold">
                  Social Friction
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/dashboard"
                    className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-700"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/tracking"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Track Usage
                  </Link>
                  <Link
                    href="/goals"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Goals
                  </Link>
                  <Link
                    href="/journal"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Journal
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}!</h2>
              <p className="mb-4">This is your Social Friction dashboard where you can track and manage your social media usage.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-medium text-lg mb-2">Track Usage</h3>
                  <p className="text-gray-600 mb-4">Record the time you spend on social media platforms.</p>
                  <Link
                    href="/tracking"
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Track Now →
                  </Link>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-medium text-lg mb-2">Set Goals</h3>
                  <p className="text-gray-600 mb-4">Create goals to reduce your social media usage.</p>
                  <Link
                    href="/goals"
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Set Goals →
                  </Link>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-medium text-lg mb-2">Journal</h3>
                  <p className="text-gray-600 mb-4">Reflect on your digital habits and well-being.</p>
                  <Link
                    href="/journal"
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Write Entry →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
