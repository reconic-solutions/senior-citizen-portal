import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { desc } from 'drizzle-orm';
import { applications, jobs, users, notifications } from '@/src/db/schema';
import { requireAuth } from '@/src/lib/auth';
import { createApplicationSchema, paginationSchema } from '@/src/lib/validations';
import { eq, and, sql } from 'drizzle-orm';

// Get all applications for the current user
export async function GET(request: NextRequest) {
  try {
    const payload = await requireAuth(request);
    const searchParams = request.nextUrl.searchParams;
    
    // Parse pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    
    // Parse filter parameters
    const status = searchParams.get('status') || '';
    
    // Build where conditions
    let whereConditions = [eq(applications.candidateId, payload.userId)];
    
    if (status) {
      whereConditions.push(eq(applications.status, status as any));
    }
    
    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(applications)
      .where(and(...whereConditions));
    
    const totalCount = countResult[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);
    
    // Get applications with job info
    const applicationResults = await db
      .select({
        application: applications,
        job: {
          id: jobs.id,
          title: jobs.title,
          company: jobs.company,
          location: jobs.location,
          type: jobs.type,
          salary: jobs.salary,
          description: jobs.description
        }
      })
      .from(applications)
      .leftJoin(jobs, eq(applications.jobId, jobs.id))
      .where(and(...whereConditions))
      .orderBy(desc(applications.appliedDate))
      .limit(limit)
      .offset(offset);
    
    // Format response
    const formattedApplications = applicationResults.map(({ application, job }) => ({
      ...application,
      job
    }));
    
    return NextResponse.json({
      applications: formattedApplications,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        perPage: limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error: any) {
    if (error.message === 'Authentication required' || error.message === 'Invalid or expired token') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create a new application
export async function POST(request: NextRequest) {
  try {
    const payload = await requireAuth(request);
    
    // Check if user is a candidate
    const userResults = await db
      .select({ role: users.role, status: users.status })
      .from(users)
      .where(eq(users.id, payload.userId));
    
    if (userResults.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const user = userResults[0];
    
    if (user.role !== 'candidate') {
      return NextResponse.json(
        { error: 'Only candidates can apply to jobs' },
        { status: 403 }
      );
    }
    
    if (user.status !== 'approved') {
      return NextResponse.json(
        { error: 'Your account must be approved to apply for jobs' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const validatedData = createApplicationSchema.parse(body);
    const { jobId, coverLetter } = validatedData;
    
    // Check if job exists and is active
    const jobResults = await db
      .select({
        id: jobs.id,
        title: jobs.title,
        employerId: jobs.employerId,
        isActive: jobs.isActive
      })
      .from(jobs)
      .where(eq(jobs.id, jobId));
    
    if (jobResults.length === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }
    
    const job = jobResults[0];
    
    if (!job.isActive) {
      return NextResponse.json(
        { error: 'This job is no longer accepting applications' },
        { status: 400 }
      );
    }
    
    // Check if already applied
    const existingApplication = await db
      .select({ id: applications.id })
      .from(applications)
      .where(
        and(
          eq(applications.jobId, jobId),
          eq(applications.candidateId, payload.userId)
        )
      );
    
    if (existingApplication.length > 0) {
      return NextResponse.json(
        { error: 'You have already applied to this job' },
        { status: 400 }
      );
    }
    
    // Create application
    const [newApplication] = await db.insert(applications)
      .values({
        jobId,
        candidateId: payload.userId,
        coverLetter,
      })
      .returning();
    
    // Update job application count
    await db.update(jobs)
      .set({ applicationsCount: sql`${jobs.applicationsCount} + 1` })
      .where(eq(jobs.id, jobId));
    
    // Create notification for employer
    await db.insert(notifications)
      .values({
        userId: job.employerId,
        type: 'info',
        title: 'New Application Received',
        message: `You have received a new application for ${job.title}`,
        actionUrl: `/employer/applications`,
        actionText: 'View Application'
      });
    
    // Create notification for candidate
    await db.insert(notifications)
      .values({
        userId: payload.userId,
        type: 'success',
        title: 'Application Submitted',
        message: `Your application for ${job.title} has been submitted successfully.`,
        actionUrl: `/candidate/applications`,
        actionText: 'View Applications'
      });
    
    return NextResponse.json({
      message: 'Application submitted successfully',
      application: newApplication
    }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    if (error.message === 'Authentication required' || error.message === 'Invalid or expired token') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}