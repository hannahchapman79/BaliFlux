"use client";

import HeroBanner from "@/components/home/HeroBanner";
import CTAButton from "@/components/UI/CTAButton";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Tailored to You",
      description:
        "Your trip, your way — crafted from your preferences in seconds",
      icon: Star,
    },
    {
      title: "Fast, Hassle-Free Planning",
      description:
        "Skip the research rabbit hole and get a ready-to-go itinerary instantly",
      icon: Clock,
    },
    {
      title: "Personal Picks & Hidden Gems",
      description:
        "Built with lived-in recommendations and hidden gems you won’t find on TripAdvisor",
      icon: MapPin,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <HeroBanner />

          <div className="flex justify-center mt-2">
            <CTAButton text="Start Planning Your Trip" link="/create-trip" />
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              Why Choose BaliGuide?
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Create your dream Bali vacation with our smart itinerary planner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 hover:shadow-blue-500/10"
              >
                <div className="rounded-full bg-gradient-to-r from-blue-600 to-teal-500 w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative">
          <div className="bg-gradient-to-r from-blue-900/40 to-teal-900/40 backdrop-blur-md rounded-xl p-8 md:p-12 border border-blue-700/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  Ready to experience the best of Bali?
                </h2>
                <p className="text-lg text-gray-300">
                  Your perfect adventure is just a few clicks away
                </p>
              </div>
              <div className="flex">
                <CTAButton text="Get Started" link="/create-trip" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
