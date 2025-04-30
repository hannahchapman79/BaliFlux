"use client";

import { useKeenSlider } from "keen-slider/react";
import { useItinerary } from "@/context/ItineraryContext";
import ActivityCard from "@/components/itinerary/ActivityCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";

export default function ItineraryPage() {
  const { itinerary } = useItinerary();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "snap",
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const goToPrev = () => instanceRef.current?.prev();
  const goToNext = () => instanceRef.current?.next();

  if (!itinerary)
    return (
      <div className="p-5">No itinerary found. Please generate one first!</div>
    );

  return (
    <div className="p-5 min-h-screen relative group">
      <h1 className="text-3xl font-bold mb-4">{itinerary.header}</h1>
      <p className="mb-8">{itinerary.overview}</p>

      {/* Arrows - desktop only, visible on hover */}
      <button
        onClick={goToPrev}
        className="hidden md:flex items-center justify-center absolute top-1/2 left-4 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-md shadow-md hover:bg-white transition rounded-full group-hover:flex"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      <button
        onClick={goToNext}
        className="hidden md:flex items-center justify-center absolute top-1/2 right-4 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-md shadow-md hover:bg-white transition rounded-full group-hover:flex"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      <div ref={sliderRef} className="keen-slider">
        {itinerary.days.map((day, index) => (
          <div key={index} className="keen-slider__slide px-2">
            <div className="rounded-xl p-5 shadow-md sd:border">
              <h2 className="text-2xl font-semibold mb-4">{day.dayTitle}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {day.activities.map((activity, idx) => (
                  <ActivityCard key={idx} activity={activity} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {itinerary.days.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full transition ${
              currentSlide === idx ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
