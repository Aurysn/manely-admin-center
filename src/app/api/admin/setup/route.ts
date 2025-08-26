import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { email: 'admin@example.com' }
    });

    if (existingAdmin) {
      return NextResponse.json({ 
        message: 'Admin user already exists',
        user: { email: existingAdmin.email }
      });
    }

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'ADMIN',
      }
    });

    return NextResponse.json({ 
      message: 'Admin user created successfully',
      user: { email: adminUser.email }
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user', details: error },
      { status: 500 }
    );
  }
}
