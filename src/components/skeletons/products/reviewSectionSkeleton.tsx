function ReviewCardSkeleton() {
  return (
    <div className="flex space-x-4 py-4 border-b border-gray-100 last:border-b-0 animate-pulse">
      {/* Avatar Skeleton */}
      <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>

      <div className="flex-1 space-y-3">
        {/* Username Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        {/* Rating Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        {/* Review Text Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
}

export function ReviewSectionSkeleton() {
  return (
    <section className="w-full bg-white border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Penilaian Produk</h2>

      {/* Filter Section Skeleton */}
      <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 mb-6 animate-pulse">
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="h-10 bg-gray-300 rounded w-1/3 mb-4 sm:mb-0"></div>
          <div className="flex-1 sm:ml-10 flex flex-wrap gap-2">
            <div className="h-8 bg-gray-300 rounded w-20"></div>
            <div className="h-8 bg-gray-300 rounded w-20"></div>
            <div className="h-8 bg-gray-300 rounded w-20"></div>
            <div className="h-8 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
      </div>

      {/* Review List Skeleton */}
      <div className="border-t border-gray-200 py-4 space-y-2">
        {/* Show 3-5 card skeletons to indicate loading */}
        {[...Array(3)].map((_, index) => (
          <ReviewCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
