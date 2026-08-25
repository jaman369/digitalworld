"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { countriesData } from "@/data/countries";

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
    <section className="pt-0 pb-14 lg:pb-20 bg-transparent relative z-10 border-b border-neutral-100">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            Global Reach
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
            Trusted by businesses across 11 countries
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed">
            We manage search optimization campaigns and custom CRM pipelines for international brands operating across multiple regions.
          </p>
        </div>

        {/* Flags Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-5"
        >
          {countriesData.map((country) => (
            <motion.div
              key={country.id}
              variants={itemVariants}
              className="flex flex-col items-center justify-center p-5 rounded-lg border border-neutral-100 bg-white/80 shadow-2xs transition-all duration-300 hover:shadow-xs hover:border-neutral-200 text-center"
            >
              {/* Flag Image */}
              <div className="relative h-8 w-12 overflow-hidden rounded border border-neutral-100 shadow-2xs mb-3">
                <Image
                  src={country.flagPath}
                  alt={`${country.name} flag`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name */}
              <span className="font-sans font-medium text-xs text-neutral-700 mb-1">
                {country.name}
              </span>

              {/* Specialty Tag */}
              {country.specialtyTag && (
                <span className="font-sans text-xs font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-full border border-primary/5">
                  {country.specialtyTag}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
