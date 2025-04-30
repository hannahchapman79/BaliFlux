"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/context/ItineraryContext";
import { Clock, DollarSign, FileText } from "lucide-react";

type Props = {
  activity: Activity;
};

// List of most common imagePlace names with existing images
const AVAILABLE_IMAGES = [
  "padang-padang-beach",
  "balangan-beach",
  "angel-billabong",
  "broken-beach",
  "gajah-putih",
  "leke-leke-waterfall",
  "tukad-cepung-waterfall",
  "manta-ray-point",
  "sa-mesa-restaurant",
  "uluwatu-temple",
  "tegalalang-rice-terrace",
  "jatiluwih-rice-terrace",
  "ulun-danu-beratan-temple",
  "tirta-empul-temple",
  "campuhan-ridge-walk",
  "sunset-seminyak-beach",
  "merlins-ubud",
  "single-fin",
];

// Categorised fallback images based on keywords
const CATEGORY_FALLBACKS = [
  { keyword: "beach", fallback: "/itinerary/fallback-beach.jpg" },
  { keyword: "waterfall", fallback: "/itinerary/fallback-waterfall.jpg" },
  { keyword: "temple", fallback: "/itinerary/fallback-temple.jpg" },
  { keyword: "restaurant", fallback: "/itinerary/fallback-restaurant.jpg" },
  { keyword: "cafe", fallback: "/itinerary/fallback-cafe.jpg" },
  { keyword: "coffee", fallback: "/itinerary/fallback-coffee.jpg" },
  { keyword: "yoga", fallback: "/itinerary/fallback-yoga.jpg" },
  { keyword: "spa", fallback: "/itinerary/fallback-spa.jpg" },
  { keyword: "mount", fallback: "/itinerary/fallback-mount.jpg" },
  { keyword: "surfing", fallback: "/itinerary/fallback-surfing.jpg" },
  { keyword: "brunch", fallback: "/itinerary/fallback-brunch.jpg" },
  { keyword: "volcano", fallback: "/itinerary/fallback-volcano.jpg" },
  { keyword: "cave", fallback: "/itinerary/fallback-cave.jpg" },
  { keyword: "gym", fallback: "/itinerary/fallback-gym.jpg" },
  { keyword: "uluwatu", fallback: "/itinerary/fallback-uluwatu.jpg" },
  { keyword: "penida", fallback: "/itinerary/nusa-penida.jpg" },
  { keyword: "lembongan", fallback: "/itinerary/nusa-lembongan.jpg" },
];

export default function ActivityCard({ activity }: Props) {
  const [imgSrc, setImgSrc] = useState("/itinerary/fallback.jpg");
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const { imagePlace, title } = activity;

    if (imagePlace && AVAILABLE_IMAGES.includes(imagePlace)) {
      setImgSrc(`/itinerary/${imagePlace}.jpg`);
    } else {
      const lowerTitle = title.toLowerCase();
      const categoryMatch = CATEGORY_FALLBACKS.find(({ keyword }) =>
        lowerTitle.includes(keyword),
      );

      if (categoryMatch) {
        setImgSrc(categoryMatch.fallback);
      } else {
        setImgSrc("/itinerary/fallback.jpg"); // Default general fallback
      }
    }

    setIsLoading(false);
  }, [activity]);

  const handleImageError = () => {
    setImageError(true);
    setImgSrc("/itinerary/fallback.jpg");
  };

  return (
    <li className="group relative bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 border border-gray-700/50 hover:border-blue-500/30 flex flex-col">
      <div className="relative w-full h-48 overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full bg-gray-700 animate-pulse rounded-t-lg" />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10" />
            <img
              src={imageError ? "/itinerary/fallback.jpg" : imgSrc}
              alt={activity.title}
              className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110"
              onError={handleImageError}
            />
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-lg font-bold text-white drop-shadow-md">
            {activity.title}
          </h3>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <p className="text-sm text-gray-300 mb-4 flex-1">
          {activity.description}
        </p>

        <div className="space-y-2 mt-auto text-xs">
          <div className="flex items-center space-x-2">
            <div className="rounded-full p-1 bg-gray-700/50">
              <DollarSign className="w-3 h-3 text-green-400" />
            </div>
            <span className="text-gray-300">{activity.details.cost}</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="rounded-full p-1 bg-gray-700/50">
              <Clock className="w-3 h-3 text-blue-400" />
            </div>
            <span className="text-gray-300">{activity.details.duration}</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="rounded-full p-1 bg-gray-700/50">
              <FileText className="w-3 h-3 text-purple-400" />
            </div>
            <span className="text-gray-300">{activity.details.notes}</span>
          </div>
        </div>
      </div>
    </li>
  );
}
