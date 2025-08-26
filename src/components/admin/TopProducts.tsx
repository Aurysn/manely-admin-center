import { prisma } from '@/lib/prisma';
import { TrendingUp } from 'lucide-react';

async function getTopProducts() {
  try {
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    });

    const productsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          include: { category: true },
        });
        return {
          ...product,
          totalSold: item._sum.quantity || 0,
        };
      })
    );

    return productsWithDetails.filter(Boolean);
  } catch (error) {
    console.error('Error fetching top products:', error);
    return [];
  }
}

export default async function TopProducts() {
  const topProducts = await getTopProducts();

  if (topProducts.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
        <div className="text-center text-gray-500 py-8">
          <TrendingUp className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p>No sales data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={product.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {index + 1}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {product.name}
                </p>
                <p className="text-sm text-gray-500">
                  {product.category?.name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {product.totalSold} sold
              </p>
              <p className="text-sm text-gray-500">
                ${(product.price * product.totalSold).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
