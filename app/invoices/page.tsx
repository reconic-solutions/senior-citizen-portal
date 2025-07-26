'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Receipt, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Send,
  Calendar,
  DollarSign,
  User,
  Building,
  CheckCircle,
  Clock,
  AlertTriangle,
  CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ProfessionalMenu } from '@/components/professional-menu';

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  description: string;
  paymentMethod?: string;
}

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const invoices: Invoice[] = [
    {
      id: '1',
      number: 'INV-001',
      client: 'Tech Solutions Inc',
      amount: '$2,500.00',
      status: 'paid',
      issueDate: '2024-01-15',
      dueDate: '2024-02-15',
      description: 'Website development services - January 2024',
      paymentMethod: 'Credit Card'
    },
    {
      id: '2',
      number: 'INV-002',
      client: 'StartupCo',
      amount: '$1,800.00',
      status: 'sent',
      issueDate: '2024-01-20',
      dueDate: '2024-02-20',
      description: 'Marketing consultation services'
    },
    {
      id: '3',
      number: 'INV-003',
      client: 'BlogMaster',
      amount: '$950.00',
      status: 'overdue',
      issueDate: '2023-12-15',
      dueDate: '2024-01-15',
      description: 'Content writing and SEO services'
    },
    {
      id: '4',
      number: 'INV-004',
      client: 'Design Studio',
      amount: '$3,200.00',
      status: 'draft',
      issueDate: '2024-01-25',
      dueDate: '2024-02-25',
      description: 'UI/UX design project'
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'sent':
        return <Send className="h-4 w-4 text-blue-600" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'cancelled':
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
      default:
        return <Receipt className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const totalAmount = invoices.reduce((sum, invoice) => {
    return sum + parseFloat(invoice.amount.replace('$', '').replace(',', ''));
  }, 0);

  const paidAmount = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => {
      return sum + parseFloat(invoice.amount.replace('$', '').replace(',', ''));
    }, 0);

  const pendingAmount = invoices
    .filter(invoice => invoice.status === 'sent' || invoice.status === 'overdue')
    .reduce((sum, invoice) => {
      return sum + parseFloat(invoice.amount.replace('$', '').replace(',', ''));
    }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ProfessionalMenu />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Invoices</h1>
            <p className="text-gray-600">Create, send, and track your invoices</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                New Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-600">Invoice creation form will be implemented here.</p>
                <Button className="w-full">Create Invoice</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                <p className="text-3xl font-bold text-gray-900">{invoices.length}</p>
              </div>
              <Receipt className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-3xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid</p>
                <p className="text-3xl font-bold text-green-600">${paidAmount.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search invoices..."
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
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
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

        {/* Invoices List */}
        <div className="space-y-4">
          {filteredInvoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-lg">
                      <Receipt className="h-6 w-6 text-blue-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-xl text-gray-900">{invoice.number}</h3>
                          <p className="text-gray-600">{invoice.client}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge className={`capitalize ${getStatusColor(invoice.status)}`}>
                            <span className="flex items-center">
                              {getStatusIcon(invoice.status)}
                              <span className="ml-1">{invoice.status}</span>
                            </span>
                          </Badge>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">{invoice.amount}</p>
                            {invoice.paymentMethod && (
                              <p className="text-sm text-gray-500 flex items-center">
                                <CreditCard className="h-3 w-3 mr-1" />
                                {invoice.paymentMethod}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Issued: {new Date(invoice.issueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {invoice.description}
                      </p>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {invoice.status === 'draft' && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Send className="h-4 w-4 mr-1" />
                            Send
                          </Button>
                        )}
                        {invoice.status === 'sent' && (
                          <Button size="sm" variant="outline">
                            <Send className="h-4 w-4 mr-1" />
                            Resend
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <Card className="p-12 text-center">
            <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No invoices found</h3>
            <p className="text-gray-600 mb-6">
              {invoices.length === 0 
                ? "You haven't created any invoices yet. Start by creating your first invoice."
                : "No invoices match your current filters. Try adjusting your search criteria."
              }
            </p>
            {invoices.length === 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Invoice
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Invoice</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-gray-600">Invoice creation form will be implemented here.</p>
                    <Button className="w-full">Create Invoice</Button>
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