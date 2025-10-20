// --- Reusable Product Card Component ---

import { IProduct } from "@/interfaces/dataInterfaces";
import { StarIcon } from "./starRating";
import { formatNumberCompact } from "@/utils/numberFormatter";

// This component displays a single product's information in a styled card.
const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div
      className="min-h-[250px] relative border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white flex flex-col cursor-pointer"
      onClick={() => {
        // Navigate to product detail page on card click
        window.location.href = `/products/${product.id}`;
      }}
    >
      <div className="flex justify-center items-center aspect-w-1 aspect-h-1 w-full overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        {/* Product Image */}
        {/* eslint-disable-next-line */}
        <img
          src={
            product.productPhotos.find((photo) => photo.isDefault === true)
              ?.imageUrl
          }
          alt="product-image"
          className="h-50 w-full  object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
          onError={(e) => {
            // Fallback placeholder image on error
            const target = e.target as HTMLImageElement;
            target.onerror = null; // prevent infinite loop if placeholder fails
            target.src = `https://placehold.co/400x400/f0f0f0/333333?text=Image+Not+Found`;
          }}
        />
      </div>
      <div className="p-2 flex-grow flex flex-col">
        {/* Product Name */}
        <h3 className="md:text-m text-sm text-gray-700 font-semibold line-clamp-2">
          {product.name}
        </h3>
        <div className="flex flex-col gap-1 mt-1">
          <p className="md:text-lg text-base font-semibold text-blue-500">
            Rp {product.price.toLocaleString()}
          </p>
          <div className="flex gap-2">
            <p className="flex gap-1 items-center text-gray-800 text-xs font-semibold">
              {product.rating}/5 <StarIcon filled />
            </p>
            <p className="text-xs text-gray-800">
              {formatNumberCompact(product.sale)} terjual
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
