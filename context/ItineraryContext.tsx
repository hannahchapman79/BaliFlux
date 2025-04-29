"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ActivityDetails = {
  cost: string;
  duration: string;
  notes: string;
};

export type Activity = {
  title: string;
  description: string;
  details: ActivityDetails;
  imagePlace: string;
};

type Day = {
  dayTitle: string;
  activities: Activity[];
};

type ItineraryResult = {
  header: string;
  overview: string;
  days: Day[];
};

type ItineraryContextType = {
  itinerary: ItineraryResult | null;
  setItinerary: (data: ItineraryResult) => void;
};

const ItineraryContext = createContext<ItineraryContextType | undefined>(
  undefined,
);

export function ItineraryProvider({ children }: { children: ReactNode }) {
  const [itinerary, setItinerary] = useState<ItineraryResult | null>(null);

  return (
    <ItineraryContext.Provider value={{ itinerary, setItinerary }}>
      {children}
    </ItineraryContext.Provider>
  );
}

export function useItinerary() {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error("useItinerary must be used within an ItineraryProvider");
  }
  return context;
}
