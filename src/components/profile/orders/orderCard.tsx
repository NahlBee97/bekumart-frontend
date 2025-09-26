"use client";

import { IOrder } from "@/interfaces/orderInterface";

// The main component for an individual order
const OrderCard: React.FC<{
  order: IOrder;
  onViewOrder: (order: IOrder) => void;
}> = ({ order, onViewOrder }) => {
  return (
    <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      {/* Order Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-gray-50 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600 sm:flex sm:gap-x-8">
          <div>
            <p className="font-medium text-gray-900">Order Number</p>
            <p>{order.id}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">Date Placed</p>
            <p>{order.createdAt}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">Total Amount</p>
            <p className="font-semibold text-gray-900">
              ${order.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onViewOrder(order)}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            View Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
