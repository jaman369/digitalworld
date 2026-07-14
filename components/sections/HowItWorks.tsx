"use client";

import { motion } from "framer-motion";
import { processStepsData } from "@/data/process";

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
    <section className="py-20 lg:py-32 bg-transparent relative z-10 border-b border-neutral-100">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
            Our simple 4-step onboarding process
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-500 leading-relaxed">
            We structure your customer acquisition funnel from initial audit to scaled delivery with absolute clarity.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Connector Line in background (Desktop only) */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-neutral-100 -z-10 hidden lg:block" />

          {processStepsData.map((step) => (
            <motion.div
              key={step.id}
              variants={cardVariants}
              className="flex flex-col items-center lg:items-start text-center lg:text-left bg-white rounded-2xl border border-neutral-200 p-6 lg:p-8 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              {/* Step number circle */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary font-bold text-sm mb-6 border border-primary/10">
                0{step.stepNumber}
              </div>

              {/* Title */}
              <h3 className="font-sans font-bold text-lg text-neutral-900 mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm text-neutral-500 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
