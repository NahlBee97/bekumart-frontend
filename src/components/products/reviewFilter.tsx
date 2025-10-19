import { StarRatingDetail } from "./starRating";

export const ReviewFilter = ({ averageRating }: { averageRating: number }) => {
  return (
    <>
      <div className="flex-shrink-0 text-center mr-6 mb-4 sm:mb-0">
        <p className="text-4xl font-bold text-blue-500">
          {Number.isNaN(averageRating) ? 0 : averageRating}{" "}
          <span className="text-2xl text-gray-600">dari 5</span>
        </p>
        <div className="mt-1 flex justify-center">
          <StarRatingDetail
            rating={Number.isNaN(averageRating) ? 0 : averageRating}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <FilterButton active>Semua</FilterButton>
        <FilterButton>5 Bintang (3,2RB)</FilterButton>
        <FilterButton>4 Bintang (249)</FilterButton>
        <FilterButton>3 Bintang (38)</FilterButton>
        <FilterButton>2 Bintang (17)</FilterButton>
        <FilterButton>1 Bintang (61)</FilterButton>
        <FilterButton>Dengan Komentar (1,3RB)</FilterButton>
        <FilterButton>Dengan Media (978)</FilterButton>
      </div>
    </>
  );
};

const FilterButton: React.FC<{
  children: React.ReactNode;
  active?: boolean;
}> = ({ children, active }) => {
  const baseClasses = "px-4 py-2 text-sm border rounded-md transition-colors";
  const activeClasses =
    "bg-white border-blue-500 text-blue-500 ring-1 ring-blue-500";
  const inactiveClasses =
    "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200";

  return (
    <button
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
    >
      {children}
    </button>
  );
};
