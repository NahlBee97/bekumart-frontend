import { IOrder } from "@/interfaces/dataInterfaces";
import { format } from "date-fns";
import { StatusBadge } from "../../statusBadge";

export const OrderSummary = ({ order }: { order: IOrder }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <div>
      <p className="text-sm font-medium text-gray-500">Order Date</p>
      <p className="text-base text-gray-800">
        {format(order.createdAt, "dd MMMM yyyy")}
      </p>
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">Status</p>
      <StatusBadge status={order.status} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">Total</p>
      <p className="text-base font-semibold text-blue-500">
        Rp {order.totalAmount.toLocaleString()}
      </p>
    </div>
  </div>
);

