"use client";

import { useState, useRef, useEffect, FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ICategory } from "@/interfaces/productInterfaces";
import { CategoryCard } from "./categoryCard";

// Define the props for our component
interface CategoryShowcaseProps {
  categories: ICategory[];
}

const CategorySection: FC<CategoryShowcaseProps> = ({ categories = [] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // This effect checks if the content is wider than the container,
  // determining if scrolling is possible and if arrows should be shown.
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        const hasOverflow = scrollWidth > clientWidth;
        setIsScrollable(hasOverflow);
        setShowRightArrow(hasOverflow); // Show right arrow initially if scrollable
        setShowLeftArrow(false); // Hide left arrow initially
      }
    };

    // Check on mount and on window resize
    checkScrollable();
    window.addEventListener("resize", checkScrollable);

    return () => {
      window.removeEventListener("resize", checkScrollable);
    };
  }, [categories]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      // A small tolerance is added to handle floating point inaccuracies
      setShowLeftArrow(scrollLeft > 1);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-600 dark:text-slate-300 mb-4 uppercase tracking-wider">
        Kategori
      </h2>
      <div className="relative">
        {/* Left Arrow Button */}
        {isScrollable && (
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll Left"
            className={`absolute top-1/2 -left-4 -translate-y-1/2 z-10 bg-white dark:bg-slate-700 w-9 h-9 rounded-full flex items-center justify-center shadow-md border border-slate-200 dark:border-slate-600 transition-opacity duration-300 hover:bg-slate-100 dark:hover:bg-slate-600 ${
              showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-x-auto p-2 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="flex items-center gap-1">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category}/>
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        {isScrollable && (
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll Right"
            className={`absolute top-1/2 -right-4 -translate-y-1/2 z-10 bg-white dark:bg-slate-700 w-9 h-9 rounded-full flex items-center justify-center shadow-md border border-slate-200 dark:border-slate-600 transition-opacity duration-300 hover:bg-slate-100 dark:hover:bg-slate-600 ${
              showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
