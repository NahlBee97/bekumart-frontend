"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IProductPhoto } from "@/interfaces/productInterfaces";

const ImageSlider = ({ photos }: {photos: IProductPhoto[]}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === photos.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!photos || photos.length === 0) {
    return <div>No photos available.</div>;
  }

  return (
    <div className="relative w-full h-96">
      {" "}
      {/* Set a fixed height or use aspect-ratio */}
      {/* Main container for sliding images */}
      <div className="w-full h-full rounded-lg overflow-hidden">
        <div
          className="flex transition-transform ease-in-out duration-500 h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {/* Map through photos to create slides */}
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative w-full h-full flex-shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.imageUrl}
                alt="Product Photo"
                className="w-full h-full object-contain" // Use object-contain or object-cover
              />
            </div>
          ))}
        </div>
      </div>
      {/* Left Arrow */}
      <div className="absolute top-1/2 left-2 -translate-y-1/2">
        <button
          onClick={goToPrevious}
          className="bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      {/* Right Arrow */}
      <div className="absolute top-1/2 right-2 -translate-y-1/2">
        <button
          onClick={goToNext}
          className="bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      {/* Optional: Dots for navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === slideIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
