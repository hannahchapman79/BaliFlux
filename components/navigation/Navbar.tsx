"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#1A1F24]/80 backdrop-blur-md rounded-full px-6 py-3 z-[1000] shadow-lg flex items-center justify-between w-[90%] max-w-4xl">
  <Link href="/" className="text-[1.6rem] font-semibold text-accent">
    BaliFlux
  </Link>

  <ul className="flex space-x-6">
    {["Home", "Create trip", "Blog"].map((label, idx) => {
      const href = label === "Home" ? "/" : `/${label.toLowerCase().replace(" ", "-")}`;
      return (
        <li key={idx}>
          <Link
            href={href}
            className="relative text-[1.3rem] font-light px-4 py-2 text-offwhite hover:text-[#e7d7c1] transition-colors duration-200"
          >
            {label}
            <span className="absolute left-0 bottom-1 h-[3px] w-0 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
      );
    })}
  </ul>
</nav>
  );
}
