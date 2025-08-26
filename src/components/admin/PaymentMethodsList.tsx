import { prisma } from '@/lib/prisma';
import { Edit, Trash2, CreditCard, ToggleLeft, ToggleRight } from 'lucide-react';
import Link from 'next/link';

async function getPaymentMethods() {
  const paymentMethods = await prisma.paymentMethod.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return paymentMethods;
}

function getPaymentMethodIcon(type: string) {
  switch (type) {
    case 'STRIPE':
      return <CreditCard className="h-5 w-5" />;
    case 'PAYPAL':
      return <CreditCard className="h-5 w-5" />;
    case 'BANK_TRANSFER':
      return <CreditCard className="h-5 w-5" />;
    case 'CASH_ON_DELIVERY':
      return <CreditCard className="h-5 w-5" />;
    default:
      return <CreditCard className="h-5 w-5" />;
  }
}

function getPaymentMethodName(type: string) {
  switch (type) {
    case 'STRIPE':
      return 'Stripe';
    case 'PAYPAL':
      return 'PayPal';
    case 'BANK_TRANSFER':
      return 'Bank Transfer';
    case 'CASH_ON_DELIVERY':
      return 'Cash on Delivery';
    default:
      return type;
  }
}

export default async function PaymentMethodsList() {
  const paymentMethods = await getPaymentMethods();

  if (paymentMethods.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <CreditCard className="h-12 w-12" />
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No payment methods</h3>
        <p className="mt-1 text-sm text-gray-500">Add payment methods to start accepting orders.</p>
        <div className="mt-6">
          <Link
            href="/admin/payment-methods/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Payment Method
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {paymentMethods.map((method) => (
          <li key={method.id}>
            <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                    {getPaymentMethodIcon(method.type)}
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900">
                      {getPaymentMethodName(method.type)}
                    </p>
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      method.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {method.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {method.name}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-500">
                  {method.isActive ? (
                    <ToggleRight className="h-4 w-4" />
                  ) : (
                    <ToggleLeft className="h-4 w-4" />
                  )}
                </button>
                <Link
                  href={`/admin/payment-methods/${method.id}/edit`}
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
