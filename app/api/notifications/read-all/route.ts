import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { notifications } from '@/src/db/schema';
import { requireAuth } from '@/src/lib/auth';
import { eq, and } from 'drizzle-orm';

// Mark all notifications as read
export async function PATCH(request: NextRequest) {
  try {
    const payload = await requireAuth(request);
    
    const result = await db.update(notifications)
      .set({ 
        isRead: true,
        updatedAt: new Date()
      })
      .where(
        and(
          eq(notifications.userId, payload.userId),
          eq(notifications.isRead, false)
        )
      )
      .returning({ id: notifications.id });
    
    return NextResponse.json({
      message: 'All notifications marked as read',
      updatedCount: result.length
    });
  } catch (error: any) {
    if (error.message === 'Authentication required' || error.message === 'Invalid or expired token') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    
    console.error('Error marking all notifications as read:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}