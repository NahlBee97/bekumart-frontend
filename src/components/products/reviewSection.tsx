"use client"

import { IProduct, IReview } from "@/interfaces/dataInterfaces";
import { ReviewCard } from "./reviewCard";
import { StarRatingDetail } from "./starRating";
import { useEffect, useState } from "react";
import { getProductReviews } from "@/lib/data";

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

export function ReviewSection({product} : {product: IProduct}) {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    if (!product) return;
    const fetchReviews = async () => {
      const reviews = await getProductReviews(product.id);
      setReviews(reviews);
      const reviewCount = reviews.length;
      const sumOfRatings = reviews.reduce((acc: number, review: IReview) => {
        return acc + review.rating;
      }, 0);
    
      setAverageRating(sumOfRatings/reviewCount);
    };
    fetchReviews();
  }, [product]);

  return (
    <section className="w-full bg-white border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Penilaian Produk</h2>

      <div
        className={` ${
          reviews.length === 0 && "hidden"
        } flex flex-col sm:flex-row items-start sm:items-center p-6 border border-gray-200 rounded-lg bg-gray-50 mb-6`}
      >
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
      </div>

      <ReviewCard reviews={reviews} />
      {/* You would map over an array of reviews here */}
    </section>
  );
}
