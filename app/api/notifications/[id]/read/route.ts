import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { notifications } from '@/src/db/schema';
import { requireAuth } from '@/src/lib/auth';
import { eq, and } from 'drizzle-orm';

// Mark notification as read
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const payload = await requireAuth(request);
    
    const [updatedNotification] = await db.update(notifications)
      .set({ 
        isRead: true,
        updatedAt: new Date()
      })
      .where(
        and(
          eq(notifications.id, id),
          eq(notifications.userId, payload.userId)
        )
      )
      .returning();
    
    if (!updatedNotification) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Notification marked as read',
      notification: updatedNotification
    });
  } catch (error: any) {
    if (error.message === 'Authentication required' || error.message === 'Invalid or expired token') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    
    console.error('Error marking notification as read:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}