'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import { mockJobs, mockApplications } from '@/lib/data/mock-data';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  AlertTriangle,
  Activity,
  Eye,
  MessageSquare,
  Shield,
  BarChart3,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const { user } = useAuth();

  // Mock analytics data
  const userGrowthData = [
    { month: 'Jan', candidates: 120, employers: 25 },
    { month: 'Feb', candidates: 150, employers: 32 },
    { month: 'Mar', candidates: 180, employers: 28 },
    { month: 'Apr', candidates: 220, employers: 35 },
    { month: 'May', candidates: 280, employers: 42 },
    { month: 'Jun', candidates: 320, employers: 48 }
  ];

  const jobCategoryData = [
    { name: 'Consulting', value: 35, color: '#3B82F6' },
    { name: 'Finance', value: 25, color: '#8B5CF6' },
    { name: 'Customer Service', value: 20, color: '#10B981' },
    { name: 'Education', value: 15, color: '#F59E0B' },
    { name: 'Other', value: 5, color: '#EF4444' }
  ];

  const stats = [
    {
      label: 'Total Users',
      value: '2,847',
      icon: Users,
      color: 'text-blue-600 bg-blue-100',
      change: '+12% from last month',
      trend: 'up'
    },
    {
      label: 'Active Jobs',
      value: '156',
      icon: Briefcase,
      color: 'text-green-600 bg-green-100',
      change: '+8% from last month',
      trend: 'up'
    },
    {
      label: 'Applications',
      value: '1,234',
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-100',
      change: '+15% from last month',
      trend: 'up'
    },
    {
      label: 'Flagged Content',
      value: '3',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100',
      change: '-2 from last week',
      trend: 'down'
    }
  ];

  const recentActivity = [
    { id: 1, type: 'user_signup', message: 'New candidate registered: John Smith', time: '2 minutes ago', icon: Users },
    { id: 2, type: 'job_posted', message: 'New job posted: Senior Consultant at ABC Corp', time: '15 minutes ago', icon: Briefcase },
    { id: 3, type: 'application', message: 'Application submitted for Marketing Manager role', time: '1 hour ago', icon: TrendingUp },
    { id: 4, type: 'message', message: 'New message between employer and candidate', time: '2 hours ago', icon: MessageSquare },
    { id: 5, type: 'flag', message: 'Content flagged for review', time: '3 hours ago', icon: AlertTriangle }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-blue-100 text-lg">
          Monitor platform activity and manage the Part Timer community.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
            <Shield className="mr-2 h-5 w-5" />
            Moderate Content
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            <BarChart3 className="mr-2 h-5 w-5" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
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
                <Badge 
                  variant={stat.trend === 'up' ? 'default' : 'secondary'} 
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
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
        {/* User Growth Chart */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="candidates" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="Candidates"
              />
              <Line 
                type="monotone" 
                dataKey="employers" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                name="Employers"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Job Categories */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6">Job Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={jobCategoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {jobCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Activity</h2>
          <Button variant="outline">
            <Activity className="mr-2 h-4 w-4" />
            View All Logs
          </Button>
        </div>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div 
              key={activity.id}
              className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`p-2 rounded-lg ${
                activity.type === 'flag' ? 'bg-red-100 text-red-600' :
                activity.type === 'job_posted' ? 'bg-green-100 text-green-600' :
                activity.type === 'user_signup' ? 'bg-blue-100 text-blue-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                <activity.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  {activity.time}
                </p>
              </div>
              <Button size="sm" variant="ghost">
                <Eye className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
          <p className="text-gray-600 text-sm mb-4">View and manage all registered users</p>
          <Button className="w-full">View Users</Button>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <Briefcase className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Job Management</h3>
          <p className="text-gray-600 text-sm mb-4">Monitor and moderate job postings</p>
          <Button className="w-full">Manage Jobs</Button>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Content Moderation</h3>
          <p className="text-gray-600 text-sm mb-4">Review flagged content and reports</p>
          <Button className="w-full">Review Content</Button>
        </Card>
      </div>
    </div>
  );
}