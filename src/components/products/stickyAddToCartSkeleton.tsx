// components/StickyAddToCartSkeleton.tsx

export const StickyAddToCartSkeleton = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-18 py-2 md:py-3">
          {/* Skeleton Actions */}
          <div className="flex items-center space-x-4 md:space-x-6 animate-pulse w-full">
            {/* Chat Icon Skeleton */}
            <div className="w-11 h-11 bg-gray-200 rounded-md"></div>

            {/* Quantity Selector Skeleton */}
            <div className="w-32 h-11 bg-gray-200 rounded-md"></div>

            {/* Add to Cart Button Skeleton */}
            <div className="w-40 h-12 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
