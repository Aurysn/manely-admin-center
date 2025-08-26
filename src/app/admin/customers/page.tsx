import { Suspense } from 'react';
import CustomersList from '@/components/admin/CustomersList';
import CustomersFilters from '@/components/admin/CustomersFilters';

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500">Manage your customer database</p>
        </div>
      </div>

      <CustomersFilters />
      
      <Suspense fallback={<div>Loading customers...</div>}>
        <CustomersList />
      </Suspense>
    </div>
  );
}
