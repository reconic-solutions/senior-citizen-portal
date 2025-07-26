import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/src/components/auth-provider';
import { NotificationProvider } from '@/lib/notification-context';
import { AccessibilityProvider } from '@/lib/accessibility-context';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Part Timer - Platform for Professionals 50+ or 10+ Years Experience',
  description: 'Connecting experienced professionals with meaningful opportunities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AccessibilityProvider>
          <AuthProvider>
            <NotificationProvider>
              {children}
              <Toaster />
            </NotificationProvider>
          </AuthProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}