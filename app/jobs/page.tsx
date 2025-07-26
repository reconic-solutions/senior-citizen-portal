'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { jobService } from '@/lib/data-service';
import { useAuth } from '@/lib/auth-context';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  DollarSign, 
  Calendar, 
  Briefcase,
  Heart,
  Eye,
  Users,
  Clock,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ProfessionalMenu } from '@/components/professional-menu';

export default function JobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, locationFilter, categoryFilter, typeFilter, sortBy, currentPage]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobService.getJobs({
        search: searchTerm,
        location: locationFilter,
        category: categoryFilter,
        type: typeFilter,
        sort_by: sortBy,
        page: currentPage,
        limit: 12
      });
      setJobs(response.jobs || []);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async (jobId: string) => {
    if (!user) {
      toast.error('Please sign in to save jobs');
      return;
    }

    try {
      await jobService.saveJob(jobId);
      toast.success('Job saved successfully');
      // Update the job's saved status in the local state
      setJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
      ));
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('Failed to save job');
    }
  };

  const categories = [
    'All Categories',
    'Consulting',
    'Finance',
    'Customer Service',
    'Education',
    'Healthcare',
    'Technology',
    'Marketing',
    'Sales',
    'Other'
  ];

  const jobTypes = [
    'All Types',
    'Remote',
    'On-site',
    'Hybrid'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ProfessionalMenu />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Senior-Friendly <span className="text-primary">Opportunities</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover part-time positions from employers who value experience and wisdom
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="grid md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Input
              placeholder="Location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category === 'All Categories' ? '' : category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map(type => (
                  <SelectItem key={type} value={type === 'All Types' ? '' : type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Newest First</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="company">Company A-Z</SelectItem>
                <SelectItem value="applications_count">Most Applied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${jobs.length} jobs found`}
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('');
                setCategoryFilter('');
                setTypeFilter('');
                setSortBy('created_at');
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="p-6 h-80 animate-pulse">
                <div className="bg-gray-200 h-4 rounded mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-lg group-hover:from-blue-200 group-hover:to-purple-200 transition-all">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="capitalize">
                        {job.type}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveJob(job.id);
                        }}
                        className="p-1"
                      >
                        <Heart className={`h-4 w-4 ${job.isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      </Button>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <Building className="h-4 w-4 mr-1" />
                    <span className="truncate">{job.company}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {job.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center text-green-600 font-semibold">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="text-sm">{job.salary}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="h-3 w-3 mr-1" />
                      {job.applicationsCount} applicants
                    </div>
                    <Link href={`/jobs/${job.id}`}>
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {/* No Results */}
        {!loading && jobs.length === 0 && (
          <Card className="p-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setLocationFilter('');
              setCategoryFilter('');
              setTypeFilter('');
            }}>
              Clear All Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}