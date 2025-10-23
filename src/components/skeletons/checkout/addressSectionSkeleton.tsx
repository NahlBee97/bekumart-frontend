"use client";

export const AddressSectionSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        {/* Button Skeleton */}
        <div className="h-8 w-20 bg-gray-300 rounded-lg"></div>
      </div>

      {/* Address Box Skeleton */}
      <div className="mt-4 rounded-md border border-gray-200 p-4 space-y-3">
        {/* Address Lines */}
        <div className="h-5 bg-gray-300 rounded w-1/2"></div> {/* Receiver */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* Street */}
        <div className="h-4 bg-gray-300 rounded w-full"></div> {/* City/etc */}
        <div className="h-4 bg-gray-300 rounded w-1/3"></div> {/* Province */}
        {/* Courier Section Skeleton */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          {/* Label Skeleton */}
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
          {/* Select Dropdown Skeleton */}
          <div className="h-10 bg-gray-300 rounded-md w-full"></div>
        </div>
      </div>
    </div>
  );
};
