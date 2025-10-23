import { StarRatingDetail } from "./starRating";
import { useState } from "react";

export const ReviewFilter = ({
  averageRating,
  onFilter,
}: {
  averageRating: number;
  onFilter: (rating: number) => void;
}) => {
  const [activeRating, setActiveRating] = useState<number>(0);

  const handleFilterClick = (rating: number) => {
    setActiveRating(rating);
    onFilter(rating);
  };

  return (
    <div className="flex flex-col justify-between items-center md:block">
      <div className="flex-shrink-0 text-center md:mr-6 md:mb-4 mb-2">
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
      <div className="grid grid-cols-3 md:flex md:flex-wrap items-center gap-2">
        <h2 className="col-span-3 text-center md:text-right md:text-lg font-semibold">Filter Komentar:</h2>
        <FilterButton
          active={activeRating === 0}
          onClick={() => handleFilterClick(0)}
        >
          Semua
        </FilterButton>
        {[5, 4, 3, 2, 1].map((rating) => (
          <FilterButton
            key={rating}
            active={activeRating === rating}
            onClick={() => handleFilterClick(rating)}
          >
            {rating} Bintang
          </FilterButton>
        ))}
      </div>
    </div>
  );
};

const FilterButton: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}> = ({ children, active, onClick }) => {
  const baseClasses = "px-2 py-1 md:px-4 md:py-2 text-sm border rounded-md transition-colors";
  const activeClasses =
    "bg-white border-blue-500 text-blue-500 ring-1 ring-blue-500";
  const inactiveClasses =
    "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
    >
      {children}
    </button>
  );
};
