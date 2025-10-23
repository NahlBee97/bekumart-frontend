import { CartItemCardSkeleton } from "./cartItemCartSkeleton";

export function CartItemsSectionSkeleton() {
  return (
    <section
      aria-labelledby="cart-heading-skeleton"
      className="w-full bg-white border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm"
    >
      <ul role="list">
        {/* Show 3 card skeletons to indicate loading */}
        {[...Array(3)].map((_, index) => (
          <li
            key={index}
            className="flex mb-4 border-b border-gray-100 last:border-b-0"
          >
            <CartItemCardSkeleton />
          </li>
        ))}
      </ul>
    </section>
  );
}
