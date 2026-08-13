"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Globe, DollarSign, Magnet, BarChart3 } from "lucide-react";

const ecosystemStages = [
  {
    num: "01",
    stageLabel: "STAGE 01 —",
    subLabel: "INTENT VISITORS",
    title: "Traffic Acquisition",
    description: "Capturing targeted organic search traffic, paid PPC buyers, and social discovery.",
    pillText: "High-intent organic & paid visitors",
    icon: Globe,
    side: "left", // Card on Left, Pill on Right
    // Green Theme
    bannerBg: "from-[#10B981] via-[#059669] to-[#047857]",
    foldColor: "border-r-[#064E3B] border-t-[#064E3B]",
    shadow: "shadow-emerald-600/30",
    iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
    cardBorder: "border-neutral-200/90 hover:border-emerald-400 hover:shadow-emerald-500/10",
  },
  {
    num: "02",
    stageLabel: "STAGE 02 —",
    subLabel: "NURTURING INTEREST",
    title: "Engagement & Trust",
    description: "Delivering high-converting UX, interactive calculators, and authority content.",
    pillText: "Engaged site interactions & dwell time",
    icon: DollarSign,
    side: "right", // Pill on Left, Card on Right
    // Golden-Orange Theme
    bannerBg: "from-[#F59E0B] via-[#D97706] to-[#B45309]",
    foldColor: "border-l-[#78350F] border-t-[#78350F]",
    shadow: "shadow-amber-600/30",
    iconBg: "bg-amber-50 border-amber-200 text-amber-600",
    cardBorder: "border-neutral-200/90 hover:border-amber-400 hover:shadow-amber-500/10",
  },
  {
    num: "03",
    stageLabel: "STAGE 03 —",
    subLabel: "STEP",
    title: "Conversion Engine",
    description: "Optimized landing pages, instant CRM lead routing, and dynamic CRO testing.",
    pillText: "High lead-to-opportunity rates",
    icon: Magnet,
    side: "left", // Card on Left, Pill on Right
    // Electric Blue Theme
    bannerBg: "from-[#0076FF] via-[#0060DF] to-[#004BB5]",
    foldColor: "border-r-[#1E3A8A] border-t-[#1E3A8A]",
    shadow: "shadow-blue-600/30",
    iconBg: "bg-blue-50 border-blue-200 text-[#0076FF]",
    cardBorder: "border-neutral-200/90 hover:border-blue-400 hover:shadow-blue-500/10",
  },
  {
    num: "04",
    stageLabel: "STAGE 04 —",
    subLabel: "STEP",
    title: "Revenue & LTV Growth",
    description: "Automated email sequences, retention marketing, and scalable customer acquisition.",
    pillText: "Maximized customer lifetime value",
    icon: BarChart3,
    side: "right", // Pill on Left, Card on Right
    // Red / Crimson Theme
    bannerBg: "from-[#EF4444] via-[#DC2626] to-[#B91C1C]",
    foldColor: "border-l-[#7F1D1D] border-t-[#7F1D1D]",
    shadow: "shadow-red-600/30",
    iconBg: "bg-red-50 border-red-200 text-red-600",
    cardBorder: "border-neutral-200/90 hover:border-red-400 hover:shadow-red-500/10",
  },
];

export default function MarketingEcosystem() {
  return (
    <section className="py-24 lg:py-32 bg-[#F9FAFB] relative z-10 border-b border-neutral-200/80 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-50/50 via-emerald-50/40 to-amber-50/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200/90 px-4 py-1.5 text-xs font-bold text-[#0076FF] uppercase tracking-widest mb-6">
            <span className="h-2 w-2 rounded-full bg-[#0076FF]" />
            07 — MARKETING ECOSYSTEM
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
            Our Connected Growth Ecosystem
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            We don&apos;t build isolated channels. We build an interconnected revenue flywheel where every stage feeds the next.
          </p>
        </div>

        {/* ── 3D FOLDED RIBBON FLOWCHART (100% Custom React/Tailwind Code matching image 23.png) ── */}
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {ecosystemStages.map((st, idx) => {
            const Icon = st.icon;
            const isLast = idx === ecosystemStages.length - 1;

            return (
              <div key={st.num} className="w-full flex flex-col items-center relative">
                
                {/* 3-Column Grid Row */}
                <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Column (Card if side==='left', Pill if side==='right') */}
                  <div className="md:col-span-5 order-2 md:order-1 flex justify-center md:justify-end">
                    {st.side === "left" ? (
                      /* Left Content Card */
                      <motion.div
                        initial={{ opacity: 0, x: -35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className={`w-full bg-white rounded-2xl p-6 sm:p-8 border shadow-sm hover:shadow-lg transition-all duration-300 ${st.cardBorder}`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border mb-5 ${st.iconBg}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-sans text-xl font-bold text-neutral-900 mb-2">
                          {st.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                          {st.description}
                        </p>
                      </motion.div>
                    ) : (
                      /* Left Side Metric Pill Badge */
                      <motion.div
                        initial={{ opacity: 0, x: -25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="bg-white border border-neutral-300/80 rounded-full px-6 py-3.5 shadow-2xs text-center font-sans text-xs sm:text-sm font-bold text-neutral-800 max-w-xs"
                      >
                        {st.pillText}
                      </motion.div>
                    )}
                  </div>

                  {/* Center Column — 3D Folded Ribbon Pillar */}
                  <div className="md:col-span-2 order-1 md:order-2 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="relative my-2 group cursor-pointer"
                    >
                      {/* 3D Folded Triangle Ear (Left or Right fold) */}
                      {st.side === "left" ? (
                        <div className="absolute -top-3 -left-3 w-0 h-0 border-t-[14px] border-r-[14px] border-t-transparent border-r-emerald-800 drop-shadow-sm -z-10" />
                      ) : (
                        <div className="absolute -top-3 -right-3 w-0 h-0 border-t-[14px] border-l-[14px] border-t-transparent border-l-amber-900 drop-shadow-sm -z-10" />
                      )}

                      {/* Main Ribbon Banner Block */}
                      <div className={`w-36 sm:w-40 py-6 px-4 rounded-2xl bg-gradient-to-b ${st.bannerBg} ${st.shadow} shadow-xl text-white text-center flex flex-col items-center justify-center relative z-10 border border-white/20 transition-transform duration-300 group-hover:scale-105`}>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-white/90 mb-1">
                          {st.stageLabel}
                        </span>
                        <span className="font-serif text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none mb-1 drop-shadow-xs">
                          {st.num}
                        </span>
                        <span className="text-[9px] font-bold tracking-wider uppercase text-white/90">
                          {st.subLabel}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column (Pill if side==='left', Card if side==='right') */}
                  <div className="md:col-span-5 order-3 md:order-3 flex justify-center md:justify-start">
                    {st.side === "left" ? (
                      /* Right Side Metric Pill Badge */
                      <motion.div
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="bg-white border border-neutral-300/80 rounded-full px-6 py-3.5 shadow-2xs text-center font-sans text-xs sm:text-sm font-bold text-neutral-800 max-w-xs"
                      >
                        {st.pillText}
                      </motion.div>
                    ) : (
                      /* Right Content Card */
                      <motion.div
                        initial={{ opacity: 0, x: 35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className={`w-full bg-white rounded-2xl p-6 sm:p-8 border shadow-sm hover:shadow-lg transition-all duration-300 ${st.cardBorder}`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border mb-5 ${st.iconBg}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-sans text-xl font-bold text-neutral-900 mb-2">
                          {st.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                          {st.description}
                        </p>
                      </motion.div>
                    )}
                  </div>

                </div>

                {/* Downward Arrow Connector Line */}
                {!isLast && (
                  <div className="my-6 flex flex-col items-center z-0">
                    <div className="h-6 w-[2px] bg-neutral-300" />
                    <div className="w-8 h-8 rounded-full bg-white border border-neutral-300 shadow-xs flex items-center justify-center text-neutral-600 my-1">
                      <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                    <div className="h-6 w-[2px] bg-neutral-300" />
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
