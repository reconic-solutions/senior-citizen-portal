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
  Save,
  Building,
  Users,
  CreditCard,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function EmployerSettingsPage() {
  const { user, logout } = useAuth();
  const { fontSize, setFontSize, highContrast, setHighContrast, reducedMotion, setReducedMotion } = useAccessibility();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newApplications: true,
    messageAlerts: true,
    jobExpirations: true,
    weeklyReports: true,
    candidateRecommendations: false
  });

  const [privacy, setPrivacy] = useState({
    companyVisibility: 'public',
    showContactInfo: true,
    allowDirectContact: true,
    showJobStats: false
  });

  const [billing, setBilling] = useState({
    plan: 'professional',
    autoRenew: true,
    invoiceEmail: user?.email || '',
    billingAddress: '123 Business Ave, New York, NY 10001'
  });

  const [hiring, setHiring] = useState({
    autoRejectAfterDays: 30,
    requireCoverLetter: false,
    ageInclusiveLanguage: true,
    seniorFriendlyBadge: true
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: 60
  });

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const handleCancelSubscription = () => {
    if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features.')) {
      toast.error('Subscription cancellation requested. You will receive a confirmation email.');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your company account? This action cannot be undone and will remove all your job postings.')) {
      toast.error('Account deletion requested. You will receive a confirmation email.');
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Settings</h1>
        <p className="text-gray-600">Manage your company account preferences and settings</p>
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
              <a href="#hiring" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                <Users className="mr-3 h-4 w-4" />
                Hiring Preferences
              </a>
              <a href="#privacy" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                <Shield className="mr-3 h-4 w-4" />
                Privacy
              </a>
              <a href="#billing" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                <CreditCard className="mr-3 h-4 w-4" />
                Billing
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
                  <h3 className="font-medium mb-3">Hiring Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>New Applications</span>
                      <Switch
                        checked={notifications.newApplications}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, newApplications: checked }))}
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
                      <span>Job Expirations</span>
                      <Switch
                        checked={notifications.jobExpirations}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, jobExpirations: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Weekly Reports</span>
                      <Switch
                        checked={notifications.weeklyReports}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReports: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Candidate Recommendations</span>
                      <Switch
                        checked={notifications.candidateRecommendations}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, candidateRecommendations: checked }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Hiring Preferences */}
          <motion.div
            id="hiring"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Hiring Preferences
              </h2>
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Auto-reject applications after (days)</Label>
                  <p className="text-sm text-gray-600 mb-3">Automatically reject old applications</p>
                  <Select value={hiring.autoRejectAfterDays.toString()} onValueChange={(value) => setHiring(prev => ({ ...prev, autoRejectAfterDays: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="0">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Require Cover Letter</span>
                      <p className="text-sm text-gray-600">Make cover letters mandatory for applications</p>
                    </div>
                    <Switch
                      checked={hiring.requireCoverLetter}
                      onCheckedChange={(checked) => setHiring(prev => ({ ...prev, requireCoverLetter: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Age-Inclusive Language</span>
                      <p className="text-sm text-gray-600">Use age-friendly language in job postings</p>
                    </div>
                    <Switch
                      checked={hiring.ageInclusiveLanguage}
                      onCheckedChange={(checked) => setHiring(prev => ({ ...prev, ageInclusiveLanguage: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Senior-Friendly Badge</span>
                      <p className="text-sm text-gray-600">Display badge showing you welcome 50+ candidates</p>
                    </div>
                    <Switch
                      checked={hiring.seniorFriendlyBadge}
                      onCheckedChange={(checked) => setHiring(prev => ({ ...prev, seniorFriendlyBadge: checked }))}
                    />
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
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Privacy
              </h2>
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Company Profile Visibility</Label>
                  <p className="text-sm text-gray-600 mb-3">Control who can see your company profile</p>
                  <Select value={privacy.companyVisibility} onValueChange={(value) => setPrivacy(prev => ({ ...prev, companyVisibility: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can see</SelectItem>
                      <SelectItem value="candidates">Candidates Only</SelectItem>
                      <SelectItem value="private">Private - Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Show Contact Information</span>
                    <Switch
                      checked={privacy.showContactInfo}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showContactInfo: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Allow Direct Contact</span>
                    <Switch
                      checked={privacy.allowDirectContact}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, allowDirectContact: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Show Job Statistics</span>
                    <Switch
                      checked={privacy.showJobStats}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showJobStats: checked }))}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Billing Settings */}
          <motion.div
            id="billing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Billing & Subscription
              </h2>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Current Plan: Professional</h3>
                  <p className="text-blue-700 text-sm">$99/month - 15 active job postings, advanced analytics</p>
                </div>

                <div>
                  <Label htmlFor="invoice-email" className="text-base font-medium">Invoice Email</Label>
                  <Input
                    id="invoice-email"
                    value={billing.invoiceEmail}
                    onChange={(e) => setBilling(prev => ({ ...prev, invoiceEmail: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="billing-address" className="text-base font-medium">Billing Address</Label>
                  <Input
                    id="billing-address"
                    value={billing.billingAddress}
                    onChange={(e) => setBilling(prev => ({ ...prev, billingAddress: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Auto-renew subscription</span>
                    <p className="text-sm text-gray-600">Automatically renew your subscription</p>
                  </div>
                  <Switch
                    checked={billing.autoRenew}
                    onCheckedChange={(checked) => setBilling(prev => ({ ...prev, autoRenew: checked }))}
                  />
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View Invoices
                  </Button>
                  <Button variant="outline">
                    Change Plan
                  </Button>
                  <Button variant="destructive" onClick={handleCancelSubscription}>
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            id="security"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
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

                <div>
                  <Label className="text-base font-medium">Session Timeout</Label>
                  <p className="text-sm text-gray-600 mb-3">Automatically log out after inactivity</p>
                  <Select value={security.sessionTimeout.toString()} onValueChange={(value) => setSecurity(prev => ({ ...prev, sessionTimeout: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                      <SelectItem value="0">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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

          {/* Account Management */}
          <motion.div
            id="account"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
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
                    Once you delete your company account, there is no going back. All job postings and applications will be permanently removed.
                  </p>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    size="sm"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Company Account
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