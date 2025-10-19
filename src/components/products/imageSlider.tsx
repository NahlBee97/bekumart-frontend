"use client";

import { IProductPhoto } from "@/interfaces/dataInterfaces";
import { useState } from "react";

export const ImageSlider: React.FC<{ photos: IProductPhoto[] }> = ({
  photos,
}) => {
  const [activeImage, setActiveImage] = useState(photos[0].imageUrl);
  return (
    <div>
      <div className="border border-gray-200">
        {/* eslint-disable-next-line */}
        <img
          src={activeImage}
          alt="Product Image"
          className="w-full object-cover"
        />
      </div>
      <div className="flex space-x-2 mt-2">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`w-14 border-2 rounded-md cursor-pointer ${
              activeImage === photo.imageUrl
                ? "border-blue-500"
                : "border-gray-200"
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
