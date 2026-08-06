"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/services";
import { CloudHomepageData } from "@/types";

// Category-specific visual theme configurations
const categoryThemes: Record<
  string,
  {
    iconGradient: string;
    glowShadow: string;
    accentColor: string;
    badgeNumber: string;
    spotlightColor: string;
    borderHoverGradient: string;
    popularPillBg: string;
  }
> = {
  seo: {
    iconGradient: "from-blue-600 via-indigo-600 to-purple-600",
    glowShadow: "shadow-blue-500/25 group-hover:shadow-blue-500/45",
    accentColor: "text-blue-600",
    badgeNumber: ".01",
    spotlightColor: "rgba(59, 130, 246, 0.12)",
    borderHoverGradient: "from-blue-500/40 via-indigo-500/40 to-purple-500/40",
    popularPillBg: "bg-blue-50 text-blue-700 border-blue-100",
  },
  ppc: {
    iconGradient: "from-cyan-500 via-sky-600 to-blue-600",
    glowShadow: "shadow-cyan-500/25 group-hover:shadow-cyan-500/45",
    accentColor: "text-cyan-600",
    badgeNumber: ".02",
    spotlightColor: "rgba(6, 182, 212, 0.12)",
    borderHoverGradient: "from-cyan-500/40 via-sky-500/40 to-blue-500/40",
    popularPillBg: "bg-cyan-50 text-cyan-700 border-cyan-100",
  },
  "web-design-dev": {
    iconGradient: "from-indigo-600 via-purple-600 to-violet-600",
    glowShadow: "shadow-indigo-500/25 group-hover:shadow-indigo-500/45",
    accentColor: "text-indigo-600",
    badgeNumber: ".03",
    spotlightColor: "rgba(99, 102, 241, 0.12)",
    borderHoverGradient: "from-indigo-500/40 via-purple-500/40 to-violet-500/40",
    popularPillBg: "bg-indigo-50 text-indigo-700 border-indigo-100",
  },
  "content-marketing": {
    iconGradient: "from-purple-600 via-fuchsia-600 to-pink-600",
    glowShadow: "shadow-purple-500/25 group-hover:shadow-purple-500/45",
    accentColor: "text-purple-600",
    badgeNumber: ".04",
    spotlightColor: "rgba(168, 85, 247, 0.12)",
    borderHoverGradient: "from-purple-500/40 via-fuchsia-500/40 to-pink-500/40",
    popularPillBg: "bg-purple-50 text-purple-700 border-purple-100",
  },
  "ai-automation": {
    iconGradient: "from-blue-500 via-cyan-500 to-teal-500",
    glowShadow: "shadow-cyan-500/25 group-hover:shadow-cyan-500/45",
    accentColor: "text-teal-600",
    badgeNumber: ".05",
    spotlightColor: "rgba(20, 184, 166, 0.12)",
    borderHoverGradient: "from-blue-500/40 via-cyan-500/40 to-teal-500/40",
    popularPillBg: "bg-teal-50 text-teal-700 border-teal-100",
  },
  "china-sourcing": {
    iconGradient: "from-amber-500 via-orange-500 to-rose-600",
    glowShadow: "shadow-orange-500/25 group-hover:shadow-orange-500/45",
    accentColor: "text-orange-600",
    badgeNumber: ".06",
    spotlightColor: "rgba(245, 158, 11, 0.12)",
    borderHoverGradient: "from-amber-500/40 via-orange-500/40 to-rose-500/40",
    popularPillBg: "bg-amber-50 text-amber-700 border-amber-100",
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
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Pre-selected popular items to label in the UI
  const popularSlugs = [
    "local-seo",
    "google-search-ads",
    "wordpress-development",
    "blog-writing",
    "workflow-automation",
    "product-sourcing",
  ];

  return (
    <section
      id="services"
      className="py-24 lg:py-36 bg-gradient-to-b from-neutral-50/50 via-white to-neutral-50/30 relative z-10 border-b border-neutral-100/80 overflow-hidden"
    >
      {/* Background Ambient Glow & Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-blue-500/5 via-indigo-500/5 to-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-cyan-500/5 to-teal-500/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-35" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-neutral-200/80 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-[0.2em] shadow-sm mb-6 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            {data.servicesEyebrow || "What We Do"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-6 leading-[1.15]">
            {data.servicesTitle || "Services built to scale."}
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-500 leading-relaxed font-normal">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          {servicesData.map((category) => (
            <ServiceCardItem
              key={category.id}
              category={category}
              cardVariants={cardVariants}
              popularSlugs={popularSlugs}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface ServiceCardItemProps {
  category: typeof servicesData[number];
  cardVariants: Record<string, unknown>;
  popularSlugs: string[];
}

function ServiceCardItem({
  category,
  cardVariants,
  popularSlugs,
}: ServiceCardItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const Icon = (Icons[category.iconName as keyof typeof Icons] ||
    Icons.HelpCircle) as React.ComponentType<{ className?: string }>;

  const theme =
    categoryThemes[category.slug] || categoryThemes["seo"];

  const displayedSubItems = category.subItems.slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      variants={cardVariants as any}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-[2rem] bg-white/90 backdrop-blur-xl border border-neutral-200/80 p-8 shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] hover:border-transparent will-change-transform"
    >
      {/* Dynamic Animated Gradient Border on Hover */}
      <div
        className={`pointer-events-none absolute -inset-[1px] rounded-[2.05rem] bg-gradient-to-r ${theme.borderHoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
      />

      {/* Mouse Spotlight Layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 overflow-hidden"
        style={{
          background: isHovered
            ? `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.spotlightColor}, transparent 70%)`
            : "none",
        }}
      />

      {/* Top Floating Badge & Number Section */}
      <div className="flex items-center justify-between mb-8">
        {/* Floating Circular Gradient Icon Badge */}
        <div className="relative">
          {/* Ambient Glow behind Icon */}
          <div
            className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${theme.iconGradient} opacity-25 blur-lg transition-all duration-500 group-hover:opacity-60 group-hover:blur-xl`}
          />
          {/* Main Icon Container */}
          <div
            className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.iconGradient} text-white shadow-lg ${theme.glowShadow} transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3`}
          >
            <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-105" />
          </div>
        </div>

        {/* Watermark Number Badge (.01, .02...) */}
        <span className="font-mono text-2xl font-bold tracking-tight text-neutral-300/60 group-hover:text-neutral-400/80 transition-colors">
          {theme.badgeNumber}
        </span>
      </div>

      {/* Title & Description */}
      <div className="mb-6">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-snug group-hover:text-neutral-950 transition-colors">
          {category.title}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed font-normal">
          {category.description}
        </p>
      </div>

      {/* Sub items links */}
      <ul className="flex flex-col gap-3 mb-8 flex-1 border-t border-neutral-100/80 pt-6">
        {displayedSubItems.map((sub) => {
          const isPopular = popularSlugs.includes(sub.slug);

          return (
            <li key={sub.slug} className="flex items-center justify-between group/sub">
              <Link
                href={`/services/${category.slug}#${sub.slug}`}
                className="font-sans text-xs sm:text-sm text-neutral-600 hover:text-primary flex items-center gap-2 transition-colors duration-200"
              >
                <Icons.ChevronRight className="h-3.5 w-3.5 text-neutral-300 group-hover/sub:text-primary group-hover/sub:translate-x-0.5 transition-all duration-200" />
                <span className="font-medium">{sub.name}</span>
              </Link>
              {isPopular && (
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border shadow-2xs ${theme.popularPillBg}`}
                >
                  Popular
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {/* Card Footer Action */}
      <div className="border-t border-neutral-100/80 pt-5 mt-auto flex items-center justify-between">
        <Link
          href={`/services/${category.slug}`}
          className="group/btn relative inline-flex items-center gap-2.5 font-sans text-xs font-bold uppercase tracking-wider text-neutral-700 hover:text-primary transition-colors duration-300 py-1"
        >
          <span>View All Services</span>
          <Icons.ArrowRight className="h-4 w-4 text-neutral-400 group-hover/btn:text-primary group-hover/btn:translate-x-1.5 transition-all duration-300" />
          
          {/* Animated Gradient Underline */}
          <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-indigo-600 group-hover/btn:w-full transition-all duration-300 ease-out" />
        </Link>
      </div>
    </motion.div>
  );
}
