"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";

const industriesList = [
  {
    name: "E-Commerce",
    description: "Ecommerce SEO, Meta ads and PPC, and Shopify web design to grow online sales.",
    icon: Icons.ShoppingBag,
  },
  {
    name: "SaaS and Tech",
    description: "Content marketing, B2B lead generation and AI automation to fill your pipeline.",
    icon: Icons.Cpu,
  },
  {
    name: "Real Estate",
    description: "Local SEO and paid ads that bring buyers and sellers to your listings.",
    icon: Icons.Home,
  },
  {
    name: "Health and Wellness",
    description: "Trust-building content and compliant ads that reach the right patients and clients.",
    icon: Icons.HeartPulse,
  },
  {
    name: "Legal and Finance",
    description: "Authority content and local SEO for high-trust, high-value services.",
    icon: Icons.ShieldCheck,
  },
  {
    name: "Travel and Hospitality",
    description: "Visual campaigns, AI video and booking-focused landing pages.",
    icon: Icons.Compass,
  },
  {
    name: "Industrial and B2B",
    description: "Lead generation, technical content and LinkedIn ads for long sales cycles.",
    icon: Icons.Briefcase,
  },
];

export default function Industries() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-[#fafbfe] relative z-10 border-b border-neutral-100">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            Industries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-5">
            Digital Marketing for E-Commerce, SaaS, Real Estate, Healthcare and More
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed">
            Every industry buys differently. Our strategies are tailored to how your customers search and decide.
          </p>
        </div>

        {/* Industries Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {industriesList.map((ind) => {
            const Icon = ind.icon;

            return (
              <motion.div
                key={ind.name}
                variants={itemVariants}
                className="group flex flex-col p-6 sm:p-7 rounded-2xl border border-neutral-200/90 bg-white transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-primary mb-4 transition-colors group-hover:bg-primary group-hover:text-white shadow-xs">
                  <Icon className="h-6 w-6 stroke-[2]" />
                </div>
                <h3 className="font-sans font-bold text-base sm:text-lg text-neutral-900 mb-2">
                  {ind.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {ind.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
