// Skeleton for a single summary row (e.g., Subtotal, Shipping)
const SummaryRowSkeleton = () => (
  <div className="flex items-center justify-between">
    <div className="h-4 bg-gray-300 rounded w-1/4"></div> {/* Label */}
    <div className="h-4 bg-gray-300 rounded w-1/3"></div> {/* Value */}
  </div>
);

// Skeleton for a single item in the cart summary list
const CartItemSkeleton = () => (
  <li className="flex py-6">
    {/* Image Skeleton */}
    <div className="flex-shrink-0 h-24 w-24 sm:h-32 sm:w-32 bg-gray-300 rounded-md border border-gray-300"></div>

    <div className="ml-4 flex flex-1 flex-col justify-between">
      {/* Top part: Name and details */}
      <div className="space-y-3">
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>{" "}
        {/* Product Name */}
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>{" "}
        {/* Weight/Details */}
      </div>

      {/* Bottom part: Quantity and Price */}
      <div className="flex items-end justify-between text-sm">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div> {/* Quantity */}
        <div className="h-5 bg-gray-300 rounded w-1/3"></div> {/* Price */}
      </div>
    </div>
  </li>
);

// Skeleton for the order breakdown section (Subtotal, Tax, Total, etc.)
const OrderBreakdownSkeleton = () => (
  <dl className="mt-6 space-y-4 border-t border-gray-200 pt-6">
    <SummaryRowSkeleton /> {/* Subtotal */}
    <SummaryRowSkeleton /> {/* Shipping */}
    <SummaryRowSkeleton /> {/* Tax */}
    {/* Total Row Skeleton */}
    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
      <div className="h-5 bg-gray-300 rounded w-1/3"></div> {/* Total Label */}
      <div className="h-6 bg-gray-300 rounded w-2/5"></div> {/* Total Price */}
    </div>
  </dl>
);

// Main skeleton component for the entire OrderSummary
export const OrderSummarySkeleton = () => {
  return (
    <section className="mt-8 border bg-white rounded-lg border-gray-300 shadow-sm px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-7 bg-gray-300 rounded w-1/2"></div>

      {/* Cart Items List Skeleton */}
      <ul role="list" className="mt-6 divide-y divide-gray-200">
        <CartItemSkeleton />
        <CartItemSkeleton />
      </ul>

      {/* Order Breakdown Skeleton */}
      <OrderBreakdownSkeleton />

      {/* Button Skeleton */}
      <div className="mt-4">
        <div className="h-12 w-full bg-gray-300 rounded-md"></div>
      </div>
    </section>
  );
};
