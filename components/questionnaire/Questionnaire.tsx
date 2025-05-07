"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {Questions} from "@/types/questions";
import { generateItinerary } from "@/lib/actions/generateItinerary";
import { useRouter } from "next/navigation";
import { useItinerary } from "@/context/ItineraryContext";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import ImageTile from "./ImageTile";

export default function Questionnaire({
  questions,
}: {
  questions: Questions[];
}) {
  const { register, handleSubmit, watch } = useForm();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const fieldName = `question_${currentQuestion._id}`;
  const selected = watch(fieldName);
  const isDaysInTripQuestion = currentQuestion.question
    .toLowerCase()
    .includes("how many days");

  const router = useRouter();
  const { setItinerary } = useItinerary();

  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    const submittedAnswers = {
      interests: data["question_67626589287c6db5b1ccacb1"],
      cuisine: data["question_67626589287c6db5b1ccacb2"],
      nature: data["question_67626589287c6db5b1ccacb3"],
      tripLength: data["question_67626589287c6db5b1ccacb4"],
    };

    if (submittedAnswers.tripLength) {
      try {
        const response = await generateItinerary(submittedAnswers);
        setItinerary(response.result);
        router.push("/itinerary");
      } catch (error) {
        console.error("Error generating itinerary:", error);

        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-6xl mx-auto py-16 md:py-24">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            Plan Your Perfect Trip
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Tell us about your preferences so we can create a personalised itinerary just for you.
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
          <div
            className="bg-gradient-to-r from-blue-500 to-teal-400 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-lg border border-gray-700/30 md:w-[70vw]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                currentQuestionIndex < questions.length - 1
              ) {
                e.preventDefault(); // Only allow Enter to submit on the final question
              }
            }}
            className="space-y-8"
          >
            <div className="space-y-6 md:h-[460px] transition-all duration-300">
              <h2 className="text-xl md:text-2xl font-bold text-gray-100">
                {currentQuestion.question}
              </h2>

              {isDaysInTripQuestion ? (
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Enter number of days"
                    {...register(fieldName)}
                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                    className="w-full bg-gray-900/70 border border-gray-700 text-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    min={1}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {currentQuestion.answers.map((answer) => {
                    // Make sure this logic correctly determines if an option is selected
                    const isSelected =
                      Array.isArray(selected) && selected.includes(answer);
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

            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-700/50">
              <button
                type="button"
                onClick={() =>
                  setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
                }
                className="flex items-center px-5 py-2.5 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition border border-gray-700/50 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </button>

              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition shadow-md"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center px-6 py-2.5 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-lg hover:from-teal-400 hover:to-green-400 transition shadow-md disabled:opacity-70 disabled:cursor-wait"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate Itinerary
                      <Check className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
      </div>
    </div>
  );
}
