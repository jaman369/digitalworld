"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import * as Icons from "lucide-react";

export default function PortfolioCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-20 pb-4 lg:pt-24 lg:pb-6 bg-transparent"
    >
      {/* Soft radial glow behind the content */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] lg:h-[700px] lg:w-[700px] rounded-full bg-gradient-to-br from-blue-100/60 via-blue-50/40 to-purple-50/30 blur-3xl" />
      </div>

      <div
        className={`container mx-auto max-w-3xl px-6 text-center transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-neutral-900 tracking-tight leading-[1.6] mb-6">
          Ready to be our next{" "}
          <br className="sm:hidden" />
          <span className="text-primary italic font-serif font-medium">
            success story?
          </span>
        </h2>

        <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed max-w-xl mx-auto mb-10">
          Every project starts with a free 30-minute strategy call. No
          obligation — just honest advice on how to grow your business.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-8 py-4 font-sans text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Book Free Consultation <Icons.ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/services/seo"
            className="flex w-full sm:w-auto items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 px-8 py-4 font-sans text-sm font-semibold text-neutral-700 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
