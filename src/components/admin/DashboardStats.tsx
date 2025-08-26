import { prisma } from '@/lib/prisma';
import { DollarSign, ShoppingCart, Package, Users, TrendingUp } from 'lucide-react';

async function getStats() {
  try {
    const [totalSales, totalOrders, totalProducts, totalCustomers, recentSales] = await Promise.all([
      prisma.order.aggregate({
        where: { status: { not: 'CANCELLED' } },
        _sum: { total: true }
      }),
      prisma.order.count(),
      prisma.product.count(),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.order.aggregate({
        where: { 
          createdAt: { 
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
          } 
        },
        _sum: { total: true }
      })
    ]);

    return {
      totalSales: totalSales._sum.total || 0,
      totalOrders,
      totalProducts,
      totalCustomers,
      recentSales: recentSales._sum.total || 0
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return default values if database tables don't exist
    return {
      totalSales: 0,
      totalOrders: 0,
      totalProducts: 0,
      totalCustomers: 0,
      recentSales: 0
    };
  }
}

export default async function DashboardStats() {
  const stats = await getStats();

  const cards = [
    {
      title: 'Total Sales',
      value: `$${stats.totalSales.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toString(),
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toString(),
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
