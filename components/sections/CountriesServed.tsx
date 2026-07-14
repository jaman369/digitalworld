"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { countriesData } from "@/data/countries";
import * as Icons from "lucide-react";

export default function CountriesServed() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-20 lg:py-28 bg-black relative z-10 border-b border-neutral-900">
      <div className="container mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="text-[10px] sm:text-xs font-bold text-sky-400 uppercase tracking-[0.25em] mb-4 block">
            OUR CLIENTS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight mb-6">
            Trusted by businesses <br className="hidden sm:inline" />
            across{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-[#10B981] bg-clip-text text-transparent italic font-serif">
              11 countries.
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            From solo e-commerce brands to growing agencies — our clients span 4 continents and the most competitive digital markets in the world.
          </p>
        </div>

        {/* Unified Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border border-neutral-800/60 bg-neutral-950/20 rounded-[2rem] overflow-hidden"
        >
          {/* 11 Country Cards */}
          {countriesData.map((country) => (
            <motion.div
              key={country.id}
              variants={itemVariants}
              className="flex flex-col items-center justify-center p-8 border border-neutral-800/40 -mr-px -mb-px bg-transparent transition-all duration-300 hover:bg-neutral-900/30 text-center"
            >
              {/* Flag Image */}
              <div className="relative h-7 w-10 overflow-hidden rounded shadow-sm mb-4 border border-neutral-800/40">
                <Image
                  src={country.flagPath}
                  alt={`${country.name} flag`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name */}
              <span className="font-sans font-bold text-sm text-white mb-1">
                {country.name}
              </span>

              {/* Specialty Subtext */}
              <span className="font-sans text-[10px] sm:text-xs text-neutral-500">
                {country.specialtyTag}
              </span>
            </motion.div>
          ))}

          {/* 12th Card: Growing */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center p-8 border border-neutral-800/40 -mr-px -mb-px bg-transparent transition-all duration-300 hover:bg-neutral-900/30 text-center"
          >
            {/* Plus Icon */}
            <div className="flex h-7 w-10 items-center justify-center mb-4">
              <Icons.Plus className="h-5 w-5 text-blue-500" />
            </div>

            {/* Name */}
            <span className="font-sans font-bold text-sm text-blue-500 mb-1">
              Growing
            </span>

            {/* Subtext */}
            <span className="font-sans text-[10px] sm:text-xs text-neutral-500">
              More markets soon
            </span>
          </motion.div>

          {/* 3 Empty filler cells to complete the 15-cell grid for 5-column desktop alignment */}
          <div className="hidden lg:flex border border-neutral-800/40 -mr-px -mb-px bg-transparent pointer-events-none" />
          <div className="hidden lg:flex border border-neutral-800/40 -mr-px -mb-px bg-transparent pointer-events-none" />
          <div className="hidden lg:flex border border-neutral-800/40 -mr-px -mb-px bg-transparent pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}
