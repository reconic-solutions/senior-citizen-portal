import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { users, notifications } from '@/src/db/schema';
import { hashPassword, generateToken, generateRefreshToken } from '@/src/lib/auth';
import { registerSchema } from '@/src/lib/validations';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);
    const { email, password, name, role } = validatedData;

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const [newUser] = await db.insert(users)
      .values({
        email,
        passwordHash,
        name,
        role,
        status: 'pending', // All new accounts start as pending
      })
      .returning();

    if (!newUser) {
      throw new Error('Failed to create user');
    }

    // Create welcome notification
    await db.insert(notifications)
      .values({
        userId: newUser.id,
        type: 'info',
        title: 'Welcome to Part Timer!',
        message: 'Your account has been created and is pending approval. You will receive an email once approved.',
        actionUrl: role === 'candidate' ? '/candidate' : '/employer',
        actionText: 'Get Started'
      });

    // Generate tokens
    const token = generateToken({ 
      userId: newUser.id, 
      email: newUser.email, 
      role: newUser.role 
    });
    
    const refreshToken = generateRefreshToken({ 
      userId: newUser.id, 
      email: newUser.email, 
      role: newUser.role 
    });

    // Remove password hash from response
    const { passwordHash: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      message: 'User registered successfully',
      user: userWithoutPassword,
      token,
      refreshToken
    }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}