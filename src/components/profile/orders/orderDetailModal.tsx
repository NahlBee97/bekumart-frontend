"use client";

import { useEffect, useState } from "react";
import { getOrderItems } from "@/lib/data";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { midtransClientKey } from "@/config";
import { IOrder, IOrderItem } from "@/interfaces/dataInterfaces";
import { OrderSummary } from "./orderSummary";
import OrderItemList from "./orderItemList";
import ModalActions from "./modalActions";

// --- MODAL COMPONENT ---
const OrderDetailModal: React.FC<{
  order: IOrder;
  onClose: () => void;
}> = ({ order, onClose }) => {
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);

  // --- CHANGE 1: Add state and useEffect for the animation ---
  const [show, setShow] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);

  useEffect(() => {
    if (order) {
      // When an order is passed, start the enter animation
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
    } catch (err) {
      console.log("fail fetching order items" + err);
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

  // --- FIX 2: Create a function to handle the exit animation ---
  const handleClose = () => {
    // 1. Start the exit animation
    setShow(false);
    // 2. Wait for the animation to finish (300ms), then call the parent's onClose
    setTimeout(() => {
      onClose();
    }, 300); // This duration MUST match your CSS transition duration
  };

  const handleProceedPayment = async () => {
    try {
      setIsPaymentLoading(true);

      const response = await api.post(`/api/orders/payment-token`, order);
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
            <svg
              className="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="max-h-[60vh] space-y-6 overflow-y-auto p-6">
          <OrderSummary order={order} />
          <OrderItemList
            items={orderItems}
            orderStatus={order.status}
          />
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

export default OrderDetailModal;
