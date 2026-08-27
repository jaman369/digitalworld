"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { CloudHomepageData } from "@/types";

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

  /* ── 10 Required Services Allocated Across 3 Concentric Cosmic Solar System Orbits ── */
  const orbitalPlanets = [
    // ── Inner Solar Orbit Ring (3 Planets) ──
    { text: "Shopify", icon: Icons.Store, orbit: "inner", angle: 30, speed: 32, direction: "cw", color: "text-emerald-700 bg-emerald-50/95 border-emerald-300/80 shadow-emerald-500/10" },
    { text: "Local SEO", icon: Icons.Search, orbit: "inner", angle: 150, speed: 32, direction: "cw", color: "text-blue-600 bg-blue-50/95 border-blue-300/80 shadow-blue-500/10" },
    { text: "WordPress", icon: Icons.Code, orbit: "inner", angle: 270, speed: 32, direction: "cw", color: "text-sky-600 bg-sky-50/95 border-sky-300/80 shadow-sky-500/10" },

    // ── Middle Solar Orbit Ring (3 Planets) ──
    { text: "Web Design & Dev", icon: Icons.Monitor, orbit: "mid", angle: 60, speed: 42, direction: "ccw", color: "text-purple-600 bg-purple-50/95 border-purple-300/80 shadow-purple-500/10" },
    { text: "Ecommerce SEO", icon: Icons.ShoppingBag, orbit: "mid", angle: 180, speed: 42, direction: "ccw", color: "text-teal-600 bg-teal-50/95 border-teal-300/80 shadow-teal-500/10" },
    { text: "SaaS SEO", icon: Icons.Layers, orbit: "mid", angle: 300, speed: 42, direction: "ccw", color: "text-indigo-600 bg-indigo-50/95 border-indigo-300/80 shadow-indigo-500/10" },

    // ── Outer Solar Orbit Ring (4 Planets) ──
    { text: "Google Ads", icon: Icons.TrendingUp, orbit: "outer", angle: 15, speed: 52, direction: "cw", color: "text-amber-600 bg-amber-50/95 border-amber-300/80 shadow-amber-500/10" },
    { text: "Facebook Ads", icon: Icons.Users, orbit: "outer", angle: 105, speed: 52, direction: "cw", color: "text-blue-700 bg-blue-50/95 border-blue-300/80 shadow-blue-500/10" },
    { text: "Content Marketing", icon: Icons.PenTool, orbit: "outer", angle: 195, speed: 52, direction: "cw", color: "text-rose-600 bg-rose-50/95 border-rose-300/80 shadow-rose-500/10" },
    { text: "Email Marketing", icon: Icons.Mail, orbit: "outer", angle: 285, speed: 52, direction: "cw", color: "text-violet-600 bg-violet-50/95 border-violet-300/80 shadow-violet-500/10" },
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

  const countries = [
    { name: "USA", flag: "/Flag emoji/United States.svg" },
    { name: "UK", flag: "/Flag emoji/United Kingdom.svg" },
    { name: "Canada", flag: "/Flag emoji/Canada.svg" },
    { name: "Australia", flag: "/Flag emoji/Australia.svg" },
    { name: "UAE", flag: "/Flag emoji/UAE.svg" },
    { name: "Ireland", flag: "/Flag emoji/Ireland.svg" },
    { name: "Bangladesh", flag: "/Flag emoji/Bangladesh.svg" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-transparent pt-4 pb-0 lg:pt-6 lg:pb-0 flex flex-col justify-between min-h-[580px] sm:min-h-[620px] lg:h-[650px] xl:h-[730px]">
      {/* Background design image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Background design"
          fill
          priority
          className="object-cover object-center pointer-events-none select-none opacity-90"
          sizes="100vw"
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10 flex-1 flex flex-col justify-center items-center">
        {/* Main Hero Content (Positioned in EXACT DEAD CENTER position of the banner) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-2xl text-center flex flex-col items-center justify-center relative z-30 pointer-events-none my-auto"
        >
          {/* Eyebrow Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200/90 bg-white/95 backdrop-blur-md px-4 py-1.5 text-[11px] sm:text-xs font-semibold text-neutral-600 shadow-xs mb-3.5 sm:mb-4 pointer-events-auto max-w-[92vw]"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate">{data.heroTagline || "Available for new projects · Based in Dhaka, Bangladesh"}</span>
          </motion.div>

          {/* Headline (Preserved Exact Title & Formatting with Centered Banner Position) */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.12] sm:leading-[1.1] mb-3 sm:mb-4 pointer-events-auto drop-shadow-2xs"
          >
            {data.heroTitle ? (
              data.heroTitle.includes("beyond borders") ? (
                <>
                  Grow your business<br />
                  <span className="text-blue-600 italic font-medium">beyond borders.</span>
                </>
              ) : (
                data.heroTitle
              )
            ) : (
              <>
                Grow your business<br />
                <span className="text-blue-600 italic font-medium">beyond borders.</span>
              </>
            )}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed max-w-lg mb-5 sm:mb-6 pointer-events-auto px-2"
          >
            {data.heroSubtitle || "Digital World is a full-service digital marketing agency helping businesses in the USA, UK, Canada, UAE, Australia & beyond dominate search, ads, and the web — led by Kamrujjaman Mufti."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6 w-full sm:w-auto pointer-events-auto px-4 sm:px-0"
          >
            <Link
              href={data.heroPrimaryCtaLink || "/contact"}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-7 sm:px-8 py-3.5 font-sans text-xs sm:text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {data.heroPrimaryCtaText || "Start a Project"} <Icons.ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={data.heroSecondaryCtaLink || "#services"}
              className="flex w-full sm:w-auto items-center justify-center rounded-full border border-neutral-200 bg-white/90 hover:bg-white px-7 sm:px-8 py-3.5 font-sans text-xs sm:text-sm font-semibold text-neutral-700 shadow-2xs transition-all"
            >
              {data.heroSecondaryCtaText || "Explore Services"}
            </a>
          </motion.div>

          {/* Mobile Service Pill Cloud (Renders below CTAs on mobile screens with zero text overlap) */}
          <div className="flex flex-wrap justify-center gap-2 max-w-xl md:hidden mb-6 pointer-events-auto">
            {orbitalPlanets.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold backdrop-blur-md shadow-xs ${badge.color}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {badge.text}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Desktop Concentric Solar-System Planetary Orbits (Centered 100% Dead-Center with Banner) */}
        <div className="absolute inset-0 pointer-events-none hidden md:block select-none max-w-7xl mx-auto w-full h-full z-10">
          
          {/* Revolving Planets (Service Badges) - Centered Orbit Motion */}
          {orbitalPlanets.map((badge, idx) => {
            const Icon = badge.icon;
            const glowColor = badgeGlowColors[badge.text] || "rgba(0, 118, 255, 0.22)";
            
            return (
              <div
                key={idx}
                className={`absolute left-1/2 top-[47%] inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold backdrop-blur-md shadow-md hover:shadow-xl cursor-pointer pointer-events-auto select-none transition-all duration-300 ${badge.color} orbit-badge`}
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
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {badge.text}
              </div>
            );
          })}

        </div>
      </div>

      {/* Rotating Marquee Banner */}
      <div className="relative mt-auto border-y border-neutral-100 bg-transparent py-3.5 sm:py-4 overflow-hidden">
        <div className="flex w-[200%] animate-marquee">
          {[...countries, ...countries, ...countries, ...countries].map((country, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-2.5 mx-10 shrink-0 select-none"
            >
              <div className="relative h-3.5 w-5 overflow-hidden rounded border border-neutral-200">
                <Image
                  src={country.flag}
                  alt={country.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-sans text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">
                {country.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scoped CSS Inject for Concentric Solar Orbit Motion with Line-Free Clean Aesthetics */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Large PC Desktop Monitors (1440px+) ── */
        :root {
          --radius-inner-x: 540px;
          --radius-inner-y: 240px;
          --radius-mid-x: 660px;
          --radius-mid-y: 275px;
          --radius-outer-x: 780px;
          --radius-outer-y: 310px;
          --badge-scale: 0.95;
        }

        /* ── Standard Laptops & 1366x768 / 1440x900 Monitors (1024px – 1439px) ── */
        @media (min-width: 1024px) and (max-width: 1439px) {
          :root {
            --radius-inner-x: 440px;
            --radius-inner-y: 205px;
            --radius-mid-x: 520px;
            --radius-mid-y: 235px;
            --radius-outer-x: 600px;
            --radius-outer-y: 265px;
            --badge-scale: 0.84;
          }
        }

        /* ── Tablets (768px – 1023px) ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          :root {
            --radius-inner-x: 370px;
            --radius-inner-y: 175px;
            --radius-mid-x: 440px;
            --radius-mid-y: 200px;
            --radius-outer-x: 510px;
            --radius-outer-y: 225px;
            --badge-scale: 0.78;
          }
        }

        .orbit-badge {
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          transform-origin: center center;
          will-change: transform;
          scale: var(--badge-scale, 0.95);
          box-shadow: 0 6px 18px -2px rgba(0, 0, 0, 0.05), 0 0 16px var(--glow-color);
          transition: scale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease !important;
        }

        .orbit-badge:hover {
          animation-play-state: paused !important;
          scale: calc(var(--badge-scale, 0.95) * 1.1) !important;
          box-shadow: 0 12px 35px -5px var(--glow-color), 0 0 24px var(--glow-color) !important;
          z-index: 50;
        }

        @keyframes orbit-ellipse {
          0% { transform: translate(-50%, -50%) translate(calc(var(--radius-x)), 0); }
          6.25% { transform: translate(-50%, -50%) translate(calc(0.9239 * var(--radius-x)), calc(0.3827 * var(--radius-y))); }
          12.5% { transform: translate(-50%, -50%) translate(calc(0.7071 * var(--radius-x)), calc(0.7071 * var(--radius-y))); }
          18.75% { transform: translate(-50%, -50%) translate(calc(0.3827 * var(--radius-x)), calc(0.9239 * var(--radius-y))); }
          25% { transform: translate(-50%, -50%) translate(0, calc(var(--radius-y))); }
          31.25% { transform: translate(-50%, -50%) translate(calc(-0.3827 * var(--radius-x)), calc(0.9239 * var(--radius-y))); }
          37.5% { transform: translate(-50%, -50%) translate(calc(-0.7071 * var(--radius-x)), calc(0.7071 * var(--radius-y))); }
          43.75% { transform: translate(-50%, -50%) translate(calc(-0.9239 * var(--radius-x)), calc(0.3827 * var(--radius-y))); }
          50% { transform: translate(-50%, -50%) translate(calc(-1 * var(--radius-x)), 0); }
          56.25% { transform: translate(-50%, -50%) translate(calc(-0.9239 * var(--radius-x)), calc(-0.3827 * var(--radius-y))); }
          62.5% { transform: translate(-50%, -50%) translate(calc(-0.7071 * var(--radius-x)), calc(-0.7071 * var(--radius-y))); }
          68.75% { transform: translate(-50%, -50%) translate(calc(-0.3827 * var(--radius-x)), calc(-0.9239 * var(--radius-y))); }
          75% { transform: translate(-50%, -50%) translate(0, calc(-1 * var(--radius-y))); }
          81.25% { transform: translate(-50%, -50%) translate(calc(0.3827 * var(--radius-x)), calc(-0.9239 * var(--radius-y))); }
          87.5% { transform: translate(-50%, -50%) translate(calc(0.7071 * var(--radius-x)), calc(-0.7071 * var(--radius-y))); }
          93.75% { transform: translate(-50%, -50%) translate(calc(0.9239 * var(--radius-x)), calc(-0.3827 * var(--radius-y))); }
          100% { transform: translate(-50%, -50%) translate(calc(var(--radius-x)), 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-badge {
            animation: none !important;
            transform: translate(-50%, -50%) translate(calc(var(--radius-x)), 0) !important;
          }
        }
      `}} />
    </section>
  );
}
