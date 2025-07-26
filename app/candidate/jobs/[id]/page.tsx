'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/lib/auth-context';
import { jobService, applicationService } from '@/lib/data-service';

// Mock users data for candidates
const mockUsers = [
  {
    id: '4',
    name: 'Margaret Thompson',
    email: 'margaret@example.com',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
  },
  {
    id: '5',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
  }
];

import { 
  Search, 
  Filter, 
  Users, 
  Eye, 
  MessageCircle,
  Download,
  Calendar,
  MapPin,
  Briefcase,
  Star,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function ApplicationsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');

  // Get employer's jobs and applications
  const employerJobs = mockJobs.filter(job => job.employerId === user?.id);
  const employerApplications = mockApplications.filter(app => 
    employerJobs.some(job => job.id === app.jobId)
  );

  // Mock additional applications for demo
  const allApplications = [
    ...employerApplications.map(app => {
      // Find the candidate info
      const candidate = mockUsers.find(u => u.id === app.candidateId);
      return {
        ...app,
        candidateName: candidate?.name || 'Unknown',
        candidateEmail: candidate?.email || 'unknown@example.com',
        candidateAvatar: candidate?.avatar
      };
    }),
    {
      id: '2',
      jobId: '1',
      candidateId: '4',
      candidateName: 'Margaret Thompson',
      candidateEmail: 'margaret@example.com',
      candidateAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      status: 'reviewed',
      appliedDate: '2024-01-24',
      coverLetter: 'I am excited about this opportunity to bring my 25 years of consulting experience to your team.',
      resume: 'margaret-thompson-resume.pdf',
      rating: 5
    },
    {
      id: '3',
      jobId: '2',
      candidateId: '5',
      candidateName: 'Robert Johnson',
      candidateEmail: 'robert@example.com',
      candidateAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      status: 'pending',
      appliedDate: '2024-01-23',
      coverLetter: 'With my CPA certification and 20 years in accounting, I would be a valuable addition to your team.',
      resume: 'robert-johnson-resume.pdf',
      rating: 4
    }
  ];

  const filteredApplications = allApplications.filter(application => {
    const job = mockJobs.find(j => j.id === application.jobId);
    if (!job) return false;
    
    const matchesSearch = application.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    const matchesJob = jobFilter === 'all' || application.jobId === jobFilter;
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    toast.success(`Application ${newStatus} successfully`);
  };

  const statusCounts = {
    pending: allApplications.filter(app => app.status === 'pending').length,
    reviewed: allApplications.filter(app => app.status === 'reviewed').length,
    accepted: allApplications.filter(app => app.status === 'accepted').length,
    rejected: allApplications.filter(app => app.status === 'rejected').length,
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Applications</h1>
        <p className="text-gray-600">Review and manage candidate applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-3xl font-bold text-gray-900">{allApplications.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{statusCounts.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reviewed</p>
              <p className="text-3xl font-bold text-blue-600">{statusCounts.reviewed}</p>
            </div>
            <Eye className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Accepted</p>
              <p className="text-3xl font-bold text-green-600">{statusCounts.accepted}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={jobFilter} onValueChange={setJobFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              {employerJobs.map(job => (
                <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setJobFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application, index) => {
          const job = mockJobs.find(j => j.id === application.jobId);
          if (!job) return null;
          
          return (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={application.candidateAvatar} alt={application.candidateName} />
                      <AvatarFallback className="text-lg">
                        {application.candidateName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-xl text-gray-900">{application.candidateName}</h3>
                          <p className="text-gray-600">{application.candidateEmail}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge 
                            variant={
                              application.status === 'accepted' ? 'default' :
                              application.status === 'rejected' ? 'destructive' :
                              application.status === 'reviewed' ? 'secondary' :
                              'outline'
                            }
                            className="capitalize"
                          >
                            {application.status}
                          </Badge>
                          {application.rating && (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium ml-1">{application.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.title}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Applied {new Date(application.appliedDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                      </div>
                      
                      {application.coverLetter && (
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <p className="text-sm text-gray-600 font-medium mb-1">Cover Letter:</p>
                          <p className="text-sm text-gray-700 line-clamp-2">{application.coverLetter}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {application.resume && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Resume
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {application.status === 'pending' && (
                            <>
                              <Button 
                                size="sm"
                                onClick={() => handleStatusChange(application.id, 'accepted')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleStatusChange(application.id, 'rejected')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {application.status === 'reviewed' && (
                            <Button 
                              size="sm"
                              onClick={() => handleStatusChange(application.id, 'accepted')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredApplications.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-600">
            {allApplications.length === 0 
              ? "No applications have been received yet. Make sure your job postings are active."
              : "No applications match your current filters. Try adjusting your search criteria."
            }
          </p>
        </Card>
      )}
    </div>
  );
}