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
    <section className="mt-8 bg-white rounded-2xl shadow-sm shadow-ink/5 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 h-fit">
      <h2 className="font-display text-xl font-semibold text-ink">Ringkasan Belanja</h2>
      <ul role="list" className="mt-6 divide-y divide-slate-100">
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
          disabled={isConfirmDisabled || isCalculating}
          className={`w-full flex items-center justify-center rounded-full px-4 py-3 text-base font-semibold text-white shadow-sm active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 transition-all duration-200 ${
            isConfirmDisabled || isCalculating
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-berry hover:bg-berry-deep hover:shadow-md hover:shadow-berry/30"
          }`}
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/40 border-t-white"></div>
          ) : (
            "Konfirmasi Pembelanjaan"
          )}
        </button>
      </div>
    </section>
  );
};




