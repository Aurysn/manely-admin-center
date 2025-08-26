import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { Eye, Mail, User } from 'lucide-react';
import Link from 'next/link';

async function getCustomers() {
  const customers = await prisma.user.findMany({
    where: {
      role: 'CUSTOMER',
    },
    include: {
      _count: {
        select: {
          orders: true,
        },
      },
      orders: {
        select: {
          total: true,
        },
        where: {
          status: { not: 'CANCELLED' },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return customers.map(customer => ({
    ...customer,
    totalSpent: customer.orders.reduce((sum, order) => sum + order.total, 0),
  }));
}

export default async function CustomersList() {
  const customers = await getCustomers();

  if (customers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <User className="h-12 w-12" />
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No customers</h3>
        <p className="mt-1 text-sm text-gray-500">Customers will appear here when they register.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {customers.map((customer) => (
          <li key={customer.id}>
            <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  {customer.image ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={customer.image}
                      alt={customer.name || 'Customer'}
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900">
                      {customer.name || 'Unnamed Customer'}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-1" />
                    <span>{customer.email}</span>
                    <span className="mx-2">•</span>
                    <span>Joined {format(new Date(customer.createdAt), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {customer._count.orders} orders • ${customer.totalSpent.toFixed(2)} total spent
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  href={`/admin/customers/${customer.id}`}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Eye className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
