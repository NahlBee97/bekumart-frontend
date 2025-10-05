"use client";

import { IProduct, IProductPhoto } from "@/interfaces/productInterfaces";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "@/config";
import { StarRating } from "@/components/products/starRating";
// import { useCartStore } from "@/stores/useCartStore";
// import useAuthStore from "@/stores/useAuthStore";
import StickyAddToCart from "@/components/products/stickyAddToCart";
import ImageSlider from "@/components/products/imageSlider";

export interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// --- MAIN PAGE COMPONENT ---
export default function ProductDetailPage({ params }: PageProps) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [photos, setPhotos] = useState<IProductPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{
    id: string;
  } | null>(null);
  // const { user } = useAuthStore();
  // const { addToCart } = useCartStore();

  const fetchProductPhotos = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/product-photos/${product?.id}`
      );
      setPhotos(data.data);
    } catch (error) {
      console.error("Error fetching product photos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [product]);

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

  useEffect(() => {
    if (product) {
      fetchProductPhotos();
    }
  }, [product, fetchProductPhotos]);

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
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-x-12">
        {/* Product Image Section */}
        <div className="relative w-full aspect-square p-8 md:p-12 flex items-center justify-center">
          <ImageSlider photos={photos}/>
        </div>

        {/* Product Main title Section */}
        <div className="flex flex-col justify-center border-b-4 border-gray-300">
          <div className="w-full p-4">
            <p className="text-2xl md:text-4xl font-extrabold text-blue-500 mb-2">
              Rp {product.price.toLocaleString()}
            </p>
            <h1 className="text-xl mt-2 mb-4">{product.name}</h1>
            <div className="flex gap-2">
              <StarRating rating={product.rating} />
              <p className="text-xs text-gray-800">1k+ terjual</p>
            </div>
          </div>
        </div>

        {/* Product riview Section */}
        <div className="flex flex-col justify-center border-b-4 border-gray-300">
          <div className="w-full p-4">
            <p className="text-xl md:text-3xl font-semibold text-blue-500 mb-2">
              Ulasan Pembeli
            </p>
            {/* 5 riview card */}
          </div>
        </div>

        {/* Product riview Section */}
        <div className="flex flex-col justify-center">
          <div className="w-full p-4">
            <p className="text-xl md:text-3xl font-semibold text-blue-500 mb-2">
              Deskripsi Product
            </p>
            <div className="text-gray-800 mb-2">
              <p>Kategori : {product.category.name}</p>
              <p>Berat : {product.weightInKg} Kg</p>
            </div>
            <p className="line-clamp-5">{product.description}</p>
          </div>
        </div>

        {/* Price and Action Button */}
        <div className="mt-auto pt-6 border-gray-200">
          <StickyAddToCart product={product} />
        </div>
      </div>
    </main>
  );
}
