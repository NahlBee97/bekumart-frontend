"use client";

import { StatusBadge } from "@/components/statusBadge";
import { IOrder } from "@/interfaces/dataInterfaces";
import { format } from "date-fns";

// The main component for an individual order
const OrderCard: React.FC<{
  order: IOrder;
  onViewOrder: (order: IOrder) => void;
}> = ({ order, onViewOrder }) => {
  return (
    <div
      onClick={() => onViewOrder(order)}
      className="mb-2 cursor-pointer overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      {/* This container now handles padding and the responsive layout.
        - Mobile: A 2x2 grid for a compact view.
        - Medium screens and up: A flex row to space items out horizontally.
      */}
      <div className="grid grid-cols-2 items-start gap-x-4 gap-y-5 bg-white p-4 text-sm text-gray-600 md:flex md:items-center md:justify-between">
        {/* Order Number */}
        {/* On mobile, this spans the full width to act as a clear header. */}
        <div className="col-span-2 flex items-center gap-2 md:col-auto">
          <p className="font-medium text-gray-500">Nomor Pesanan:</p>
          <p className="font-semibold text-gray-800">{order.id}</p>
        </div>

        {/* Date */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <p className="font-medium text-gray-900">Tanggal:</p>
          <p>{format(order.createdAt, "dd MMMM yyyy")}</p>
        </div>

        {/* Status */}
        {/* The w-full class was removed to allow it to fit in the layout on all screen sizes. */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <p className="font-medium text-gray-900">Status</p>
          <StatusBadge status={order.status} />
        </div>

        {/* Total Price */}
        <div className="text-right md:text-left">
          <p className="font-medium text-gray-900">Total Harga</p>
          <p className="font-semibold text-blue-500">
            Rp {order.totalAmount.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
