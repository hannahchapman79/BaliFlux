"use server";

import axios from "axios";

export const fetchQuestions = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/questions`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
