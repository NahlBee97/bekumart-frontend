// --- Reusable Product Card Component ---

import { IProduct } from "@/interfaces/productInterfaces";
import { StarRating } from "./starRating";
import AddToCartButton from "../addToCartButton";

// This component displays a single product's information in a styled card.
const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div
      className="group relative border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white flex flex-col"
      onClick={() => {
        // Navigate to product detail page on card click
        window.location.href = `/products/${product.id}`;
      }}
    >
      <div className="flex justify-center items-center aspect-w-1 aspect-h-1 w-full overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        {/* Product Image */}
        {/* eslint-disable-next-line */}
        <img
          src={product.imageUrl}
          alt="product-image"
          className="h-50 w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
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
        <h3 className="md:text-m text-sm text-gray-700 font-semibold truncate">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mt-1">
          {/* Product Category */}
          <div>
            <p className="py-1 text-xs font-semibold text-green-800">
              {product.category.name}
            </p>
            {/* Product Weight */}
            <p className="mt-1 text-xs text-gray-500">
              Berat: {product.weightInKg} kg
            </p>
          </div>
          <div className="mt-1 scale-75 self-end">
            <AddToCartButton productId={product.id} />
          </div>
        </div>

        {/* Spacer to push price and rating to the bottom */}
        <div className="flex-grow" />

        {/* Price and Rating Container */}
        <div className="flex items-center justify-between gap-4">
          <p className="md:text-lg text-base font-semibold text-blue-500">
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
