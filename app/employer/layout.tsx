'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { EmployerSidebar } from '@/components/employer/sidebar';
import { AccessibilityControls } from '@/components/accessibility-controls';

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'employer')) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || user.role !== 'employer') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <EmployerSidebar />
        <div className="flex-1 lg:ml-64">
          <div className="absolute top-4 right-4 z-10">
            <AccessibilityControls />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}