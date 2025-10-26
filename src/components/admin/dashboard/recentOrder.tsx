import { statusColors, statusLabels } from "@/helper/variable";
import { IRecentOrders } from "@/interfaces/dataInterfaces";

export const RecentOrder = ({
  recentOrders,
}: {
  recentOrders: IRecentOrders[];
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-blue-500 mb-4">Pesanan Terbaru</h3>
      <ul className="space-y-4">
        {recentOrders.map((order) => (
          <li
            key={order.id}
            className="flex items-center justify-between text-sm"
          >
            <div>
              <p className="font-semibold">{order.user.name}</p>
              <p className="text-gray-500">
                Rp {order.totalAmount.toLocaleString("id-ID")}
              </p>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                statusColors[order.status] || ""
              }`}
            >
              {statusLabels[order.status]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
