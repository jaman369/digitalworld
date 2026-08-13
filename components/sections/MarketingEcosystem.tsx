"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Search, DollarSign, Magnet, BarChart3 } from "lucide-react";

const stages = [
  {
    num: "01",
    label: "STAGE 01 —",
    sub: "INTENT VISITORS",
    title: "Traffic Acquisition",
    desc: "Capturing targeted organic search traffic, paid PPC buyers, and social discovery.",
    pill: "High-intent organic & paid visitors",
    icon: Search,
    side: "left", // Card on Left, Pill on Right
    gradient: "from-[#10B981] via-[#059669] to-[#047857]",
    shadow: "shadow-emerald-600/30",
    iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  {
    num: "02",
    label: "STAGE 02 —",
    sub: "NURTURING INTEREST",
    title: "Engagement & Trust",
    desc: "Delivering high-converting UX, interactive calculators, and authority content.",
    pill: "Engaged site interactions & dwell time",
    icon: DollarSign,
    side: "right", // Pill on Left, Card on Right
    gradient: "from-[#F59E0B] via-[#D97706] to-[#B45309]",
    shadow: "shadow-amber-600/30",
    iconColor: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    num: "03",
    label: "STAGE 03 —",
    sub: "STEP",
    title: "Conversion Engine",
    desc: "Optimized landing pages, instant CRM lead routing, and dynamic CRO testing.",
    pill: "High lead-to-opportunity rates",
    icon: Magnet,
    side: "left", // Card on Left, Pill on Right
    gradient: "from-[#0076FF] via-[#0060DF] to-[#004BB5]",
    shadow: "shadow-blue-600/30",
    iconColor: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    num: "04",
    label: "STAGE 04 —",
    sub: "STEP",
    title: "Revenue & LTV Growth",
    desc: "Automated email sequences, retention marketing, and scalable customer acquisition.",
    pill: "Maximized customer lifetime value",
    icon: BarChart3,
    side: "right", // Pill on Left, Card on Right
    gradient: "from-[#EF4444] via-[#DC2626] to-[#B91C1C]",
    shadow: "shadow-red-600/30",
    iconColor: "text-red-600 bg-red-50 border-red-200",
  },
];

export default function MarketingEcosystem() {
  return (
    <section className="py-14 sm:py-20 bg-white relative z-10 border-b border-neutral-200/80 overflow-hidden">
      
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* ── COMPACT SECTION HEADER ── */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/90 px-3.5 py-1 text-[11px] font-bold text-[#0076FF] uppercase tracking-widest mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0076FF]" />
            07 — MARKETING ECOSYSTEM
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight leading-tight mb-3">
            Our Connected Growth Ecosystem
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl mx-auto">
            We don&apos;t build isolated channels. We build an interconnected revenue flywheel where every stage feeds the next.
          </p>
        </div>

        {/* ── TIGHT 3D RIBBON FLYWHEEL DIAGRAM ── */}
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {stages.map((st, idx) => {
            const Icon = st.icon;
            const isLast = idx === stages.length - 1;

            return (
              <div key={st.num} className="w-full flex flex-col items-center">
                
                {/* Compact Row Container */}
                <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 relative">
                  
                  {/* Left Element (Card if side==='left', Pill if side==='right') */}
                  <div className="w-full md:w-1/2 flex justify-center md:justify-end order-2 md:order-1">
                    {st.side === "left" ? (
                      /* Left Content Card */
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-sm bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-md text-center flex flex-col items-center md:items-start md:text-left relative z-0 md:-mr-4 hover:shadow-lg transition-all"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border mb-3 ${st.iconColor}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-sans text-base sm:text-lg font-bold text-neutral-900 mb-1">
                          {st.title}
                        </h3>
                        <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                          {st.desc}
                        </p>
                      </motion.div>
                    ) : (
                      /* Left Metric Pill Badge */
                      <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="bg-white border border-neutral-300 rounded-full px-5 py-2.5 shadow-2xs text-center font-sans text-xs font-bold text-neutral-800"
                      >
                        {st.pill}
                      </motion.div>
                    )}
                  </div>

                  {/* Center — Compact 3D Folded Ribbon Banner */}
                  <div className="order-1 md:order-2 shrink-0 z-10 my-1">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="relative"
                    >
                      {/* Ribbon Banner Body */}
                      <div className={`w-28 sm:w-32 py-4 px-2 rounded-xl bg-gradient-to-b ${st.gradient} ${st.shadow} shadow-lg text-white text-center flex flex-col items-center justify-center border border-white/20 relative z-10`}>
                        <span className="text-[9px] font-bold tracking-widest uppercase text-white/90 mb-0.5">
                          {st.label}
                        </span>
                        <span className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none mb-0.5">
                          {st.num}
                        </span>
                        <span className="text-[8px] font-bold tracking-wider uppercase text-white/90">
                          {st.sub}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Element (Pill if side==='left', Card if side==='right') */}
                  <div className="w-full md:w-1/2 flex justify-center md:justify-start order-3 md:order-3">
                    {st.side === "left" ? (
                      /* Right Metric Pill Badge */
                      <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="bg-white border border-neutral-300 rounded-full px-5 py-2.5 shadow-2xs text-center font-sans text-xs font-bold text-neutral-800"
                      >
                        {st.pill}
                      </motion.div>
                    ) : (
                      /* Right Content Card */
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-sm bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-md text-center flex flex-col items-center md:items-start md:text-left relative z-0 md:-ml-4 hover:shadow-lg transition-all"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border mb-3 ${st.iconColor}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-sans text-base sm:text-lg font-bold text-neutral-900 mb-1">
                          {st.title}
                        </h3>
                        <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                          {st.desc}
                        </p>
                      </motion.div>
                    )}
                  </div>

                </div>

                {/* Downward Arrow Connector */}
                {!isLast && (
                  <div className="my-2 flex flex-col items-center text-neutral-400 z-0">
                    <div className="h-4 w-[2px] bg-neutral-300" />
                    <div className="w-6 h-6 rounded-full bg-white border border-neutral-300 shadow-2xs flex items-center justify-center text-neutral-600 my-0.5">
                      <ArrowDown className="w-3 h-3" />
                    </div>
                    <div className="h-4 w-[2px] bg-neutral-300" />
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
