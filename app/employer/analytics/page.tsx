'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Briefcase,
  Calendar,
  Download,
  Filter,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock analytics data
  const jobPerformanceData = [
    { date: '2024-01-01', views: 45, applications: 8 },
    { date: '2024-01-02', views: 52, applications: 12 },
    { date: '2024-01-03', views: 38, applications: 6 },
    { date: '2024-01-04', views: 67, applications: 15 },
    { date: '2024-01-05', views: 71, applications: 18 },
    { date: '2024-01-06', views: 59, applications: 11 },
    { date: '2024-01-07', views: 84, applications: 22 }
  ];

  const applicationStatusData = [
    { name: 'Pending', value: 45, color: '#F59E0B' },
    { name: 'Reviewed', value: 30, color: '#3B82F6' },
    { name: 'Accepted', value: 15, color: '#10B981' },
    { name: 'Rejected', value: 10, color: '#EF4444' }
  ];

  const topJobsData = [
    { title: 'Senior Marketing Strategist', views: 234, applications: 45, conversionRate: 19.2 },
    { title: 'Senior Financial Analyst', views: 189, applications: 32, conversionRate: 16.9 },
    { title: 'Customer Success Manager', views: 156, applications: 28, conversionRate: 17.9 },
    { title: 'Executive Mentor', views: 98, applications: 15, conversionRate: 15.3 }
  ];

  const candidateSourceData = [
    { source: 'Direct Search', candidates: 45 },
    { source: 'Job Alerts', candidates: 32 },
    { source: 'Referrals', candidates: 28 },
    { source: 'Social Media', candidates: 15 },
    { source: 'Email Campaign', candidates: 12 }
  ];

  const stats = [
    {
      label: 'Total Job Views',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Eye,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Total Applications',
      value: '456',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'Active Jobs',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Briefcase,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      label: 'Avg. Response Time',
      value: '2.3 days',
      change: '-0.5 days',
      trend: 'up',
      icon: Calendar,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your hiring performance and job metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center space-x-1">
                  {stat.trend === 'up' ? (
                    <ArrowUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Job Performance Chart */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6">Job Performance Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={jobPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
              <YAxis />
              <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
              <Area 
                type="monotone" 
                dataKey="views" 
                stackId="1"
                stroke="#3B82F6" 
                fill="#3B82F6"
                fillOpacity={0.6}
                name="Views"
              />
              <Area 
                type="monotone" 
                dataKey="applications" 
                stackId="2"
                stroke="#10B981" 
                fill="#10B981"
                fillOpacity={0.6}
                name="Applications"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Application Status Distribution */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6">Application Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={applicationStatusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {applicationStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Performing Jobs */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Top Performing Jobs</h2>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Job Title</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Views</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Applications</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Conversion Rate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {topJobsData.map((job, index) => (
                <motion.tr 
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{job.title}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 text-blue-600 mr-2" />
                      {job.views}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-green-600 mr-2" />
                      {job.applications}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={job.conversionRate > 18 ? 'default' : 'secondary'}>
                      {job.conversionRate}%
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="outline" className="text-green-700 bg-green-50">
                      Active
                    </Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Candidate Sources */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Candidate Sources</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={candidateSourceData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="source" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="candidates" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Insights and Recommendations */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Insights & Recommendations</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-medium text-green-900">Strong Performance</h4>
              </div>
              <p className="text-green-700 text-sm">
                Your "Senior Marketing Strategist" position has a 19.2% conversion rate, well above the industry average of 15%.
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-blue-900">Candidate Quality</h4>
              </div>
              <p className="text-blue-700 text-sm">
                85% of your applicants meet the minimum experience requirements, indicating good job targeting.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 text-yellow-600 mr-2" />
                <h4 className="font-medium text-yellow-900">Response Time</h4>
              </div>
              <p className="text-yellow-700 text-sm">
                Consider responding to applications faster. Your current 2.3-day average could be improved to 1-2 days.
              </p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="font-medium text-purple-900">Optimization Tip</h4>
              </div>
              <p className="text-purple-700 text-sm">
                Jobs posted on Tuesday-Thursday receive 23% more applications from senior professionals.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}