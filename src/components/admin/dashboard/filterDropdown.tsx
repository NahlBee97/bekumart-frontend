"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const FilterDropdown = () => {
  const pathname = usePathname();
  const value = useSearchParams().get("value");
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("Last 30 Days");

  const filters = [
    { name: "Last 30 Days", value: 30 },
    { name: "Last 7 Days", value: 7 },
    { name: "Last Year", value: 356 },
  ];

  useEffect(() => {
    if (!value) return;
    const selectedFilter = filters.find((filter) => filter.value === Number(value) );
    if (!selectedFilter) return;
    setSelectedFilter(selectedFilter.name);
    // eslint-disable-next-line
  }, [value])

  const handleFilterSelect = (filter: {name: string, value: number}) => {
    setSelectedFilter(filter.name);
    setIsOpen(false);
    router.push(`${pathname}?value=${filter.value}`);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 md:px-4 md:py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedFilter}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-44 md:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {filters.map((filter) => (
              <div
                key={filter.value}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                role="menuitem"
                tabIndex={-1}
                id={`menu-item-${filter}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleFilterSelect(filter);
                }}
              >
                {filter.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};