import { db } from './index';
import { users, jobs, applications, messages, notifications, savedJobs } from './schema';
import { hashPassword } from '../lib/auth';

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data in correct order (respecting foreign key constraints)
    await db.delete(savedJobs);
    await db.delete(notifications);
    await db.delete(messages);
    await db.delete(applications);
    await db.delete(jobs);
    await db.delete(users);

    console.log('🧹 Cleared existing data');

    // Seed users
    const hashedPassword = await hashPassword('password123');
    
    const seedUsers = await db.insert(users).values([
      {
        id: '1',
        email: 'admin@parttimer.com',
        passwordHash: hashedPassword,
        name: 'Admin User',
        role: 'admin',
        status: 'approved',
        profileComplete: true,
        avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        age: 45,
        location: 'New York, NY',
        bio: 'Platform administrator with extensive experience in managing digital platforms.',
        skills: ['Platform Management', 'User Support', 'Data Analysis'],
        emailVerified: true
      },
      {
        id: '2',
        email: 'john@example.com',
        passwordHash: hashedPassword,
        name: 'John Smith',
        role: 'candidate',
        status: 'approved',
        profileComplete: true,
        avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        age: 58,
        location: 'San Francisco, CA',
        bio: 'Experienced business consultant with over 25 years in strategic planning and operations management.',
        skills: ['Business Strategy', 'Project Management', 'Team Leadership', 'Financial Analysis'],
        phone: '+1 (555) 123-4567',
        emailVerified: true
      },
      {
        id: '3',
        email: 'company@example.com',
        passwordHash: hashedPassword,
        name: 'Tech Solutions Inc',
        role: 'employer',
        status: 'approved',
        profileComplete: true,
        avatarUrl: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        age: null,
        location: 'New York, NY',
        bio: 'Leading technology solutions company focused on hiring experienced professionals.',
        phone: '+1 (555) 987-6543',
        emailVerified: true
      },
      {
        id: '4',
        email: 'margaret@example.com',
        passwordHash: hashedPassword,
        name: 'Margaret Thompson',
        role: 'candidate',
        status: 'approved',
        profileComplete: true,
        avatarUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        age: 62,
        location: 'Chicago, IL',
        bio: 'Senior business consultant with 30+ years of experience in strategic planning.',
        skills: ['Strategic Planning', 'Business Development', 'Team Management'],
        phone: '+1 (555) 234-5678',
        emailVerified: true
      },
      {
        id: '5',
        email: 'robert@example.com',
        passwordHash: hashedPassword,
        name: 'Robert Johnson',
        role: 'candidate',
        status: 'approved',
        profileComplete: true,
        avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        age: 58,
        location: 'Los Angeles, CA',
        bio: 'Certified financial advisor with 25+ years in accounting and financial planning.',
        skills: ['Financial Planning', 'Accounting', 'Tax Preparation', 'Investment Analysis'],
        phone: '+1 (555) 345-6789',
        emailVerified: true
      }
    ]).returning();

    console.log('👥 Seeded users');

    // Seed jobs
    const seedJobs = await db.insert(jobs).values([
      {
        id: '1',
        employerId: '3',
        title: 'Senior Marketing Strategist',
        company: 'Global Brands Inc',
        location: 'New York, NY',
        type: 'hybrid',
        category: 'Marketing',
        description: 'We are seeking an experienced marketing strategist to help guide our brand initiatives. The ideal candidate will have extensive experience in digital marketing and strategic planning for global brands.',
        requirements: [
          '15+ years of marketing experience',
          'Strong analytical and problem-solving skills',
          'Excellent communication and presentation abilities',
          'Experience with digital marketing strategy and implementation'
        ],
        benefits: ['Flexible schedule', 'Health insurance', 'Retirement plan'],
        salary: '$80,000 - $120,000',
        minAge: 50,
        experienceLevel: 'senior',
        isActive: true,
        applicationsCount: 2,
        viewsCount: 45
      },
      {
        id: '2',
        employerId: '3',
        title: 'Senior Financial Analyst',
        company: 'Premier Accounting Group',
        location: 'San Francisco, CA',
        type: 'on-site',
        category: 'Finance',
        description: 'Looking for an experienced financial analyst to provide insights and reporting for our clients. Flexible schedule with part-time hours.',
        requirements: [
          'CPA certification preferred',
          'Advanced Excel and financial modeling skills',
          '10+ years accounting experience',
          'Attention to detail'
        ],
        benefits: ['Flexible hours', 'Professional development', 'Health benefits'],
        salary: '$35 - $45/hour',
        minAge: 55,
        experienceLevel: 'senior',
        isActive: true,
        applicationsCount: 1,
        viewsCount: 32
      },
      {
        id: '3',
        employerId: '3',
        title: 'Senior Customer Success Manager',
        company: 'TechSolutions Plus',
        location: 'Remote',
        type: 'remote',
        category: 'Customer Service',
        description: 'Lead customer success initiatives and ensure client satisfaction. Perfect for experienced professionals looking for flexible remote work with leadership opportunities.',
        requirements: [
          'Previous customer success management experience',
          'Strong communication skills',
          'Experience with CRM systems',
          'Home office setup'
        ],
        benefits: ['Remote work', 'Flexible schedule', 'Equipment provided'],
        salary: '$30 - $45/hour',
        minAge: 45,
        experienceLevel: 'senior',
        isActive: true,
        applicationsCount: 0,
        viewsCount: 28
      },
      {
        id: '4',
        employerId: '3',
        title: 'Executive Mentor',
        company: 'Leadership Development Institute',
        location: 'Chicago, IL',
        type: 'hybrid',
        category: 'Education',
        description: 'Share your decades of executive experience by mentoring the next generation of leaders in your industry. Help shape the future of business leadership.',
        requirements: [
          '20+ years executive experience',
          'C-suite or senior leadership background',
          'Patience and teaching ability',
          'Industry expertise'
        ],
        benefits: ['Flexible schedule', 'Meaningful work', 'Competitive compensation'],
        salary: '$75 - $150/hour',
        minAge: 55,
        experienceLevel: 'executive',
        isActive: true,
        applicationsCount: 0,
        viewsCount: 15
      }
    ]).returning();

    console.log('💼 Seeded jobs');

    // Seed applications
    const seedApplications = await db.insert(applications).values([
      {
        id: '1',
        jobId: '1',
        candidateId: '2',
        status: 'pending',
        coverLetter: 'I am very interested in this position and believe my 25 years of consulting experience makes me an ideal candidate.',
        resumeUrl: 'resume-john-smith.pdf',
        rating: null
      },
      {
        id: '2',
        jobId: '1',
        candidateId: '4',
        status: 'reviewed',
        coverLetter: 'I am excited about this opportunity to bring my 25 years of consulting experience to your team.',
        resumeUrl: 'margaret-thompson-resume.pdf',
        rating: 5
      },
      {
        id: '3',
        jobId: '2',
        candidateId: '5',
        status: 'pending',
        coverLetter: 'With my CPA certification and 20 years in accounting, I would be a valuable addition to your team.',
        resumeUrl: 'robert-johnson-resume.pdf',
        rating: 4
      }
    ]).returning();

    console.log('📝 Seeded applications');

    // Seed messages
    const seedMessages = await db.insert(messages).values([
      {
        id: '1',
        senderId: '3',
        receiverId: '2',
        jobId: '1',
        content: 'Thank you for your application. We would like to schedule an interview.',
        isRead: false
      },
      {
        id: '2',
        senderId: '2',
        receiverId: '3',
        jobId: '1',
        content: 'Thank you for considering my application. I would be happy to schedule an interview.',
        isRead: true
      }
    ]).returning();

    console.log('💬 Seeded messages');

    // Seed notifications
    const seedNotifications = await db.insert(notifications).values([
      {
        id: '1',
        userId: '2',
        type: 'info',
        title: 'Welcome to Part Timer!',
        message: 'Your account has been created and approved. You can now access all features.',
        isRead: false,
        actionUrl: '/candidate',
        actionText: 'Get Started'
      },
      {
        id: '2',
        userId: '2',
        type: 'success',
        title: 'Application Submitted',
        message: 'Your application for Senior Marketing Strategist has been submitted successfully.',
        isRead: false,
        actionUrl: '/candidate/applications',
        actionText: 'View Applications'
      },
      {
        id: '3',
        userId: '3',
        type: 'info',
        title: 'New Application Received',
        message: 'You have received a new application for Senior Marketing Strategist.',
        isRead: false,
        actionUrl: '/employer/applications',
        actionText: 'View Application'
      }
    ]).returning();

    console.log('🔔 Seeded notifications');

    // Seed saved jobs
    const seedSavedJobs = await db.insert(savedJobs).values([
      {
        id: '1',
        userId: '2',
        jobId: '3'
      },
      {
        id: '2',
        userId: '4',
        jobId: '4'
      }
    ]).returning();

    console.log('❤️ Seeded saved jobs');

    console.log('✅ Database seeding completed successfully!');
    return {
      users: seedUsers,
      jobs: seedJobs,
      applications: seedApplications,
      messages: seedMessages,
      notifications: seedNotifications,
      savedJobs: seedSavedJobs
    };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}