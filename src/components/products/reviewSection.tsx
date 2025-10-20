"use client";

import { IProduct, IReview } from "@/interfaces/dataInterfaces";
import { ReviewCard } from "./reviewCard";
import { useEffect, useState } from "react";
import { ReviewFilter } from "./reviewFilter";
import api from "@/lib/axios";

export function ReviewSection({ product }: { product: IProduct }) {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [filterReviews, setFilterReviews] = useState<IReview[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    if (!product) return;
    const fetchReviews = async () => {
      const response = await api.get(`/api/reviews/${product.id}`);
      setReviews(response.data.reviews);
      const reviewCount = reviews.length;
      const sumOfRatings = reviews.reduce((acc: number, review: IReview) => {
        return acc + review.rating;
      }, 0);

      setAverageRating(sumOfRatings / reviewCount);
    };
    fetchReviews();
  }, [product, reviews]);

  
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;
  
  // Pagination logic
  const indexOfLastReviews = currentPage * reviewsPerPage;
  const indexOfFirstReviews = indexOfLastReviews - reviewsPerPage;
  const currentReviews = (filterReviews.length === 0 ? reviews : filterReviews).slice(
    indexOfFirstReviews,
    indexOfLastReviews
  );

  const totalPages = Math.ceil(
    (filterReviews.length === 0 ? reviews : filterReviews).length /
    reviewsPerPage
  );
  
  const handleFilter = (rating: number) => {
    const filterReviews = reviews.filter((review) => review.rating >= rating);
    setFilterReviews(filterReviews);
  };
  
  return (
    <section className="w-full bg-white border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Penilaian Produk</h2>
      <div className=" flex flex-col sm:flex-row items-start sm:items-center p-6 border border-gray-200 rounded-lg bg-gray-50 mb-6">
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
          {currentReviews.map(
            (review: IReview) => (
              <ReviewCard key={review.id} review={review} />
            )
          )}
        </div>
      )}
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Sebelumnya
          </button>
          <span className="text-sm text-slate-700 dark:text-slate-400">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Berikutnya
          </button>
        </div>
      )}
    </section>
  );
}
