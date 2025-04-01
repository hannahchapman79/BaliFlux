import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-[#00000] py-6 mt-10">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-3 mb-4 md:mb-0"
        ></Link>
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link href="/" className="hover:text-[#bf4342]">
              Home
            </Link>
          </li>
          <li>
            <Link href="/create-trip" className="hover:text-[#bf4342]">
              Create Trip!
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-[#bf4342]">
              Blog
            </Link>
          </li>
        </ul>
      </div>
      <div className="text-center text-sm text-[#FFFFF] mt-4">
        © 2025 Bali Flux
      </div>
    </footer>
  );
}
