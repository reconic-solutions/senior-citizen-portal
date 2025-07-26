'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth-context';
import { useAccessibility } from '@/lib/accessibility-context';
import { 
  Settings, 
  Bell, 
  Shield, 
  Eye, 
  Mail, 
  Smartphone,
  Globe,
  Lock,
  Trash2,
  Save
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { fontSize, setFontSize, highContrast, setHighContrast, reducedMotion, setReducedMotion } = useAccessibility();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    jobAlerts: true,
    messageAlerts: true,
    applicationUpdates: true,
    weeklyDigest: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showAge: true,
    showLocation: true,
    allowMessages: true
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true
  });

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion requested. You will receive a confirmation email.');
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your account preferences and privacy settings</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              <a href="#accessibility" className="flex items-center px-3 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg">
                <Eye className="mr-3 h-4 w-4" />
                Accessibility
              </a>
              <a href="#notifications" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell className="mr-3 h-4 w-4" />
                Notifications
              </a>
              <a href="#privacy" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                <Shield className="mr-3 h-4 w-4" />
                Privacy
              </a>
              <a href="#security" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                <Lock className="mr-3 h-4 w-4" />
                Security
              </a>
              <a href="#account" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                <Settings className="mr-3 h-4 w-4" />
                Account
              </a>
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Accessibility Settings */}
          <motion.div
            id="accessibility"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Accessibility
              </h2>
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Font Size</Label>
                  <p className="text-sm text-gray-600 mb-3">Choose a comfortable reading size</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={fontSize === 'normal' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFontSize('normal')}
                    >
                      Normal
                    </Button>
                    <Button
                      variant={fontSize === 'large' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFontSize('large')}
                    >
                      Large
                    </Button>
                    <Button
                      variant={fontSize === 'extra-large' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFontSize('extra-large')}
                    >
                      X-Large
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">High Contrast Mode</Label>
                    <p className="text-sm text-gray-600">Improve text visibility</p>
                  </div>
                  <Switch
                    checked={highContrast}
                    onCheckedChange={setHighContrast}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Reduce Motion</Label>
                    <p className="text-sm text-gray-600">Minimize animations and transitions</p>
                  </div>
                  <Switch
                    checked={reducedMotion}
                    onCheckedChange={setReducedMotion}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            id="notifications"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Notification Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Email Notifications</span>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Push Notifications</span>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Smartphone className="mr-2 h-4 w-4 text-gray-500" />
                        <span>SMS Notifications</span>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Notification Types</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Job Alerts</span>
                      <Switch
                        checked={notifications.jobAlerts}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, jobAlerts: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Message Alerts</span>
                      <Switch
                        checked={notifications.messageAlerts}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, messageAlerts: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Application Updates</span>
                      <Switch
                        checked={notifications.applicationUpdates}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, applicationUpdates: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Weekly Digest</span>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyDigest: checked }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            id="privacy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Privacy
              </h2>
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Profile Visibility</Label>
                  <p className="text-sm text-gray-600 mb-3">Control who can see your profile</p>
                  <Select value={privacy.profileVisibility} onValueChange={(value) => setPrivacy(prev => ({ ...prev, profileVisibility: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can see</SelectItem>
                      <SelectItem value="employers">Employers Only</SelectItem>
                      <SelectItem value="private">Private - Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Show Age on Profile</span>
                    <Switch
                      checked={privacy.showAge}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showAge: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Show Location</span>
                    <Switch
                      checked={privacy.showLocation}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showLocation: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Allow Direct Messages</span>
                    <Switch
                      checked={privacy.allowMessages}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, allowMessages: checked }))}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            id="security"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Security
              </h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="current-password" className="text-base font-medium">Change Password</Label>
                  <div className="space-y-3 mt-3">
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Current password"
                    />
                    <Input
                      type="password"
                      placeholder="New password"
                    />
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                    />
                    <Button variant="outline" size="sm">
                      Update Password
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Two-Factor Authentication</span>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                    <Switch
                      checked={security.twoFactor}
                      onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, twoFactor: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Login Alerts</span>
                    <Switch
                      checked={security.loginAlerts}
                      onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, loginAlerts: checked }))}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Account Settings */}
          <motion.div
            id="account"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Account Management
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button onClick={handleSaveSettings} size="lg">
                    <Save className="mr-2 h-4 w-4" />
                    Save All Settings
                  </Button>
                  <Button variant="outline" onClick={logout}>
                    Sign Out
                  </Button>
                </div>

                <Separator />

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-900 mb-2">Danger Zone</h3>
                  <p className="text-sm text-red-700 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    size="sm"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}