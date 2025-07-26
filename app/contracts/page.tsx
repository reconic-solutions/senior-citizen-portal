'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit,
  Calendar,
  DollarSign,
  User,
  Building,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ProfessionalMenu } from '@/components/professional-menu';

interface Contract {
  id: string;
  title: string;
  client: string;
  freelancer: string;
  status: 'draft' | 'pending' | 'active' | 'completed' | 'cancelled';
  value: string;
  startDate: string;
  endDate: string;
  type: 'hourly' | 'fixed' | 'milestone';
  description: string;
}

export default function ContractsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const contracts: Contract[] = [
    {
      id: '1',
      title: 'Website Development Project',
      client: 'Tech Solutions Inc',
      freelancer: 'John Smith',
      status: 'active',
      value: '$5,000',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      type: 'fixed',
      description: 'Development of a responsive business website with CMS integration'
    },
    {
      id: '2',
      title: 'Marketing Consultation',
      client: 'StartupCo',
      freelancer: 'Sarah Johnson',
      status: 'pending',
      value: '$75/hour',
      startDate: '2024-02-01',
      endDate: '2024-04-01',
      type: 'hourly',
      description: 'Strategic marketing consultation for product launch'
    },
    {
      id: '3',
      title: 'Content Writing Services',
      client: 'BlogMaster',
      freelancer: 'Mike Wilson',
      status: 'completed',
      value: '$2,500',
      startDate: '2023-12-01',
      endDate: '2024-01-31',
      type: 'milestone',
      description: 'Blog content creation and SEO optimization'
    }
  ];

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.freelancer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesType = typeFilter === 'all' || contract.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'cancelled':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ProfessionalMenu />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Contracts</h1>
            <p className="text-gray-600">Manage your work agreements and contracts</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                New Contract
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Contract</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-600">Contract creation form will be implemented here.</p>
                <Button className="w-full">Create Contract</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contracts</p>
                <p className="text-3xl font-bold text-gray-900">{contracts.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-3xl font-bold text-green-600">
                  {contracts.filter(c => c.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {contracts.filter(c => c.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-blue-600">
                  {contracts.filter(c => c.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search contracts..."
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
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="fixed">Fixed Price</SelectItem>
                <SelectItem value="milestone">Milestone</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </Card>

        {/* Contracts List */}
        <div className="space-y-4">
          {filteredContracts.map((contract, index) => (
            <motion.div
              key={contract.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-xl text-gray-900">{contract.title}</h3>
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge className={`capitalize ${getStatusColor(contract.status)}`}>
                            <span className="flex items-center">
                              {getStatusIcon(contract.status)}
                              <span className="ml-1">{contract.status}</span>
                            </span>
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {contract.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center text-gray-600">
                          <Building className="h-4 w-4 mr-2" />
                          <span>Client: {contract.client}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <User className="h-4 w-4 mr-2" />
                          <span>Freelancer: {contract.freelancer}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2" />
                          <span>Value: {contract.value}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>
                            {new Date(contract.startDate).toLocaleDateString()} - {new Date(contract.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {contract.description}
                      </p>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredContracts.length === 0 && (
          <Card className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No contracts found</h3>
            <p className="text-gray-600 mb-6">
              {contracts.length === 0 
                ? "You haven't created any contracts yet. Start by creating your first contract."
                : "No contracts match your current filters. Try adjusting your search criteria."
              }
            </p>
            {contracts.length === 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Contract
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Contract</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-gray-600">Contract creation form will be implemented here.</p>
                    <Button className="w-full">Create Contract</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}