import { ICart } from "@/interfaces/dataInterfaces";
import { CartSummarySectionSkeleton } from "../skeletons/cart/cartSummarySectionSkeleton";

interface props {
  isLoading: boolean;
  isCartLoading: boolean;
  cart: ICart | null;
  onCheckout: () => void;
}

export const CartSummarySection = ({ isLoading, isCartLoading, cart, onCheckout }: props) => {
  if (isCartLoading) return <CartSummarySectionSkeleton/>
  return (
    <section
      aria-labelledby="summary-heading"
      className="w-full bg-white border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm"
    >
      <h2 id="summary-heading" className="text-lg font-semibold text-blue-500">
        Ringkasan Pesanan
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-base font-semibold text-gray-700">Subtotal</dt>
          <dd className="text-xl font-semibold text-blue-500">
            Rp {cart?.totalPrice?.toLocaleString("id-ID")}
          </dd>
        </div>
        {/* Add more lines here for Shipping, Taxes, etc. */}
      </dl>

      <div className="mt-4">
        <button
          onClick={onCheckout}
          disabled={isLoading}
          className={`w-full flex items-center justify-center font-bold ${
            isLoading ? "bg-gray-300" : "bg-blue-500"
          } border border-transparent rounded-md shadow-sm py-3 px-4 text-base text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500 transition-transform transform hover:scale-105`}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            "Checkout"
          )}
        </button>
      </div>
    </section>
  );
};
