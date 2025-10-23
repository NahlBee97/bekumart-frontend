export function CartItemCardSkeleton() {
  return (
    <div className="flex w-full space-x-4 py-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-24 h-24 bg-gray-300 rounded-md flex-shrink-0"></div>

      <div className="flex-1 space-y-3">
        {/* Title Skeleton */}
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        {/* Price Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>

        {/* Actions Skeleton (Quantity + Remove) */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-8 bg-gray-300 rounded w-20"></div> {/* Quantity */}
          <div className="h-6 bg-gray-300 rounded w-16"></div>{" "}
          {/* Remove Button */}
        </div>
      </div>
    </div>
  );
}
