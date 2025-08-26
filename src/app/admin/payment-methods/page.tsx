import { Suspense } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import PaymentMethodsList from '@/components/admin/PaymentMethodsList';

export default function PaymentMethodsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
          <p className="text-sm text-gray-500">Configure payment options for your store</p>
        </div>
        <Link
          href="/admin/payment-methods/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Link>
      </div>

      <Suspense fallback={<div>Loading payment methods...</div>}>
        <PaymentMethodsList />
      </Suspense>
    </div>
  );
}
