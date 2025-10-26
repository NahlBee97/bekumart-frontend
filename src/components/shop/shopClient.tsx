"use client";

import { useState } from "react";
import { ProductSection } from "../home/productSection";
import { IProduct } from "@/interfaces/dataInterfaces";
import { Pagination } from "./pagination";
import { getTotalPages } from "@/helper/functions";

export const ShopClient = ({ products }: { products: IProduct[] }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { totalPages, currentItems } = getTotalPages(products, currentPage, 10);
  
  const handleClickPrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }
  const handleClickNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <ProductSection
          title="Produk Frozen Terbaik"
          products={currentItems}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} onClickPrev={handleClickPrev} onClickNext={handleClickNext}/>
        )}
      </div>
    </div>
  );
};
