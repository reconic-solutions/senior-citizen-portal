'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Settings, Type, Eye, Zap, Moon, Sun } from 'lucide-react';
import { useAccessibility } from '@/lib/accessibility-context';

export function AccessibilityControls() {
  const {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
    darkMode,
    setDarkMode
  } = useAccessibility();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Accessibility Settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Accessibility Settings
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium flex items-center mb-3">
                <Type className="h-4 w-4 mr-2" />
                Font Size
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={fontSize === 'normal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFontSize('normal')}
                  className="text-sm"
                >
                  Normal
                </Button>
                <Button
                  variant={fontSize === 'large' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFontSize('large')}
                  className="text-base"
                >
                  Large
                </Button>
                <Button
                  variant={fontSize === 'extra-large' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFontSize('extra-large')}
                  className="text-lg"
                >
                  X-Large
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="flex items-center text-base font-medium">
                {darkMode ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                Dark Mode
              </Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="flex items-center text-base font-medium">
                <Eye className="h-4 w-4 mr-2" />
                High Contrast
              </Label>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={setHighContrast}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="flex items-center text-base font-medium">
                <Zap className="h-4 w-4 mr-2" />
                Reduce Motion
              </Label>
              <Switch
                id="reduced-motion"
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
            </div>
          </div>

          <div className="text-xs text-gray-500 pt-2 border-t dark:text-gray-400">
            Settings are saved automatically and persist across sessions.
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}