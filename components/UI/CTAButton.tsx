import Link from "next/link";
import { Button } from "@heroui/react";

interface CTAButtonProps {
  text: string;
  link: string;
}

export default function CTAButton({ text, link }: CTAButtonProps) {
  return (
    <Link href={link} passHref>
      <Button
        as="a"
        className="text-lg md:text-xl px-6 py-3 md:px-8 md:py-4 font-semibold bg-gradient-to-r from-indigo-900 via-purple-800 to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
        radius="full"
      >
        {text}
      </Button>
    </Link>
  );
}
