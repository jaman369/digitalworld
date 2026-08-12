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
    <section className="pt-0 pb-20 lg:pb-32 bg-transparent relative z-10 border-b border-neutral-100">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            Global Reach
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
            Trusted by businesses across 11 countries
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-500 leading-relaxed">
            We manage search optimization campaigns and custom CRM pipelines for international brands operating across multiple regions.
          </p>
        </div>

        {/* Flags Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
        >
          {countriesData.map((country) => (
            <motion.div
              key={country.id}
              variants={itemVariants}
              className="flex flex-col items-center justify-center p-6 rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md text-center"
            >
              {/* Flag Image */}
              <div className="relative h-10 w-14 overflow-hidden rounded border border-neutral-100 shadow-sm mb-4">
                <Image
                  src={country.flagPath}
                  alt={`${country.name} flag`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name */}
              <span className="font-sans font-bold text-sm text-neutral-800 mb-1">
                {country.name}
              </span>

              {/* Specialty Tag */}
              {country.specialtyTag && (
                <span className="font-sans text-[10px] font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-full border border-primary/5">
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
