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
    <section className="py-24 lg:py-36 bg-[#f8fafc]/80 relative overflow-hidden border-b border-neutral-100">
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

        {/* Desktop Wavy Pathway Process (LG+ Screens) */}
        <div className="hidden lg:block relative max-w-6xl mx-auto mb-10" style={{ minHeight: '520px' }}>
          
          {/* S-Curve SVG Wave Path - Alternating valleys (1,3) and peaks (2,4) */}
          <svg
            className="absolute top-0 left-0 w-full pointer-events-none overflow-visible z-0"
            viewBox="0 0 1100 340"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            style={{ height: '340px' }}
          >
            {/* Soft Ambient Shadow Line */}
            <path
              d="M -20 220 C 60 220, 100 220, 155 220 C 220 220, 260 60, 370 60 C 480 60, 520 280, 630 280 C 740 280, 780 60, 890 60 C 950 60, 1020 60, 1120 100"
              stroke="#3b82f6"
              strokeWidth="6"
              strokeOpacity="0.08"
              fill="none"
            />
            {/* Primary Blue Wave Line */}
            <path
              d="M -20 220 C 60 220, 100 220, 155 220 C 220 220, 260 60, 370 60 C 480 60, 520 280, 630 280 C 740 280, 780 60, 890 60 C 950 60, 1020 60, 1120 100"
              stroke="url(#wave-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>

          {/* 4 Step Nodes Positioned on the Wave */}
          {steps.map((step, idx) => {
            const StepIcon = stepIcons[idx % stepIcons.length];
            
            // Node positions on the S-curve: steps 0,2 at valleys (low), steps 1,3 at peaks (high)
            // Icon center X positions (percentage) matching the SVG curve node points
            const nodeConfig = [
              { left: '14%', iconTop: '188px', textTop: '256px', isValley: true },   // Step 1: valley
              { left: '33.6%', iconTop: '28px', textTop: '96px', isValley: false },   // Step 2: peak
              { left: '57.3%', iconTop: '248px', textTop: '316px', isValley: true },  // Step 3: valley
              { left: '80.9%', iconTop: '28px', textTop: '96px', isValley: false },   // Step 4: peak
            ];

            const config = nodeConfig[idx];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="absolute z-10 group"
                style={{
                  left: config.left,
                  transform: 'translateX(-50%)',
                  top: '0px',
                  width: '200px',
                }}
              >
                {/* Icon Node on the Wave Line */}
                <div
                  className="flex justify-center"
                  style={{ position: 'absolute', top: config.iconTop, left: '50%', transform: 'translateX(-50%)' }}
                >
                  <div className="relative">
                    {/* Hover glow ring */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-sky-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* White Rounded Icon Container */}
                    <div className="relative h-14 w-14 bg-white rounded-2xl border border-neutral-100/80 shadow-[0_8px_24px_rgba(37,99,235,0.15)] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                      <div className="h-9 w-9 rounded-xl bg-blue-50/80 text-primary flex items-center justify-center">
                        <StepIcon className="h-[18px] w-[18px] stroke-[2.2]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Content Below the Icon */}
                <div
                  className="text-center px-2 relative"
                  style={{ position: 'absolute', top: config.textTop, left: '0', right: '0' }}
                >
                  {/* Giant Watermark Step Number */}
                  <span className="absolute -top-2 right-0 font-serif text-7xl font-bold text-neutral-200/30 select-none pointer-events-none leading-none group-hover:text-primary/10 transition-colors duration-300">
                    {step.stepNumber || idx + 1}
                  </span>

                  <h3 className="font-sans font-bold text-sm text-neutral-900 mb-1.5 relative z-10">
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
