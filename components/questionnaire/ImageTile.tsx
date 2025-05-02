"use client";

import { Check } from "lucide-react";

type ImageTileProps = {
  label: string;
  imageUrl: string;
  isSelected: boolean;
};

export default function ImageTile({
  label,
  imageUrl,
  isSelected,
}: ImageTileProps) {
  return (
    <div
      className={`group relative rounded-xl overflow-hidden transition-all duration-300 transform
        ${
          isSelected
            ? "ring-2 ring-blue-500 scale-105 shadow-lg shadow-blue-500/20"
            : "hover:ring-1 hover:ring-blue-400/50 hover:scale-[1.02]"
        }
      `}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent z-10" />

        <img
          src={imageUrl}
          alt={label}
          className={`w-full h-full object-cover transition-transform duration-700 ease-in-out 
            ${isSelected ? "scale-110" : "group-hover:scale-105"}`}
          onError={(e) => {
            // Fallback for missing images
            e.currentTarget.src = "/itinerary/fallback.jpg";
          }}
        />

        {isSelected && (
          <div className="absolute top-2 right-2 z-20 bg-blue-500 rounded-full p-1 shadow-lg">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
          <span className="text-white text-sm font-medium drop-shadow-md">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
