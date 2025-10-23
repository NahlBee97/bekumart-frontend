"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useCallback } from "react";

export const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Handle input change
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  // Handle form submission
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-50 md:w-full max-w-lg bg-background-light/80 backdrop-blur-sm"
      role="search"
    >
      {/* The container is now always a flex row for a consistent look across all devices. */}
      <div className="flex items-center overflow-hidden rounded-lg border border-slate-300 shadow-sm">
        <div className="flex-grow">
          <input
            id="search"
            type="search"
            placeholder="Cari produk frozen..."
            value={searchTerm}
            onChange={handleChange}
            // Adjusted padding and removed default browser search icon appearance
            className="w-full appearance-none bg-transparent px-2 py-1 md:px-4 md:py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-label="Search products"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="border-l border-slate-300 bg-blue-500 px-2 py-2 md:px-4 md:py-3 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-label="Submit search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};
