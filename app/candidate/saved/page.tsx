'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jobService } from '@/lib/data-service';
import { 
  Search, 
  Heart, 
  Eye, 
  Building,
  MapPin,
  DollarSign,
  Trash2,
  Briefcase,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function SavedJobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);
        const response = await jobService.getSavedJobs();
        setSavedJobs(response.jobs || []);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
        toast.error('Failed to load saved jobs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSavedJobs();
  }, []);

  const filteredJobs = savedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleRemoveFromSaved = async (jobId: string) => {
    try {
      await jobService.saveJob(jobId); // This toggles saved status
      setSavedJobs(prev => prev.filter(job => job.id !== jobId));
      toast.success('Job removed from saved list');
    } catch (error) {
      console.error('Error removing job from saved list:', error);
      toast.error('Failed to remove job from saved list');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Jobs</h1>
        <p className="text-gray-600">Keep track of jobs you're interested in</p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search saved jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Customer Service">Customer Service</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Consulting">Consulting</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      </Card>

      {/* Stats */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Saved</p>
                <p className="text-3xl font-bold text-gray-900">{savedJobs.length}</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Remote Jobs</p>
                <p className="text-3xl font-bold text-gray-900">
                  {savedJobs.filter(job => job.type === 'remote').length}
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Applied To</p>
                <p className="text-3xl font-bold text-gray-900">
                  {savedJobs.filter(job => job.applicationStatus).length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </Card>
        </div>
      )}

      {/* Saved Jobs List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
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
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge variant="secondary" className="capitalize">
                            {job.type}
                          </Badge>
                          <Badge variant="outline">
                            {job.category}
                          </Badge>
                        </div>
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
                          <Clock className="h-4 w-4 mr-1" />
                          Saved {new Date(job.savedAt || job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {job.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-primary font-semibold">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveFromSaved(job.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                          <Link href={`/candidate/jobs/${job.id}`}>
                            <Button size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && filteredJobs.length === 0 && (
        <Card className="p-12 text-center">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved jobs found</h3>
          <p className="text-gray-600 mb-6">
            {savedJobs.length === 0 
              ? "You haven't saved any jobs yet. Start browsing and save jobs you're interested in!"
              : "No jobs match your current filters. Try adjusting your search criteria."
            }
          </p>
          <Link href="/candidate/jobs">
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Browse Jobs
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}