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
    { label: "Create Trip", href: "/create-trip" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-[90%] max-w-4xl ${
        isOpen ? "rounded-xl py-4" : "rounded-full py-3"
      } px-6 bg-gray-800/80 backdrop-blur-md shadow-lg border border-gray-700/50`}
      style={{ transition: "height 0.3s, padding 0.3s" }}
    >
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400"
          onClick={handleClose}
        >
          BaliGuide
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`relative text-lg font-medium px-4 py-2 transition-colors duration-200 ${
                  isActive(href)
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-blue-300"
                }`}
                onClick={handleClose}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 mx-auto rounded-full"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle button */}
        <button
          className="md:hidden text-gray-300 focus:outline-none"
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
                  className={`block text-lg font-medium px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive(href)
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-gray-300 hover:bg-gray-700/50 hover:text-blue-300"
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
