"use client";

import { format } from "date-fns";
import { IOrder } from "@/interfaces/dataInterfaces";
import { OrderStatuses } from "@/interfaces/enums";
import { OrderStatusSelector } from "./orderStatusSelector";

interface props {
  order: IOrder;
  updatingOrderIds: Set<string>;
  onStatusChange: (orderId: string, newStatus: OrderStatuses) => void;
  onRowClick: (order: IOrder) => void;
}

export const OrdersTableRow = ({
  order,
  updatingOrderIds,
  onStatusChange,
  onRowClick,
}:props) => {
  return (
    <tr
      key={order.id}
      onClick={() => onRowClick(order)}
      className="bg-white border-b border-slate-100 hover:bg-mist/60 transition-colors cursor-pointer"
    >
      <td className="px-3 py-2 text-ink whitespace-nowrap ">
        <div className="flex flex-col">
          <div className="font-semibold text-ink">{order.user.name}</div>
          <div className="text-xs text-fog">Order No: {order.id}</div>
        </div>
      </td>
      <td className="px-3 py-2 text-ink/80">{format(order.createdAt, "dd MMMM yyy")}</td>
      <td className="px-3 py-2 font-mono text-ink">Rp. {order.totalAmount.toLocaleString()}</td>
      <td className="px-3 py-2 text-ink/80">{order.fulfillmentType}</td>
      <td className="px-3 py-2 text-center">
        <OrderStatusSelector
          order={order}
          updatingOrderIds={updatingOrderIds}
          onStatusChange={onStatusChange}
        />
      </td>
    </tr>
  );
};