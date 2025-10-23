"use client";

import { format } from "date-fns";
import { IOrder } from "@/interfaces/dataInterfaces";
import StatusBadge from "@/components/statusBadge";

interface OrdersTableRowProps {
  order: IOrder;
  onRowClick: (order: IOrder) => void;
}

const OrdersTableRow: React.FC<OrdersTableRowProps> = ({
  order,
  onRowClick,
}) => {
  return (
    <tr
      key={order.id}
      onClick={() => onRowClick(order)}
      className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <td className="px-2 py-4 text-blue-500 font-semibold whitespace-nowrap ">
        {order.id}
      </td>
      <td className="px-2 py-4">{format(order.createdAt, "dd MMMM yyy")}</td>
      <td className="px-2 py-4">Rp. {order.totalAmount.toLocaleString()}</td>
      <td className="px-2 py-4">{order.fulfillmentType}</td>
      <td className="px-2 py-4">
        <StatusBadge status={order.status} />
      </td>
    </tr>
  );
};

export default OrdersTableRow;
