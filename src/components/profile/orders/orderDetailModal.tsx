"use client";

import api from "@/lib/axios";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { getOrderItems } from "@/lib/data";
import { midtransClientKey } from "@/config";
import { IOrder, IOrderItem } from "@/interfaces/dataInterfaces";

import { OrderSummary } from "./orderSummary";
import { OrderItemList } from "./orderItemList";
import { ModalActions } from "./modalActions";

interface props {
  order: IOrder | null;
  onClose: () => void;
}

export const OrderDetailModal = ({ order, onClose }: props) => {
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);

  // Add state and useEffect for the animation ---
  const [show, setShow] = useState<boolean>(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);

  useEffect(() => {
    if (order) {
      const timer = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timer);
    }
  }, [order]);

  useEffect(() => {
    try {
      setOrderItems([]);
      if (!order) return;
      const fetchOrderItems = async () => {
        const orderItems = await getOrderItems(order.id);
        setOrderItems(orderItems);
      };
      fetchOrderItems();
    } catch (error) {
      console.log("fail fetching order items" + error);
    }
  }, [order]);

  // Effect to handle Escape key press for closing the modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Midtrans script loading
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", String(midtransClientKey));
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleProceedPayment = async () => {
    try {
      setIsPaymentLoading(true);

      const orderData = {
        id: order?.id,
        userId: order?.userId,
        totalAmount: order?.totalAmount,
      };

      const response = await api.post(`/api/orders/payment-token`, orderData);
      const { paymentToken } = response.data;

      window.snap?.pay(paymentToken);
    } catch (error) {
      toast.error("Gagal melanjutkan pembayaran");
      console.error(error);
    } finally {
      setIsPaymentLoading(false);
    }
  };

  // Return null if no order is selected to render nothing
  if (!order) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ease-in-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose} // Close modal on overlay click
    >
      <div
        className={`relative mx-4 w-full max-w-2xl transform rounded-lg bg-white text-left shadow-xl transition-all ease-in-out ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between rounded-t border-b p-4">
          <div>
            <h3 className="md:text-xl font-semibold text-blue-500">
              Detail Pesanan
            </h3>
            <p className="text-sm text-gray-500">Nomor Pesanan: {order.id}</p>
          </div>
          <button
            type="button"
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        <div className="max-h-[60vh] space-y-6 overflow-y-auto p-6">
          <OrderSummary order={order} />
          <OrderItemList items={orderItems} orderStatus={order.status} />
          <ModalActions
            order={order}
            isPaymentLoading={isPaymentLoading}
            onProceedPayment={handleProceedPayment}
          />
        </div>
      </div>
    </div>
  );
};
