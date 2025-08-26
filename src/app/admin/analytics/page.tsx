import { Suspense } from 'react';
import AnalyticsOverview from '@/components/admin/AnalyticsOverview';
import SalesChart from '@/components/admin/SalesChart';
import TopProducts from '@/components/admin/TopProducts';
import CustomerMetrics from '@/components/admin/CustomerMetrics';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500">Track your store performance and insights</p>
      </div>

      <Suspense fallback={<div>Loading analytics...</div>}>
        <AnalyticsOverview />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<div>Loading chart...</div>}>
          <SalesChart />
        </Suspense>
        
        <Suspense fallback={<div>Loading products...</div>}>
          <TopProducts />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading customer metrics...</div>}>
        <CustomerMetrics />
      </Suspense>
    </div>
  );
}
