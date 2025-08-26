import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Skip clearing data for now
    console.log('Starting to seed database...');

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'ADMIN',
      },
    });

    // Create sample customers
    const customers = await Promise.all([
      prisma.user.create({
        data: {
          email: 'john@example.com',
          name: 'John Doe',
          role: 'CUSTOMER',
        },
      }),
      prisma.user.create({
        data: {
          email: 'jane@example.com',
          name: 'Jane Smith',
          role: 'CUSTOMER',
        },
      }),
    ]);

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

    // Create sample products with variations
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
          variations: {
            create: [
              {
                name: 'Color',
                value: 'Black',
                price: 99.99,
                sku: 'WH-001-BLK',
                inventory: 25,
                weight: 0.3,
              },
              {
                name: 'Color',
                value: 'White',
                price: 99.99,
                sku: 'WH-001-WHT',
                inventory: 25,
                weight: 0.3,
              },
            ],
          },
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
          variations: {
            create: [
              {
                name: 'Size',
                value: 'iPhone 13',
                price: 19.99,
                sku: 'SC-001-IP13',
                inventory: 50,
                weight: 0.1,
              },
              {
                name: 'Size',
                value: 'iPhone 14',
                price: 19.99,
                sku: 'SC-001-IP14',
                inventory: 50,
                weight: 0.1,
              },
            ],
          },
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
          variations: {
            create: [
              {
                name: 'Size',
                value: 'S',
                price: 24.99,
                sku: 'CT-001-S',
                inventory: 25,
                weight: 0.2,
              },
              {
                name: 'Size',
                value: 'M',
                price: 24.99,
                sku: 'CT-001-M',
                inventory: 25,
                weight: 0.2,
              },
              {
                name: 'Size',
                value: 'L',
                price: 24.99,
                sku: 'CT-001-L',
                inventory: 25,
                weight: 0.2,
              },
            ],
          },
        },
      }),
    ]);

    // Create sample payment methods
    await Promise.all([
      prisma.paymentMethod.create({
        data: {
          name: 'Stripe',
          type: 'CREDIT_CARD',
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

    // Create sample orders
    const orders = await Promise.all([
      prisma.order.create({
        data: {
          orderNumber: 'ORD-001',
          userId: customers[0].id,
          status: 'DELIVERED',
          subtotal: 99.99,
          tax: 8.00,
          shipping: 5.99,
          total: 113.98,
          billingAddress: JSON.stringify({
            name: 'John Doe',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
          }),
          shippingAddress: JSON.stringify({
            name: 'John Doe',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
          }),
          orderItems: {
            create: [
              {
                productId: products[0].id,
                quantity: 1,
                price: 99.99,
              },
            ],
          },
        },
      }),
      prisma.order.create({
        data: {
          orderNumber: 'ORD-002',
          userId: customers[1].id,
          status: 'PROCESSING',
          subtotal: 44.98,
          tax: 3.60,
          shipping: 5.99,
          total: 54.57,
          billingAddress: JSON.stringify({
            name: 'Jane Smith',
            address: '456 Oak Ave',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90210',
          }),
          shippingAddress: JSON.stringify({
            name: 'Jane Smith',
            address: '456 Oak Ave',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90210',
          }),
          orderItems: {
            create: [
              {
                productId: products[1].id,
                quantity: 1,
                price: 19.99,
              },
              {
                productId: products[2].id,
                quantity: 1,
                price: 24.99,
              },
            ],
          },
        },
      }),
    ]);

    return NextResponse.json({
      message: 'Database seeded successfully',
      categories: [electronics, clothing, books],
      products: products.length,
      customers: customers.length,
      orders: orders.length,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error },
      { status: 500 }
    );
  }
}
