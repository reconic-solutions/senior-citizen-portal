import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { users } from '@/src/db/schema';
import { comparePassword, generateToken, generateRefreshToken } from '@/src/lib/auth';
import { loginSchema } from '@/src/lib/validations';
import { eq } from 'drizzle-orm';

// Login endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);
    const { email, password } = validatedData;

    // Get user with password
    const userResults = await db.select().from(users).where(eq(users.email, email));
    
    if (userResults.length === 0) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = userResults[0];

    // Check password
    const isValidPassword = await comparePassword(password, user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    await db.update(users)
      .set({ lastLogin: new Date() })
      .where(eq(users.id, user.id));

    // Generate tokens
    const token = generateToken({ 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    });
    
    const refreshToken = generateRefreshToken({ 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    });

    // Remove password hash from response
    const { passwordHash, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token,
      refreshToken
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}