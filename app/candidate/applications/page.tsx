'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/lib/auth-context';
import { applicationService } from '@/lib/data-service';
import { 
  Search, 
  Filter, 
  Eye, 
  MessageCircle,
  Download,
  Calendar,
  MapPin,
  Briefcase,
  Building,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function ApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await applicationService.getApplications();
        setApplications(response.applications || []);
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast.error('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const filteredApplications = applications.filter(application => {
    const job = application.job;
    if (!job) return false;

    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    pending: applications.filter(app => app.status === 'pending').length,
    reviewed: applications.filter(app => app.status === 'reviewed').length,
    accepted: applications.filter(app => app.status === 'accepted').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'reviewed':
        return <Eye className="h-4 w-4 text-blue-600" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
        <p className="text-gray-600">Track your job applications and their status</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-3xl font-bold text-gray-900">{applications.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
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
        <div className="grid md:grid-cols-3 gap-4">
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

          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      </Card>

      {/* Applications List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((application, index) => {
            const job = application.job;
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
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-xl text-gray-900">{job.title}</h3>
                          <Badge 
                            className={`capitalize ${getStatusColor(application.status)} ml-4`}
                          >
                            <span className="flex items-center">
                              {getStatusIcon(application.status)}
                              <span className="ml-1">{application.status}</span>
                            </span>
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-gray-600 mb-3">
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
                            Applied {new Date(application.appliedDate || application.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {job.description}
                        </p>
                        
                        {application.coverLetter && (
                          <div className="bg-gray-50 p-3 rounded-lg mb-4">
                            <p className="text-sm text-gray-600 font-medium mb-1">Your Cover Letter:</p>
                            <p className="text-sm text-gray-700 line-clamp-2">{application.coverLetter}</p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="text-primary font-semibold text-lg">
                            {job.salary}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Link href={`/candidate/jobs/${job.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View Job
                              </Button>
                            </Link>
                            {application.resumeUrl && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Resume
                              </Button>
                            )}
                            <Button size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Message
                            </Button>
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
      )}

      {!loading && filteredApplications.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-600 mb-6">
            {applications.length === 0 
              ? "You haven't applied to any jobs yet. Start browsing opportunities!"
              : "No applications match your current filters. Try adjusting your search criteria."
            }
          </p>
          {applications.length === 0 && (
            <Link href="/candidate/jobs">
              <Button>
                <Briefcase className="h-4 w-4 mr-2" />
                Browse Jobs
              </Button>
            </Link>
          )}
        </Card>
      )}
    </div>
  );
}