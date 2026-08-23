import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ReadMoreLinkProps {
  href: string;
  text?: string;
  className?: string;
}

export default function ReadMoreLink({
  href,
  text = "Read more",
  className = "",
}: ReadMoreLinkProps) {
  return (
    <Link
      href={href}
      className={`group/link inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 ${className}`}
    >
      <span>{text}</span>
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
    </Link>
  );
}
