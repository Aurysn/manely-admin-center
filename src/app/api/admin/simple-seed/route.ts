import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('Starting simple seed...');

    // Create categories
    const electronics = await prisma.category.create({
      data: {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices and gadgets',
        isActive: true,
      },
    });

    const clothing = await prisma.category.create({
      data: {
        name: 'Clothing',
        slug: 'clothing',
        description: 'Fashion and apparel',
        isActive: true,
      },
    });

    // Create products
    const product1 = await prisma.product.create({
      data: {
        name: 'Wireless Headphones',
        slug: 'wireless-headphones',
        description: 'High-quality wireless headphones',
        price: 99.99,
        comparePrice: 129.99,
        images: JSON.stringify(['/placeholder-product.jpg']),
        inventory: 50,
        sku: 'WH-001',
        weight: 0.3,
        isActive: true,
        isFeatured: true,
        categoryId: electronics.id,
      },
    });

    const product2 = await prisma.product.create({
      data: {
        name: 'Cotton T-Shirt',
        slug: 'cotton-tshirt',
        description: 'Comfortable cotton t-shirt',
        price: 24.99,
        comparePrice: 29.99,
        images: JSON.stringify(['/placeholder-product.jpg']),
        inventory: 75,
        sku: 'CT-001',
        weight: 0.2,
        isActive: true,
        categoryId: clothing.id,
      },
    });

    // Create payment methods
    await prisma.paymentMethod.create({
      data: {
        name: 'Stripe',
        type: 'CREDIT_CARD',
        isActive: true,
        config: JSON.stringify({ apiKey: 'sk_test_...' }),
      },
    });

    await prisma.paymentMethod.create({
      data: {
        name: 'PayPal',
        type: 'PAYPAL',
        isActive: true,
        config: JSON.stringify({ clientId: '...' }),
      },
    });

    // Create discounts
    await prisma.discount.create({
      data: {
        code: 'WELCOME10',
        name: 'Welcome Discount',
        description: '10% off for new customers',
        type: 'PERCENTAGE',
        value: 10,
        minAmount: 50,
        maxUses: 100,
        isActive: true,
      },
    });

    return NextResponse.json({
      message: 'Simple seed completed successfully',
      categories: [electronics, clothing],
      products: [product1, product2],
    });
  } catch (error) {
    console.error('Error in simple seed:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error },
      { status: 500 }
    );
  }
}
