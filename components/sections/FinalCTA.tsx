"use client";

import Link from "next/link";
import * as Icons from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-neutral-900 py-24 lg:py-32 text-white text-center">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,118,255,0.15)_0%,transparent_70%)]" />

      <div className="container mx-auto max-w-4xl px-6 relative z-10 flex flex-col items-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6">
          Get Started
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
          Let&apos;s build something <br />
          <span className="text-primary italic font-medium">great together.</span>
        </h2>

        <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mb-10">
          Get in touch for a free 30-minute strategy call to audit your current search presence, examine paid bidding efficiencies, and identify growth bottlenecks.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-8 py-4 font-sans text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Book Your Strategy Call <Icons.ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
