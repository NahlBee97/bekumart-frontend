"use client";

import api from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Success() {
  const { accessToken } = useAuthStore();
  useEffect(() => {
    if (!accessToken) return;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get("order_id");

      const updateOrderStatus = async () => {
        if (orderId) {
          await api.patch(`/api/orders/${orderId}`, {
            status: "PROCESSING",
          });
        }
      };
      updateOrderStatus();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  }, [accessToken]);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-2xl text-center">
        <CheckCircleIcon />

        <h1 className="text-3xl font-bold text-gray-800 mt-4">
          Terima Kasih Sudah Belanja di Bekumart!
        </h1>

        <div className="mt-10">
          <Link
            href="/shop"
            className="inline-block w-full sm:w-auto px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            Lanjut Belanja
          </Link>
        </div>
      </div>
    </div>
  );
}
