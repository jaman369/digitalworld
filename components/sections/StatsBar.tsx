"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { statsData } from "@/data/stats";
import { useCountUp } from "@/hooks/useCountUp";
import { Stat } from "@/types";
import { CloudHomepageData } from "@/types";

const countries11 = [
  { name: "USA", flag: "/Flag emoji/United States.svg" },
  { name: "UK", flag: "/Flag emoji/United Kingdom.svg" },
  { name: "Canada", flag: "/Flag emoji/Canada.svg" },
  { name: "UAE", flag: "/Flag emoji/UAE.svg" },
  { name: "Australia", flag: "/Flag emoji/Australia.svg" },
  { name: "Germany", flag: "/Flag emoji/Germany.svg" },
  { name: "Ireland", flag: "/Flag emoji/Ireland.svg" },
  { name: "Netherlands", flag: "/Flag emoji/Netherlands.svg" },
  { name: "New Zealand", flag: "/Flag emoji/New Zealand.svg" },
  { name: "South Africa", flag: "/Flag emoji/South Africa.svg" },
  { name: "Bangladesh", flag: "/Flag emoji/Bangladesh.svg" },
];

export default function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<CloudHomepageData>({
    statsEyebrow: "Trusted by growing brands worldwide",
    stats: statsData,
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/homepage");
        if (res.ok) {
          const hp = await res.json();
          setData((prev) => ({ ...prev, ...hp }));
        }
      } catch {}
    }
    load();
  }, []);

  const items = data.stats && data.stats.length > 0 ? data.stats : statsData;

  return (
    <section 
      ref={containerRef} 
      className="py-10 sm:py-14 bg-gradient-to-b from-[#e3f2fd] via-[#e8f5fe] to-[#e3f2fd] border-b border-blue-100/60 relative z-10"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Eyebrow Title */}
        <div className="text-center mb-6">
          <span className="text-xs sm:text-sm font-bold text-neutral-600 uppercase tracking-widest font-sans">
            {data.statsEyebrow || "Trusted by growing brands worldwide"}
          </span>
        </div>

        {/* Floating Stats Card */}
        <div className="bg-white border border-blue-100/70 rounded-[2.25rem] shadow-[0_16px_45px_rgba(0,118,255,0.06)] py-7 sm:py-10 px-4 sm:px-12">
          {/* Numbers Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0">
            {items.map((stat, idx) => (
              <StatItem 
                key={stat.id || idx} 
                stat={stat} 
                showDivider={idx < items.length - 1}
                index={idx}
              />
            ))}
          </div>

          {/* Flag Strip (11 Countries) */}
          <div className="mt-8 pt-7 border-t border-neutral-100 flex flex-col items-center">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
              {countries11.map((c, i) => (
                <div key={c.name} className="flex items-center gap-1.5 group">
                  <div className="relative w-5 h-3.5 overflow-hidden rounded-[2px] shadow-xs border border-neutral-200 shrink-0 group-hover:scale-110 transition-transform">
                    <Image
                      src={c.flag}
                      alt={c.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-sans text-xs font-semibold text-neutral-600 group-hover:text-primary transition-colors">
                    {c.name}
                  </span>
                  {i < countries11.length - 1 && (
                    <span className="text-neutral-300 text-xs ml-1 font-mono hidden sm:inline">·</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface StatItemProps {
  stat: Stat | { id?: string; value: string; label: string };
  showDivider: boolean;
  index: number;
}

function StatItem({ stat, showDivider, index }: StatItemProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const target = parseInt(stat.value, 10) || 0;
  const count = useCountUp(target, elementRef, 1500);

  // Show '+' for 56+, 44+, and 6+ (all except countries which is 11)
  const showPlus = stat.id !== "countries" && stat.label.toLowerCase().indexOf("countr") === -1;

  return (
    <div 
      ref={elementRef}
      className={`flex flex-col items-center justify-center py-2 px-3 sm:px-4 rounded-xl transition-all
        ${showDivider ? 'lg:border-r lg:border-neutral-100' : ''}
        ${index % 2 === 0 ? 'border-r border-neutral-100 lg:border-r-0' : ''}
      `}
    >
      <span className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] font-bold text-neutral-900 tracking-tight mb-2 h-[60px] flex items-center justify-center">
        {count}
        {showPlus && <span className="font-serif font-bold text-3xl sm:text-4xl ml-0.5 text-[#0076FF]">+</span>}
      </span>
      <span className="font-sans text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest text-center">
        {stat.label}
      </span>
    </div>
  );
}
