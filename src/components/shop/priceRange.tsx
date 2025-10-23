import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

// Helper to clean input to numbers only
const cleanNumber = (value: string): number => {
  // Remove all non-digit characters and convert to number
  const cleaned = value.replace(/\D/g, "");
  return cleaned ? parseInt(cleaned, 10) : 0;
};

export const PriceRangeFilter = ({onApply}: {onApply: () => void}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");

  const handlePriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (value: number) => void
  ) => {
    const newValue = cleanNumber(e.target.value);
    setter(newValue);
  };

  const handleApplyClick = () => {
    // Create new URLSearchParams object from current params
    const params = new URLSearchParams(
      (searchParams.toString())
    );

    if (minPrice) params.set("minPrice", minPrice.toString());
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice.toString());
    else params.delete("maxPrice");

    // Navigate with new params
    onApply();
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="md:w-50 max-w-sm border-t pt-2">
      {/* Component Title */}
      <h2 className="text-base font-semibold text-blue-500 mb-1">
        Batas Harga
      </h2>

      {/* Input fields for min and max price */}
      <div className="flex items-center justify-between space-x-2">
        {/* Minimum Price Input */}
        <div className="relative w-full">
          <input
            type="text"
            value={minPrice}
            placeholder="MIN"
            onChange={(e) => handlePriceChange(e, setMinPrice)}
            className="border border-gray-300 p-1 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition rounded-md"
            aria-label="Minimum Price"
            inputMode="numeric"
          />
        </div>

        {/* Separator */}
        <span className="text-gray-400">—</span>

        {/* Maximum Price Input */}
        <div className="relative w-full">
          <input
            type="text"
            value={maxPrice}
            placeholder="MAX"
            onChange={(e) => handlePriceChange(e, setMaxPrice)}
            className="border border-gray-300 p-1 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition rounded-md"
            aria-label="Maximum Price"
            inputMode="numeric"
          />
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApplyClick}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={maxPrice ? maxPrice < minPrice : false}
      >
        Terapkan
      </button>
    </div>
  );
};
