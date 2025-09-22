"use client";

import ProductCard from "@/components/products/productCard";
import { apiUrl } from "@/config";
import { ICategory, IProduct } from "@/interfaces/productInterfaces";
import axios from "axios";
import { useState, useEffect, useMemo, useRef } from "react";

// --- Main Products Page ---
// This page fetches product data and displays it in a responsive grid.
export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState(500);
  const [minRating, setMinRating] = useState(0);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // State for dynamic filter options
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [maxPrice, setMaxPrice] = useState(500);

  // State and ref for filter dropdown
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  //   fetch products
  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const { data } = await axios.get(`${apiUrl}/api/products`);

        const products: IProduct[] = data.data;

        const maxProductPrice = Math.ceil(
          Math.max(...products.map((p) => p.price))
        );
        setMaxPrice(maxProductPrice);
        setPriceRange(maxProductPrice);

        setProducts(products);
        setLoading(false);
      };
      fetchProducts();
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("Failed to load products");
      setLoading(false);
    }
  }, []);

  // fetch categories for filter options
  useEffect(() => {
    try {
      const fetchCategories = async () => {
        const response = await axios.get(`${apiUrl}/api/categories`);
        setCategories(response.data.data);
      };
      fetchCategories();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  // Effect to handle clicks outside the filter dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterChange =
    //   eslint-disable-next-line
      (setter: React.Dispatch<React.SetStateAction<any>>) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let value;
        if (e.target.type === "range") {
          value = Number(e.target.value);
        } else {
          const category = categories.find((c) => c.name === e.target.value);
          value = category ? category.name : "All";
        }
        setter(value);
        setCurrentPage(1);
      };

  const resetFilters = () => {
    setSelectedCategory("All");
    setPriceRange(maxPrice);
    setMinRating(0);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (product) =>
          selectedCategory === "All" ||
          product.category.name === selectedCategory
      )
      .filter((product) => product.price <= priceRange)
      .filter((product) => product.rating >= minRating);
  }, [products, searchTerm, selectedCategory, priceRange, minRating]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Products
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Check out the latest collection.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-10 flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:flex-grow">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={handleFilterChange(setSearchTerm)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative w-full md:w-auto" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="w-5 h-5 mr-2 -ml-1 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L13 10.414V15a1 1 0 01-.293.707l-2 2A1 1 0 019 17v-6.586L4.293 6.707A1 1 0 014 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              Filters
            </button>
            {isFilterOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="p-4 space-y-6">
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={handleFilterChange(setSelectedCategory)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="All">Semua</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Max Price:{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(priceRange)}
                    </label>
                    <input
                      id="price"
                      type="range"
                      min="0"
                      max={maxPrice}
                      value={priceRange}
                      onChange={handleFilterChange(setPriceRange)}
                      className="mt-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Min Rating: {minRating.toFixed(1)} ★
                    </label>
                    <input
                      id="rating"
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={minRating}
                      onChange={handleFilterChange(setMinRating)}
                      className="mt-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={resetFilters}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Responsive Grid Container */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No products found matching your filters.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
