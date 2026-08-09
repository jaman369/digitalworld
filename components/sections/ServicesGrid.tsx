"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/services";
import { CloudHomepageData } from "@/types";

/* ── Per-card color themes matching the reference blob gradients ── */
const cardThemes: Record<string, {
  // Main circle gradient
  mainGradient: string;
  // Secondary blob gradient (offset behind)
  blobGradient: string;
  // Small accent dot color
  dotColor: string;
  // READ MORE link color
  linkColor: string;
  linkHoverColor: string;
  // Popular pill
  popularBg: string;
  // Number
  badgeNumber: string;
}> = {
  seo: {
    mainGradient: "from-blue-500 via-indigo-500 to-purple-600",
    blobGradient: "from-blue-400/60 to-purple-400/50",
    dotColor: "bg-blue-400",
    linkColor: "text-indigo-600",
    linkHoverColor: "hover:text-indigo-800",
    popularBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
    badgeNumber: ".01",
  },
  ppc: {
    mainGradient: "from-teal-400 via-cyan-500 to-blue-500",
    blobGradient: "from-teal-300/60 to-cyan-400/50",
    dotColor: "bg-teal-400",
    linkColor: "text-teal-600",
    linkHoverColor: "hover:text-teal-800",
    popularBg: "bg-teal-50 text-teal-600 border-teal-100",
    badgeNumber: ".02",
  },
  "web-design-dev": {
    mainGradient: "from-orange-400 via-rose-500 to-red-500",
    blobGradient: "from-orange-300/60 to-rose-400/50",
    dotColor: "bg-orange-400",
    linkColor: "text-orange-600",
    linkHoverColor: "hover:text-orange-800",
    popularBg: "bg-orange-50 text-orange-600 border-orange-100",
    badgeNumber: ".03",
  },
  "content-marketing": {
    mainGradient: "from-emerald-400 via-teal-500 to-cyan-500",
    blobGradient: "from-emerald-300/60 to-teal-400/50",
    dotColor: "bg-emerald-400",
    linkColor: "text-emerald-600",
    linkHoverColor: "hover:text-emerald-800",
    popularBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    badgeNumber: ".04",
  },
  "ai-automation": {
    mainGradient: "from-violet-500 via-purple-500 to-indigo-600",
    blobGradient: "from-violet-400/60 to-purple-400/50",
    dotColor: "bg-violet-400",
    linkColor: "text-violet-600",
    linkHoverColor: "hover:text-violet-800",
    popularBg: "bg-violet-50 text-violet-600 border-violet-100",
    badgeNumber: ".05",
  },
  "china-sourcing": {
    mainGradient: "from-amber-400 via-orange-500 to-rose-500",
    blobGradient: "from-amber-300/60 to-orange-400/50",
    dotColor: "bg-amber-500",
    linkColor: "text-amber-600",
    linkHoverColor: "hover:text-amber-800",
    popularBg: "bg-amber-50 text-amber-600 border-amber-100",
    badgeNumber: ".06",
  },
};

export default function ServicesGrid() {
  const [data, setData] = useState<CloudHomepageData>({
    servicesEyebrow: "What We Do",
    servicesTitle: "Services built to scale.",
    servicesSubtitle:
      "A comprehensive suite of growth services designed to expand your visibility, drive qualified leads, and maximize return on investment.",
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const popularSlugs = [
    "local-seo",
    "google-search-ads",
    "website-design-ui-ux",
    "blog-writing",
    "workflow-automation",
    "product-sourcing",
  ];

  return (
    <section
      id="services"
      className="py-20 lg:py-32 bg-gradient-to-b from-[#f8f9fc] via-white to-[#f8f9fc] relative z-10 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e5ec_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-30" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.25em] mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {data.servicesEyebrow || "What We Do"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 tracking-tight mb-5 leading-[1.2]">
            {data.servicesTitle || "Services built to scale."}
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed max-w-2xl mx-auto">
            {data.servicesSubtitle ||
              "A comprehensive suite of growth services designed to expand your visibility, drive qualified leads, and maximize return on investment."}
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8"
        >
          {servicesData.map((category) => {
            const theme = cardThemes[category.slug] || cardThemes["seo"];
            const displayedSubItems = category.subItems.slice(0, 4);

            return (
              <motion.div
                key={category.id}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                variants={cardVariants as any}
                className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/70 px-7 pt-0 pb-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-neutral-200"
              >
                {/* ── Floating Blob Number Badge ── */}
                <div className="relative h-24 flex items-end justify-start -mt-1 mb-1">
                  {/* Back blob (larger, offset, lighter) */}
                  <div
                    className={`absolute left-6 -top-3 w-[70px] h-[70px] rounded-full bg-gradient-to-br ${theme.blobGradient} blur-sm opacity-70 group-hover:opacity-90 transition-opacity duration-300`}
                  />
                  {/* Secondary small blob */}
                  <div
                    className={`absolute left-16 top-0 w-[32px] h-[32px] rounded-full bg-gradient-to-br ${theme.blobGradient} blur-[2px] opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
                  />
                  {/* Main circle with number */}
                  <div
                    className={`relative z-10 flex items-center justify-center w-[80px] h-[80px] rounded-full bg-gradient-to-br ${theme.mainGradient} shadow-lg group-hover:scale-105 transition-transform duration-300`}
                  >
                    <span className="text-white font-mono text-2xl font-bold tracking-tight select-none">
                      {theme.badgeNumber}
                    </span>
                  </div>
                  {/* Small decorative dots */}
                  <div className={`absolute left-[88px] top-[10px] w-2 h-2 rounded-full ${theme.dotColor} opacity-70`} />
                  <div className={`absolute left-[78px] top-[2px] w-1.5 h-1.5 rounded-full ${theme.dotColor} opacity-50`} />
                </div>

                {/* ── Title ── */}
                <h3 className="font-sans text-lg font-bold text-neutral-900 tracking-tight leading-snug mb-1.5">
                  {category.title}
                </h3>

                {/* ── Description ── */}
                <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-5">
                  {category.description}
                </p>

                {/* ── Sub-item links ── */}
                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {displayedSubItems.map((sub) => {
                    const isPopular = popularSlugs.includes(sub.slug);
                    return (
                      <li key={sub.slug} className="flex items-center justify-between">
                        <Link
                          href={`/services/${category.slug}#${sub.slug}`}
                          className="font-sans text-[13px] text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 transition-colors duration-200"
                        >
                          <Icons.ChevronRight className="h-3 w-3 text-neutral-300 shrink-0" />
                          {sub.name}
                        </Link>
                        {isPopular && (
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${theme.popularBg}`}>
                            Popular
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* ── READ MORE link ── */}
                <div className="mt-auto">
                  <Link
                    href={`/services/${category.slug}`}
                    className={`group/link inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-widest ${theme.linkColor} ${theme.linkHoverColor} transition-colors duration-200`}
                  >
                    Read More
                    <Icons.Play className="h-2.5 w-2.5 fill-current group-hover/link:translate-x-0.5 transition-transform duration-200" />
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
