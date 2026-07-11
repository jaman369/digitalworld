"use client";

import { useRef } from "react";
import { statsData } from "@/data/stats";
import { useCountUp } from "@/hooks/useCountUp";
import { Stat } from "@/types";

export default function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef} 
      className="py-12 bg-white border-b border-neutral-100 relative z-10"
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat) => (
            <StatItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatItemProps {
  stat: Stat;
}

function StatItem({ stat }: StatItemProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const target = parseInt(stat.value, 10) || 0;
  const count = useCountUp(target, elementRef, 1500);

  // Determine if it needs a '+' sign (e.g. 150+, 90+)
  const showPlus = stat.id === "projects" || stat.id === "clients";

  return (
    <div 
      ref={elementRef}
      className="flex flex-col items-center justify-center p-6 rounded-2xl transition-all hover:bg-neutral-50"
    >
      <span className="font-sans text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tightest mb-1.5 h-[56px] flex items-center justify-center">
        {count}
        {showPlus && <span className="text-primary font-medium text-3xl sm:text-4xl ml-0.5">+</span>}
      </span>
      <span className="font-sans text-xs font-bold text-neutral-400 uppercase tracking-widest text-center">
        {stat.label}
      </span>
    </div>
  );
}
