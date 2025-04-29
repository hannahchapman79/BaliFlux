"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Questions from "@/types/questions";
import ImageTile from "./ImageTile";
import { generateItinerary } from "@/lib/actions/generateItinerary";
import { useRouter } from "next/navigation";
import { useItinerary } from "@/context/ItineraryContext";

export default function Questionnaire({
  questions,
}: {
  questions: Questions[];
}) {
  const { register, handleSubmit, watch } = useForm();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const fieldName = `question_${currentQuestion._id}`;
  const selected = watch();
  const isDaysInTripQuestion = currentQuestion.question
    .toLowerCase()
    .includes("how many days");

  const router = useRouter();
  const { setItinerary } = useItinerary();

  const onSubmit = async (data: any) => {
    const submittedAnswers = {
      interests: data["question_67626589287c6db5b1ccacb1"],
      cuisine: data["question_67626589287c6db5b1ccacb2"],
      vibe: data["question_67626589287c6db5b1ccacb3"],
      nature: data["question_67626589287c6db5b1ccacb4"],
      travelStyle: data["question_67626589287c6db5b1ccacb5"],
      tripLength: data["question_67626589287c6db5b1ccacb6"],
    };

    if (submittedAnswers.tripLength) {
      const response = await generateItinerary(submittedAnswers);

      setItinerary(response.result);

      router.push("/itinerary");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 m-5">
      <div className="space-y-4">
        <h2 className="text-xl font-normal mt-3">{currentQuestion.question}</h2>

        {isDaysInTripQuestion ? (
          <input
            type="number"
            placeholder="Enter number of days"
            {...register(fieldName)}
            className="w-full border rounded-xl px-4 py-2"
            min={1}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {currentQuestion.answers.map((answer) => {
              const isSelected = (selected?.[fieldName] || []).includes(answer);
              const imageUrl = `/${answer
                .toLowerCase()
                .replace(/&/g, "and")
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9\-]/g, "")}.jpg`;

              return (
                <label key={answer}>
                  <input
                    type="checkbox"
                    value={answer}
                    {...register(fieldName)}
                    className="hidden"
                  />
                  <ImageTile
                    label={answer}
                    imageUrl={imageUrl}
                    isSelected={isSelected}
                  />
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() =>
            setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
          }
          className="px-6 py-2 bg-gray-500 text-white rounded-xl"
          disabled={currentQuestionIndex === 0}
        >
          Back
        </button>

        {currentQuestionIndex < questions.length - 1 ? (
          <button
            type="button"
            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
            className="px-6 py-2 bg-blue-500 text-white rounded-xl"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-xl"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}
