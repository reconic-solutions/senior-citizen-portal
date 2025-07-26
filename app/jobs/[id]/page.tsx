'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { jobService, applicationService } from '@/lib/data-service';
import { useAuth } from '@/lib/auth-context';
import { 
  ArrowLeft,
  MapPin, 
  Building, 
  DollarSign, 
  Calendar, 
  Briefcase,
  Heart,
  Share2,
  Users,
  Clock,
  CheckCircle,
  Send,
  Eye,
  Star,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ProfessionalMenu } from '@/components/professional-menu';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchJob(params.id as string);
    }
  }, [params.id]);

  const fetchJob = async (jobId: string) => {
    try {
      setLoading(true);
      const response = await jobService.getJobById(jobId);
      setJob(response.job);
    } catch (error) {
      console.error('Error fetching job:', error);
      toast.error('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async () => {
    if (!user) {
      toast.error('Please sign in to save jobs');
      return;
    }

    try {
      await jobService.saveJob(job.id);
      setJob(prev => ({ ...prev, isSaved: !prev.isSaved }));
      toast.success(job.isSaved ? 'Job removed from saved' : 'Job saved successfully');
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('Failed to save job');
    }
  };

  const handleApply = async () => {
    if (!user) {
      toast.error('Please sign in to apply for jobs');
      return;
    }

    if (user.role !== 'candidate') {
      toast.error('Only job seekers can apply for jobs');
      return;
    }

    try {
      setApplying(true);
      await applicationService.applyToJob(job.id, coverLetter);
      setJob(prev => ({ ...prev, applicationStatus: 'pending' }));
      setApplicationDialogOpen(false);
      setCoverLetter('');
      toast.success('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying to job:', error);
      toast.error('Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job opportunity: ${job.title} at ${job.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Job link copied to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <ProfessionalMenu />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-8 rounded mb-4"></div>
            <div className="bg-gray-200 h-64 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <ProfessionalMenu />
        <div className="container mx-auto px-4 py-8">
          <Card className="p-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Job not found</h3>
            <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Link href="/jobs">
              <Button>Browse Other Jobs</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const canApply = user && user.role === 'candidate' && !job.applicationStatus;
  const hasApplied = job.applicationStatus;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ProfessionalMenu />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg">
                      <Briefcase className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                      <div className="flex items-center space-x-4 text-gray-600 mb-4">
                        <span className="flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {job.company}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Posted {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="capitalize">
                          {job.type}
                        </Badge>
                        <Badge variant="outline">
                          {job.category}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          50+ Welcome
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={handleSaveJob}>
                      <Heart className={`h-4 w-4 mr-1 ${job.isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                      {job.isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Salary</p>
                      <p className="font-semibold text-green-600">{job.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Applicants</p>
                      <p className="font-semibold">{job.applicationsCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-5 w-5 text-purple-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Views</p>
                      <p className="font-semibold">{job.viewsCount}</p>
                    </div>
                  </div>
                </div>

                {hasApplied && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-900">
                        You have applied to this job
                      </span>
                      <Badge variant="outline" className="ml-2 capitalize">
                        {job.applicationStatus}
                      </Badge>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((benefit, index) => (
                      <Badge key={index} variant="outline" className="text-sm py-1 px-3">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">{job.salary}</div>
                  <p className="text-gray-600">Competitive salary for experienced professionals</p>
                </div>

                {canApply ? (
                  <Dialog open={applicationDialogOpen} onOpenChange={setApplicationDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full mb-4" size="lg">
                        <Send className="mr-2 h-5 w-5" />
                        Apply Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Apply for {job.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
                          <Textarea
                            id="cover-letter"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Tell the employer why you're interested in this position and what makes you a great fit..."
                            className="mt-2 min-h-[120px]"
                          />
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-blue-800">
                            Your profile information and resume will be automatically included with your application.
                          </p>
                        </div>
                        <div className="flex space-x-3">
                          <Button
                            onClick={handleApply}
                            disabled={applying}
                            className="flex-1"
                          >
                            {applying ? 'Submitting...' : 'Submit Application'}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setApplicationDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : hasApplied ? (
                  <Button className="w-full mb-4" disabled>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Applied
                  </Button>
                ) : (
                  <Link href="/auth/login">
                    <Button className="w-full mb-4" size="lg">
                      Sign In to Apply
                    </Button>
                  </Link>
                )}

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-green-600" />
                    <span>Age-friendly employer</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    <span>Values experience</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-purple-600" />
                    <span>Flexible schedule</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">About the Company</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={job.employerAvatar} alt={job.company} />
                    <AvatarFallback>
                      {job.company.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{job.company}</h4>
                    <p className="text-sm text-gray-600">{job.employerName}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  A forward-thinking company that values the experience and wisdom of senior professionals.
                </p>
              </Card>
            </motion.div>

            {/* Job Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Job Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applications</span>
                    <span className="font-medium">{job.applicationsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Views</span>
                    <span className="font-medium">{job.viewsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted</span>
                    <span className="font-medium">{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                  {job.applicationDeadline && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deadline</span>
                      <span className="font-medium">{new Date(job.applicationDeadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}