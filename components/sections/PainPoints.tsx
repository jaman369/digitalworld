"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, TrendingDown, DollarSign, UserX, Cpu, BarChart2 } from "lucide-react";
import { CloudHomepageData } from "@/types";

const painPoints = [
  {
    id: "01",
    title: "Stagnant Organic Traffic",
    description: "Stuck on page 2 or 3 for key terms while competitors capture high-intent buyers daily.",
    icon: TrendingDown,
    tag: "SEO Bottleneck",
  },
  {
    id: "02",
    title: "Escalating Ad Costs (CAC)",
    description: "Paid ad campaigns burning budget with diminishing ROI and rising cost per acquisition.",
    icon: DollarSign,
    tag: "Ad Inefficiency",
  },
  {
    id: "03",
    title: "Low Website Conversions",
    description: "Getting website visits but failing to convert visitors into qualified leads or paying customers.",
    icon: UserX,
    tag: "UX Bottleneck",
  },
  {
    id: "04",
    title: "Manual Lead Handling",
    description: "Slower follow-up times letting warm leads go cold before your sales team reaches out.",
    icon: AlertCircle,
    tag: "Workflow Friction",
  },
  {
    id: "05",
    title: "Fragmented Tech Stack",
    description: "Using 10 different tools that don't sync, creating data silos and wasted subscription costs.",
    icon: Cpu,
    tag: "Tool Chaos",
  },
  {
    id: "06",
    title: "Unclear ROI Reporting",
    description: "Vague agency reports showing vanity metrics instead of actual pipeline revenue generated.",
    icon: BarChart2,
    tag: "Lack of Clarity",
  },
];

export default function PainPoints() {
  const [data, setData] = useState<CloudHomepageData>({
    painPointsEyebrow: "04 — Problem / Pain Points",
    painPointsTitle: "Are these bottlenecks holding your growth back?",
    painPointsSubtitle: "Most digital agencies focus on vanity clicks. We diagnose and eliminate the core friction points in your revenue engine.",
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
    <section className="py-20 lg:py-28 bg-[#fafbfe] relative z-10 border-b border-neutral-100 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-rose-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-100 px-4 py-1.5 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-6">
            {data.painPointsEyebrow || "04 — Problem / Pain Points"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
            {data.painPointsTitle || "Are these bottlenecks holding your growth back?"}
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-500 leading-relaxed">
            {data.painPointsSubtitle || "Most digital agencies focus on vanity clicks. We diagnose and eliminate the core friction points in your revenue engine."}
          </p>
        </div>

        {/* 6 Pain Point Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {painPoints.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/80 p-8 shadow-xs hover:shadow-xl hover:border-rose-200 hover:bg-rose-50/20 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header Row: Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-rose-500 transition-colors">
                    {item.id}
                  </span>
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Tag */}
                <span className="inline-block self-start text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-100/80 px-2.5 py-1 rounded-full mb-3">
                  {item.tag}
                </span>

                {/* Title */}
                <h3 className="font-sans text-lg font-bold text-neutral-900 mb-3 group-hover:text-rose-950 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

