import Link from "next/link";

interface CTAButtonProps {
  text: string;
  link: string;
}

export default function CTAButton({ text, link }: CTAButtonProps) {
  return (
    <Link href={link}>
      <button
        className="text-lg md:text-xl px-6 py-3 md:px-8 md:py-4 font-semibold 
        bg-gradient-to-r from-blue-600 to-teal-500 text-white 
        rounded-lg hover:from-blue-500 hover:to-teal-400 
        shadow-lg hover:shadow-blue-500/20 
        transform hover:-translate-y-1 
        transition-all duration-300"
      >
        {text}
      </button>
    </Link>
  );
}
