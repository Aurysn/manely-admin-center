import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { Edit, Copy, Trash2, Percent, DollarSign, Gift } from 'lucide-react';
import Link from 'next/link';

async function getDiscounts() {
  const discounts = await prisma.discount.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return discounts;
}

function getDiscountTypeIcon(type: string) {
  switch (type) {
    case 'PERCENTAGE':
      return <Percent className="h-4 w-4" />;
    case 'FIXED_AMOUNT':
      return <DollarSign className="h-4 w-4" />;
    case 'FREE_SHIPPING':
      return <Gift className="h-4 w-4" />;
    default:
      return <Percent className="h-4 w-4" />;
  }
}

function getDiscountValue(type: string, value: number) {
  switch (type) {
    case 'PERCENTAGE':
      return `${value}%`;
    case 'FIXED_AMOUNT':
      return `$${value.toFixed(2)}`;
    case 'FREE_SHIPPING':
      return 'Free Shipping';
    default:
      return value.toString();
  }
}

function isDiscountActive(discount: any) {
  if (!discount.isActive) return false;
  
  const now = new Date();
  if (discount.startsAt && new Date(discount.startsAt) > now) return false;
  if (discount.endsAt && new Date(discount.endsAt) < now) return false;
  
  if (discount.maxUses && discount.usedCount >= discount.maxUses) return false;
  
  return true;
}

export default async function DiscountsList() {
  const discounts = await getDiscounts();

  if (discounts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No discounts</h3>
        <p className="mt-1 text-sm text-gray-500">Create your first promotional code to start offering discounts.</p>
        <div className="mt-6">
          <Link
            href="/admin/discounts/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Discount
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {discounts.map((discount) => {
          const isActive = isDiscountActive(discount);
          
          return (
            <li key={discount.id}>
              <div className="px-4 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {getDiscountTypeIcon(discount.type)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">
                          {discount.name}
                        </p>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                          {discount.code}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{getDiscountValue(discount.type, discount.value)}</span>
                        {discount.minAmount && (
                          <>
                            <span className="mx-2">•</span>
                            <span>Min: ${discount.minAmount.toFixed(2)}</span>
                          </>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        Used {discount.usedCount} times
                        {discount.maxUses && ` / ${discount.maxUses} max`}
                        {discount.startsAt && (
                          <span className="ml-2">
                            • Starts {format(new Date(discount.startsAt), 'MMM dd, yyyy')}
                          </span>
                        )}
                        {discount.endsAt && (
                          <span className="ml-2">
                            • Ends {format(new Date(discount.endsAt), 'MMM dd, yyyy')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(discount.code)}
                      className="text-gray-400 hover:text-gray-500"
                      title="Copy code"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <Link
                      href={`/admin/discounts/${discount.id}/edit`}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
