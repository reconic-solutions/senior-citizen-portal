import { db } from '@/src/db';
import { notifications, users } from '@/src/db/schema';
import { eq, and, sql } from 'drizzle-orm';

// Create a new notification
export async function createNotification(userId: string, notificationData: {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
  metadata?: Record<string, any>;
}) {
  try {
    const {
      type = 'info',
      title,
      message,
      actionUrl,
      actionText,
      metadata = {}
    } = notificationData;

    // Handle special case for admin notifications
    let targetUserIds: string[] = [];
    
    if (userId === 'admin') {
      // Get all admin users
      const adminResults = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.role, 'admin'));
      
      targetUserIds = adminResults.map(user => user.id);
    } else {
      targetUserIds = [userId];
    }

    const createdNotifications = [];

    for (const targetUserId of targetUserIds) {
      const [newNotification] = await db.insert(notifications)
        .values({
          userId: targetUserId,
          type,
          title,
          message,
          actionUrl,
          actionText,
          metadata: metadata ? JSON.stringify(metadata) : null,
        })
        .returning();

      createdNotifications.push(newNotification);
    }

    return createdNotifications.length === 1 ? createdNotifications[0] : createdNotifications;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

// Get unread count for a user
export async function getUnreadCount(userId: string) {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(notifications)
      .where(
        and(
          eq(notifications.userId, userId),
          eq(notifications.isRead, false)
        )
      );

    return result[0]?.count || 0;
  } catch (error) {
    console.error('Error getting unread count:', error);
    throw error;
  }
}

// Create system-wide notification (for all users)
export async function createSystemNotification(notificationData: {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
  metadata?: Record<string, any>;
}) {
  try {
    // Get all active users
    const usersResults = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.status, 'approved'));

    const createdNotifications = [];

    for (const user of usersResults) {
      const notification = await createNotification(user.id, notificationData);
      createdNotifications.push(notification);
    }

    return createdNotifications;
  } catch (error) {
    console.error('Error creating system notification:', error);
    throw error;
  }
}

// Notification types for different events
export const NotificationTypes = {
  // Account related
  ACCOUNT_APPROVED: {
    type: 'success',
    title: 'Account Approved!',
    message: 'Your account has been approved. You can now access all features of Part Timer.'
  },
  
  ACCOUNT_REJECTED: {
    type: 'error',
    title: 'Account Application Update',
    message: 'Your account application was not approved.'
  },

  // Job related
  JOB_APPLICATION_RECEIVED: {
    type: 'info',
    title: 'New Application Received',
    message: 'You have received a new application for your job posting.'
  },

  JOB_APPLICATION_STATUS_CHANGED: {
    type: 'info',
    title: 'Application Status Updated',
    message: 'The status of your job application has been updated.'
  },

  // Message related
  NEW_MESSAGE: {
    type: 'info',
    title: 'New Message',
    message: 'You have received a new message.'
  },

  // Contract related
  CONTRACT_CREATED: {
    type: 'info',
    title: 'New Contract',
    message: 'A new contract has been created for you.'
  },

  CONTRACT_SIGNED: {
    type: 'success',
    title: 'Contract Signed',
    message: 'A contract has been signed by all parties.'
  },

  // Invoice related
  INVOICE_RECEIVED: {
    type: 'info',
    title: 'New Invoice',
    message: 'You have received a new invoice.'
  },

  INVOICE_PAID: {
    type: 'success',
    title: 'Invoice Paid',
    message: 'Your invoice has been paid.'
  }
};