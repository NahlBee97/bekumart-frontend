"use client";

import { getCategories } from "@/lib/data";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PriceRangeFilter } from "./priceRange";
import { RatingFilter } from "./ratingFilter";
import { ICategory } from "@/interfaces/dataInterfaces";
import { X } from "lucide-react";

interface props {
  onClose: () => void;
  isOpen: boolean;
}

export const FilterModal = ({ onClose, isOpen }: props) => {
  const queryParams = useSearchParams();
  const router = useRouter();

  const [show, setShow] = useState<boolean>(false);
  
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Handle modal animation
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        // Set initial selected category from URL if exists
        const categoryFromUrl = queryParams.get("search");
        if (categoryFromUrl) {
          setSelectedCategory(categoryFromUrl);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [queryParams]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(queryParams.toString());

    if (category) {
      params.set("search", category);
    } else {
      params.delete("search");
    }

    // Preserve other filters
    onClose();
    router.push(`/shop?${params.toString()}`);
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setSelectedCategory("");
    onClose();
    router.push("/shop");
  };

  if (!isOpen) return;

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose} // Close on backdrop click
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-title"
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col transition-all duration-300 ease-in-out ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2
            id="filter-title"
            className="md:text-xl font-semibold text-blue-500"
          >
            Filter Product
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X size={24} />
          </button>
        </div>
        <div className="px-4 py-2">
          <div className="space-y-2">
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-base font-semibold text-blue-500 mb-2"
              >
                Kategori
              </label>
              {isLoading ? (
                <div className="animate-pulse h-10 bg-gray-200 rounded-md"></div>
              ) : (
                <select
                  name="category"
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <PriceRangeFilter onApply={() => onClose()} />
            <RatingFilter onApply={() => onClose()} />

            {/* Reset Filter Button */}
            <button
              onClick={handleResetFilters}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!selectedCategory && queryParams.size === 0}
            >
              Hapus Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
