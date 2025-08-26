import { prisma } from '@/lib/prisma';
import { Users, UserPlus, ShoppingBag, DollarSign } from 'lucide-react';

async function getCustomerMetrics() {
  const [
    totalCustomers,
    newCustomersThisMonth,
    averageOrderValue,
    repeatCustomers
  ] = await Promise.all([
    // Total customers
    prisma.user.count({
      where: { role: 'CUSTOMER' }
    }),
    // New customers this month
    prisma.user.count({
      where: {
        role: 'CUSTOMER',
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    }),
    // Average order value
    prisma.order.aggregate({
      where: { status: { not: 'CANCELLED' } },
      _avg: { total: true }
    }),
    // Customers with multiple orders
    prisma.order.groupBy({
      by: ['userId'],
      where: { 
        userId: { not: null },
        status: { not: 'CANCELLED' }
      },
      _count: { id: true }
    })
  ]);

  const repeatCustomerCount = repeatCustomers.filter(c => c._count.id > 1).length;
  const avgOrderValue = averageOrderValue._avg.total || 0;

  return {
    totalCustomers,
    newCustomersThisMonth,
    averageOrderValue: avgOrderValue,
    repeatCustomers: repeatCustomerCount,
    repeatCustomerPercentage: totalCustomers > 0 ? (repeatCustomerCount / totalCustomers) * 100 : 0
  };
}

export default async function CustomerMetrics() {
  const metrics = await getCustomerMetrics();

  const customerData = [
    {
      name: 'Total Customers',
      value: metrics.totalCustomers,
      icon: Users,
      description: 'All time'
    },
    {
      name: 'New This Month',
      value: metrics.newCustomersThisMonth,
      icon: UserPlus,
      description: 'Current month'
    },
    {
      name: 'Average Order Value',
      value: `$${metrics.averageOrderValue.toFixed(2)}`,
      icon: DollarSign,
      description: 'Per order'
    },
    {
      name: 'Repeat Customers',
      value: `${metrics.repeatCustomerPercentage.toFixed(1)}%`,
      icon: ShoppingBag,
      description: `${metrics.repeatCustomers} customers`
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Customer Metrics</h3>
      <div className="grid grid-cols-2 gap-6">
        {customerData.map((metric) => (
          <div key={metric.name} className="text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <metric.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-sm font-medium text-gray-900">{metric.name}</p>
            <p className="text-xs text-gray-500">{metric.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
