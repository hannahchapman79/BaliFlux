import HeroBanner from "@/components/home/HeroBanner";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen w-full px-4 py-12 md:py-16">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="mt-8 flex flex-col sm:flex-row gap-4"></div>
          <HeroBanner />
        </div>
        <div className="mb-16"></div>
      </div>
    </main>
  );
}
