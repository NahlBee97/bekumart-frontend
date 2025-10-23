import { StatCardSkeleton } from "./statCardSkeleton";

export const SalesSectionSkeleton = () => {
  return (
    <section>
      {/* Grid untuk StatCard Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCardSkeleton/>
        <StatCardSkeleton/>
        <StatCardSkeleton/>
      </div>

      {/* Placeholder untuk Kontainer Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Placeholder untuk Judul Chart dan Filter Dropdown */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>

        {/* Placeholder untuk Chart itu sendiri */}
        <div className="w-full h-[300px] bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </section>
  );
};