"use client";

import api from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { OrderStatuses } from "@/interfaces/enums";
import { IOrder } from "@/interfaces/dataInterfaces";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

import { OrderDetailAdminModal } from "@/components/admin/orders/orderDetailAdminModal";
import { TablePagination } from "@/components/admin/products/tablePagination";
import { OrdersTableRow } from "@/components/admin/orders/tableRow";
import { OrdersTableSkeleton } from "@/components/skeletons/admin/orders/tableSkeleton";
import { getTotalPages } from "@/helper/functions";

export const OrderTable = () => {
  const status = useSearchParams().get("status");

  const { isAuthLoading, accessToken } = useAuthStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [updatingOrderIds, setUpdatingOrderIds] = useState<Set<string>>(
    new Set()
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [orderToView, setOrderToView] = useState<IOrder | null>(null);

  

  const fetchOrders = useCallback(async () => {
    if (isAuthLoading || !accessToken) return;

    try {
      let response;
      if (status) {
        response = await api.get(`/api/orders?status=${status}`);
      } else {
        response = await api.get(`/api/orders`);
      }

      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthLoading, accessToken, status]);

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

  const { totalPages, currentItems } = getTotalPages(
    orders,
    currentPage,
    orderPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <main className="flex flex-col gap-4 py-6">
      <div className="flex items-center gap-2">
        <FileText className="w-6 md:w-8 text-frost" />
        <h2 className="font-display text-xl md:text-2xl text-ink font-semibold">
          Daftar Pesanan
        </h2>
      </div>
      <div className="bg-white rounded-2xl shadow-sm shadow-ink/5 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="w-full h-2"></div>
          <table className="w-full text-sm text-left">
            <thead className="bg-mist border-y border-slate-100 text-xs text-frost-deep font-semibold uppercase ">
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
              ) : currentItems.length === 0 ? (
                <tr className="bg-white">
                  <td colSpan={5} className="text-center py-12">
                    <h3 className="text-lg font-medium text-ink/80">
                      Tidak Ada Pesanan
                    </h3>
                    <p className="mt-1 text-fog">
                      Tidak ada pesanan yang ditemukan.
                    </p>
                  </td>
                </tr>
              ) : (
                currentItems.map((order) => (
                  <OrdersTableRow
                    key={order.id}
                    order={order}
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
      <OrderDetailAdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={orderToView}
      />
    </main>
  );
};
