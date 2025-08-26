import { prisma } from '@/lib/prisma';
import { Edit, Trash2, Package } from 'lucide-react';
import Link from 'next/link';

async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return categories;
}

export default async function CategoriesList() {
  const categories = await getCategories();

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <Package className="h-12 w-12" />
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new category.</p>
        <div className="mt-6">
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Category
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {categories.map((category) => (
          <li key={category.id}>
            <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                    <Package className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900">{category.name}</p>
                    {!category.isActive && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Inactive
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <span>{category._count.products} products</span>
                    {category.description && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{category.description}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  href={`/admin/categories/${category.id}/edit`}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button className="text-gray-400 hover:text-gray-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
