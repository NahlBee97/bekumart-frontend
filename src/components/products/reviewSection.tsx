"use client";

import { IProduct, IReview } from "@/interfaces/dataInterfaces";
import { ReviewCard } from "./reviewCard";
import { useEffect, useState } from "react";
import { getProductReviews } from "@/lib/data";
import { ReviewFilter } from "./reviewFilter";

export function ReviewSection({ product }: { product: IProduct }) {
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

      setAverageRating(sumOfRatings / reviewCount);
    };
    fetchReviews();
  }, [product]);

  if (reviews.length === 0)
    return (
      <div className="border-t border-gray-200 py-6">
        <h2 className="text-center text-lg text-blue-500 font-semibold">
          Belum ada review untuk produk ini
        </h2>
      </div>
    );

  return (
    <section className="w-full bg-white border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Penilaian Produk</h2>

      <div
        className={` ${
          reviews.length === 0 && "hidden"
        } flex flex-col sm:flex-row items-start sm:items-center p-6 border border-gray-200 rounded-lg bg-gray-50 mb-6`}
      >
        <ReviewFilter averageRating={averageRating} />
      </div>

      <div className="border-t border-gray-200 py-4 space-y-2">
        {reviews.map((review: IReview) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
