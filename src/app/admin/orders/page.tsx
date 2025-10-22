"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronDown, Package } from "lucide-react";
import OrderDetailAdminModal from "@/components/admin/orders/orderDetailAdminModal";
import api from "@/lib/axios";
import { format } from "date-fns";
import useAuthStore from "@/stores/useAuthStore";
import OperationalSection from "@/components/admin/dashboard/operationalSection";
import { IOrder } from "@/interfaces/dataInterfaces";
import { OrderStatuses } from "@/interfaces/enums";
import { useSearchParams } from "next/navigation";

// --- MAIN PAGE COMPONENT ---
const Orders: React.FC = () => {
  const status = useSearchParams().get("status");

  const { accessToken } = useAuthStore();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [updatingOrderIds, setUpdatingOrderIds] = useState<Set<string>>(
    new Set()
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [orderToView, setOrderToView] = useState<IOrder | null>(null);

  const statusOptions = [
    { label: "Menunggu", value: "PENDING" },
    { label: "Dalam Proses", value: "PROCESSING" },
    { label: "Siap Diambil", value: "READY_FOR_PICKUP" },
    { label: "Dalam Pengiriman", value: "OUT_FOR_DELIVERY" },
    { label: "Selesai", value: "COMPLETED" },
    { label: "Dibatalkan", value: "CANCELLED" },
  ];

  const statusColors: { [key: string]: string } = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
    READY_FOR_PICKUP: "bg-indigo-100 text-indigo-800",
    OUT_FOR_DELIVERY: "bg-purple-100 text-purple-800",
  };

  const fetchOrders = useCallback(async () => {
    if (!accessToken) return;

    try {
      let response;
      if (status) {
        response = await api.get(`/api/orders?status=${status}`);
      } else {
        response = await api.get(`/api/orders`);
      }
      
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }, [accessToken, status]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Simulates an API call to update the order status
  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatuses
  ) => {
    try {
      setUpdatingOrderIds((prev) => new Set(prev).add(orderId));
      await api.patch(`/api/orders/${orderId}`, {
        status: newStatus,
      });
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

  const [currentPage, setCurrentPage] = useState(1);
  const orderPerPage = 10;

  // Pagination logic
  const indexOfLastOrders = currentPage * orderPerPage;
  const indexOfFirstOrders = indexOfLastOrders - orderPerPage;
  const currentOrders = orders.slice(indexOfFirstOrders, indexOfLastOrders);

  const totalPages = Math.ceil(orders.length / orderPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <header className="mb-8">
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-blue-500 dark:text-gray-200" />
            <h1 className="text-2xl font-bold text-blue-500 dark:text-white">
              Order Management
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            View, manage, and update all customer orders.
          </p>
        </header>

        <main className="flex flex-col gap-4">
          <OperationalSection />

          <h2 className="text-2xl text-blue-500 font-bold mt-4">
            Daftar Pesanan
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <div></div>
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs text-blue-500 font-semibold uppercase ">
                  <tr>
                    <th scope="col" className="px-3 py-4">
                      Cutomer
                    </th>
                    <th scope="col" className="px-3 py-4">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-4">
                      Total
                    </th>
                    <th scope="col" className="px-3 py-4">
                      Fullfilment Method
                    </th>
                    <th scope="col" className="px-3 py-4 text-center">
                      Update Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => {
                        setIsModalOpen(true);
                        setOrderToView(order);
                      }}
                      className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 py-2 text-gray-900 whitespace-nowrap ">
                        <div className="flex flex-col">
                          <div className="font-semibold text-blue-500">
                            {order.user.name}
                          </div>
                          <div>Order No: {order.id}</div>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        {format(order.createdAt, "dd MMMM yyy")}
                      </td>
                      <td className="px-3 py-2">
                        Rp {order.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-3 py-2">{order.fulfillmentType}</td>
                      <td className="px-3 py-2 text-center">
                        <div className="relative inline-block">
                          <select
                            value={order.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                              handleStatusChange(
                                order.id,
                                e.target.value as OrderStatuses
                              )
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length > orderPerPage && (
                <div className="p-4 sm:p-6 flex items-center justify-between border-t border-gray-200">
                  <span className="text-sm text-gray-600">
                    Page <span className="font-semibold">{currentPage}</span> of{" "}
                    <span className="font-semibold">{totalPages}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
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
