"use client";

import { useEffect, useState } from "react";
import { getUserOrders } from "@/lib/data";
import { useAuthStore } from "@/stores/useAuthStore";
import { IOrder } from "@/interfaces/dataInterfaces";

import { TablePagination } from "@/components/admin/products/tablePagination";
import { OrdersTableSkeleton } from "@/components/skeletons/admin/orders/tableSkeleton";
import { OrdersTableRow } from "./orderTableRow";
import { EmptyState } from "./emptyState";
import { OrderDetailModal } from "@/components/profile/orders/orderDetailModal";
import { getTotalPages } from "@/helper/functions";

// --- MAIN PAGE COMPONENT ---
export default function OrderHistoryClient() {
  const { user, isAuthLoading, accessToken } = useAuthStore();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const ordersPerPage = 10;

  const handleViewOrder = (order: IOrder) => setSelectedOrder(order);
  const handleCloseModal = () => setSelectedOrder(null);

  const {totalPages, currentItems} = getTotalPages(orders, currentPage, ordersPerPage)

  useEffect(() => {
    if (isAuthLoading || !accessToken) return;
    try {
      const fetchOrders = async () => {
        const orders = await getUserOrders(user.id);
        setOrders(orders);
      };

      fetchOrders();
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user, isAuthLoading, accessToken]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  if(!isLoading && orders.length === 0) return <EmptyState/>

  return (
    <div className="container mx-auto">
      <main className="flex flex-col gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <div className="w-full h-2"></div>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-y border-gray-200 text-xs text-blue-500 font-semibold uppercase ">
                <tr>
                  <th scope="col" className="px-3 py-4">
                    Nomor
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
                  <th scope="col" className="px-3 py-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <OrdersTableSkeleton />
                ) : (
                  currentItems.map((order) => (
                    <OrdersTableRow
                      key={order.id}
                      order={order}
                      onRowClick={handleViewOrder}
                    />
                  ))
                )}
              </tbody>
            </table>
            {orders.length > ordersPerPage && (
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
      <OrderDetailModal onClose={handleCloseModal} order={selectedOrder} />
    </div>
  );
}
