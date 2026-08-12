"use client";

import { motion } from "framer-motion";
import { ArrowDown, Flame, MousePointerClick, Zap, Banknote } from "lucide-react";

const ecosystemStages = [
  {
    stage: "01",
    title: "Traffic Acquisition",
    subtitle: "High-intent visitors",
    description: "Capturing targeted organic search traffic, paid PPC buyers, and social discovery.",
    icon: Flame,
    color: "from-blue-500 to-indigo-600",
    lightBg: "bg-blue-50 text-blue-600 border-blue-100",
    metrics: "High-intent organic & paid visitors",
  },
  {
    stage: "02",
    title: "Engagement & Trust",
    subtitle: "Nurturing interest",
    description: "Delivering high-converting UX, interactive calculators, and authority content.",
    icon: MousePointerClick,
    color: "from-indigo-500 to-purple-600",
    lightBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
    metrics: "Engaged site interactions & dwell time",
  },
  {
    stage: "03",
    title: "Conversion Engine",
    subtitle: "Lead & sales capture",
    description: "Optimized landing pages, instant CRM lead routing, and dynamic CRO testing.",
    icon: Zap,
    color: "from-purple-500 to-pink-600",
    lightBg: "bg-purple-50 text-purple-600 border-purple-100",
    metrics: "High lead-to-opportunity rates",
  },
  {
    stage: "04",
    title: "Revenue & LTV Growth",
    subtitle: "Compounding returns",
    description: "Automated email sequences, retention marketing, and scalable customer acquisition.",
    icon: Banknote,
    color: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    metrics: "Maximized customer lifetime value",
  },
];

export default function MarketingEcosystem() {
  return (
    <section className="py-20 lg:py-28 bg-white relative z-10 border-b border-neutral-100 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-indigo-50/60 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-6">
            07 — Marketing Ecosystem
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
            Our Connected Growth Ecosystem
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-500 leading-relaxed">
            We don&apos;t build isolated channels. We build an interconnected revenue flywheel where every stage feeds the next.
          </p>
        </div>

        {/* Vertical Connected Funnel Layout */}
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {ecosystemStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isLast = idx === ecosystemStages.length - 1;

            return (
              <div key={stage.stage} className="w-full flex flex-col items-center">
                {/* Stage Box */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="w-full bg-neutral-50/80 rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  {/* Left: Icon & Badge */}
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${stage.color} text-white shadow-md shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border mb-1 ${stage.lightBg}`}>
                        Stage {stage.stage} — {stage.subtitle}
                      </span>
                      <h3 className="font-sans text-xl font-bold text-neutral-900">
                        {stage.title}
                      </h3>
                    </div>
                  </div>

                  {/* Middle: Description */}
                  <p className="font-sans text-xs sm:text-sm text-neutral-600 max-w-md leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Right: Metrics pill */}
                  <div className="self-stretch sm:self-center bg-white px-4 py-2.5 rounded-xl border border-neutral-200/70 shadow-2xs text-center shrink-0">
                    <span className="block font-sans text-[11px] font-bold text-neutral-800">
                      {stage.metrics}
                    </span>
                  </div>
                </motion.div>

                {/* Arrow Connector between stages */}
                {!isLast && (
                  <div className="my-4 flex flex-col items-center text-indigo-400">
                    <div className="h-6 w-0.5 bg-gradient-to-b from-indigo-300 to-indigo-500/50" />
                    <div className="p-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-2xs">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                    <div className="h-6 w-0.5 bg-gradient-to-b from-indigo-500/50 to-indigo-300" />
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
