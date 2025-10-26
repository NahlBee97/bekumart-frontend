import {
  IAddress,
  ICart,
  ICartItem,
} from "@/interfaces/dataInterfaces";

import { OrderSummarySkeleton } from "../skeletons/checkout/orderSummarySkeleton";
import { CartItem } from "./cartItem";
import { OrderBreakdown } from "./orderBreakdown";

interface props {
  isLoading: boolean;
  cart: ICart | null;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  isCalculating: boolean;
  isSubmitting: boolean;
  onConfirmOrder: () => void;
  deliveryMethod: string;
  selectedAddress?: IAddress;
}

export const OrderSummary = ({
  isLoading,
  cart,
  subtotal,
  shippingCost,
  tax,
  total,
  isCalculating,
  isSubmitting,
  onConfirmOrder,
  deliveryMethod,
  selectedAddress,
}:props) => {
  const isConfirmDisabled =
    isSubmitting || (deliveryMethod === "DELIVERY" && !selectedAddress);

  if (isLoading) return <OrderSummarySkeleton />;

  return (
    <section className="mt-8 border bg-white rounded-lg border-gray-300 shadow-sm px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-xl font-semibold text-blue-500">Ringkasan Belanja</h2>
      <ul role="list" className="mt-6 divide-y divide-gray-200">
        {cart?.items.map((item: ICartItem) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <OrderBreakdown
        subtotal={subtotal}
        shippingCost={shippingCost}
        tax={tax}
        total={total}
        isCalculating={isCalculating}
      />
      <div className="mt-4">
        <button
          type="button"
          onClick={onConfirmOrder}
          disabled={isConfirmDisabled}
          className={`w-full flex items-center justify-center rounded-md border border-transparent px-4 py-3 text-base font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isConfirmDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            "Konfirmasi Pembelanjaan"
          )}
        </button>
      </div>
    </section>
  );
};




