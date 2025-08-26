import { prisma } from '@/lib/prisma';
import { Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

async function getProducts() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return products;
}

export default async function ProductsList() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
        <div className="mt-6">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Product
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {products.map((product) => {
          const images = product.images ? JSON.parse(product.images) : [];
          const mainImage = images[0] || '/placeholder-product.jpg';
          
          return (
            <li key={product.id}>
              <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16">
                    <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center">
                      {mainImage !== '/placeholder-product.jpg' ? (
                        <Image
                          src={mainImage}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 object-cover rounded-lg"
                        />
                      ) : (
                        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      {!product.isActive && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Inactive
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span>{product.category.name}</span>
                      <span className="mx-2">•</span>
                      <span>SKU: {product.sku || 'N/A'}</span>
                      <span className="mx-2">•</span>
                      <span>Stock: {product.inventory}</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-900">
                      ${product.price.toFixed(2)}
                      {product.comparePrice && (
                        <span className="ml-2 text-gray-500 line-through">
                          ${product.comparePrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
