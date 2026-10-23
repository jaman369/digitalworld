"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

const resultsData = [
  {
    id: "res-1",
    industryTag: "E-Commerce Retail",
    service: "SEO",
    metricHighlight: "+210% Organic Traffic",
    timeframe: "in 6 months",
    description: "Scaled category page authority, resolved crawl budget bottlenecks, and captured competitive commercial search queries.",
    icon: Icons.TrendingUp,
    badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
    glowColor: "group-hover:border-blue-300",
  },
  {
    id: "res-2",
    industryTag: "B2B SaaS Platform",
    service: "PPC",
    metricHighlight: "45% Lower CPL & 4.2x ROAS",
    timeframe: "within 90 days",
    description: "Restructured Google Ads and Performance Max funnels with tight conversion intent bidding and negative keyword pruning.",
    icon: Icons.DollarSign,
    badgeColor: "bg-cyan-50 text-cyan-600 border-cyan-100",
    glowColor: "group-hover:border-cyan-300",
  },
  {
    id: "res-3",
    industryTag: "Real Estate Brokerage",
    service: "Web Design",
    metricHighlight: "0.8s Load Speed & +180% Conversions",
    timeframe: "post-launch",
    description: "Engineered a custom high-speed UI/UX frontend with streamlined inquiry workflows and sub-second page performance.",
    icon: Icons.Zap,
    badgeColor: "bg-orange-50 text-orange-600 border-orange-100",
    glowColor: "group-hover:border-orange-300",
  },
];

export default function ResultsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-white relative z-10 border-b border-neutral-100 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-blue-500/5 blur-[130px] pointer-events-none -z-10 rounded-full" />

      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-1.5 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-6">
            Proven results
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-5">
            Real Results for Real Businesses
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed">
            Here is what our digital marketing services have delivered for clients.
          </p>
        </div>

        {/* 3 Case Study Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 mb-14"
        >
          {resultsData.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className={`group relative flex flex-col justify-between bg-white rounded-2xl border border-neutral-200/80 p-8 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 ${item.glowColor}`}
              >
                <div>
                  {/* Category & Service Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.industryTag} · {item.service}
                    </span>
                    <div className="p-2.5 rounded-xl bg-neutral-50 text-neutral-500 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Highlight Metric */}
                  <div className="mb-4">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight block">
                      {item.metricHighlight}
                    </span>
                    <span className="font-sans text-xs font-medium text-neutral-400 mt-1 block">
                      {item.timeframe}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="font-sans text-sm text-neutral-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center text-xs font-bold text-primary group-hover:underline">
                  Case Study Overview →
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Case Studies Button */}
        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            View All Case Studies <Icons.ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
