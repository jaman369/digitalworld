"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { industriesData } from "@/data/industries";
import { CloudHomepageData } from "@/types";

export default function Industries() {
  const [data, setData] = useState<CloudHomepageData>({
    industriesEyebrow: "Industries",
    industriesTitle: "Sectors we serve",
    industriesSubtitle: "We deliver tailored keyword targeting strategies and customized backend logic across multiple industry verticals.",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-14 lg:py-20 bg-transparent relative z-10 border-b border-neutral-100">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            {data.industriesEyebrow || "Industries"}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
            {data.industriesTitle || "Sectors we serve"}
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed">
            {data.industriesSubtitle || "We deliver tailored keyword targeting strategies and customized backend logic across multiple industry verticals."}
          </p>
        </div>

        {/* Industries Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5"
        >
          {industriesData.map((ind) => {
            const Icon = (Icons[ind.iconName as keyof typeof Icons] || Icons.HelpCircle) as React.ComponentType<{ className?: string }>;

            return (
              <motion.div
                key={ind.id}
                variants={itemVariants}
                className="flex flex-col items-center justify-center p-5 lg:p-6 rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:shadow-premium hover:border-primary/20 hover:scale-[1.01] text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary mb-3 transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-sans font-bold text-sm text-neutral-800">
                  {ind.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
