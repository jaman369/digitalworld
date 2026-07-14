import Link from "next/link";
import * as Icons from "lucide-react";

export default function NotFound() {
  return (
    <article className="min-h-[calc(100vh-80px)] bg-transparent flex flex-col justify-center py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,118,255,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto max-w-xl px-6 text-center flex flex-col items-center">
        {/* Error icon badge */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500 border border-rose-100 mb-6 shadow-sm">
          <Icons.HelpCircle className="h-8 w-8" />
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900 tracking-tight mb-4">
          Page not found
        </h1>

        <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed mb-10 max-w-sm">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-8 py-4 font-sans text-sm font-bold text-white shadow-sm transition-all"
        >
          Back to Homepage <Icons.ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
