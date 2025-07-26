import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { users } from '@/src/db/schema';
import { requireAuth } from '@/src/lib/auth';
import { updateProfileSchema } from '@/src/lib/validations';
import { eq } from 'drizzle-orm';

// Get current user profile
export async function GET(request: NextRequest) {
  try {
    const payload = await requireAuth(request);
    
    const userResults = await db.select().from(users).where(eq(users.id, payload.userId));

    if (userResults.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const user = userResults[0];
    
    // Remove sensitive data
    const { passwordHash, emailVerificationToken, passwordResetToken, ...safeUser } = user;

    return NextResponse.json({ user: safeUser });
  } catch (error: any) {
    if (error.message === 'Authentication required' || error.message === 'Invalid or expired token') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update current user profile
export async function PUT(request: NextRequest) {
  try {
    const payload = await requireAuth(request);
    const body = await request.json();
    
    const validatedData = updateProfileSchema.parse(body);
    
    const [updatedUser] = await db.update(users)
      .set({
        ...validatedData,
        updatedAt: new Date()
      })
      .where(eq(users.id, payload.userId))
      .returning();

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      );
    }

    // Remove sensitive data
    const { passwordHash, emailVerificationToken, passwordResetToken, ...safeUser } = updatedUser;

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: safeUser
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
    
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}