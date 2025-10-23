export const CartSummarySectionSkeleton = () => {
  return (
    <section
      aria-labelledby="summary-heading-skeleton"
      className="w-full bg-white border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm animate-pulse"
    >
      {/* Title Skeleton */}
      <div className="h-7 bg-gray-300 rounded w-1/2"></div>

      <div className="mt-6 space-y-4">
        {/* Subtotal Line Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-300 rounded w-1/4"></div>{" "}
          {/* "Subtotal" text */}
          <div className="h-6 bg-gray-300 rounded w-1/3"></div> {/* Price */}
        </div>

        {/* You can add more skeleton lines here if you plan to add Shipping, Taxes, etc. */}
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-300 rounded w-1/5"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="mt-4">
        <div className="h-12 w-full bg-gray-300 rounded-md"></div>
      </div>
    </section>
  );
};
