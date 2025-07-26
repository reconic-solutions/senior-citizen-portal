import { 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  boolean, 
  timestamp, 
  integer, 
  decimal,
  date,
  jsonb,
  pgEnum
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'candidate', 'employer']);
export const userStatusEnum = pgEnum('user_status', ['pending', 'approved', 'rejected']);
export const jobTypeEnum = pgEnum('job_type', ['remote', 'on-site', 'hybrid']);
export const applicationStatusEnum = pgEnum('application_status', ['pending', 'reviewed', 'accepted', 'rejected']);
export const notificationTypeEnum = pgEnum('notification_type', ['info', 'success', 'warning', 'error']);
export const contractStatusEnum = pgEnum('contract_status', ['draft', 'pending', 'active', 'completed', 'cancelled']);
export const contractTypeEnum = pgEnum('contract_type', ['hourly', 'fixed', 'milestone']);
export const invoiceStatusEnum = pgEnum('invoice_status', ['draft', 'sent', 'paid', 'overdue', 'cancelled']);
export const messageTypeEnum = pgEnum('message_type', ['text', 'file', 'system']);

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull(),
  status: userStatusEnum('status').default('pending').notNull(),
  profileComplete: boolean('profile_complete').default(false),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  phone: varchar('phone', { length: 50 }),
  location: varchar('location', { length: 255 }),
  age: integer('age'),
  bio: text('bio'),
  skills: text('skills').array(),
  experience: jsonb('experience'),
  education: jsonb('education'),
  preferences: jsonb('preferences'),
  emailVerified: boolean('email_verified').default(false),
  emailVerificationToken: varchar('email_verification_token', { length: 255 }),
  passwordResetToken: varchar('password_reset_token', { length: 255 }),
  passwordResetExpires: timestamp('password_reset_expires'),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Jobs table
export const jobs = pgTable('jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  employerId: uuid('employer_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  type: jobTypeEnum('type').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  description: text('description').notNull(),
  requirements: text('requirements').array(),
  benefits: text('benefits').array(),
  salary: varchar('salary', { length: 100 }),
  minAge: integer('min_age').default(50),
  maxAge: integer('max_age'),
  experienceLevel: varchar('experience_level', { length: 50 }),
  isActive: boolean('is_active').default(true),
  applicationDeadline: date('application_deadline'),
  applicationsCount: integer('applications_count').default(0),
  viewsCount: integer('views_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Applications table
export const applications = pgTable('applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'cascade' }).notNull(),
  candidateId: uuid('candidate_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  status: applicationStatusEnum('status').default('pending').notNull(),
  coverLetter: text('cover_letter'),
  resumeUrl: varchar('resume_url', { length: 500 }),
  appliedDate: timestamp('applied_date').defaultNow(),
  reviewedDate: timestamp('reviewed_date'),
  responseDate: timestamp('response_date'),
  notes: text('notes'),
  rating: integer('rating'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Messages table
export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  senderId: uuid('sender_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  receiverId: uuid('receiver_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'set null' }),
  applicationId: uuid('application_id').references(() => applications.id, { onDelete: 'set null' }),
  content: text('content').notNull(),
  isRead: boolean('is_read').default(false),
  messageType: messageTypeEnum('message_type').default('text'),
  fileUrl: varchar('file_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Notifications table
export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: notificationTypeEnum('type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false),
  actionUrl: varchar('action_url', { length: 500 }),
  actionText: varchar('action_text', { length: 100 }),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Contracts table
export const contracts = pgTable('contracts', {
  id: uuid('id').primaryKey().defaultRandom(),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'set null' }),
  employerId: uuid('employer_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  freelancerId: uuid('freelancer_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  status: contractStatusEnum('status').default('draft').notNull(),
  contractType: contractTypeEnum('contract_type').notNull(),
  value: decimal('value', { precision: 10, scale: 2 }),
  currency: varchar('currency', { length: 3 }).default('USD'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  terms: text('terms'),
  signedByEmployer: boolean('signed_by_employer').default(false),
  signedByFreelancer: boolean('signed_by_freelancer').default(false),
  employerSignatureDate: timestamp('employer_signature_date'),
  freelancerSignatureDate: timestamp('freelancer_signature_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Invoices table
export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  contractId: uuid('contract_id').references(() => contracts.id, { onDelete: 'set null' }),
  freelancerId: uuid('freelancer_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  clientId: uuid('client_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  invoiceNumber: varchar('invoice_number', { length: 50 }).unique().notNull(),
  status: invoiceStatusEnum('status').default('draft').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD'),
  description: text('description'),
  issueDate: date('issue_date').notNull(),
  dueDate: date('due_date').notNull(),
  paidDate: date('paid_date'),
  paymentMethod: varchar('payment_method', { length: 50 }),
  paymentReference: varchar('payment_reference', { length: 255 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Time entries table
export const timeEntries = pgTable('time_entries', {
  id: uuid('id').primaryKey().defaultRandom(),
  contractId: uuid('contract_id').references(() => contracts.id, { onDelete: 'cascade' }).notNull(),
  freelancerId: uuid('freelancer_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  description: text('description'),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time'),
  durationMinutes: integer('duration_minutes'),
  hourlyRate: decimal('hourly_rate', { precision: 8, scale: 2 }),
  isBillable: boolean('is_billable').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Reviews table
export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  contractId: uuid('contract_id').references(() => contracts.id, { onDelete: 'cascade' }).notNull(),
  reviewerId: uuid('reviewer_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  revieweeId: uuid('reviewee_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  rating: integer('rating').notNull(),
  title: varchar('title', { length: 255 }),
  comment: text('comment'),
  isPublic: boolean('is_public').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Saved jobs table
export const savedJobs = pgTable('saved_jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  jobs: many(jobs),
  applications: many(applications),
  sentMessages: many(messages, { relationName: 'sender' }),
  receivedMessages: many(messages, { relationName: 'receiver' }),
  notifications: many(notifications),
  employerContracts: many(contracts, { relationName: 'employer' }),
  freelancerContracts: many(contracts, { relationName: 'freelancer' }),
  freelancerInvoices: many(invoices, { relationName: 'freelancer' }),
  clientInvoices: many(invoices, { relationName: 'client' }),
  timeEntries: many(timeEntries),
  givenReviews: many(reviews, { relationName: 'reviewer' }),
  receivedReviews: many(reviews, { relationName: 'reviewee' }),
  savedJobs: many(savedJobs),
}));

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  employer: one(users, {
    fields: [jobs.employerId],
    references: [users.id],
  }),
  applications: many(applications),
  messages: many(messages),
  contracts: many(contracts),
  savedJobs: many(savedJobs),
}));

export const applicationsRelations = relations(applications, ({ one, many }) => ({
  job: one(jobs, {
    fields: [applications.jobId],
    references: [jobs.id],
  }),
  candidate: one(users, {
    fields: [applications.candidateId],
    references: [users.id],
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: 'sender',
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
    relationName: 'receiver',
  }),
  job: one(jobs, {
    fields: [messages.jobId],
    references: [jobs.id],
  }),
  application: one(applications, {
    fields: [messages.applicationId],
    references: [applications.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

export const contractsRelations = relations(contracts, ({ one, many }) => ({
  job: one(jobs, {
    fields: [contracts.jobId],
    references: [jobs.id],
  }),
  employer: one(users, {
    fields: [contracts.employerId],
    references: [users.id],
    relationName: 'employer',
  }),
  freelancer: one(users, {
    fields: [contracts.freelancerId],
    references: [users.id],
    relationName: 'freelancer',
  }),
  invoices: many(invoices),
  timeEntries: many(timeEntries),
  reviews: many(reviews),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  contract: one(contracts, {
    fields: [invoices.contractId],
    references: [contracts.id],
  }),
  freelancer: one(users, {
    fields: [invoices.freelancerId],
    references: [users.id],
    relationName: 'freelancer',
  }),
  client: one(users, {
    fields: [invoices.clientId],
    references: [users.id],
    relationName: 'client',
  }),
}));

export const timeEntriesRelations = relations(timeEntries, ({ one }) => ({
  contract: one(contracts, {
    fields: [timeEntries.contractId],
    references: [contracts.id],
  }),
  freelancer: one(users, {
    fields: [timeEntries.freelancerId],
    references: [users.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  contract: one(contracts, {
    fields: [reviews.contractId],
    references: [contracts.id],
  }),
  reviewer: one(users, {
    fields: [reviews.reviewerId],
    references: [users.id],
    relationName: 'reviewer',
  }),
  reviewee: one(users, {
    fields: [reviews.revieweeId],
    references: [users.id],
    relationName: 'reviewee',
  }),
}));

export const savedJobsRelations = relations(savedJobs, ({ one }) => ({
  user: one(users, {
    fields: [savedJobs.userId],
    references: [users.id],
  }),
  job: one(jobs, {
    fields: [savedJobs.jobId],
    references: [jobs.id],
  }),
}));