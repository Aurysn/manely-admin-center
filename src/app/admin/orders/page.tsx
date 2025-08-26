import { Suspense } from 'react';
import OrdersList from '@/components/admin/OrdersList';
import OrdersFilters from '@/components/admin/OrdersFilters';

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500">Manage customer orders and fulfillment</p>
        </div>
      </div>

      <OrdersFilters />
      
      <Suspense fallback={<div>Loading orders...</div>}>
        <OrdersList />
      </Suspense>
    </div>
  );
}
