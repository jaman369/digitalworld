"use client";

import { motion } from "framer-motion";
import { processStepsData } from "@/data/process";

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-20 lg:py-28 bg-white relative z-10 border-b border-neutral-100">
      <div className="container mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="text-[10px] sm:text-xs font-bold text-sky-500 uppercase tracking-[0.25em] mb-4 block">
            HOW IT WORKS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 leading-tight">
            A simple process. <br className="hidden sm:inline" />
            Exceptional results.
          </h2>
        </div>

        {/* Steps Timeline Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 gap-x-8 relative"
        >
          {/* Connector Line in background (Desktop only) */}
          <div className="absolute top-[28px] left-[12.5%] right-[12.5%] h-px bg-neutral-200/80 -z-0 hidden lg:block" />

          {processStepsData.map((step) => (
            <motion.div
              key={step.id}
              variants={cardVariants}
              className="flex flex-col items-center text-center group cursor-default"
            >
              {/* Step number circle */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white border border-neutral-200/80 text-blue-600 font-serif text-lg font-bold shadow-[0_4px_12px_rgba(0,0,0,0.01)] mb-6 z-10 transition-all duration-300 group-hover:bg-[#0076FF] group-hover:border-[#0076FF] group-hover:text-white group-hover:scale-108 group-hover:shadow-[0_8px_20px_rgba(0,118,255,0.15)]">
                0{step.stepNumber}
              </div>

              {/* Title */}
              <h3 className="font-sans font-bold text-sm sm:text-base text-neutral-800 mb-3 transition-colors duration-300 group-hover:text-neutral-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-xs text-neutral-400 leading-relaxed max-w-[240px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
