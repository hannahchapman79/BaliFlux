import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import { ItineraryProvider } from "@/context/ItineraryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bali Guide",
  description:
    "AI & local knowledge powered travel planning app for Bali, Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative min-h-screen flex flex-col`}
      >
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-gray-900 to-gray-800" />

        <ItineraryProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </ItineraryProvider>
      </body>
    </html>
  );
}
