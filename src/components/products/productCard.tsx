// --- Reusable Product Card Component ---

import { IProduct } from "@/interfaces/productInterfaces";
import StarRating from "./starRating";

// This component displays a single product's information in a styled card.
const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div className="group relative border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white flex flex-col">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        {/* Product Image */}
        {/* eslint-disable-next-line */}
        <img
          src={product.imageUrl}
          alt="product-image"
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
          onError={(e) => {
            // Fallback placeholder image on error
            const target = e.target as HTMLImageElement;
            target.onerror = null; // prevent infinite loop if placeholder fails
            target.src = `https://placehold.co/400x400/f0f0f0/333333?text=Image+Not+Found`;
          }}
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        {/* Product Name */}
        <h3 className="text-m text-gray-700 font-semibold truncate">
          {product.name}
        </h3>
        {/* Product Category */}
        <p className="py-1 my-2 text-xs font-semibold text-green-800 rounded-full">
          {product.category.name}
        </p>
        {/* Product Weight */}
        <p className="mt-1 text-xs text-gray-500">{product.weightInKg} kg</p>

        {/* Spacer to push price and rating to the bottom */}
        <div className="flex-grow" />

        {/* Price and Rating Container */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(product.price)}
          </p>
          <StarRating rating={product.rating} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;