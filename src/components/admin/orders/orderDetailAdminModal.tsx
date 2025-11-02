"use client";

import { useEffect, useState } from "react";
import { getOrderItems } from "@/lib/data";
import { IOrder, IOrderItem } from "@/interfaces/dataInterfaces";
import { X } from "lucide-react";
import { OrderSummary } from "@/components/profile/orders/orderSummary";
import { OrderItemList } from "@/components/profile/orders/orderItemList";

interface props {
  isOpen: boolean;
  order: IOrder | null;
  onClose: () => void;
}

// --- MODAL COMPONENT ---
export const OrderDetailAdminModal = ({ isOpen, order, onClose }: props) => {
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);

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
      console.error("fail fetching order items" + err);
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

  // Return null if no order is selected to render nothing
  if (!isOpen || !order) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 animate-fadeIn"
      onClick={onClose} // Close modal on overlay click
    >
      <div
        className="relative mx-4 w-full max-w-2xl transform rounded-lg bg-white text-left shadow-xl transition-all animate-scaleIn"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between rounded-t border-b p-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
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
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[60vh] space-y-6 overflow-y-auto p-6">
          <OrderSummary order={order} />
          <OrderItemList items={orderItems} orderStatus={order.status} />
        </div>
      </div>
    </div>
  );
};
