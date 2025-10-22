"use client";

import useAuthStore from "@/stores/useAuthStore";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { ProductSectionSkeleton } from "@/components/skeletons/admin/products/productSectionSkeleton";

const ProductSection = () => {
  const { isAuthLoading } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (isAuthLoading) return;
    const fetchData = async () => {
      try {
        const response = await api.get("api/dashboard/product-insights");
        setData(response.data.productInsights);
      } catch (error) {
        console.error("Failed to load product data: " + error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isAuthLoading]);

  if (isLoading) return <ProductSectionSkeleton/>;

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-blue-500 mb-4">⭐ Produk Dengan Penjualan Terbaik</h3>
          <ul className="space-y-3">
            {data.bestSellers.map(
              (
                product: { name: string; quantitySold: number },
                index: number
              ) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <span>{product.name}</span>
                  <span className="font-semibold bg-gray-100 px-2 py-1 rounded">
                    {product.quantitySold} Terjual
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-blue-500 font-bold mb-4">⚠️ Produk Stok Rendah</h3>
          <ul className="space-y-3">
            {data.lowStockProducts.map(
              (product: { name: string; stock: number }, index: number) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <span>{product.name}</span>
                  <span className="font-semibold text-red-500 bg-red-100 px-2 py-1 rounded">
                    {product.stock} left
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
