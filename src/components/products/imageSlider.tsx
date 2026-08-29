"use client";

import { IProductPhoto } from "@/interfaces/dataInterfaces";
import { useEffect, useState } from "react";

export const ImageSlider: React.FC<{ photos: IProductPhoto[] }> = ({
  photos,
}) => {
  const [activeImage, setActiveImage] = useState<string>(
    "https://placehold.co/400x400/e2e8f0/64748b?text=N/A"
  );

  useEffect(() => {
    const mainImage = photos.find(
      (photo) => photo.isDefault === true
    )?.imageUrl;
    setActiveImage(mainImage as string);
  }, [photos]);

  return (
    <div>
      <div className="rounded-2xl overflow-hidden bg-mist">
        {/* eslint-disable-next-line */}
        <img
          src={activeImage}
          alt="Product Image"
          className="w-full object-cover transition-opacity duration-300"
        />
      </div>
      <div className="flex space-x-2 mt-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`w-14 h-14 border-2 rounded-xl cursor-pointer overflow-hidden transition-all duration-200 ${
              activeImage === photo.imageUrl
                ? "border-frost shadow-sm shadow-frost/30"
                : "border-slate-200 hover:border-frost/50"
            }`}
            onClick={() => setActiveImage(photo.imageUrl)}
          >
            {/* eslint-disable-next-line */}
            <img
              src={photo.imageUrl}
              alt={`Thumbnail ${photo.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
