"use client";

import { useEffect, useState } from "react";
import OrderCard from "@/components/profile/orders/orderCard";
import OrderDetailModal from "@/components/profile/orders/orderDetailModal";
import { getUserOrders } from "@/lib/data";
import useAuthStore from "@/stores/useAuthStore";
import { IOrder } from "@/interfaces/dataInterfaces";

// --- MAIN PAGE COMPONENT ---
export default function OrderHistoryClient() {
  const { user, isLoading } = useAuthStore()
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const handleViewOrder = (order: IOrder) => setSelectedOrder(order);
  const handleCloseModal = () => setSelectedOrder(null);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstorder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstorder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  useEffect(() => {
    if (isLoading) return;
    try {
      const fetchOrders = async () => {
        const orders = await getUserOrders(user.id);
        setOrders(orders);
      };

      fetchOrders()
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error;
    }
  }, [user, isLoading]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  if (orders.length > 0) {
    return (
      <>
        <div className="space-y-4">
          {currentOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewOrder={handleViewOrder}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <span className="text-sm text-gray-700">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Berikutnya
            </button>
          </div>
        )}
        <OrderDetailModal order={selectedOrder as IOrder} onClose={handleCloseModal} />
      </>
    );
  }

  return (
    <div className="text-center py-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">
        Belum Ada Pesanan
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Sepertinya Anda belum pernah berbelanja.
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={() => (window.location.href = "/shop")}
          className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Mulai Belanja
        </button>
      </div>
    </div>
  );
}
