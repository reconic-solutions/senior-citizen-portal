'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/lib/auth-context';
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Users,
  Award,
  Upload,
  Save,
  Edit,
  Plus,
  X,
  Star,
  Shield,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function EmployerProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newBenefit, setNewBenefit] = useState('');
  
  const [companyData, setCompanyData] = useState({
    name: user?.name || 'Tech Solutions Inc',
    email: user?.email || '',
    phone: '+1 (555) 987-6543',
    website: 'https://techsolutions.com',
    location: 'New York, NY',
    industry: 'Technology',
    companySize: '50-200',
    founded: '2010',
    description: 'We are a leading technology solutions company focused on hiring experienced professionals who bring wisdom and expertise to our team. We believe that age and experience are valuable assets.',
    benefits: ['Health Insurance', 'Flexible Schedule', 'Remote Work Options', 'Professional Development', 'Retirement Plan'],
    values: ['Age Inclusivity', 'Experience Valued', 'Work-Life Balance', 'Professional Growth'],
    certifications: ['Equal Opportunity Employer', 'Age-Friendly Workplace Certified'],
    socialMedia: {
      linkedin: 'https://linkedin.com/company/techsolutions',
      twitter: 'https://twitter.com/techsolutions',
      facebook: 'https://facebook.com/techsolutions'
    },
    preferences: {
      ageInclusiveHiring: true,
      flexibleSchedules: true,
      remoteWork: true,
      seniorMentorship: true
    }
  });

  const handleSave = () => {
    updateProfile({ name: companyData.name });
    setIsEditing(false);
    toast.success('Company profile updated successfully!');
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !companyData.benefits.includes(newBenefit.trim())) {
      setCompanyData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const removeBenefit = (benefitToRemove: string) => {
    setCompanyData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(benefit => benefit !== benefitToRemove)
    }));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Profile</h1>
          <p className="text-gray-600">Manage your company information and hiring preferences</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          size="lg"
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-5 w-5" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="mr-2 h-5 w-5" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Company Overview */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={user?.avatar} alt={companyData.name} />
                  <AvatarFallback className="text-2xl bg-primary text-white">
                    {companyData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{companyData.name}</h2>
              <p className="text-gray-600 mb-4">{companyData.industry}</p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {companyData.email}
                </div>
                <div className="flex items-center justify-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {companyData.phone}
                </div>
                <div className="flex items-center justify-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {companyData.location}
                </div>
                <div className="flex items-center justify-center">
                  <Globe className="h-4 w-4 mr-2" />
                  <a href={companyData.website} className="text-blue-600 hover:underline">
                    Website
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Certifications
              </h3>
              <div className="space-y-3">
                {companyData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Company Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Our Values
              </h3>
              <div className="flex flex-wrap gap-2">
                {companyData.values.map((value, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {value}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Company Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={companyData.name}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select 
                    value={companyData.industry} 
                    onValueChange={(value) => setCompanyData(prev => ({ ...prev, industry: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Consulting">Consulting</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="company-size">Company Size</Label>
                  <Select 
                    value={companyData.companySize} 
                    onValueChange={(value) => setCompanyData(prev => ({ ...prev, companySize: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="founded">Founded</Label>
                  <Input
                    id="founded"
                    value={companyData.founded}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, founded: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={companyData.phone}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={companyData.website}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, website: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={companyData.location}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, location: e.target.value }))}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  value={companyData.description}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, description: e.target.value }))}
                  disabled={!isEditing}
                  className="mt-1"
                  rows={4}
                />
              </div>
            </Card>
          </motion.div>

          {/* Benefits & Perks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Benefits & Perks
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {companyData.benefits.map((benefit, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                    {benefit}
                    {isEditing && (
                      <button
                        onClick={() => removeBenefit(benefit)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a benefit..."
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
                  />
                  <Button onClick={addBenefit} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Hiring Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Hiring Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Age-Inclusive Hiring</Label>
                    <p className="text-sm text-gray-600">Actively welcome candidates 50+</p>
                  </div>
                  <Switch
                    checked={companyData.preferences.ageInclusiveHiring}
                    onCheckedChange={(checked) => 
                      setCompanyData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, ageInclusiveHiring: checked }
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Flexible Schedules</Label>
                    <p className="text-sm text-gray-600">Offer flexible working hours</p>
                  </div>
                  <Switch
                    checked={companyData.preferences.flexibleSchedules}
                    onCheckedChange={(checked) => 
                      setCompanyData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, flexibleSchedules: checked }
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Remote Work Options</Label>
                    <p className="text-sm text-gray-600">Support remote and hybrid work</p>
                  </div>
                  <Switch
                    checked={companyData.preferences.remoteWork}
                    onCheckedChange={(checked) => 
                      setCompanyData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, remoteWork: checked }
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Senior Mentorship Programs</Label>
                    <p className="text-sm text-gray-600">Leverage senior expertise for mentoring</p>
                  </div>
                  <Switch
                    checked={companyData.preferences.seniorMentorship}
                    onCheckedChange={(checked) => 
                      setCompanyData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, seniorMentorship: checked }
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Social Media & Online Presence
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={companyData.socialMedia.linkedin}
                    onChange={(e) => setCompanyData(prev => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, linkedin: e.target.value }
                    }))}
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={companyData.socialMedia.twitter}
                    onChange={(e) => setCompanyData(prev => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                    }))}
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={companyData.socialMedia.facebook}
                    onChange={(e) => setCompanyData(prev => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                    }))}
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="https://facebook.com/..."
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}