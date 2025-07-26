'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CandidateSidebar } from '@/components/candidate/sidebar';
import { AccessibilityControls } from '@/components/accessibility-controls';

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'candidate')) {
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

  if (!user || user.role !== 'candidate') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <CandidateSidebar />
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