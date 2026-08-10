"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { processStepsData } from "@/data/process";
import { CloudHomepageData } from "@/types";

const stepIcons = [
  Icons.Flag,        // Step 1: Discovery & Audit (Flag icon like 18.jpg)
  Icons.BarChart2,   // Step 2: Custom Blueprint (Bar chart icon like 18.jpg)
  Icons.Box,         // Step 3: Execution & Optimization (Box icon like 18.jpg)
  Icons.Rocket       // Step 4: Scale & Growth (Rocket/Growth icon)
];

export default function HowItWorks() {
  const [data, setData] = useState<CloudHomepageData>({
    processEyebrow: "Process",
    processTitle: "Our simple 4-step onboarding process",
    processSubtitle: "We structure your customer acquisition funnel from initial audit to scaled delivery with absolute clarity.",
    processSteps: processStepsData,
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

  const steps = data.processSteps && data.processSteps.length > 0 ? data.processSteps : processStepsData;

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-[#f8f9fa] relative overflow-hidden border-b border-neutral-100">
      
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Header - Matching Image 18 cleanly */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-0.5 w-5 bg-neutral-400/60" />
            <span className="font-sans text-xs font-semibold text-neutral-500 uppercase tracking-widest">
              {data.processEyebrow || "Process"}
            </span>
            <span className="h-0.5 w-5 bg-neutral-400/60" />
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
            {data.processTitle || "Our simple 4-step onboarding process"}
            <span className="text-blue-600">.</span>
          </h2>

          {data.processSubtitle && (
            <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl mx-auto mt-4">
              {data.processSubtitle}
            </p>
          )}
        </div>

        {/* Desktop Wavy Pathway (LG+ Screens - Exact Replica of Image 18) */}
        <div className="hidden lg:block relative min-h-[520px] max-w-6xl mx-auto">
          
          {/* Continuous SVG Wave Path (Passing through all 4 hexagon nodes) */}
          <svg
            className="absolute top-0 left-0 w-full h-[260px] pointer-events-none overflow-visible z-0"
            viewBox="0 0 1000 260"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Ambient Shadow Path */}
            <path
              d="M -20 160 C 80 190, 110 190, 180 180 C 290 160, 340 40, 430 40 C 530 40, 590 160, 680 100 C 760 40, 840 90, 920 90 C 960 90, 1000 110, 1040 120"
              stroke="#000"
              strokeWidth="10"
              strokeOpacity="0.03"
              fill="none"
            />
            {/* Primary Blue Wave Line from Image 18 */}
            <path
              d="M -20 160 C 80 190, 110 190, 180 180 C 290 160, 340 40, 430 40 C 530 40, 590 160, 680 100 C 760 40, 840 90, 920 90 C 960 90, 1000 110, 1040 120"
              stroke="#0284c7"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* 4 Steps Grid along the wave */}
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const StepIcon = stepIcons[idx % stepIcons.length];

              if (idx === 0) {
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col items-start relative pt-2"
                  >
                    {/* Text ABOVE Node for Step 1 */}
                    <div className="relative mb-12 max-w-[220px]">
                      <span className="absolute -top-6 left-28 font-serif text-7xl font-bold text-neutral-200/50 select-none pointer-events-none leading-none">
                        1
                      </span>
                      <h3 className="font-sans font-bold text-lg text-neutral-900 mb-2 relative z-10">
                        {step.title}
                      </h3>
                      <p className="font-sans text-xs text-neutral-400 leading-relaxed relative z-10">
                        {step.description}
                      </p>
                    </div>

                    {/* Hexagon Node sitting on wave line */}
                    <div className="relative ml-8 group">
                      <div className="absolute inset-0 bg-sky-500/25 blur-md rounded-full transform translate-y-3 scale-90" />
                      <div
                        className="relative w-14 h-16 bg-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                      >
                        <StepIcon className="w-6 h-6 text-sky-600 fill-sky-600/10 stroke-[2.2]" />
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // Steps 2, 3, 4: Hexagon Node on wave, Text BELOW Node
              const topMargins = [
                "",          // Step 1 handled above
                "mt-[6px]",   // Step 2 peak
                "mt-[68px]",  // Step 3 mid curve
                "mt-[58px]",  // Step 4 right peak
              ];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={`flex flex-col items-start ${topMargins[idx]} relative`}
                >
                  {/* Hexagon Node sitting on wave line */}
                  <div className="relative ml-8 mb-10 group">
                    <div className="absolute inset-0 bg-sky-500/25 blur-md rounded-full transform translate-y-3 scale-90" />
                    <div
                      className="relative w-14 h-16 bg-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                    >
                      <StepIcon className="w-6 h-6 text-sky-600 fill-sky-600/10 stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Text BELOW Node */}
                  <div className="relative max-w-[220px]">
                    <span className="absolute -top-6 left-28 font-serif text-7xl font-bold text-neutral-200/50 select-none pointer-events-none leading-none">
                      {idx + 1}
                    </span>
                    <h3 className="font-sans font-bold text-lg text-neutral-900 mb-2 relative z-10">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs text-neutral-400 leading-relaxed relative z-10">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Flow (SM-MD) */}
        <div className="block lg:hidden relative max-w-md mx-auto">
          <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-sky-500/40" />

          <div className="flex flex-col gap-12">
            {steps.map((step, idx) => {
              const StepIcon = stepIcons[idx % stepIcons.length];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex gap-6 items-start relative group"
                >
                  {/* Hexagon Node */}
                  <div className="relative shrink-0 z-10">
                    <div className="absolute inset-0 bg-sky-500/20 blur-sm rounded-full transform translate-y-1" />
                    <div
                      className="relative w-14 h-16 bg-white flex items-center justify-center shadow-md"
                      style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                    >
                      <StepIcon className="w-5 h-5 text-sky-600 fill-sky-600/10 stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Text (No card box - direct on background like Image 18) */}
                  <div className="flex-1 pt-1 relative">
                    <span className="absolute -top-4 right-0 font-serif text-6xl font-bold text-neutral-200/50 select-none pointer-events-none leading-none">
                      {idx + 1}
                    </span>
                    <h3 className="font-sans font-bold text-base text-neutral-900 mb-2 relative z-10">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs text-neutral-400 leading-relaxed relative z-10">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
