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
    <div
      onClick={() => onViewOrder(order)}
      className="mb-2 overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Order Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 p-4 sm:p-6">
        <div className="w-full grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600 sm:flex sm:gap-x-8">
          <div className="flex flex-col gap-2 justify-between">
            <div className="flex items-center gap-1 text-white bg-blue-300 px-2 rounded-sm">
              <p className="font-medium text-sm">Nomor Pesanan:</p>
              <p className="text-xs text-gray-800">{order.id}</p>
            </div>
            <div className="flex gap-1">
              <p className="font-medium text-sm text-gray-900">Tanggal:</p>
              <p>{format(order.createdAt, "dd MMMM yyyy")}</p>
            </div>
          </div>
          <div className="w-full flex justify-between gap-8">
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
