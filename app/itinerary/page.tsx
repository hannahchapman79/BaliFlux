"use client";

import { useItinerary } from "@/context/ItineraryContext";
import ActivityCard from "@/components/itinerary/ActivityCard";

export default function ItineraryPage() {
  const { itinerary } = useItinerary();

  if (!itinerary)
    return (
      <div className="p-5">No itinerary found. Please generate one first!</div>
    );

  return (
    <div className="p-5 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{itinerary.header}</h1>
      <p className="mb-8">{itinerary.overview}</p>

      {itinerary.days.map((day, index) => (
        <div key={index} className="border rounded-xl p-3 mb-10">
          <h2 className="text-2xl font-semibold mb-4">{day.dayTitle}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {day.activities.map((activity, idx) => (
              <ActivityCard key={idx} activity={activity} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
