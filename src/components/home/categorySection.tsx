"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryCard } from "./categoryCard";
import { ICategory } from "@/interfaces/dataInterfaces";
import { Reveal } from "@/components/reveal";

const CategorySection = ({ categories }: { categories: ICategory[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isScrollable, setIsScrollable] = useState<boolean>(false);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);

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
    <Reveal
      as="section"
      className="w-full bg-white rounded-2xl px-3 py-5 md:p-6 shadow-sm shadow-ink/5"
    >
      <h2 className="font-display text-sm font-semibold text-ink mb-3 uppercase tracking-wider">
        Kategori
      </h2>
      <div className="relative">
        {/* Left Arrow Button */}
        {isScrollable && (
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll Left"
            className={`absolute top-1/2 -left-4 -translate-y-1/2 z-10 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-md border border-slate-100 transition-all duration-300 hover:bg-frost-light active:scale-90 ${
              showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-frost-deep" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-x-auto scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="flex items-center gap-1">
            {categories.map((category, i) => (
              <div
                key={category.id}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        {isScrollable && (
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll Right"
            className={`absolute top-1/2 -right-4 -translate-y-1/2 z-10 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-md border border-slate-100 transition-all duration-300 hover:bg-frost-light active:scale-90 ${
              showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronRight className="w-5 h-5 text-frost-deep" />
          </button>
        )}
      </div>
    </Reveal>
  );
};

export default CategorySection;
