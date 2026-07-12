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
      className="py-14 sm:py-20 bg-neutral-50 border-b border-neutral-100 relative z-10"
    >
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Eyebrow Title */}
        <div className="text-center mb-10">
          <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.25em] font-sans">
            PROVEN TRACK RECORD
          </span>
        </div>

        {/* Floating Stats Card */}
        <div className="bg-white border border-neutral-100 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.03)] py-10 sm:py-12 px-6 sm:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0">
            {statsData.map((stat, idx) => (
              <StatItem 
                key={stat.id} 
                stat={stat} 
                showDivider={idx < statsData.length - 1}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface StatItemProps {
  stat: Stat;
  showDivider: boolean;
  index: number;
}

function StatItem({ stat, showDivider, index }: StatItemProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const target = parseInt(stat.value, 10) || 0;
  const count = useCountUp(target, elementRef, 1500);

  // Determine if it needs a '+' sign (e.g. 150+, 90+)
  const showPlus = stat.id === "projects" || stat.id === "clients";

  return (
    <div 
      ref={elementRef}
      className={`flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all
        ${showDivider ? 'lg:border-r lg:border-neutral-100' : ''}
        ${index % 2 === 0 ? 'border-r border-neutral-100 lg:border-r-0' : ''}
      `}
    >
      <span className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] font-bold text-neutral-900 tracking-tight mb-2 h-[60px] flex items-center justify-center">
        {count}
        {showPlus && <span className="font-serif font-bold text-3xl sm:text-4xl ml-0.5 text-neutral-900">+</span>}
      </span>
      <span className="font-sans text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest text-center">
        {stat.label}
      </span>
    </div>
  );
}
