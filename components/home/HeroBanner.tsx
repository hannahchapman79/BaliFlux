import Image from "next/image";

export default function HeroBanner() {
  return (
    <div className="relative w-full h-[500px] md:h-[400px] overflow-hidden rounded-xl shadow-lg mb-12 bg-gray-900">
      <div className="absolute inset-0 z-0">
        <Image
          src="/diamond-beach.avif"
          alt="Diamond Beach, Nusa Penida"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
      </div>

      <div className="relative z-20 h-full w-full flex flex-col items-start justify-center p-8 md:p-12 lg:p-16 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-2xl">
          <span>Local knowledge meets </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            AI
          </span>
          <span> for your custom Bali itinerary</span>
        </h1>

        <p className="mt-5 text-lg md:text-xl text-white/90 max-w-xl">
          Uncover hidden gems, avoid tourist traps, and get a personalised plan
          in seconds.
        </p>
      </div>
    </div>
  );
}
