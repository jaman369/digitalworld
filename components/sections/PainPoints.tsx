"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { CloudHomepageData } from "@/types";

const defaultPainPoints = [
  {
    id: "01",
    title: "Stagnant Organic Traffic",
    description: "Your pages sit on page 2 or 3 of Google while competitors capture the buyers searching for what you sell. Our SEO services fix technical issues, build topical authority and bring qualified traffic that keeps growing.",
    iconName: "TrendingDown",
    tag: "SEO Stagnation",
  },
  {
    id: "02",
    title: "Escalating Ad Costs (CAC)",
    description: "You pay more for every click and every lead, and the budget keeps climbing. Our PPC management team tightens targeting, tests new creatives and cuts wasted spend.",
    iconName: "DollarSign",
    tag: "Ad Budget Waste",
  },
  {
    id: "03",
    title: "Low Website Conversions",
    description: "Visitors arrive, look around and leave. Our conversion-focused web design turns slow, confusing pages into fast websites that persuade and capture leads.",
    iconName: "UserX",
    tag: "Conversion Leaks",
  },
  {
    id: "04",
    title: "Manual, Time-Consuming Work",
    description: "Your team loses hours on follow-ups, reporting and repetitive tasks. Our AI automation services put lead capture, CRM updates and email follow-up on autopilot.",
    iconName: "Cpu",
    tag: "Manual Overload",
  },
  {
    id: "05",
    title: "Invisible in AI Search",
    description: "Customers now ask ChatGPT, Perplexity and Google AI Overviews before they search. If your brand is not cited, you are losing buyers you never see. Our AI SEO services (GEO and AEO) make your content the answer they quote.",
    iconName: "Bot",
    tag: "AI Search Blindspot",
  },
  {
    id: "06",
    title: "Content and Video That Do Not Convert",
    description: "Blog posts that rank for nothing and video ads that cost too much to produce drain your budget. Our SEO content writing and AI video production deliver content that ranks, engages and sells, without the studio costs.",
    iconName: "Video",
    tag: "Creative Fatigue",
  },
];

function getPainIcon(iconName?: string) {
  if (!iconName) return Icons.AlertCircle;
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
  return IconComponent || Icons.AlertCircle;
}

export default function PainPoints() {
  const [data, setData] = useState<CloudHomepageData>({
    painPointsEyebrow: "Sound familiar?",
    painPointsTitle: "Is Your Digital Marketing Failing to Deliver Real Growth?",
    painPointsSubtitle: "Most digital marketing agencies chase clicks and impressions. We focus on the problems that actually hold your revenue back, then fix them one by one.",
    painPointsCards: defaultPainPoints,
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/homepage");
        if (res.ok) {
          const hp = await res.json();
          setData((prev) => ({
            ...prev,
            ...hp,
            // Ensure 6 canonical items are loaded
            painPointsCards: (hp.painPointsCards && hp.painPointsCards.length === 6) ? hp.painPointsCards : defaultPainPoints,
          }));
        }
      } catch {}
    }
    load();
  }, []);

  const cardsList = data.painPointsCards && data.painPointsCards.length > 0 ? data.painPointsCards : defaultPainPoints;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-14 lg:py-20 bg-[#fafbfe] relative z-10 border-b border-neutral-100 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-rose-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-100 px-4 py-1.5 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-6">
            {data.painPointsEyebrow || "Sound familiar?"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
            {data.painPointsTitle || "Is Your Digital Marketing Failing to Deliver Real Growth?"}
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed">
            {data.painPointsSubtitle || "Most digital marketing agencies chase clicks and impressions. We focus on the problems that actually hold your revenue back, then fix them one by one."}
          </p>
        </div>

        {/* 6 Pain Point Cards Grid (3x2 on desktop for perfect balance) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-14"
        >
          {cardsList.map((item, idx) => {
            const IconComp = getPainIcon(item.iconName);
            const displayNumber = item.id || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`);

            return (
              <motion.div
                key={item.id || idx}
                variants={itemVariants}
                className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/80 p-8 shadow-xs hover:shadow-xl hover:border-rose-200 hover:bg-rose-50/20 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header Row: Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-rose-500 transition-colors">
                    {displayNumber}
                  </span>
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shadow-xs">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                {/* Tag */}
                {item.tag && (
                  <span className="inline-block self-start text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-100/80 px-2.5 py-1 rounded-full mb-3">
                    {item.tag}
                  </span>
                )}

                {/* Title */}
                <h3 className="font-sans text-lg font-bold text-neutral-900 mb-3 group-hover:text-rose-950 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Closing Line */}
        <div className="text-center">
          <p className="font-serif italic font-medium text-lg sm:text-xl text-neutral-800">
            One agency. One strategy. Every channel working together.
          </p>
        </div>
      </div>
    </section>
  );
}
