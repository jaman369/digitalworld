"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/services";
import { CloudHomepageData } from "@/lib/cloudSync";

const categoryStyles: Record<string, {
  hoverBg: string;
  hoverBorder: string;
  hoverText: string;
  hoverIconBg: string;
  hoverIconText: string;
}> = {
  seo: {
    hoverBg: "hover:bg-[#E8F2FF]",
    hoverBorder: "hover:border-blue-200/60",
    hoverText: "group-hover:text-blue-700",
    hoverIconBg: "group-hover:bg-blue-600",
    hoverIconText: "group-hover:text-white",
  },
  ppc: {
    hoverBg: "hover:bg-[#FFF8EB]",
    hoverBorder: "hover:border-orange-200/60",
    hoverText: "group-hover:text-orange-700",
    hoverIconBg: "group-hover:bg-orange-600",
    hoverIconText: "group-hover:text-white",
  },
  "web-design-dev": {
    hoverBg: "hover:bg-[#F0EBFF]",
    hoverBorder: "hover:border-purple-200/60",
    hoverText: "group-hover:text-purple-700",
    hoverIconBg: "group-hover:bg-purple-600",
    hoverIconText: "group-hover:text-white",
  },
  "content-marketing": {
    hoverBg: "hover:bg-[#EDFBF3]",
    hoverBorder: "hover:border-green-200/60",
    hoverText: "group-hover:text-green-700",
    hoverIconBg: "group-hover:bg-green-600",
    hoverIconText: "group-hover:text-white",
  },
  "ai-automation": {
    hoverBg: "hover:bg-[#E6FBFD]",
    hoverBorder: "hover:border-cyan-200/60",
    hoverText: "group-hover:text-cyan-700",
    hoverIconBg: "group-hover:bg-cyan-600",
    hoverIconText: "group-hover:text-white",
  },
  "china-sourcing": {
    hoverBg: "hover:bg-[#FFF9E6]",
    hoverBorder: "hover:border-amber-200/60",
    hoverText: "group-hover:text-amber-700",
    hoverIconBg: "group-hover:bg-amber-600",
    hoverIconText: "group-hover:text-white",
  },
};

export default function ServicesGrid() {
  const [data, setData] = useState<CloudHomepageData>({
    servicesEyebrow: "What We Do",
    servicesTitle: "Services built to scale.",
    servicesSubtitle: "A comprehensive suite of growth services designed to expand your visibility, drive qualified leads, and maximize return on investment.",
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
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Pre-selected popular items to label in the UI
  const popularSlugs = [
    "local-seo",
    "google-search-ads",
    "wordpress-development",
    "blog-writing",
    "workflow-automation",
    "product-sourcing"
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-transparent relative z-10 border-b border-neutral-100">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            {data.servicesEyebrow || "What We Do"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
            {data.servicesTitle || "Services built to scale."}
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-500 leading-relaxed">
            {data.servicesSubtitle || "A comprehensive suite of growth services designed to expand your visibility, drive qualified leads, and maximize return on investment."}
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesData.map((category) => {
            const Icon = (Icons[category.iconName as keyof typeof Icons] || Icons.HelpCircle) as React.ComponentType<{ className?: string }>;
            
            // Display only the first 4 sub-items on the homepage grid card
            const displayedSubItems = category.subItems.slice(0, 4);

            const styles = categoryStyles[category.slug] || {
              hoverBg: "hover:bg-neutral-50",
              hoverBorder: "hover:border-neutral-300",
              hoverText: "group-hover:text-primary",
              hoverIconBg: "group-hover:bg-primary",
              hoverIconText: "group-hover:text-white",
            };

            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                className={`group flex flex-col rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-premium ${styles.hoverBg} ${styles.hoverBorder}`}
              >
                {/* Header info */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary transition-all duration-500 shrink-0 ${styles.hoverIconBg} ${styles.hoverIconText}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className={`font-sans font-bold text-lg text-neutral-900 transition-colors duration-500 ${styles.hoverText}`}>
                      {category.title}
                    </h3>
                    <p className="font-sans text-xs text-neutral-400 mt-1 leading-snug">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Sub items links */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {displayedSubItems.map((sub) => {
                    const isPopular = popularSlugs.includes(sub.slug);
                    
                    return (
                      <li key={sub.slug} className="flex items-center justify-between">
                        <Link
                          href={`/services/${category.slug}#${sub.slug}`}
                          className="font-sans text-sm text-neutral-500 hover:text-primary flex items-center gap-1.5 transition-colors duration-300"
                        >
                          <Icons.ChevronRight className="h-3.5 w-3.5 text-neutral-300 group-hover:text-neutral-400 transition-colors duration-300" />
                          {sub.name}
                        </Link>
                        {isPopular && (
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 border border-emerald-100">
                            Popular
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* Card Action Link */}
                <div className="border-t border-neutral-100 pt-6 mt-auto">
                  <Link
                    href={`/services/${category.slug}`}
                    className="font-sans text-sm font-semibold text-primary hover:text-primary-hover flex items-center gap-2 group/btn"
                  >
                    View All Services
                    <Icons.ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover/btn:translate-x-1.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
