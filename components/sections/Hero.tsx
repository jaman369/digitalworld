"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { CloudHomepageData } from "@/lib/cloudSync";

export default function Hero() {
  const [data, setData] = useState<CloudHomepageData>({
    heroTagline: "Available for new projects · Based in Dhaka, Bangladesh",
    heroTitle: "Grow your business beyond borders.",
    heroSubtitle: "Digital World is a full-service digital marketing agency helping businesses in the USA, UK, Canada, UAE, Australia & beyond dominate search, ads, and the web — led by Kamrujjaman Mufti.",
    heroPrimaryCtaText: "Start a Project",
    heroPrimaryCtaLink: "/contact",
    heroSecondaryCtaText: "Explore Services",
    heroSecondaryCtaLink: "#services",
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

  const floatingBadges = [
    // Inner Orbit
    { text: "Local SEO", icon: Icons.Search, orbit: "inner", angle: 0, speed: 25, direction: "cw", color: "text-blue-600 bg-blue-50 border-blue-100" },
    { text: "SaaS SEO", icon: Icons.Layers, orbit: "inner", angle: 120, speed: 25, direction: "cw", color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { text: "Ecommerce SEO", icon: Icons.ShoppingBag, orbit: "inner", angle: 240, speed: 25, direction: "cw", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    
    // Middle Orbit
    { text: "WordPress", icon: Icons.Code, orbit: "mid", angle: 45, speed: 35, direction: "ccw", color: "text-sky-600 bg-sky-50 border-sky-100" },
    { text: "Shopify", icon: Icons.Store, orbit: "mid", angle: 165, speed: 35, direction: "ccw", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
    { text: "Web Design & Dev", icon: Icons.Monitor, orbit: "mid", angle: 285, speed: 35, direction: "ccw", color: "text-purple-600 bg-purple-50 border-purple-100" },
    
    // Outer Orbit
    { text: "Google Ads", icon: Icons.TrendingUp, orbit: "outer", angle: 15, speed: 45, direction: "cw", color: "text-amber-600 bg-amber-50 border-amber-100" },
    { text: "Facebook Ads", icon: Icons.Users, orbit: "outer", angle: 105, speed: 45, direction: "cw", color: "text-blue-700 bg-blue-50 border-blue-100" },
    { text: "Content Marketing", icon: Icons.PenTool, orbit: "outer", angle: 195, speed: 45, direction: "cw", color: "text-rose-600 bg-rose-50 border-rose-100" },
    { text: "Email Marketing", icon: Icons.Mail, orbit: "outer", angle: 285, speed: 45, direction: "cw", color: "text-violet-600 bg-violet-50 border-violet-100" },
  ];

  const badgeGlowColors: Record<string, string> = {
    "Local SEO": "rgba(59, 130, 246, 0.22)",
    "SaaS SEO": "rgba(99, 102, 241, 0.22)",
    "Ecommerce SEO": "rgba(16, 185, 129, 0.22)",
    "WordPress": "rgba(14, 165, 233, 0.22)",
    "Shopify": "rgba(4, 120, 87, 0.22)",
    "Web Design & Dev": "rgba(147, 51, 234, 0.22)",
    "Google Ads": "rgba(217, 119, 6, 0.22)",
    "Facebook Ads": "rgba(29, 78, 216, 0.22)",
    "Content Marketing": "rgba(225, 29, 72, 0.22)",
    "Email Marketing": "rgba(124, 58, 237, 0.22)",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-transparent pt-4 pb-0 lg:pt-6 lg:pb-0 flex flex-col justify-between h-[660px] lg:h-[720px]">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,118,255,0.05)_0%,transparent_60%)]" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10 flex-1 flex flex-col justify-start pt-12 lg:pt-16">
        {/* Main Content Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center flex flex-col items-center relative z-10 pointer-events-none"
        >
          {/* Eyebrow Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs font-semibold text-neutral-600 shadow-sm mb-4 pointer-events-auto"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {data.heroTagline || "Available for new projects · Based in Dhaka, Bangladesh"}
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1] mb-4 pointer-events-auto"
          >
            {data.heroTitle || "Grow your business beyond borders."}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base sm:text-lg text-neutral-500 leading-relaxed max-w-2xl mb-5 pointer-events-auto"
          >
            {data.heroSubtitle || "Digital World is a full-service digital marketing agency helping businesses in the USA, UK, Canada, UAE, Australia & beyond dominate search, ads, and the web — led by Kamrujjaman Mufti."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 w-full sm:w-auto pointer-events-auto"
          >
            <Link
              href={data.heroPrimaryCtaLink || "/contact"}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-8 py-4 font-sans text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {data.heroPrimaryCtaText || "Start a Project"} <Icons.ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={data.heroSecondaryCtaLink || "#services"}
              className="flex w-full sm:w-auto items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 px-8 py-4 font-sans text-sm font-semibold text-neutral-700 shadow-sm transition-all"
            >
              {data.heroSecondaryCtaText || "Explore Services"}
            </Link>
          </motion.div>

          {/* Mobile Badge Cloud */}
          <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl md:hidden mb-6 pointer-events-auto">
            {floatingBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-sm ${badge.color}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {badge.text}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Desktop Absolute Floating Badges & Orbit Tracks */}
        <div className="absolute inset-0 pointer-events-none hidden md:block select-none max-w-7xl mx-auto w-full h-full z-0">
          {/* Orbit Tracks */}
          <div className="absolute left-1/2 top-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neutral-200/25 pointer-events-none z-0 transition-all duration-300" 
               style={{ width: "calc(var(--radius-inner-x) * 2)", height: "calc(var(--radius-inner-y) * 2)" }} />
          <div className="absolute left-1/2 top-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neutral-200/25 pointer-events-none z-0 transition-all duration-300" 
               style={{ width: "calc(var(--radius-mid-x) * 2)", height: "calc(var(--radius-mid-y) * 2)" }} />
          <div className="absolute left-1/2 top-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neutral-200/25 pointer-events-none z-0 transition-all duration-300" 
               style={{ width: "calc(var(--radius-outer-x) * 2)", height: "calc(var(--radius-outer-y) * 2)" }} />

          {/* Orbiting Badges */}
          {floatingBadges.map((badge, idx) => {
            const Icon = badge.icon;
            const glowColor = badgeGlowColors[badge.text] || "rgba(0, 118, 255, 0.15)";
            
            return (
              <div
                key={idx}
                className={`absolute left-1/2 top-[290px] inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-premium cursor-pointer pointer-events-auto select-none transition-all duration-300 ${badge.color} orbit-badge`}
                style={{
                  "--radius-x": `var(--radius-${badge.orbit}-x)`,
                  "--radius-y": `var(--radius-${badge.orbit}-y)`,
                  "--glow-color": glowColor,
                  animationName: "orbit-ellipse",
                  animationDuration: `${badge.speed}s`,
                  animationDelay: `-${(badge.speed * (badge.angle / 360)).toFixed(2)}s`,
                  animationDirection: badge.direction === "ccw" ? "reverse" : "normal",
                } as React.CSSProperties}
              >
                <Icon className="h-4 w-4" />
                {badge.text}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
