import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 py-8 border-t border-gray-700/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <Link
            href="/"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 mb-4 md:mb-0"
          >
            BaliGuide
          </Link>

          <ul className="flex flex-wrap justify-center space-x-6 text-base">
            <li>
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/create-trip"
                className="hover:text-blue-400 transition-colors"
              >
                Create Trip
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-blue-400 transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="pt-6 border-t border-gray-700/30 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} BaliGuide - Your Perfect Bali Itinerary
            Generator
          </p>
        </div>
      </div>
    </footer>
  );
}
