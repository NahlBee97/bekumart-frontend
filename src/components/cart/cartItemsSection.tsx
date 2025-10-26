import { ICart } from "@/interfaces/dataInterfaces";
import { CartItemCard } from "./cartItemsCard";
import { CartItemsSectionSkeleton } from "../skeletons/cart/cartItemSectionSkeleton";

interface props {
  cart: ICart | null;
  isCartLoading: boolean;
}

export const CartItemsSection = ({ cart, isCartLoading }: props) => {
  if (isCartLoading) return <CartItemsSectionSkeleton />;
  return (
    <section
      aria-labelledby="?-heading"
      className="w-full bg-white border-slate-200 rounded-lg p-4 md:px-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-blue-500 mb-2">
        Daftar Belanja
      </h2>
      <ul role="list">
        {cart?.items?.map((item) => (
          <li key={item.id} className="flex mb-4">
            <CartItemCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};
