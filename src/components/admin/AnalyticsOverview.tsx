import { prisma } from '@/lib/prisma';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Eye } from 'lucide-react';

async function getAnalyticsData() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  const [
    currentPeriodSales,
    previousPeriodSales,
    currentPeriodOrders,
    previousPeriodOrders,
    currentPeriodCustomers,
    previousPeriodCustomers,
    totalProducts,
    totalViews
  ] = await Promise.all([
    // Current period sales (last 30 days)
    prisma.order.aggregate({
      where: {
        status: { not: 'CANCELLED' },
        createdAt: { gte: thirtyDaysAgo }
      },
      _sum: { total: true }
    }),
    // Previous period sales (30-60 days ago)
    prisma.order.aggregate({
      where: {
        status: { not: 'CANCELLED' },
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo }
      },
      _sum: { total: true }
    }),
    // Current period orders
    prisma.order.count({
      where: {
        status: { not: 'CANCELLED' },
        createdAt: { gte: thirtyDaysAgo }
      }
    }),
    // Previous period orders
    prisma.order.count({
      where: {
        status: { not: 'CANCELLED' },
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo }
      }
    }),
    // Current period customers
    prisma.user.count({
      where: {
        role: 'CUSTOMER',
        createdAt: { gte: thirtyDaysAgo }
      }
    }),
    // Previous period customers
    prisma.user.count({
      where: {
        role: 'CUSTOMER',
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo }
      }
    }),
    // Total products
    prisma.product.count({
      where: { isActive: true }
    }),
    // Total views (placeholder - you'd implement actual view tracking)
    Promise.resolve(0)
  ]);

  const currentSales = currentPeriodSales._sum.total || 0;
  const previousSales = previousPeriodSales._sum.total || 0;
  const salesChange = previousSales > 0 ? ((currentSales - previousSales) / previousSales) * 100 : 0;

  const ordersChange = previousPeriodOrders > 0 ? ((currentPeriodOrders - previousPeriodOrders) / previousPeriodOrders) * 100 : 0;
  const customersChange = previousPeriodCustomers > 0 ? ((currentPeriodCustomers - previousPeriodCustomers) / previousPeriodCustomers) * 100 : 0;

  return {
    sales: {
      current: currentSales,
      change: salesChange
    },
    orders: {
      current: currentPeriodOrders,
      change: ordersChange
    },
    customers: {
      current: currentPeriodCustomers,
      change: customersChange
    },
    products: totalProducts,
    views: totalViews
  };
}

export default async function AnalyticsOverview() {
  const data = await getAnalyticsData();

  const metrics = [
    {
      name: 'Total Sales',
      value: `$${data.sales.current.toFixed(2)}`,
      change: data.sales.change,
      changeType: data.sales.change >= 0 ? 'positive' : 'negative',
      icon: DollarSign,
      description: 'Last 30 days'
    },
    {
      name: 'Orders',
      value: data.orders.current.toString(),
      change: data.orders.change,
      changeType: data.orders.change >= 0 ? 'positive' : 'negative',
      icon: ShoppingBag,
      description: 'Last 30 days'
    },
    {
      name: 'New Customers',
      value: data.customers.current.toString(),
      change: data.customers.change,
      changeType: data.customers.change >= 0 ? 'positive' : 'negative',
      icon: Users,
      description: 'Last 30 days'
    },
    {
      name: 'Active Products',
      value: data.products.toString(),
      change: 0,
      changeType: 'neutral' as const,
      icon: Eye,
      description: 'Total active'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.name}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <metric.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {metric.name}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {metric.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">{metric.description}</span>
                {metric.change !== 0 && (
                  <div className="flex items-center">
                    {metric.changeType === 'positive' ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                    <span className={`ml-1 font-medium ${
                      metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {Math.abs(metric.change).toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
