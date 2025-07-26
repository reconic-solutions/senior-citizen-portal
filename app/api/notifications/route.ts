import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { notifications, users } from '@/src/db/schema';
import { requireAuth } from '@/src/lib/auth';
import { paginationSchema } from '@/src/lib/validations';
import { eq, and, desc, sql, SQL } from 'drizzle-orm';

// Get notifications for the current user
export async function GET(request: NextRequest) {
  try {
    const payload = await requireAuth(request);
    const searchParams = request.nextUrl.searchParams;
    
    // Parse pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    
    // Parse filter parameters
    const unreadOnly = searchParams.get('unread_only') === 'true';
    const type = searchParams.get('type') || '';
    
    // Build where conditions
    let whereConditions: SQL<unknown>[] = [eq(notifications.userId, payload.userId)];
    
    if (unreadOnly) {
      whereConditions.push(eq(notifications.isRead, false));
    }
    
    if (type) {
      whereConditions.push(eq(notifications.type, type as any));
    }
    
    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(notifications)
      .where(and(...whereConditions));
    
    const totalCount = countResult[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);
    
    // Get notifications
    const notificationResults = await db
      .select()
      .from(notifications)
      .where(and(...whereConditions))
      .orderBy(desc(notifications.createdAt))
      .limit(limit)
      .offset(offset);
    
    return NextResponse.json({
      notifications: notificationResults,
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
    
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete all notifications
export async function DELETE(request: NextRequest) {
  try {
    const payload = await requireAuth(request);
    
    const result = await db.delete(notifications)
      .where(eq(notifications.userId, payload.userId))
      .returning({ id: notifications.id });
    
    return NextResponse.json({
      message: 'All notifications deleted successfully',
      deletedCount: result.length
    });
  } catch (error: any) {
    if (error.message === 'Authentication required' || error.message === 'Invalid or expired token') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    
    console.error('Error deleting notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}