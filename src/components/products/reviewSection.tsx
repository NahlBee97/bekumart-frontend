"use client";

import { IReview } from "@/interfaces/dataInterfaces";
import { ReviewCard } from "./reviewCard";
import { ReviewFilter } from "./reviewFilter";
import { ReviewSectionSkeleton } from "../skeletons/products/reviewSectionSkeleton";
import { getTotalPages } from "@/helper/functions";
import { useEffect, useState } from "react";
import { Pagination } from "../shop/pagination";

interface props {
  reviews: IReview[];
  isLoading: boolean;
}

export function ReviewSection({ reviews, isLoading }: props) {
  const [filterReviews, setFilterReviews] = useState<IReview[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (reviews) {
      const reviewCount = reviews.length;
      const sumOfRatings = reviews.reduce((acc: number, review: IReview) => {
        return acc + review.rating;
      }, 0);

      setAverageRating(sumOfRatings / reviewCount);
    }
  }, [reviews]);

  const { currentItems, totalPages } = getTotalPages(
    filterReviews,
    currentPage,
    10
  );

  const handleFilter = (rating: number) => {
    const filterReviews = reviews.filter((review) => review.rating >= rating);
    setFilterReviews(filterReviews);
  };

  if (isLoading) return <ReviewSectionSkeleton />;

  return (
    <section className="w-full bg-white border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Penilaian Produk</h2>
      <div className=" flex flex-col sm:flex-row md:items-start items-center p-2 md:p-6 border border-gray-200 rounded-lg bg-gray-50 mb-6">
        <ReviewFilter
          onFilter={handleFilter}
          averageRating={Number(averageRating.toFixed(2))}
        />
      </div>
      {reviews.length === 0 ? (
        <div className="border-t border-gray-200 py-6">
          <h2 className="text-center text-lg text-blue-500 font-semibold">
            Belum ada review untuk produk ini
          </h2>
        </div>
      ) : (
        <div className="border-t border-gray-200 py-4 space-y-2">
          {(filterReviews.length === 0 ? reviews : currentItems).map(
            (review: IReview) => (
              <ReviewCard key={review.id} review={review} />
            )
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClickPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          onClickNext={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        />
      )}
    </section>
  );
}
