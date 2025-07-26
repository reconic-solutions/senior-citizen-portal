import { z } from 'zod';

// User validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  role: z.enum(['candidate', 'employer'], {
    required_error: 'Role must be either candidate or employer',
  }),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: z.string().optional(),
  location: z.string().max(255).optional(),
  age: z.number().int().min(18).max(120).optional(),
  bio: z.string().max(1000).optional(),
  skills: z.array(z.string()).optional(),
  experience: z.any().optional(),
  education: z.any().optional(),
  preferences: z.any().optional(),
});

// Job validation schemas
export const createJobSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(255),
  company: z.string().min(2, 'Company name must be at least 2 characters').max(255),
  location: z.string().min(2, 'Location must be at least 2 characters').max(255),
  type: z.enum(['remote', 'on-site', 'hybrid']),
  category: z.string().min(2).max(100),
  description: z.string().min(50, 'Description must be at least 50 characters').max(5000),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  salary: z.string().max(100).optional(),
  minAge: z.number().int().min(18).max(100).optional(),
  maxAge: z.number().int().min(18).max(100).optional(),
  experienceLevel: z.string().optional(),
  applicationDeadline: z.string().optional(),
});

export const updateJobSchema = z.object({
  title: z.string().min(5).max(255).optional(),
  company: z.string().min(2).max(255).optional(),
  location: z.string().min(2).max(255).optional(),
  type: z.enum(['remote', 'on-site', 'hybrid']).optional(),
  category: z.string().min(2).max(100).optional(),
  description: z.string().min(50).max(5000).optional(),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  salary: z.string().max(100).optional(),
  minAge: z.number().int().min(18).max(100).optional(),
  maxAge: z.number().int().min(18).max(100).optional(),
  experienceLevel: z.string().optional(),
  isActive: z.boolean().optional(),
  applicationDeadline: z.string().optional(),
});

// Application validation schemas
export const createApplicationSchema = z.object({
  jobId: z.string().uuid('Invalid job ID'),
  coverLetter: z.string().max(2000).optional(),
});

export const updateApplicationSchema = z.object({
  status: z.enum(['pending', 'reviewed', 'accepted', 'rejected']).optional(),
  notes: z.string().max(1000).optional(),
  rating: z.number().int().min(1).max(5).optional(),
});

// Message validation schemas
export const createMessageSchema = z.object({
  receiverId: z.string().uuid('Invalid receiver ID'),
  content: z.string().min(1, 'Message content is required').max(2000),
  jobId: z.string().uuid().optional(),
  applicationId: z.string().uuid().optional(),
});

// Contract validation schemas
export const createContractSchema = z.object({
  freelancerId: z.string().uuid('Invalid freelancer ID'),
  title: z.string().min(5).max(255),
  description: z.string().max(2000).optional(),
  contractType: z.enum(['hourly', 'fixed', 'milestone']),
  value: z.number().positive().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  terms: z.string().optional(),
});

// Invoice validation schemas
export const createInvoiceSchema = z.object({
  clientId: z.string().uuid('Invalid client ID'),
  contractId: z.string().uuid().optional(),
  amount: z.number().positive('Amount must be positive'),
  description: z.string().max(1000).optional(),
  dueDate: z.string(),
});

// Pagination schema
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

// Search schema
export const searchSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  type: z.enum(['remote', 'on-site', 'hybrid']).optional(),
  minAge: z.number().int().optional(),
  sortBy: z.enum(['created_at', 'title', 'company', 'applications_count', 'views_count']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});