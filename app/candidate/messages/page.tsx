'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Building,
  Clock,
  Paperclip,
  Phone,
  Video,
  MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  jobTitle?: string;
  company?: string;
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations: Message[] = [
    {
      id: '1',
      senderId: 'emp1',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      content: 'Thank you for your application. We would like to schedule an interview for next week.',
      timestamp: '2024-01-26T10:30:00Z',
      isRead: false,
      jobTitle: 'Senior Business Consultant',
      company: 'Strategic Solutions Inc'
    },
    {
      id: '2',
      senderId: 'emp2',
      senderName: 'Michael Chen',
      senderAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      content: 'Hi John, I reviewed your profile and I think you would be a great fit for our team.',
      timestamp: '2024-01-25T14:20:00Z',
      isRead: true,
      jobTitle: 'Part-time Bookkeeper',
      company: 'Local Accounting Firm'
    },
    {
      id: '3',
      senderId: 'emp3',
      senderName: 'Lisa Rodriguez',
      senderAvatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      content: 'Could you please provide more details about your consulting experience?',
      timestamp: '2024-01-24T09:15:00Z',
      isRead: true,
      jobTitle: 'Remote Customer Service Representative',
      company: 'TechSupport Plus'
    }
  ];

  const messageHistory = [
    {
      id: '1',
      senderId: 'emp1',
      content: 'Thank you for your application. We would like to schedule an interview for next week.',
      timestamp: '2024-01-26T10:30:00Z',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'me',
      content: 'Thank you for considering my application. I would be happy to schedule an interview. What times work best for you?',
      timestamp: '2024-01-26T11:00:00Z',
      isOwn: true
    },
    {
      id: '3',
      senderId: 'emp1',
      content: 'How about Tuesday at 2 PM? We can do it via video call or in person at our office.',
      timestamp: '2024-01-26T11:15:00Z',
      isOwn: false
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Messages</h1>
        <p className="text-gray-600">Communicate with potential employers</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="p-0 overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
            {filteredConversations.map((conversation, index) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-primary' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.senderAvatar} alt={conversation.senderName} />
                    <AvatarFallback>{conversation.senderName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{conversation.senderName}</h3>
                      {!conversation.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{conversation.company}</p>
                    <p className="text-xs text-gray-500 mb-2">{conversation.jobTitle}</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{conversation.content}</p>
                    <div className="flex items-center text-xs text-gray-400 mt-2">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(conversation.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          {selectedConv ? (
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConv.senderAvatar} alt={selectedConv.senderName} />
                    <AvatarFallback>{selectedConv.senderName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedConv.senderName}</h3>
                    <p className="text-sm text-gray-600">{selectedConv.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Job Context */}
              <div className="p-3 bg-blue-50 border-b">
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Regarding: {selectedConv.jobTitle}
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messageHistory.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}