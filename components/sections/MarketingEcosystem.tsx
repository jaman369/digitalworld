"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, DollarSign, Magnet, BarChart3, ArrowDown } from "lucide-react";

const stages = [
  {
    num: "01",
    stageText: "STAGE 01 —",
    subText: "INTENT VISITORS",
    title: "Traffic Acquisition",
    desc: "Capturing targeted organic search traffic, paid PPC buyers, and social discovery.",
    pill: "High-intent organic & paid visitors",
    icon: Search,
    side: "left", // card on left, pill on right
    ribbonGradient: "bg-gradient-to-b from-emerald-500 via-green-600 to-emerald-700",
    ribbonShadow: "shadow-emerald-600/30",
    iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    borderColor: "border-emerald-200 hover:border-emerald-400",
  },
  {
    num: "02",
    stageText: "STAGE 02 —",
    subText: "NURTURING INTEREST",
    title: "Engagement & Trust",
    desc: "Delivering high-converting UX, interactive calculators, and authority content.",
    pill: "Engaged site interactions & dwell time",
    icon: DollarSign,
    side: "right", // pill on left, card on right
    ribbonGradient: "bg-gradient-to-b from-amber-500 via-orange-500 to-amber-600",
    ribbonShadow: "shadow-amber-600/30",
    iconColor: "text-amber-600 bg-amber-50 border-amber-200",
    borderColor: "border-amber-200 hover:border-amber-400",
  },
  {
    num: "03",
    stageText: "STAGE 03 —",
    subText: "LEAD CAPTURE",
    title: "Conversion Engine",
    desc: "Optimized landing pages, instant CRM lead routing, and dynamic CRO testing.",
    pill: "High lead-to-opportunity rates",
    icon: Magnet,
    side: "left",
    ribbonGradient: "bg-gradient-to-b from-blue-500 via-indigo-600 to-blue-700",
    ribbonShadow: "shadow-blue-600/30",
    iconColor: "text-blue-600 bg-blue-50 border-blue-200",
    borderColor: "border-blue-200 hover:border-blue-400",
  },
  {
    num: "04",
    stageText: "STAGE 04 —",
    subText: "LTV GROWTH",
    title: "Revenue & LTV Growth",
    desc: "Automated email sequences, retention marketing, and scalable customer acquisition.",
    pill: "Maximized customer lifetime value",
    icon: BarChart3,
    side: "right",
    ribbonGradient: "bg-gradient-to-b from-red-500 via-orange-600 to-red-700",
    ribbonShadow: "shadow-red-600/30",
    iconColor: "text-red-600 bg-red-50 border-red-200",
    borderColor: "border-red-200 hover:border-red-400",
  },
];

export default function MarketingEcosystem() {
  return (
    <section className="py-24 lg:py-32 bg-white relative z-10 border-b border-neutral-100 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-50/40 via-emerald-50/30 to-purple-50/40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-bold text-[#0076FF] uppercase tracking-widest mb-6">
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

        {/* ── HIGH-RESOLUTION GRAPHIC VISUAL DISPLAY (Matching Image 23.png) ── */}
        <div className="max-w-4xl mx-auto mb-16 shadow-xl rounded-3xl overflow-hidden border border-neutral-200/80 bg-white p-4 sm:p-8 transition-all hover:shadow-2xl">
          <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] max-w-3xl mx-auto">
            <Image
              src="/images/23.png"
              alt="Our Connected Growth Ecosystem Flowchart"
              fill
              className="object-contain rounded-2xl"
              priority
            />
          </div>
        </div>

        {/* ── INTERACTIVE CONNECTED STAGES BREAKDOWN ── */}
        <div className="max-w-5xl mx-auto space-y-12">
          {stages.map((st, idx) => {
            const Icon = st.icon;
            const isLast = idx === stages.length - 1;

            return (
              <div key={st.num} className="relative flex flex-col items-center">
                
                {/* Stage Grid Container */}
                <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Column (Card or Pill depending on side) */}
                  <div className={`md:col-span-5 ${st.side === "left" ? "order-2 md:order-1" : "order-3 md:order-1 md:text-right"}`}>
                    {st.side === "left" ? (
                      /* Left Card */
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`bg-white border rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md ${st.borderColor}`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 ${st.iconColor}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-sans text-xl font-bold text-neutral-900 mb-2">
                          {st.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                          {st.desc}
                        </p>
                      </motion.div>
                    ) : (
                      /* Left Side Pill Badge */
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block bg-white border border-neutral-200/90 rounded-full px-6 py-3 shadow-xs text-center font-sans text-xs sm:text-sm font-bold text-neutral-800"
                      >
                        {st.pill}
                      </motion.div>
                    )}
                  </div>

                  {/* Center Ribbon Banner Pillar */}
                  <div className="md:col-span-2 order-1 md:order-2 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className={`w-32 sm:w-36 py-5 px-3 rounded-2xl ${st.ribbonGradient} ${st.ribbonShadow} shadow-lg text-white text-center flex flex-col items-center justify-center relative z-10 border border-white/20`}
                    >
                      <span className="text-[10px] font-bold tracking-widest uppercase text-white/90 mb-1">
                        {st.stageText}
                      </span>
                      <span className="font-serif text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
                        {st.num}
                      </span>
                      <span className="text-[9px] font-bold tracking-wider uppercase text-white/90">
                        {st.subText}
                      </span>
                    </motion.div>
                  </div>

                  {/* Right Column (Pill or Card depending on side) */}
                  <div className={`md:col-span-5 ${st.side === "left" ? "order-3 md:order-3 md:text-left" : "order-2 md:order-3"}`}>
                    {st.side === "left" ? (
                      /* Right Side Pill Badge */
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block bg-white border border-neutral-200/90 rounded-full px-6 py-3 shadow-xs text-center font-sans text-xs sm:text-sm font-bold text-neutral-800"
                      >
                        {st.pill}
                      </motion.div>
                    ) : (
                      /* Right Card */
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`bg-white border rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md ${st.borderColor}`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 ${st.iconColor}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-sans text-xl font-bold text-neutral-900 mb-2">
                          {st.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                          {st.desc}
                        </p>
                      </motion.div>
                    )}
                  </div>

                </div>

                {/* Downward Arrow Connector */}
                {!isLast && (
                  <div className="my-6 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-xs flex items-center justify-center text-neutral-500">
                      <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
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
