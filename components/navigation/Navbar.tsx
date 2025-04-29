"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleNavbar = () => setIsOpen(!isOpen);

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Create trip", href: "/create-trip" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/80 dark:bg-[#1A1F24]/80 backdrop-blur-md z-[1000] shadow-lg w-[90%] max-w-4xl ${
        isOpen ? "rounded-xl py-4" : "rounded-full py-3"
      } px-6`}
      style={{ transition: "height 0.3s, padding 0.3s" }}
    >
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-[1.6rem] font-semibold text-accent"
          onClick={handleClose}
        >
          BaliFlux
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`relative text-[1.3rem] font-light px-4 py-2 transition-colors duration-200 ${
                  isActive(href)
                    ? "text-accent font-medium"
                    : "text-offwhite hover:text-[#e7d7c1]"
                }`}
                onClick={handleClose}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle button */}
        <button
          className="md:hidden text-offwhite focus:outline-none"
          onClick={toggleNavbar}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden mt-4 border-t border-gray-700/50 pt-3">
          <ul className="flex flex-col space-y-3">
            {navItems.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block text-[1.2rem] font-light px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive(href)
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-offwhite hover:bg-white/5 hover:text-[#e7d7c1]"
                  }`}
                  onClick={handleClose}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
