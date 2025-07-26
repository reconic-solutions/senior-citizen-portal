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
import { useAuth } from '@/lib/auth-context';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  GraduationCap,
  Award,
  Upload,
  Save,
  Edit,
  Plus,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    age: '62',
    bio: 'Experienced business professional with over 30 years in consulting and strategic planning. Passionate about mentoring and sharing knowledge with the next generation.',
    skills: ['Business Strategy', 'Project Management', 'Team Leadership', 'Financial Analysis'],
    experience: [
      {
        title: 'Senior Business Consultant',
        company: 'ABC Consulting Group',
        duration: '2015 - 2023',
        description: 'Led strategic initiatives for Fortune 500 companies, resulting in average 15% revenue growth.'
      },
      {
        title: 'Operations Manager',
        company: 'XYZ Corporation',
        duration: '2010 - 2015',
        description: 'Managed daily operations for a team of 50+ employees, improved efficiency by 25%.'
      }
    ],
    education: [
      {
        degree: 'MBA in Business Administration',
        school: 'Harvard Business School',
        year: '1985'
      },
      {
        degree: 'Bachelor of Science in Economics',
        school: 'University of Pennsylvania',
        year: '1983'
      }
    ],
    preferences: {
      jobType: 'hybrid',
      salaryRange: '$60,000 - $100,000',
      availability: 'part-time'
    }
  });

  const handleSave = () => {
    updateProfile({ name: profileData.name });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Profile</h1>
          <p className="text-gray-600">Manage your professional information</p>
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
        {/* Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-2xl bg-primary text-white">
                    {user?.name?.charAt(0)}
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
              <h2 className="text-xl font-bold text-gray-900 mb-1">{profileData.name}</h2>
              <p className="text-gray-600 mb-4">Senior Professional</p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {profileData.email}
                </div>
                <div className="flex items-center justify-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {profileData.phone}
                </div>
                <div className="flex items-center justify-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {profileData.location}
                </div>
                <div className="flex items-center justify-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {profileData.age} years old
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Job Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Job Preferences
              </h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Job Type</Label>
                  {isEditing ? (
                    <Select value={profileData.preferences.jobType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="on-site">On-site</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-gray-900 capitalize">{profileData.preferences.jobType}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Salary Range</Label>
                  <p className="text-gray-900">{profileData.preferences.salaryRange}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Availability</Label>
                  <p className="text-gray-900 capitalize">{profileData.preferences.availability}</p>
                </div>
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
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Basic Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="bio">Professional Summary</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  className="mt-1"
                  rows={4}
                />
              </div>
            </Card>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
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
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Work Experience
              </h3>
              <div className="space-y-4">
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4 pb-4">
                    <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-600 mb-2">{exp.duration}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
              {isEditing && (
                <Button variant="outline" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              )}
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Education
              </h3>
              <div className="space-y-4">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-accent pl-4">
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    <p className="text-accent font-medium">{edu.school}</p>
                    <p className="text-sm text-gray-600">{edu.year}</p>
                  </div>
                ))}
              </div>
              {isEditing && (
                <Button variant="outline" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}