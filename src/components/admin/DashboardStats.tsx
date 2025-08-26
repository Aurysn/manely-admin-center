import { prisma } from '@/lib/prisma';
import { DollarSign, ShoppingBag, Package, Users, TrendingUp } from 'lucide-react';

async function getStats() {
  const [
    totalSales,
    totalOrders,
    totalProducts,
    totalCustomers,
    recentSales
  ] = await Promise.all([
    prisma.order.aggregate({
      where: { status: { not: 'CANCELLED' } },
      _sum: { total: true }
    }),
    prisma.order.count({
      where: { status: { not: 'CANCELLED' } }
    }),
    prisma.product.count({
      where: { isActive: true }
    }),
    prisma.user.count({
      where: { role: 'CUSTOMER' }
    }),
    prisma.order.aggregate({
      where: {
        status: { not: 'CANCELLED' },
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
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
}

export default async function DashboardStats() {
  const stats = await getStats();

  const cards = [
    {
      name: 'Total Sales',
      value: `$${stats.totalSales.toFixed(2)}`,
      icon: DollarSign,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      name: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      name: 'Active Products',
      value: stats.totalProducts.toString(),
      icon: Package,
      change: '+3%',
      changeType: 'positive' as const,
    },
    {
      name: 'Customers',
      value: stats.totalCustomers.toString(),
      icon: Users,
      change: '+15%',
      changeType: 'positive' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.name}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <card.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {card.name}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {card.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-green-600 font-medium ml-1">
                  {card.change}
                </span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
