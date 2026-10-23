"use client";

import Link from "next/link";
import * as Icons from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-neutral-900 py-16 lg:py-24 text-white text-center">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,118,255,0.18)_0%,transparent_70%)]" />

      <div className="container mx-auto max-w-4xl px-6 relative z-10 flex flex-col items-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 text-blue-400 border border-primary/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6">
          Take The Next Step
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6 max-w-3xl">
          Ready to Grow Your Business With a Digital Marketing Agency That Delivers?
        </h2>

        <p className="font-sans text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-10">
          Book a free 30-minute strategy call. We will audit your search presence, review your paid campaigns and show you the fastest growth opportunities, with no obligation.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-8 py-4 font-sans text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Book Your Free Strategy Call <Icons.ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href="https://wa.me/8801798667820"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-800 px-6 py-4 font-sans text-sm font-semibold text-neutral-200 transition-all hover:scale-[1.02]"
          >
            <Icons.MessageSquare className="h-4 w-4 text-emerald-400" />
            Or WhatsApp us: +8801798667820
          </a>
        </div>
      </div>
    </section>
  );
}
