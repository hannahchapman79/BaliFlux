"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/context/ItineraryContext";

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

  return (
    <li className="p-4 rounded-xl shadow-md hover:shadow-lg transition">
      <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full animate-pulse rounded-lg" />
        ) : (
          <img
            src={imgSrc}
            alt={activity.title}
            className="object-cover w-full h-full rounded-lg"
          />
        )}
      </div>

      <h3 className="text-lg font-bold">{activity.title}</h3>
      <p className="text-sm">{activity.description}</p>
      <p className="text-sm mt-2">
        <strong>Cost:</strong> {activity.details.cost} |{" "}
        <strong>Duration:</strong> {activity.details.duration} |{" "}
        <strong>Notes:</strong> {activity.details.notes}
        <strong>imagePlace:</strong> {activity.imagePlace}
      </p>
    </li>
  );
}
