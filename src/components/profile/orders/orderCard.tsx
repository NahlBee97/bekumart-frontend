"use client";

import StatusBadge from "@/components/statusBadge";
import { format } from "date-fns";
import { IOrder } from "@/interfaces/orderInterface";

// The main component for an individual order
const OrderCard: React.FC<{
  order: IOrder;
  onViewOrder: (order: IOrder) => void;
}> = ({ order, onViewOrder }) => {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      {/* Order Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-gray-50 p-4 sm:p-6">
        <div className="w-full grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600 sm:flex sm:gap-x-8">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-white bg-blue-300 px-2 rounded-sm">
              <p className="font-medium text-sm">Nomor Pesanan:</p>
              <p className="text-xs text-gray-800">{order.id}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onViewOrder(order)}
                className="rounded-md border border-gray-300 sm:px-3 sm:py-1.5 px-2 py-1 text-white text-xs md:text-sm font-medium shadow-sm bg-gray-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                View Order
              </button>
            </div>
          </div>
          <div className="w-full flex justify-between gap-8">
            <div>
              <p className="font-medium text-sm text-gray-900">Tanggal</p>
              <p>{format(order.createdAt, "dd MMMM yyyy")}</p>
            </div>
            <div>
              <p className="font-medium text-sm text-gray-900">Status</p>
              <StatusBadge status={order.status} />
            </div>
            <div>
              <p className="font-medium text-sm text-gray-900">Total Harga</p>
              <p className="font-semibold text-blue-500">
                Rp {order.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
