'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNotifications } from '@/lib/notification-context';
import { 
  Search, 
  Filter, 
  Bell, 
  Check, 
  CheckCheck, 
  Trash2, 
  ExternalLink,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Archive,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProfessionalMenu } from '@/components/professional-menu';

export default function NotificationsPage() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAll 
  } = useNotifications();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'read' && notification.read) ||
      (statusFilter === 'unread' && !notification.read);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-6 w-6 text-red-600" />;
      default:
        return <Info className="h-6 w-6 text-blue-600" />;
    }
  };

  const getNotificationBgColor = (type: string, read: boolean) => {
    const baseColor = read ? 'bg-gray-50' : '';
    switch (type) {
      case 'success':
        return read ? 'bg-green-50 border-green-200' : 'bg-green-100 border-green-300';
      case 'warning':
        return read ? 'bg-yellow-50 border-yellow-200' : 'bg-yellow-100 border-yellow-300';
      case 'error':
        return read ? 'bg-red-50 border-red-200' : 'bg-red-100 border-red-300';
      default:
        return read ? 'bg-blue-50 border-blue-200' : 'bg-blue-100 border-blue-300';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ProfessionalMenu />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Notifications</h1>
          <p className="text-gray-600">Stay updated with your Part Timer activity</p>
        </div>

        {/* Stats and Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-3xl font-bold text-gray-900">{notifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-3xl font-bold text-red-600">{unreadCount}</p>
              </div>
              <div className="relative">
                <Bell className="h-8 w-8 text-red-600" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Read</p>
                <p className="text-3xl font-bold text-green-600">{notifications.length - unreadCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-3xl font-bold text-purple-600">
                  {notifications.filter(n => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(n.timestamp) > weekAgo;
                  }).length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="grid md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setStatusFilter('all');
              }}
            >
              Clear Filters
            </Button>

            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <Button onClick={markAllAsRead} size="sm">
                  <CheckCheck className="h-4 w-4 mr-1" />
                  Mark All Read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button 
                  variant="destructive" 
                  onClick={clearAll} 
                  size="sm"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {notifications.length === 0 ? 'No notifications' : 'No notifications found'}
              </h3>
              <p className="text-gray-600">
                {notifications.length === 0 
                  ? "You're all caught up! New notifications will appear here."
                  : "No notifications match your current filters. Try adjusting your search criteria."
                }
              </p>
            </Card>
          ) : (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className={`p-6 transition-all hover:shadow-lg border-l-4 ${
                  getNotificationBgColor(notification.type, notification.read)
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-semibold text-lg ${
                          notification.read ? 'text-gray-700' : 'text-gray-900'
                        }`}>
                          {notification.title}
                          {!notification.read && (
                            <Badge variant="destructive" className="ml-2 text-xs">
                              New
                            </Badge>
                          )}
                        </h3>
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="hover:bg-white/50"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="hover:bg-red-100 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className={`text-base mb-4 leading-relaxed ${
                        notification.read ? 'text-gray-600' : 'text-gray-800'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          {formatTime(notification.timestamp)}
                        </div>
                        
                        {notification.actionUrl && (
                          <Link href={notification.actionUrl}>
                            <Button variant="outline" size="sm">
                              {notification.actionText || 'View'}
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}