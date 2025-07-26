'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { 
  Clock, 
  Users, 
  Briefcase, 
  DollarSign, 
  FileText, 
  Settings,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AccessibilityControls } from '@/components/accessibility-controls';
import { NotificationCenter } from '@/components/notification-center';
import { PartTimerLogo } from '@/components/part-timer-logo';
import { AuthPopup } from '@/components/auth-popup';

interface ProfessionalMenuProps {
  className?: string;
}

export function ProfessionalMenu({ className }: ProfessionalMenuProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      title: 'Find Work',
      href: '/jobs',
      description: 'Browse senior-friendly opportunities',
      icon: Briefcase,
      items: [
        { title: 'Browse Jobs', href: '/jobs', description: 'Find your perfect senior role' },
        { title: 'Remote Work', href: '/jobs?type=remote', description: 'Work from anywhere' },
        { title: 'Flexible Hours', href: '/jobs?type=flexible', description: 'Set your own schedule' },
        { title: 'Consulting Roles', href: '/jobs?type=consulting', description: 'Share your expertise' },
      ]
    },
    {
      title: 'Hire Talent',
      href: '/hire',
      description: 'Find experienced professionals 50+',
      icon: Users,
      items: [
        { title: 'Post a Job', href: '/employer/jobs/new', description: 'Find seasoned talent' },
        { title: 'Browse Senior Profiles', href: '/talent', description: 'Discover experienced professionals' },
        { title: 'Pricing Plans', href: '/pricing', description: 'Choose your plan' },
        { title: 'Success Stories', href: '/success-stories', description: 'See what others achieved' },
      ]
    },
    {
      title: 'Services',
      href: '/services',
      description: 'Professional tools for seniors',
      icon: Settings,
      items: [
        { title: 'Contract Management', href: '/contracts', description: 'Manage your agreements' },
        { title: 'Invoice & Payments', href: '/invoices', description: 'Handle billing seamlessly' },
        { title: 'Time Tracking', href: '/time-tracking', description: 'Track your work hours' },
        { title: 'Senior Support', href: '/senior-support', description: 'Dedicated senior assistance' },
      ]
    },
    {
      title: 'Resources',
      href: '/resources',
      description: 'Guides for senior professionals',
      icon: FileText,
      items: [
        { title: 'Senior Career Guide', href: '/resources/senior-career', description: 'Career tips for 50+' },
        { title: 'Age Discrimination Help', href: '/resources/age-discrimination', description: 'Know your rights' },
        { title: 'Technology Training', href: '/resources/tech-training', description: 'Stay current with tech' },
        { title: 'Help Center', href: '/help', description: 'Get support' },
      ]
    }
  ];

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60", className)}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <PartTimerLogo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.items.map((subItem) => (
                        <NavigationMenuLink key={subItem.title} asChild>
                          <Link
                            href={subItem.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{subItem.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {subItem.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <AccessibilityControls />
            <NotificationCenter />
            
            {/* Pricing Link */}
            <Link href="/pricing" className="hidden md:block">
              <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground">
                <DollarSign className="h-4 w-4 mr-2" />
                Pricing
              </Button>
            </Link>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white dark:bg-gray-900 py-4">
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  <div className="flex items-center text-gray-900 dark:text-white font-medium">
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.title}
                  </div>
                  <div className="ml-6 space-y-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t space-y-2">
                <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Pricing
                  </Button>
                </Link>
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}