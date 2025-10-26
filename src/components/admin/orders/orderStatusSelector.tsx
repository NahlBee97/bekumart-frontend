"use client";

import { statusColors, statusOptions } from "@/helper/variable";
import { IOrder } from "@/interfaces/dataInterfaces";
import { OrderStatuses } from "@/interfaces/enums";
import { ChevronDown } from "lucide-react";

interface props {
  order: IOrder;
  updatingOrderIds: Set<string>;
  onStatusChange: (orderId: string, newStatus: OrderStatuses) => void;
}

export const OrderStatusSelector = ({
  order,
  updatingOrderIds,
  onStatusChange,
}: props) => {
  return (
    <div className="relative inline-block">
      <select
        value={order.status}
        onClick={(e) => e.stopPropagation()} // Prevent row click when changing status
        onChange={(e) =>
          onStatusChange(order.id, e.target.value as OrderStatuses)
        }
        className={`appearance-none w-36 text-center text-xs font-semibold border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2 px-3 transition ${
          statusColors[order.status]
        }`}
      >
        {statusOptions.map((option) => (
          <option
            key={option.label}
            value={option.value}
            className={`${statusColors[option.value]}`}
          >
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
      {updatingOrderIds.has(order.id) && (
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center rounded-lg">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};