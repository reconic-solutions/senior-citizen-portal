'use client';

import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PartTimerLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export function PartTimerLogo({ size = 'md', showText = true, className }: PartTimerLogoProps) {
  const sizeClasses = {
    sm: {
      icon: 'h-6 w-6',
      container: 'p-1.5',
      text: 'text-lg',
      tagline: 'text-xs'
    },
    md: {
      icon: 'h-7 w-7',
      container: 'p-2',
      text: 'text-2xl',
      tagline: 'text-xs'
    },
    lg: {
      icon: 'h-8 w-8',
      container: 'p-2',
      text: 'text-3xl',
      tagline: 'text-sm'
    },
    xl: {
      icon: 'h-12 w-12',
      container: 'p-3',
      text: 'text-5xl',
      tagline: 'text-base'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className={cn(
        "bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 rounded-xl shadow-lg",
        currentSize.container
      )}>
        <Clock className={cn("text-white", currentSize.icon)} />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            "font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent",
            currentSize.text
          )}>
            Part Timer
          </span>
          {size !== 'sm' && (
            <span className={cn(
              "text-gray-500 dark:text-gray-400 -mt-1 font-medium",
              currentSize.tagline
            )}>
              For Experienced Professionals 50+
            </span>
          )}
        </div>
      )}
    </div>
  );
}