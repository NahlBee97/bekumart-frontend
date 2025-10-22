"use client";

import { useCallback, useEffect, useState } from "react";
import { FileText, Package } from "lucide-react";
import OrderDetailAdminModal from "@/components/admin/orders/orderDetailAdminModal";
import api from "@/lib/axios";
import useAuthStore from "@/stores/useAuthStore";
import OperationalSection from "@/components/admin/dashboard/operationalSection";
import { IOrder } from "@/interfaces/dataInterfaces";
import { OrderStatuses } from "@/interfaces/enums";
import { useSearchParams } from "next/navigation";
import TablePagination from "@/components/admin/products/tablePagination";
import OrdersTableRow from "@/components/admin/orders/tableRow";
import OrdersTableSkeleton from "@/components/skeletons/admin/orders/tableSkeleton";

// --- MAIN PAGE COMPONENT ---
const Orders: React.FC = () => {
  const status = useSearchParams().get("status");

  const { accessToken } = useAuthStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    } finally {
      setIsLoading(false);
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

  const handleViewOrder = (order: IOrder) => {
    setOrderToView(order);
    setIsModalOpen(true);
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
        <header className="mb-2">
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-blue-500 dark:text-gray-200" />
            <h1 className="text-2xl font-bold text-blue-500 dark:text-white">
              Order Management
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Melihat, mengatur, dan update pesanan customer.
          </p>
        </header>

        <OperationalSection />

        <main className="flex flex-col gap-4 py-6">
          <div className="flex items-center gap-2">
            <FileText className="text-blue-500" />
            <h2 className="text-2xl text-blue-500 font-bold">Daftar Pesanan</h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <div className="w-full h-2"></div>
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-y border-gray-200 text-xs text-blue-500 font-semibold uppercase ">
                  <tr>
                    <th scope="col" className="px-3 py-4">
                      Cutomer
                    </th>
                    <th scope="col" className="px-3 py-4">
                      Tanggal
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
                  {isLoading ? (
                    <OrdersTableSkeleton />
                  ) : currentOrders.length === 0 ? (
                    <tr className="bg-white">
                      <td colSpan={5} className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-700">
                          Tidak Ada Pesanan
                        </h3>
                        <p className="mt-1 text-gray-500">
                          Tidak ada pesanan yang ditemukan.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    currentOrders.map((order) => (
                      <OrdersTableRow
                        key={order.id}
                        order={order}
                        statusOptions={statusOptions}
                        statusColors={statusColors}
                        updatingOrderIds={updatingOrderIds}
                        onStatusChange={handleStatusChange}
                        onRowClick={handleViewOrder}
                      />
                    ))
                  )}
                </tbody>
              </table>
              {orders.length > orderPerPage && (
                <TablePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrevPage={handlePrevPage}
                  onNextPage={handleNextPage}
                />
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
