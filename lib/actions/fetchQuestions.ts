"use server";

export const fetchQuestions = async () => {
  return {
    questions: [
      {
        _id: "67626589287c6db5b1ccacb1",
        question: "What type of experiences or vibes are you seeking?",
        answers: [
          "Relaxed",
          "Cultural Immersion",
          "Spa & Wellness",
          "Nightlife",
          "Spiritual & Serene",
          "Hidden Gems",
          "Focused & Productive",
          "Adventure Sports",
        ],
      },
      {
        _id: "67626589287c6db5b1ccacb2",
        question: "What kind of food experiences excite you?",
        answers: [
          "Local Cuisine",
          "Brunch Spots",
          "Fine Dining",
          "Coffee Culture",
          "Any top rated",
        ],
      },
      {
        _id: "67626589287c6db5b1ccacb3",
        question: "What nature spots would you love to explore?",
        answers: [
          "Beaches & Coastlines",
          "Waterfalls",
          "Volcanoes",
          "Rice Terraces",
        ],
      },
      {
        _id: "67626589287c6db5b1ccacb4",
        question: "How many days is your trip?",
        answers: [],
        type: "input",
      },
    ],
  };
};
