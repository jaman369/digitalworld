"use client";

import { useEffect, useRef } from "react";

const marqueeItems = [
  { emoji: "📍", label: "Local SEO" },
  { emoji: "🛒", label: "Ecommerce SEO" },
  { emoji: "💻", label: "SaaS SEO" },
  { emoji: "🌐", label: "Web Design & Dev" },
  { emoji: "🔵", label: "WordPress" },
  { emoji: "🟢", label: "Shopify" },
  { emoji: "🎯", label: "Google Ads" },
  { emoji: "🟦", label: "Facebook Ads" },
  { emoji: "✍️", label: "Content Marketing" },
  { emoji: "✉️", label: "Email Marketing" },
];

export default function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.innerHTML += trackRef.current.innerHTML;
    }
  }, []);

  return (
    <div className="bg-[#0a0a0a] border-t border-b border-white/[0.06] overflow-hidden py-[18px]">
      <div
        ref={trackRef}
        className="flex gap-0"
        style={{ animation: "marqueeScroll 38s linear infinite" }}
      >
        {marqueeItems.map((item, i) => (
          <div
            key={i}
            className="relative flex items-center gap-2 px-8 shrink-0 text-[13px] font-normal text-white/55 tracking-[0.02em] whitespace-nowrap after:content-['·'] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:text-white/15"
          >
            <span className="text-white">{item.emoji}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
