'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Home, 
  Briefcase, 
  Users, 
  MessageCircle, 
  Building, 
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  BarChart3,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/employer', icon: Home },
  { name: 'My Jobs', href: '/employer/jobs', icon: Briefcase },
  { name: 'Applications', href: '/employer/applications', icon: Users },
  { name: 'Messages', href: '/employer/messages', icon: MessageCircle },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Analytics', href: '/employer/analytics', icon: BarChart3 },
  { name: 'Company Profile', href: '/employer/profile', icon: Building },
  { name: 'Settings', href: '/employer/settings', icon: Settings },
];

export function EmployerSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-6 border-b">
            <div className="bg-primary rounded-lg p-2 mr-3">
              <Building className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Part Timer</span>
          </div>

          {/* User Profile */}
          <div className="px-6 py-4 border-b">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-primary text-white">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Employer
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action */}
          <div className="px-4 py-4 border-b">
            <Link href="/employer/jobs/new" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black/50" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}