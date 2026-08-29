import { CartSummarySectionSkeleton } from "../skeletons/cart/cartSummarySectionSkeleton";
import { CommonButton } from "../buttons/commonButton";
import { useCartStore } from "@/stores/useCartStore";

interface props {
  isLoading: boolean;
  onCheckout: () => void;
}

export const CartSummarySection = ({ isLoading, onCheckout }: props) => {
  const { isCartUpdating, isCartLoading, cart } = useCartStore();
  if (isCartLoading) return <CartSummarySectionSkeleton/>
  return (
    <section
      aria-labelledby="summary-heading"
      className="w-full bg-white rounded-2xl p-4 sm:p-6 shadow-sm shadow-ink/5 h-fit"
    >
      <h2 id="summary-heading" className="font-display text-lg font-semibold text-ink">
        Ringkasan Pesanan
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-base font-medium text-fog">Subtotal</dt>
          <dd className="font-mono text-xl font-semibold text-berry">
            Rp {cart?.totalPrice?.toLocaleString("id-ID")}
          </dd>
        </div>
      </dl>

      <div className="mt-4">
        <CommonButton isDisable={isLoading || isCartUpdating} onClick={onCheckout} buttonText="Checkout" />
      </div>
    </section>
  );
};
