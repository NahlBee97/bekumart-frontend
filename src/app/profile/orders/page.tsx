"use client";

import { useState, useEffect, useCallback } from "react";
import { NextPage } from "next";
import OrderCard from "@/components/profile/orders/orderCard";
import OrderDetailModal from "@/components/profile/orders/orderDetailModal";
import { IOrder } from "@/interfaces/orderInterface";
import { getCookie } from "cookies-next";
import axios from "axios";
import { apiUrl } from "@/config";
import Loading from "@/components/loading";

// --- MAIN PAGE COMPONENT ---
const OrderHistoryPage: NextPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  // --- State untuk Paginasi ---
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const ordersPerPage = 5;

  const handleViewOrder = (order: IOrder) => setSelectedOrder(order);
  const handleCloseModal = () => setSelectedOrder(null);

  // Mock 'useRouter' functionality
  const router = {
    push: (path: string) => {
      alert(`Navigating to: ${path}`);
      // In a real app, you might use: window.location.href = path;
    },
  };

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
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
    } catch (err) {
      console.log("error fetching orders" + err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstorder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstorder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const renderContent = () => {
    if (isLoading) return <Loading/>

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
            onClick={() => router.push("/products")}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Mulai Belanja
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="container mx-auto max-w-5xl px-4 py-2 sm:py-8">
        <header className="mb-6">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-blue-500 sm:text-4xl">
            Riwayat Pesanan
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Lihat semua pesanan yang telah Anda buat.
          </p>
        </header>
        <main>{renderContent()}</main>
        <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default OrderHistoryPage;
