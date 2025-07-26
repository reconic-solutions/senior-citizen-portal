// This file is deprecated - all data is now handled by the database
// Keeping type definitions for reference

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'remote' | 'on-site' | 'hybrid';
  category: string;
  description: string;
  requirements: string[];
  salary: string;
  postedDate: string;
  minAge: number;
  employerId: string;
  logo?: string;
  isActive: boolean;
  applicationsCount: number;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName?: string;
  candidateEmail?: string;
  candidateAvatar?: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedDate: string;
  coverLetter?: string;
  resume?: string;
  rating?: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  jobId?: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// All data is now fetched from the database via API endpoints
// Use the data-service.ts file for API calls instead