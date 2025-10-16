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
    <form onSubmit={handleSubmit} className="w-96 relative" role="search">
      <div className="flex flex-col sm:flex-row items-center justify-center bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden">
        <div className="w-full sm:flex-grow">
          <input
            id="search"
            type="search"
            placeholder="Cari produk frozen..."
            value={searchTerm}
            onChange={handleChange}
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search products"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-3 bg-blue-500 hover:bg-blue-600 transition-colors text-white border-l"
          aria-label="Submit search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};
