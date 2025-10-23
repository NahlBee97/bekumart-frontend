"use client";

const DeliveryOptionSkeleton = () => (
  <div className="relative flex rounded-lg border border-gray-300 bg-white p-4 shadow-sm animate-pulse">
    <div className="flex flex-1">
      <div className="flex flex-col space-y-3 w-full">
        {/* Label Skeleton */}
        <div className="h-5 bg-gray-300 rounded w-1/2"></div>
        {/* Description Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        {/* Price Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-1/3 mt-3"></div>
      </div>
    </div>
    {/* Icon Skeleton */}
    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
  </div>
);

export const DeliveryMethodSectionSkeleton = () => (
  <div className="animate-pulse">
    {/* Title Skeleton */}
    <div className="h-6 bg-gray-300 rounded w-1/3"></div>

    <div className="mt-4 grid gap-4 grid-cols-2">
      <DeliveryOptionSkeleton />
      <DeliveryOptionSkeleton />
    </div>
  </div>
);
