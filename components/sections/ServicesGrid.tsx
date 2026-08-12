"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/services";
import { CloudHomepageData } from "@/types";

/* ── 6 Distinct Vibrant Per-Card Color Themes ── */
const cardThemes: Record<string, {
  badgeNumber: string;
  mainGrad: string;
  blobGrad: string;
  shadowColor: string;
  dot1Color: string;
  dot2Color: string;
  linkColor: string;
  linkHoverColor: string;
  popularBg: string;
}> = {
  seo: { // .01 - Sapphire Electric Blue
    badgeNumber: ".01",
    mainGrad: "from-[#2563EB] via-[#3B82F6] to-[#4F46E5]",
    blobGrad: "from-[#60A5FA] to-[#818CF8]",
    shadowColor: "rgba(37, 99, 235, 0.38)",
    dot1Color: "#2563EB",
    dot2Color: "#93C5FD",
    linkColor: "text-blue-600",
    linkHoverColor: "hover:text-blue-800",
    popularBg: "bg-blue-50 text-blue-600 border-blue-100",
  },
  ppc: { // .02 - Vibrant Cyan / Turquoise
    badgeNumber: ".02",
    mainGrad: "from-[#00C9A7] via-[#00B4D8] to-[#0077B6]",
    blobGrad: "from-[#38BDF8] to-[#2DD4BF]",
    shadowColor: "rgba(0, 180, 216, 0.38)",
    dot1Color: "#00B4D8",
    dot2Color: "#7DD3FC",
    linkColor: "text-cyan-600",
    linkHoverColor: "hover:text-cyan-800",
    popularBg: "bg-cyan-50 text-cyan-600 border-cyan-100",
  },
  "web-design-dev": { // .03 - Vivid Sunburst Coral / Orange
    badgeNumber: ".03",
    mainGrad: "from-[#FF5E62] via-[#FF7A59] to-[#FFB700]",
    blobGrad: "from-[#FF8C42] to-[#FFC72C]",
    shadowColor: "rgba(255, 94, 98, 0.4)",
    dot1Color: "#FF7A59",
    dot2Color: "#FDE047",
    linkColor: "text-orange-600",
    linkHoverColor: "hover:text-orange-800",
    popularBg: "bg-orange-50 text-orange-600 border-orange-100",
  },
  "content-marketing": { // .04 - Refreshing Emerald / Mint Green
    badgeNumber: ".04",
    mainGrad: "from-[#10B981] via-[#059669] to-[#047857]",
    blobGrad: "from-[#34D399] to-[#10B981]",
    shadowColor: "rgba(16, 185, 129, 0.38)",
    dot1Color: "#10B981",
    dot2Color: "#A7F3D0",
    linkColor: "text-emerald-600",
    linkHoverColor: "hover:text-emerald-800",
    popularBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  "ai-automation": { // .05 - Deep Royal Purple / Violet
    badgeNumber: ".05",
    mainGrad: "from-[#7C3AED] via-[#8B5CF6] to-[#A855F7]",
    blobGrad: "from-[#C084FC] to-[#8B5CF6]",
    shadowColor: "rgba(124, 58, 237, 0.38)",
    dot1Color: "#8B5CF6",
    dot2Color: "#E9D5FF",
    linkColor: "text-purple-600",
    linkHoverColor: "hover:text-purple-800",
    popularBg: "bg-purple-50 text-purple-600 border-purple-100",
  },
  "china-sourcing": { // .06 - Radiant Golden Amber / Rose
    badgeNumber: ".06",
    mainGrad: "from-[#F59E0B] via-[#F97316] to-[#E11D48]",
    blobGrad: "from-[#FBBF24] to-[#FB7185]",
    shadowColor: "rgba(249, 115, 22, 0.38)",
    dot1Color: "#F97316",
    dot2Color: "#FECDD3",
    linkColor: "text-amber-600",
    linkHoverColor: "hover:text-amber-800",
    popularBg: "bg-amber-50 text-amber-600 border-amber-100",
  },
};

/* ── Liquid Fluid Blob Number Badge Component ── */
function LiquidBlobBadge({ categorySlug }: { categorySlug: string }) {
  const theme = cardThemes[categorySlug] || cardThemes["seo"];

  return (
    <div className="relative w-22 h-22 sm:w-24 sm:h-24 flex items-center justify-center select-none group-hover:scale-105 transition-transform duration-300">
      {/* Far Back Translucent Soft White/Light Blob */}
      <div 
        className="absolute inset-0 bg-white/95 shadow-md blur-[1px]"
        style={{
          borderRadius: "45% 55% 65% 35% / 40% 60% 40% 60%",
          transform: "scale(1.18) rotate(-8deg)",
        }}
      />

      {/* Layer 2: Secondary Offset Fluid Blob */}
      <div 
        className={`absolute inset-0 bg-gradient-to-tr ${theme.blobGrad} opacity-90`}
        style={{
          borderRadius: "65% 35% 45% 55% / 55% 45% 55% 45%",
          transform: "scale(1.08) translate(5px, -3px) rotate(12deg)",
          filter: `drop-shadow(0 8px 16px ${theme.shadowColor})`,
        }}
      />

      {/* Layer 3: Main Front Liquid Gradient Circle */}
      <div 
        className={`relative z-10 w-[78px] h-[78px] sm:w-[84px] sm:h-[84px] flex items-center justify-center bg-gradient-to-br ${theme.mainGrad}`}
        style={{
          borderRadius: "50% 50% 45% 55% / 55% 45% 55% 45%",
          boxShadow: `0 10px 24px -4px ${theme.shadowColor}`,
        }}
      >
        <span className="text-white font-sans text-xl sm:text-2xl font-black tracking-tighter drop-shadow-sm">
          {theme.badgeNumber}
        </span>
      </div>

      {/* Floating Liquid Bubble Drop 1 */}
      <div 
        className="absolute -top-1.5 right-1 w-4 h-4 rounded-full opacity-90 transition-transform duration-300 group-hover:-translate-y-1"
        style={{
          backgroundColor: theme.dot1Color,
          borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%",
          boxShadow: `0 2px 6px ${theme.shadowColor}`,
        }}
      />

      {/* Floating Liquid Bubble Drop 2 */}
      <div 
        className="absolute -top-3 right-5 w-2.5 h-2.5 rounded-full opacity-80 transition-transform duration-300 group-hover:-translate-y-1.5"
        style={{
          backgroundColor: theme.dot2Color,
        }}
      />
    </div>
  );
}

export default function ServicesGrid() {
  const [data, setData] = useState<CloudHomepageData>({
    servicesEyebrow: "What We Do",
    servicesTitle: "Services built to scale.",
    servicesSubtitle:
      "A comprehensive suite of growth services designed to expand your visibility, drive qualified leads, and maximize return on investment.",
  });
  const [categories, setCategories] = useState(servicesData);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/homepage");
        if (res.ok) {
          const hp = await res.json();
          setData((prev) => ({ ...prev, ...hp }));
        }
      } catch {}

      try {
        const resSvc = await fetch("/api/services");
        if (resSvc.ok) {
          const svcs = await resSvc.json();
          if (Array.isArray(svcs) && svcs.length > 0) {
            setCategories(svcs);
          }
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
      className="pt-20 lg:pt-32 pb-10 lg:pb-12 bg-gradient-to-b from-[#f8f9fc] via-white to-[#f8f9fc] relative z-10 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e5ec_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-30" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-24">
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

        {/* Services Grid with generous vertical gap in the middle */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 lg:gap-x-8 gap-y-16 lg:gap-y-20 pt-6"
        >
          {categories.map((category) => {
            const theme = cardThemes[category.slug] || cardThemes["seo"];
            const displayedSubItems = category.subItems.slice(0, 4);

            return (
              <motion.div
                key={category.id}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                variants={cardVariants as any}
                className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/70 px-7 sm:px-8 pt-14 sm:pt-16 pb-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-neutral-200"
              >
                {/* ── Round Liquid Blob Badge FLOATING ON TOP OF THE CARD BOX ── */}
                <div className="absolute -top-11 left-7 sm:left-8 z-20">
                  <LiquidBlobBadge categorySlug={category.slug} />
                </div>

                {/* ── Title (Lowered to avoid any overlap) ── */}
                <h3 className="font-sans text-lg sm:text-[1.25rem] font-bold text-neutral-900 tracking-tight leading-snug mb-2">
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
