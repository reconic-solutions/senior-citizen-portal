import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { jobs, users, applications, savedJobs } from '@/src/db/schema';
import { requireAuth, getAuthToken } from '@/src/lib/auth';
import { updateJobSchema } from '@/src/lib/validations';
import { eq, and, sql } from 'drizzle-orm';

// Get job by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Increment view count
    await db.update(jobs)
      .set({ viewsCount: sql`${jobs.viewsCount} + 1` })
      .where(eq(jobs.id, id));
    
    // Check if user is authenticated
    const token = getAuthToken(request);
    let userId: string | null = null;
    
    if (token) {
      try {
        const payload = await requireAuth(request);
        userId = payload.userId;
      } catch (error) {
        // Continue without authentication
      }
    }
    
    // Get job with employer info
    const jobResults = await db
      .select({
        job: jobs,
        employer: {
          name: users.name,
          avatar: users.avatarUrl,
          email: users.email
        },
        isSaved: userId ? sql<boolean>`
          EXISTS (
            SELECT 1 FROM ${savedJobs}
            WHERE ${savedJobs.jobId} = ${jobs.id}
            AND ${savedJobs.userId} = ${userId}
          )
        ` : sql<boolean>`false`,
        applicationStatus: userId ? sql<string>`
          (SELECT status FROM ${applications}
           WHERE ${applications.jobId} = ${jobs.id}
           AND ${applications.candidateId} = ${userId}
           LIMIT 1)
        ` : sql<string>`NULL`,
        applicationId: userId ? sql<string>`
          (SELECT id FROM ${applications}
           WHERE ${applications.jobId} = ${jobs.id}
           AND ${applications.candidateId} = ${userId}
           LIMIT 1)
        ` : sql<string>`NULL`
      })
      .from(jobs)
      .leftJoin(users, eq(jobs.employerId, users.id))
      .where(eq(jobs.id, id));
    
    if (jobResults.length === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }
    
    const { job, employer, isSaved, applicationStatus, applicationId } = jobResults[0];
    
    return NextResponse.json({
      job: {
        ...job,
        employerName: employer?.name ?? '',
        employerAvatar: employer?.avatar ?? '',
        employerEmail: employer?.email ?? '',
        isSaved,
        applicationStatus,
        applicationId
      }
    });
  } catch (error: any) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update job
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const payload = await requireAuth(request);
    
    // Check if job exists and user has permission
    const jobResults = await db
      .select({ employerId: jobs.employerId })
      .from(jobs)
      .where(eq(jobs.id, id));
    
    if (jobResults.length === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }
    
    const job = jobResults[0];
    
    // Check permissions
    const userResults = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.id, payload.userId));
    
    if (userResults.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const userRole = userResults[0].role;
    
    if (userRole !== 'admin' && payload.userId !== job.employerId) {
      return NextResponse.json(
        { error: 'Not authorized to update this job' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const validatedData = updateJobSchema.parse(body);
    
    // Update job
    const [updatedJob] = await db.update(jobs)
      .set({
        ...validatedData,
        updatedAt: new Date()
      })
      .where(eq(jobs.id, id))
      .returning();
    
    return NextResponse.json({
      message: 'Job updated successfully',
      job: updatedJob
    });
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
    
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete job
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const payload = await requireAuth(request);
    
    // Check if job exists and user has permission
    const jobResults = await db
      .select({ 
        employerId: jobs.employerId,
        title: jobs.title
      })
      .from(jobs)
      .where(eq(jobs.id, id));
    
    if (jobResults.length === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }
    
    const job = jobResults[0];
    
    // Check permissions
    const userResults = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.id, payload.userId));
    
    if (userResults.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const userRole = userResults[0].role;
    
    if (userRole !== 'admin' && payload.userId !== job.employerId) {
      return NextResponse.json(
        { error: 'Not authorized to delete this job' },
        { status: 403 }
      );
    }
    
    // Delete job (cascading will handle related records)
    await db.delete(jobs).where(eq(jobs.id, id));
    
    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error: any) {
    if (error.message === 'Authentication required' || error.message === 'Invalid or expired token') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}