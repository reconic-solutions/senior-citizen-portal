'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  fontSize: 'normal' | 'large' | 'extra-large';
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const storedFontSize = localStorage.getItem('accessibility-font-size') as 'normal' | 'large' | 'extra-large';
    const storedHighContrast = localStorage.getItem('accessibility-high-contrast') === 'true';
    const storedReducedMotion = localStorage.getItem('accessibility-reduced-motion') === 'true';
    const storedDarkMode = localStorage.getItem('accessibility-dark-mode') === 'true';

    if (storedFontSize) setFontSize(storedFontSize);
    if (storedHighContrast) setHighContrast(storedHighContrast);
    if (storedReducedMotion) setReducedMotion(storedReducedMotion);
    if (storedDarkMode) setDarkMode(storedDarkMode);
  }, []);

  useEffect(() => {
    // Apply font size classes
    document.documentElement.classList.remove('text-large', 'text-extra-large');
    if (fontSize === 'large') {
      document.documentElement.classList.add('text-large');
    } else if (fontSize === 'extra-large') {
      document.documentElement.classList.add('text-extra-large');
    }
    localStorage.setItem('accessibility-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    // Apply high contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('accessibility-high-contrast', highContrast.toString());
  }, [highContrast]);

  useEffect(() => {
    // Apply reduced motion
    if (reducedMotion) {
      document.documentElement.style.setProperty('--motion-duration', '0s');
    } else {
      document.documentElement.style.removeProperty('--motion-duration');
    }
    localStorage.setItem('accessibility-reduced-motion', reducedMotion.toString());
  }, [reducedMotion]);

  useEffect(() => {
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('accessibility-dark-mode', darkMode.toString());
  }, [darkMode]);

  return (
    <AccessibilityContext.Provider value={{
      fontSize,
      setFontSize,
      highContrast,
      setHighContrast,
      reducedMotion,
      setReducedMotion,
      darkMode,
      setDarkMode
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}