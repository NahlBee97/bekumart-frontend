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
        className={`appearance-none w-36 text-center text-xs font-semibold border border-slate-200 rounded-full focus:ring-2 focus:ring-frost focus:border-frost block py-2 px-3 transition-shadow ${
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
      <ChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 h-4 w-4 text-fog pointer-events-none" />
      {updatingOrderIds.has(order.id) && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-full">
          <div className="w-4 h-4 border-2 border-frost border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};