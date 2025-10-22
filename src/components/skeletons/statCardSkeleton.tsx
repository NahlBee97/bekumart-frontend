export const StatCardSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
      {/* Placeholder untuk Ikon */}
      <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse flex-shrink-0"></div>

      {/* Placeholder untuk Teks (Judul dan Nilai) */}
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  );
};
