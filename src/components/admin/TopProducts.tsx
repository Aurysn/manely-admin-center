import { prisma } from '@/lib/prisma';
import { TrendingUp } from 'lucide-react';

async function getTopProducts() {
  const topProducts = await prisma.orderItem.groupBy({
    by: ['productId'],
    _sum: {
      quantity: true,
      price: true,
    },
    orderBy: {
      _sum: {
        quantity: 'desc',
      },
    },
    take: 5,
  });

  const productIds = topProducts.map(item => item.productId);
  
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
    include: {
      category: true,
    },
  });

  // Combine the data
  const productsWithSales = topProducts.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...product,
      totalQuantity: item._sum.quantity || 0,
      totalRevenue: (item._sum.quantity || 0) * (item._sum.price || 0),
    };
  }).filter(Boolean);

  return productsWithSales;
}

export default async function TopProducts() {
  const topProducts = await getTopProducts();

  if (topProducts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
        <p className="text-gray-500 text-center py-8">No sales data available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={product.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">{index + 1}</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">{product.category.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {product.totalQuantity} sold
              </p>
              <p className="text-sm text-gray-500">
                ${product.totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
