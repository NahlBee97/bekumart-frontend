"use client"

import { IProduct } from "@/interfaces/productInterfaces";
import { ReviewCard } from "./reviewCard";
import { StarRatingDetail } from "./starRating";

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
    // get review data for specific product
  const sampleReview = {
    author: {
      name: "baskarazakki",
      avatarUrl: "https://placehold.co/40x40/EFEFEF/333333?text=A", // Placeholder avatar
    },
    rating: 5,
    date: "2023-04-15 11:59",
    terbaik: "Harga / Performa",
    sepadan: "Benar",
    comment:
      "Lumayan bgt sih, ngumpulin duit buat beli VGA seken, tapi malah dapet yang 'Baru' lumayan kan ya. Performa OK, langsung jajal Skyrim SE + Shader jalan diatas 30 FPS 1080P mantab sih.",
    images: [
      "https://placehold.co/200x200/cccccc/666666?text=Image+1",
      "https://placehold.co/200x200/cccccc/666666?text=Image+2",
      "https://placehold.co/200x200/cccccc/666666?text=Image+3",
      "https://placehold.co/200x200/cccccc/666666?text=Image+4",
      "https://placehold.co/200x200/cccccc/666666?text=Image+5",
      "https://placehold.co/200x200/cccccc/666666?text=Image+6",
    ],
    likes: 187,
  };

  return (
    <section className="w-full bg-white border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Penilaian Produk</h2>

      <div className="flex flex-col sm:flex-row items-start sm:items-center p-6 border border-gray-200 rounded-lg bg-gray-50 mb-6">
        <div className="flex-shrink-0 text-center mr-6 mb-4 sm:mb-0">
          <p className="text-4xl font-bold text-blue-500">
            4.8 <span className="text-2xl text-gray-600">dari 5</span>
          </p>
          <div className="mt-1 flex justify-center">
            <StarRatingDetail rating={4.8} />
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

      <ReviewCard {...sampleReview} />
      {/* You would map over an array of reviews here */}
    </section>
  );
}
