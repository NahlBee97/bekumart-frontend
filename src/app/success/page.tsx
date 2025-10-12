"use client";

import { apiUrl } from "@/config";
import api from "@/lib/axios";
import { getCookie } from "cookies-next";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Success() {
  useEffect(() => {
    try {
      const token = getCookie("access_token") as string;

      if (!token) throw new Error("No access token found");

      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get("order_id");

      const updateOrderStatus = async () => {
        if (orderId) {
          await api.patch(`${apiUrl}/api/orders/${orderId}`, {
            status: "PROCESSING",
          });
        }
      };
      updateOrderStatus();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-2xl text-center">
        <CheckCircleIcon />

        <h1 className="text-3xl font-bold text-gray-800 mt-4">
          Terima Kasih Sudah Belanja di Bekumart!
        </h1>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-block w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Lanjut Belanja
          </Link>
        </div>
      </div>
    </div>
  );
}
