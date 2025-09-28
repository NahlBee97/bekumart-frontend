"use client";

import OrderCard from "@/components/profile/orders/orderCard";
import OrderDetailModal from "@/components/profile/orders/orderDetailModal";
import { apiUrl } from "@/config";
import { IUser } from "@/interfaces/authInterfaces";
import { IOrder } from "@/interfaces/orderInterface";
import axios from "axios";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import type { NextPage } from "next";
import { useState, useEffect } from "react";

// --- MAIN PAGE COMPONENT ---
const OrderHistoryPage: NextPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const handleViewOrder = (order: IOrder) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    try {
      const token = getCookie("access_token") as string;
      const userData = jwtDecode<IUser>(token);
      const fetchOrders = async () => {
        const response = await axios.get(`${apiUrl}/api/orders/${userData.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data.data);
      };
      fetchOrders();
    } catch (err) {
      console.log("error fetching orders" + err);
    }
  }, []);

  // Prevent body scroll when modal is open for better UX
  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedOrder]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Orders
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Check the status of recent orders, manage returns, and discover
            similar products.
          </p>
        </header>

        <main>
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewOrder={handleViewOrder}
              />
            ))
          ) : (
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
                No Orders Yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven`t placed any orders with us. Start shopping to see
                them here!
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          )}
        </main>

        <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default OrderHistoryPage;
