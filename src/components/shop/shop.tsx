"use client";

import { useState } from "react";
import { ProductSection } from "../home/productSection";
import { IProduct } from "@/interfaces/dataInterfaces";

export default function Shop({
  products,
}: {
  products: IProduct[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <ProductSection
        title="Produk Frozen Terbaik"
          products={currentProducts}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Sebelumnya
            </button>
            <span className="text-sm text-slate-700 dark:text-slate-400">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Berikutnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
