"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronDown, Package } from "lucide-react";
import StatusBadge from "@/components/statusBadge";
import { IOrder, orderStatuses } from "@/interfaces/orderInterface";
import { getCookie } from "cookies-next";
import axios from "axios";
import { apiUrl } from "@/config";
import OrderDetailAdminModal from "@/components/admin/orders/orderDetailAdminModal";

// --- MAIN PAGE COMPONENT ---
const Orders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [updatingOrderIds, setUpdatingOrderIds] = useState<Set<string>>(
    new Set()
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [orderToView, setOrderToView] = useState<IOrder | null>(null);

  const statusOptions: orderStatuses[] = [
    "PENDING",
    "PROCESSING",
    "READY_FOR_PICKUP",
    "OUT_FOR_DELIVERY",
    "COMPLETED",
    "CANCELLED",
  ];

  const fetchOrders = useCallback(async () => {
    const token = getCookie("access_token") as string;
    const response = await axios.get(`${apiUrl}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const sortedOrders = response.data.data.sort(
      (a: IOrder, b: IOrder) =>
        new Date(a.updateAt).getTime() - new Date(b.updateAt).getTime()
    );
    setOrders(sortedOrders);
  }, []);

  useEffect(() => {
    try {
      fetchOrders();
    } catch (err) {
      console.log("error fetching orders" + err);
    }
    // eslint-disable-next-line
  }, []);

  // Simulates an API call to update the order status
  const handleStatusChange = async (
    orderId: string,
    newStatus: orderStatuses
  ) => {
    try {
      setUpdatingOrderIds((prev) => new Set(prev).add(orderId));
      const token = getCookie("access_token") as string;
      await axios.patch(
        `${apiUrl}/api/orders/${orderId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdatingOrderIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-gray-800 dark:text-gray-200" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Order Management
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            View, manage, and update all customer orders.
          </p>
        </header>

        <main>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      Fullfilment Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Update Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => {
                        setIsModalOpen(true);
                        setOrderToView(order);
                      }}
                      className="bg-white border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {order.id}
                      </td>
                      <td className="px-6 py-4">{order.user.name}</td>
                      <td className="px-6 py-4">{order.createdAt}</td>
                      <td className="px-6 py-4 text-right">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">{order.fulfillmentType}</td>
                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="relative inline-block">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(
                                order.id,
                                e.target.value as orderStatuses
                              )
                            }
                            className="appearance-none w-48 text-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2 px-4 transition"
                          >
                            {statusOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <OrderDetailAdminModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={orderToView}
        />
      </div>
    </div>
  );
};

export default Orders;
