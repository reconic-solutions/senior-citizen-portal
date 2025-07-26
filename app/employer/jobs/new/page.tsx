'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Users, 
  Calendar,
  Plus,
  X,
  Save,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function NewJobPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [newRequirement, setNewRequirement] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    category: '',
    description: '',
    requirements: [],
    benefits: [],
    salary: '',
    minAge: '',
    maxAge: '',
    experienceLevel: '',
    isActive: true,
    applicationDeadline: ''
  });

  const steps = [
    { id: 1, title: 'Basic Information', icon: Briefcase },
    { id: 2, title: 'Job Details', icon: Users },
    { id: 3, title: 'Requirements & Benefits', icon: Calendar },
    { id: 4, title: 'Review & Publish', icon: Eye }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setJobData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setJobData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setJobData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const removeBenefit = (index: number) => {
    setJobData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    toast.success('Job posted successfully!');
    router.push('/employer/jobs');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title" className="text-lg">Job Title *</Label>
                <Input
                  id="title"
                  value={jobData.title}
                  onChange={(e) => setJobData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Senior Business Consultant"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="company" className="text-lg">Company Name *</Label>
                <Input
                  id="company"
                  value={jobData.company}
                  onChange={(e) => setJobData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Your company name"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="location" className="text-lg">Location *</Label>
                <Input
                  id="location"
                  value={jobData.location}
                  onChange={(e) => setJobData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., New York, NY or Remote"
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-lg">Job Type *</Label>
                <Select value={jobData.type} onValueChange={(value) => setJobData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="on-site">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-lg">Category *</Label>
              <Select value={jobData.category} onValueChange={(value) => setJobData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consulting">Consulting</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Customer Service">Customer Service</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="description" className="text-lg">Job Description *</Label>
              <Textarea
                id="description"
                value={jobData.description}
                onChange={(e) => setJobData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the role, responsibilities, and what makes this position special for senior professionals..."
                className="mt-2 min-h-[120px]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="salary" className="text-lg">Salary Range *</Label>
                <Input
                  id="salary"
                  value={jobData.salary}
                  onChange={(e) => setJobData(prev => ({ ...prev, salary: e.target.value }))}
                  placeholder="e.g., $60,000 - $80,000 or $25/hour"
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-lg">Experience Level</Label>
                <Select value={jobData.experienceLevel} onValueChange={(value) => setJobData(prev => ({ ...prev, experienceLevel: value }))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="minAge" className="text-lg">Minimum Age</Label>
                <Input
                  id="minAge"
                  type="number"
                  value={jobData.minAge}
                  onChange={(e) => setJobData(prev => ({ ...prev, minAge: e.target.value }))}
                  placeholder="e.g., 50"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="maxAge" className="text-lg">Maximum Age</Label>
                <Input
                  id="maxAge"
                  type="number"
                  value={jobData.maxAge}
                  onChange={(e) => setJobData(prev => ({ ...prev, maxAge: e.target.value }))}
                  placeholder="e.g., 70 (optional)"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="deadline" className="text-lg">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={jobData.applicationDeadline}
                  onChange={(e) => setJobData(prev => ({ ...prev, applicationDeadline: e.target.value }))}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg">Requirements</Label>
              <p className="text-sm text-gray-600 mb-3">Add specific requirements for this position</p>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="e.g., 10+ years of experience in..."
                    onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                  />
                  <Button onClick={addRequirement} type="button">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {jobData.requirements.map((req, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                      {req}
                      <button
                        onClick={() => removeRequirement(index)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label className="text-lg">Benefits & Perks</Label>
              <p className="text-sm text-gray-600 mb-3">Highlight what makes this position attractive</p>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="e.g., Flexible schedule, Health insurance..."
                    onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
                  />
                  <Button onClick={addBenefit} type="button">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {jobData.benefits.map((benefit, index) => (
                    <Badge key={index} variant="outline" className="text-sm py-1 px-3">
                      {benefit}
                      <button
                        onClick={() => removeBenefit(index)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={jobData.isActive}
                onCheckedChange={(checked) => setJobData(prev => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="active">Publish job immediately</Label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Job Preview</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-2xl text-gray-900">{jobData.title}</h4>
                  <p className="text-gray-600">{jobData.company}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{jobData.type}</Badge>
                  <Badge variant="outline">{jobData.category}</Badge>
                  <Badge variant="outline">{jobData.location}</Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                    <span>{jobData.salary}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    <span>Age: {jobData.minAge}+ years</span>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Description</h5>
                  <p className="text-gray-700">{jobData.description}</p>
                </div>
                
                {jobData.requirements.length > 0 && (
                  <div>
                    <h5 className="font-medium mb-2">Requirements</h5>
                    <ul className="list-disc list-inside space-y-1">
                      {jobData.requirements.map((req, index) => (
                        <li key={index} className="text-gray-700">{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {jobData.benefits.length > 0 && (
                  <div>
                    <h5 className="font-medium mb-2">Benefits</h5>
                    <div className="flex flex-wrap gap-2">
                      {jobData.benefits.map((benefit, index) => (
                        <Badge key={index} variant="outline">{benefit}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Job Posting</h1>
        <p className="text-gray-600">Create a job posting to attract experienced professionals</p>
      </div>

      {/* Progress Steps */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= step.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-primary' : 'text-gray-600'
                }`}>
                  Step {step.id}
                </p>
                <p className="text-xs text-gray-500">{step.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Form Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {steps[currentStep - 1].title}
          </h2>
          {renderStep()}
        </Card>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        <div className="flex space-x-4">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          
          {currentStep === 4 ? (
            <Button onClick={handleSubmit}>
              <Briefcase className="mr-2 h-4 w-4" />
              Publish Job
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}