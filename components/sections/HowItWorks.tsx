"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { processStepsData } from "@/data/process";
import { CloudHomepageData } from "@/types";

const stepIcons = [
  Icons.Search,       // Step 1: Discovery & Audit
  Icons.Compass,      // Step 2: Custom Blueprint
  Icons.Layers,       // Step 3: Execution & Optimization
  Icons.TrendingUp    // Step 4: Scale & Growth
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
    <section className="pt-20 lg:pt-28 pb-[85px] bg-[#f8fafc]/80 relative overflow-hidden border-b border-neutral-100">
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Header (Matching Image 18 Style) */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-0.5 w-6 bg-primary/40 rounded-full" />
            <span className="font-sans text-xs font-bold text-primary uppercase tracking-[0.25em]">
              {data.processEyebrow || "Process"}
            </span>
            <span className="h-0.5 w-6 bg-primary/40 rounded-full" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
            {data.processTitle || "Our simple 4-step onboarding process"}
            <span className="text-primary">.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto">
            {data.processSubtitle || "We structure your customer acquisition funnel from initial audit to scaled delivery with absolute clarity."}
          </p>
        </div>

        {/* Desktop Linear Pathway Process (LG+ Screens - Single Horizontal Row Flow) */}
        <div className="hidden lg:block relative max-w-6xl mx-auto mb-10">
          
          {/* Continuous Straight Connecting Line */}
          <div className="absolute top-[36px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 z-0" />

          {/* 4 Steps Positioned in a Single Linear Row */}
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const StepIcon = stepIcons[idx % stepIcons.length];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="flex flex-col items-center text-center relative group"
                >
                  {/* Icon Node */}
                  <div className="relative mb-6">
                    {/* Glowing outer shadow ring */}
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500/20 to-sky-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Rounded Icon Container */}
                    <div className="relative h-16 w-16 bg-white rounded-xl border border-neutral-100 shadow-[0_10px_25px_rgba(37,99,235,0.12)] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                      <div className="h-10 w-10 rounded-lg bg-blue-50/80 text-primary flex items-center justify-center">
                        <StepIcon className="h-5 w-5 stroke-[2.2]" />
                      </div>
                    </div>
                  </div>

                  {/* Step Content Box with Watermark Number */}
                  <div className="relative bg-white/80 backdrop-blur-sm border border-neutral-100 rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 w-full overflow-hidden flex-1 flex flex-col justify-start text-center">
                    
                    {/* Giant Watermark Step Number (1, 2, 3, 4) */}
                    <span className="absolute -top-3 -right-1 font-serif text-6xl font-bold text-neutral-200/40 select-none pointer-events-none leading-none group-hover:text-primary/10 transition-colors duration-300">
                      {step.stepNumber || idx + 1}
                    </span>

                    <h3 className="font-sans font-bold text-base text-neutral-900 mb-2 relative z-10">
                      {step.title}
                    </h3>

                    <p className="font-sans text-xs text-neutral-500 leading-relaxed relative z-10">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Flow (SM-MD Screens) */}
        <div className="block lg:hidden relative max-w-md mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-sky-400 to-blue-500" />

          <div className="flex flex-col gap-10">
            {steps.map((step, idx) => {
              const StepIcon = stepIcons[idx % stepIcons.length];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-6 items-start relative group"
                >
                  {/* Icon Node */}
                  <div className="relative shrink-0 z-10">
                    <div className="h-14 w-14 bg-white rounded-2xl border border-neutral-100 shadow-md flex items-center justify-center">
                      <div className="h-9 w-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                        <StepIcon className="h-4 w-4 stroke-[2.2]" />
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                    {/* Watermark Number */}
                    <span className="absolute -top-3 -right-1 font-serif text-6xl font-bold text-neutral-200/40 select-none pointer-events-none leading-none">
                      {step.stepNumber || idx + 1}
                    </span>

                    <h3 className="font-sans font-bold text-base text-neutral-900 mb-2 relative z-10">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs text-neutral-500 leading-relaxed relative z-10">
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
