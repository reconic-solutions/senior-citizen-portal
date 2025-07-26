import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { jobs, users, savedJobs } from '@/src/db/schema';
import { requireAuth, getAuthToken } from '@/src/lib/auth';
import { createJobSchema, searchSchema, paginationSchema } from '@/src/lib/validations';
import { eq, like, and, or, desc, asc, sql, SQL } from 'drizzle-orm';

// Get all jobs
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    
    // Parse search parameters
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const location = searchParams.get('location') || '';
    const type = searchParams.get('type') || '';
    const minAge = searchParams.get('min_age') ? parseInt(searchParams.get('min_age')!) : undefined;
    const sortBy = searchParams.get('sort_by') || 'created_at';
    const sortOrder = searchParams.get('sort_order') || 'desc';
    
    // Build where conditions
    let whereConditions: SQL<unknown>[] = [eq(jobs.isActive, true)];
    
    if (search) {
      const searchConditions: SQL<unknown>[] = [
        like(jobs.title, `%${search}%`),
        like(jobs.description, `%${search}%`),
        like(jobs.company, `%${search}%`)
      ];
      
      if (searchConditions.length > 0) {
        whereConditions.push(or(...searchConditions)!);
      }
    }
    
    if (category) {
      whereConditions.push(eq(jobs.category, category));
    }
    
    if (location) {
      whereConditions.push(like(jobs.location, `%${location}%`));
    }
    
    if (type) {
      whereConditions.push(eq(jobs.type, type as any));
    }
    
    if (minAge) {
      whereConditions.push(sql`${jobs.minAge} <= ${minAge}`);
    }
    
    // Check if user is authenticated to include saved status
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
    
    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(jobs)
      .where(and(...whereConditions));
    
    const totalCount = countResult[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);
    
    // Get jobs with employer info
    const jobResults = await db
      .select({
        job: jobs,
        employerName: users.name,
        employerAvatar: users.avatarUrl,
        isSaved: userId ? sql<boolean>`
          EXISTS (
            SELECT 1 FROM ${savedJobs}
            WHERE ${savedJobs.jobId} = ${jobs.id}
            AND ${savedJobs.userId} = ${userId}
          )
        ` : sql<boolean>`false`
      })
      .from(jobs)
      .leftJoin(users, eq(jobs.employerId, users.id))
      .where(and(...whereConditions))
      .orderBy(
        sortBy === 'created_at' ? (sortOrder === 'asc' ? asc(jobs.createdAt) : desc(jobs.createdAt)) :
        sortBy === 'title' ? (sortOrder === 'asc' ? asc(jobs.title) : desc(jobs.title)) :
        sortBy === 'company' ? (sortOrder === 'asc' ? asc(jobs.company) : desc(jobs.company)) :
        sortBy === 'applications_count' ? (sortOrder === 'asc' ? asc(jobs.applicationsCount) : desc(jobs.applicationsCount)) :
        sortBy === 'views_count' ? (sortOrder === 'asc' ? asc(jobs.viewsCount) : desc(jobs.viewsCount)) :
        desc(jobs.createdAt)
      )
      .limit(limit)
      .offset(offset);
    
    // Format response
    const formattedJobs = jobResults.map(({ job, employerName, employerAvatar, isSaved }) => ({
      ...job,
      employerName,
      employerAvatar,
      isSaved
    }));
    
    return NextResponse.json({
      jobs: formattedJobs,
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
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create a new job
export async function POST(request: NextRequest) {
  try {
    const payload = await requireAuth(request);
    
    // Check if user is an employer
    const userResults = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.id, payload.userId));
    
    if (userResults.length === 0 || (userResults[0].role !== 'employer' && userResults[0].role !== 'admin')) {
      return NextResponse.json(
        { error: 'Only employers can create jobs' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const validatedData = createJobSchema.parse(body);
    
    // Create job
    const [newJob] = await db.insert(jobs)
      .values({
        ...validatedData,
        employerId: payload.userId,
        requirements: validatedData.requirements || [],
        benefits: validatedData.benefits || [],
      })
      .returning();
    
    // Create notification for admin (in a real app)
    // This would be handled by a notification service
    
    return NextResponse.json({
      message: 'Job created successfully',
      job: newJob
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
    
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}