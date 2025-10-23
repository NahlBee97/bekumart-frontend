"use client";

import { format } from "date-fns";
import { IOrder } from "@/interfaces/dataInterfaces";
import { OrderStatuses } from "@/interfaces/enums";
import OrderStatusSelector from "./orderStatusSelector";

interface StatusOption {
  label: string;
  value: string;
}

interface OrdersTableRowProps {
  order: IOrder;
  statusOptions: StatusOption[];
  statusColors: { [key: string]: string };
  updatingOrderIds: Set<string>;
  onStatusChange: (orderId: string, newStatus: OrderStatuses) => void;
  onRowClick: (order: IOrder) => void;
}

const OrdersTableRow: React.FC<OrdersTableRowProps> = ({
  order,
  statusOptions,
  statusColors,
  updatingOrderIds,
  onStatusChange,
  onRowClick,
}) => {
  return (
    <tr
      key={order.id}
      onClick={() => onRowClick(order)}
      className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <td className="px-3 py-2 text-gray-900 whitespace-nowrap ">
        <div className="flex flex-col">
          <div className="font-semibold text-blue-500">{order.user.name}</div>
          <div>Order No: {order.id}</div>
        </div>
      </td>
      <td className="px-3 py-2">{format(order.createdAt, "dd MMMM yyy")}</td>
      <td className="px-3 py-2">Rp. {order.totalAmount.toLocaleString()}</td>
      <td className="px-3 py-2">{order.fulfillmentType}</td>
      <td className="px-3 py-2 text-center">
        <OrderStatusSelector
          order={order}
          statusOptions={statusOptions}
          statusColors={statusColors}
          updatingOrderIds={updatingOrderIds}
          onStatusChange={onStatusChange}
        />
      </td>
    </tr>
  );
};

export default OrdersTableRow;
