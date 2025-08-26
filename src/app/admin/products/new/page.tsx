import { prisma } from '@/lib/prisma';
import ProductForm from '@/components/admin/ProductForm';

async function getCategories() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  });
  return categories;
}

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-sm text-gray-500">Create a new product for your store</p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
