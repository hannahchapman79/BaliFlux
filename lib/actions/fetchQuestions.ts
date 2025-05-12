"use server";

export const fetchQuestions = async () => {
  return {
    questions: [
      {
        _id: "67626589287c6db5b1ccacb1",
        question: "Which vibes best match how you want to spend your time?",
        answers: [
          "Relaxed",
          "Cultural Immersion",
          "Social & Nightlife",
          "Spiritual or Mindful Retreat",
          "Off the Beaten Path",
          "Focused & Productive",
          "Fitness & Gym",
          "Adventure & Activities",
        ],
      },
      {
        _id: "67626589287c6db5b1ccacb2",
        question: "What kind of food experiences excite you?",
        answers: [
          "Authentic Balinese Cuisine",
          "Scenic Spots",
          "Brunch Cafes",
          "Coffee Culture",
          "Unique Dining",
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
