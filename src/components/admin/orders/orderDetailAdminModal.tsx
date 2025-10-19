"use client";

import { useEffect, useState } from "react";
import StatusBadge from "../../statusBadge";
import { getOrderItems } from "@/lib/data";
import { format } from "date-fns";
import { IOrder, IOrderItem } from "@/interfaces/dataInterfaces";

// --- MODAL COMPONENT ---
const OrderDetailAdminModal: React.FC<{
  isOpen: boolean;
  order: IOrder | null;
  onClose: () => void;
}> = ({ isOpen, order, onClose }) => {
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);

  useEffect(() => {
      try {
        setOrderItems([]);
        if (!order) return;
        const fetchOrderItems = async () => {
          const orderItems = await getOrderItems(order.id)
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
              Order Details
            </h3>
            <p className="text-sm text-gray-500">Order #{order.id}</p>
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
              <p className="text-base font-semibold text-gray-800">
                Rp {order.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Items in this order</h4>
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
                        item.product?.productPhotos?.find(
                          (photo) => photo.isDefault === true
                        )?.imageUrl
                      }
                      alt={item.product?.name}
                      className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {item.product?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-900">
                      Rp {order.totalAmount.toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 p-4">
          <button
            onClick={onClose}
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailAdminModal;
