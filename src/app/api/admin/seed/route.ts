import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Create sample categories
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

    const books = await prisma.category.create({
      data: {
        name: 'Books',
        slug: 'books',
        description: 'Books and literature',
        isActive: true,
      },
    });

    // Create sample products
    const products = await Promise.all([
      prisma.product.create({
        data: {
          name: 'Wireless Headphones',
          slug: 'wireless-headphones',
          description: 'High-quality wireless headphones with noise cancellation',
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
      }),
      prisma.product.create({
        data: {
          name: 'Smartphone Case',
          slug: 'smartphone-case',
          description: 'Protective case for smartphones',
          price: 19.99,
          comparePrice: 24.99,
          images: JSON.stringify(['/placeholder-product.jpg']),
          inventory: 100,
          sku: 'SC-001',
          weight: 0.1,
          isActive: true,
          categoryId: electronics.id,
        },
      }),
      prisma.product.create({
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
      }),
      prisma.product.create({
        data: {
          name: 'Programming Book',
          slug: 'programming-book',
          description: 'Learn programming from scratch',
          price: 39.99,
          comparePrice: 49.99,
          images: JSON.stringify(['/placeholder-product.jpg']),
          inventory: 25,
          sku: 'PB-001',
          weight: 0.5,
          isActive: true,
          categoryId: books.id,
        },
      }),
    ]);

    // Create sample payment methods
    await Promise.all([
      prisma.paymentMethod.create({
        data: {
          name: 'Stripe',
          type: 'STRIPE',
          isActive: true,
          config: JSON.stringify({ apiKey: 'sk_test_...' }),
        },
      }),
      prisma.paymentMethod.create({
        data: {
          name: 'PayPal',
          type: 'PAYPAL',
          isActive: true,
          config: JSON.stringify({ clientId: '...' }),
        },
      }),
      prisma.paymentMethod.create({
        data: {
          name: 'Cash on Delivery',
          type: 'CASH_ON_DELIVERY',
          isActive: true,
        },
      }),
    ]);

    // Create sample discounts
    await Promise.all([
      prisma.discount.create({
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
      }),
      prisma.discount.create({
        data: {
          code: 'FREESHIP',
          name: 'Free Shipping',
          description: 'Free shipping on orders over $100',
          type: 'FREE_SHIPPING',
          value: 0,
          minAmount: 100,
          isActive: true,
        },
      }),
    ]);

    return NextResponse.json({
      message: 'Database seeded successfully',
      categories: [electronics, clothing, books],
      products: products.length,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
