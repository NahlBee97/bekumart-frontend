"use client";

import { IProduct } from "@/interfaces/productInterfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "@/config";
import { StarRatingDetail } from "@/components/products/starRating";

export interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// --- MAIN PAGE COMPONENT ---
export default function ProductDetailPage({ params }: PageProps) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{
    id: string;
  } | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      // Decode the id parameter
      const decodedSlug = decodeURIComponent(resolved.id);
      setResolvedParams({ id: decodedSlug });
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(
            `${apiUrl}/api/products/${resolvedParams.id}`
          );
          setProduct(data.data);
        } catch (error) {
          alert("Failed to fetch product details. Please try again later.");
          console.error("Error fetching product:", error);
        }
      };

      fetchProduct();
    }
  }, [resolvedParams]);

  // This handles the fallback state from getStaticPaths.
  // While 'blocking' waits for the page to generate, this is good practice.
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading product details...</div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:gap-x-12">
          {/* Product Image Section */}
          <div className="relative w-full aspect-square p-8 md:p-12 flex items-center justify-center">
            {/* Replaced next/image with a standard img tag to resolve the compilation error */}
            {/* eslint-disable-next-line */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-w-full max-h-full object-contain transform hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>

          {/* Product Details Section */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div>
              <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                {product.category.name}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center space-x-3 mb-6">
                <StarRatingDetail rating={product.rating} />
                <span className="text-gray-500 text-sm">10 reviews</span>
              </div>
            </div>

            {/* Price and Action Button */}
            <div className="mt-auto pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-4xl font-extrabold text-gray-900">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(product.price)}
                </p>
                <button
                  type="button"
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
