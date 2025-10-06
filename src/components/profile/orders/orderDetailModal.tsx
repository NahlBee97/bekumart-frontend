"use client";

import { IOrder, IOrderItem } from "@/interfaces/orderInterface";
import { useEffect, useState } from "react";
import StatusBadge from "../../statusBadge";
import { getCookie } from "cookies-next";
import axios from "axios";
import { apiUrl } from "@/config";
import { format } from "date-fns";

// --- MODAL COMPONENT ---
const OrderDetailModal: React.FC<{
  order: IOrder | null;
  onClose: () => void;
}> = ({ order, onClose }) => {
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);

  // --- CHANGE 1: Add state and useEffect for the animation ---
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (order) {
      // When an order is passed, start the enter animation
      const timer = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timer);
    }
  }, [order]);

  useEffect(() => {
    try {
      const token = getCookie("access_token") as string;
      const fetchOrderItems = async () => {
        const response = await axios.get(
          `${apiUrl}/api/orders/order-items/${order?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderItems(response.data.data);
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

  // --- FIX 2: Create a function to handle the exit animation ---
  const handleClose = () => {
    // 1. Start the exit animation
    setShow(false);
    // 2. Wait for the animation to finish (300ms), then call the parent's onClose
    setTimeout(() => {
      onClose();
    }, 300); // This duration MUST match your CSS transition duration
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

        {/* Modal Body */}
        <div className="max-h-[60vh] space-y-6 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Order Date</p>
              <p className="text-base text-gray-800">
                {format(order.createdAt, "dd MMMM yyy")}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <StatusBadge status={order.status} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total</p>
              <p className="text-base font-semibold text-blue-500">
                Rp {order.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm md:text-base text-gray-800">
              Daftar Pesanan:
            </h4>
            <div className="flow-root">
              <ul className="-my-4 divide-y divide-gray-200">
                {orderItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center space-x-4 py-4"
                  >
                    {/* eslint-disable-next-line */}
                    <img
                      src={
                        item.product.productPhotos.find(
                          (photo) => photo.isDefault === true
                        )?.imageUrl
                      }
                      alt={item.product.name}
                      className="h-16 w-16 border border-gray-200 flex-shrink-0 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Jumlah: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-blue-500">
                      Rp {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
