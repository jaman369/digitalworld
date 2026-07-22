"use client";

import { useEffect, useRef, useState } from "react";
import { statsData } from "@/data/stats";
import { useCountUp } from "@/hooks/useCountUp";
import { Stat } from "@/types";
import { CloudHomepageData } from "@/lib/cloudSync";

export default function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<CloudHomepageData>({
    statsEyebrow: "PROVEN TRACK RECORD",
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
      className="py-8 sm:py-10 bg-transparent border-b border-neutral-100 relative z-10"
    >
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Eyebrow Title */}
        <div className="text-center mb-6">
          <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.25em] font-sans">
            {data.statsEyebrow || "PROVEN TRACK RECORD"}
          </span>
        </div>

        {/* Floating Stats Card */}
        <div className="bg-white border border-neutral-100 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.03)] py-6 sm:py-8 px-6 sm:px-12">
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

  const showPlus = stat.id === "projects" || stat.id === "clients" || parseInt(stat.value, 10) > 10;

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
