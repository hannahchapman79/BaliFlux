"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Instagram, Globe, Linkedin } from "lucide-react";

// Featured locations data
const featuredLocations = [
  {
    image: "/my-picks/sebatu.jpg",
    title: "Sebatu, North of Ubud",
    description: "A peaceful village surrounded by rice fields, waterfalls, and quiet roads perfect for scenic drives",
    location: "Sebatu, Gianyar",
  },
  {
    image: "/my-picks/kintamani.jpg",
    title: "Kintamani Volcano Viewpoint",
    description: "Located in the northeastern highlands of Bali on the edge of the Mount Batur, this area is known for scenic cafés that overlook the volcano.",
    location: "Kintamani",
  },
  {
    image: "/my-picks/sideman.jpg",
    title: "Sideman",
    description: "A peaceful alternative to Ubud, with rice terraces, viewpoint cafés, and a natural infinity pool at Gembleng Waterfall.",
    location: "Sideman, East Bali",
  },
  {
    image: "/my-picks/dreamland-beach.jpg",
    title: "Dreamland Beach",
    description: "A white sand beach in Uluwatu, with high waves, a steady surf crowd, and wide open views of the ocean.",
    location: "Uluwatu",
  },
];

export default function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredLocations.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredLocations.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
<main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 pt-20">
  <div className="max-w-6xl mx-auto px-6">
    {/* About Section */}
    <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
      <div className="md:w-1/3 relative">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg shadow-blue-500/20 relative z-10">
          <img
            src="/profile-photo.png"
            alt="Photo of Hannah"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 blur-2xl opacity-20"></div>
        <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 blur-2xl opacity-10"></div>
      </div>

      <div className="md:w-2/3">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-1 text-gray-100">Hi, I'm Hannah</h2>
          <p className="text-lg font-light text-blue-400">Software Developer from the UK</p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full my-4"></div>
        </div>

        <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
          <p>
          After spending over 6 months in Bali, I found myself getting frustrated with AI travel tools.
          They kept recommending the same touristy, overcrowded spots, which didn’t reflect the Bali I’d come to know.
          </p>
          <p>
          I wanted something more thoughtful. Not just generic lists from a bot, but real suggestions based on places I had actually visited and loved.
          </p>
          <p>
          I knew there were better options, so I built BaliGuide to share them. It’s a way to help others experience the side of Bali that made me fall in love with it — vibrant, authentic, and full of hidden gems.
          </p>
          <p className="text-gray-200 font-medium">
          Thanks for being here. I hope BaliGuide helps you discover the same kind of magic I found on the island.
          </p>
        </div>

        <div className="flex gap-4 mt-8">
          <a href="https://instagram.com/hannah.chapman0" className="flex items-center gap-2 text-sm text-gray-300 hover:text-blue-400 transition-colors">
            <Instagram size={20} />
          </a>
          <a href="https://www.linkedin.com/in/hannah-chapman-13360097/" className="flex items-center gap-2 text-sm text-gray-300 hover:text-blue-400 transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </div>

        {/* My Hidden Gems Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              My Personal Favourites
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A handpicked collection of places I loved during my time living in Bali.
            </p>
          </div>

          {/* Photo Slideshow */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-blue-900/20 border border-gray-700/50 h-96 md:h-[36rem] pb-8">
            {/* Carousel */}
            <div className="relative h-full">
              {featuredLocations.map((item, index) => (
                <div 
                  key={index} 
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="relative h-full">
                    {/* Image */}
                    <div className="absolute inset-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                      <div className="max-w-3xl">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                          {item.title}
                        </h3>
                        <div className="flex items-center text-blue-300 mb-4">
                          <MapPin size={16} className="mr-2" />
                          <span className="text-sm md:text-base">{item.location}</span>
                        </div>
                        <p className="text-base md:text-lg text-gray-200">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-black/50 transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-black/50 transition-all"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {featuredLocations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index 
                      ? "bg-white w-6" 
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}