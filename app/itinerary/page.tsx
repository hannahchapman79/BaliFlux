"use client";

import { useKeenSlider } from "keen-slider/react";
import { useItinerary } from "@/context/ItineraryContext";
import ActivityCard from "@/components/itinerary/ActivityCard";
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";
import "keen-slider/keen-slider.min.css";
import { useState, useEffect } from "react";

export default function ItineraryPage() {
  const { itinerary } = useItinerary();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "snap",
    slides: { perView: 1, spacing: 20 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const goToPrev = () => instanceRef.current?.prev();
  const goToNext = () => instanceRef.current?.next();

  if (!itinerary)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200">
        <div className="text-center p-8 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/50 max-w-md">
          <h2 className="text-2xl font-bold mb-4">No Itinerary Found</h2>
          <p className="text-gray-300">
            Please generate an itinerary first to view your travel plans.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 px-4 py-8 md:py-12 lg:py-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* Hero section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            {itinerary.header}
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {itinerary.overview}
          </p>
        </div>

        <div className="flex justify-between items-center mb-6 md:hidden">
          <button
            onClick={goToPrev}
            className="p-2 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 transition"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5 text-gray-300" />
          </button>

          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">
              Day {currentSlide + 1} of {itinerary.days.length}
            </span>
          </div>

          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 transition"
            disabled={currentSlide === itinerary.days.length - 1}
          >
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        <div className="relative">
          {loaded && (
            <>
              <button
                onClick={goToPrev}
                className="hidden md:flex absolute -left-6 md:left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-gray-800/80 backdrop-blur-md hover:bg-gray-700 rounded-full shadow-lg transition border border-gray-700/50"
                disabled={currentSlide === 0}
                aria-label="Previous Day"
              >
                <ChevronLeft className="w-6 h-6 text-gray-200" />
              </button>

              <button
                onClick={goToNext}
                className="hidden md:flex absolute -right-6 md:right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-gray-800/80 backdrop-blur-md hover:bg-gray-700 rounded-full shadow-lg transition border border-gray-700/50"
                disabled={currentSlide === itinerary.days.length - 1}
                aria-label="Next Day"
              >
                <ChevronRight className="w-6 h-6 text-gray-200" />
              </button>
            </>
          )}

          <div ref={sliderRef} className="keen-slider overflow-visible">
            {itinerary.days.map((day, index) => (
              <div key={index} className="keen-slider__slide">
                <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-700/30">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{day.dayTitle}</h2>
                    <div className="flex items-center space-x-2"></div>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {day.activities.map((activity, idx) => (
                      <ActivityCard key={idx} activity={activity} />
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {loaded && (
          <div className="flex justify-center gap-3 mt-8">
            {itinerary.days.map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === idx
                    ? "bg-blue-500 w-6"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to day ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
