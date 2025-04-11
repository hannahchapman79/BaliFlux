"use server";

import axios from "axios";

type userAnswerProps = {
  interests?: string[];
  cuisine?: string[];
  vibe?: string[];
  nature?: string[];
  travelStyle?: string[];
  tripLength: number;
};

export const generateItinerary = async (answers: userAnswerProps) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/itinerary`,
      {
        answers: answers,
        isGuest: true,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
