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

  const floatingBadges = [
    // Inner Orbit: R_x = 500px, R_y = 200px, speed = 25s, clockwise
    { text: "Local SEO", icon: Icons.Search, orbit: "inner", angle: 0, speed: 25, direction: "cw", color: "text-blue-600 bg-blue-50/90 border-blue-200" },
    { text: "SaaS SEO", icon: Icons.Layers, orbit: "inner", angle: 120, speed: 25, direction: "cw", color: "text-indigo-600 bg-indigo-50/90 border-indigo-200" },
    { text: "Ecommerce SEO", icon: Icons.ShoppingBag, orbit: "inner", angle: 240, speed: 25, direction: "cw", color: "text-emerald-600 bg-emerald-50/90 border-emerald-200" },
    
    // Middle Orbit: R_x = 600px, R_y = 230px, speed = 35s, counter-clockwise
    { text: "WordPress", icon: Icons.Code, orbit: "mid", angle: 45, speed: 35, direction: "ccw", color: "text-sky-600 bg-sky-50/90 border-sky-200" },
    { text: "Shopify", icon: Icons.Store, orbit: "mid", angle: 165, speed: 35, direction: "ccw", color: "text-emerald-700 bg-emerald-50/90 border-emerald-200" },
    { text: "Web Design & Dev", icon: Icons.Monitor, orbit: "mid", angle: 285, speed: 35, direction: "ccw", color: "text-purple-600 bg-purple-50/90 border-purple-200" },
    
    // Outer Orbit: R_x = 700px, R_y = 260px, speed = 45s, clockwise
    { text: "Google Ads", icon: Icons.TrendingUp, orbit: "outer", angle: 15, speed: 45, direction: "cw", color: "text-amber-600 bg-amber-50/90 border-amber-200" },
    { text: "Facebook Ads", icon: Icons.Users, orbit: "outer", angle: 105, speed: 45, direction: "cw", color: "text-blue-700 bg-blue-50/90 border-blue-200" },
    { text: "Content Marketing", icon: Icons.PenTool, orbit: "outer", angle: 195, speed: 45, direction: "cw", color: "text-rose-600 bg-rose-50/90 border-rose-200" },
    { text: "Email Marketing", icon: Icons.Mail, orbit: "outer", angle: 285, speed: 45, direction: "cw", color: "text-violet-600 bg-violet-50/90 border-violet-200" },
  ];

  const badgeGlowColors: Record<string, string> = {
    "Local SEO": "rgba(59, 130, 246, 0.18)",
    "SaaS SEO": "rgba(99, 102, 241, 0.18)",
    "Ecommerce SEO": "rgba(16, 185, 129, 0.18)",
    "WordPress": "rgba(14, 165, 233, 0.18)",
    "Shopify": "rgba(4, 120, 87, 0.18)",
    "Web Design & Dev": "rgba(147, 51, 234, 0.18)",
    "Google Ads": "rgba(217, 119, 6, 0.18)",
    "Facebook Ads": "rgba(29, 78, 216, 0.18)",
    "Content Marketing": "rgba(225, 29, 72, 0.18)",
    "Email Marketing": "rgba(124, 58, 237, 0.18)",
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
    <section className="relative overflow-hidden bg-transparent pt-4 pb-0 lg:pt-6 lg:pb-0 flex flex-col justify-between min-h-[580px] sm:min-h-[640px] lg:h-[700px]">
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

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10 flex-1 flex flex-col justify-start pt-8 sm:pt-10 lg:pt-14">
        {/* Main Content Layout (Higher Z-Index so text remains crisp and unblocked) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center flex flex-col items-center relative z-20 pointer-events-none"
        >
          {/* Eyebrow Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 backdrop-blur-xs px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold text-neutral-600 shadow-2xs mb-4 pointer-events-auto max-w-[92vw]"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate">{data.heroTagline || "Available for new projects · Based in Dhaka, Bangladesh"}</span>
          </motion.div>

          {/* Headline (Balanced Font Scaling to avoid text collision) */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.12] sm:leading-[1.1] mb-4 pointer-events-auto"
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
            className="font-sans text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed max-w-xl mb-6 pointer-events-auto px-2"
          >
            {data.heroSubtitle || "Digital World is a full-service digital marketing agency helping businesses in the USA, UK, Canada, UAE, Australia & beyond dominate search, ads, and the web — led by Kamrujjaman Mufti."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 w-full sm:w-auto pointer-events-auto px-4 sm:px-0"
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

          {/* Mobile Badge Cloud */}
          <div className="flex flex-wrap justify-center gap-2 max-w-xl md:hidden mb-6 pointer-events-auto">
            {floatingBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold shadow-2xs ${badge.color}`}
                >
                  <Icon className="h-3 w-3" />
                  {badge.text}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Desktop Absolute Floating Badges & Orbit Tracks (Wider Radii so badges orbit OUTSIDE text area) */}
        <div className="absolute inset-0 pointer-events-none hidden md:block select-none max-w-7xl mx-auto w-full h-full z-10">
          {/* Orbit Tracks */}
          <div className="absolute left-1/2 top-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neutral-200/30 pointer-events-none z-0 transition-all duration-300" 
               style={{ width: "calc(var(--radius-inner-x) * 2)", height: "calc(var(--radius-inner-y) * 2)" }} />
          <div className="absolute left-1/2 top-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neutral-200/30 pointer-events-none z-0 transition-all duration-300" 
               style={{ width: "calc(var(--radius-mid-x) * 2)", height: "calc(var(--radius-mid-y) * 2)" }} />
          <div className="absolute left-1/2 top-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neutral-200/30 pointer-events-none z-0 transition-all duration-300" 
               style={{ width: "calc(var(--radius-outer-x) * 2)", height: "calc(var(--radius-outer-y) * 2)" }} />

          {/* Orbiting Badges */}
          {floatingBadges.map((badge, idx) => {
            const Icon = badge.icon;
            const glowColor = badgeGlowColors[badge.text] || "rgba(0, 118, 255, 0.15)";
            
            return (
              <div
                key={idx}
                className={`absolute left-1/2 top-[280px] inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-premium cursor-pointer pointer-events-auto select-none transition-all duration-300 ${badge.color} orbit-badge`}
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
                <Icon className="h-3.5 w-3.5" />
                {badge.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* Rotating Marquee Banner */}
      <div className="relative mt-auto border-y border-neutral-100 bg-transparent py-4 overflow-hidden">
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

      {/* Scoped CSS Inject for Orbit Animations (Wider X Radii & Responsive Flattening so ZERO Overlap with Headline Text) */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --radius-inner-x: 500px;
          --radius-inner-y: 200px;
          --radius-mid-x: 600px;
          --radius-mid-y: 230px;
          --radius-outer-x: 700px;
          --radius-outer-y: 260px;
          --badge-scale: 0.95;
        }

        @media (max-width: 991px) {
          :root {
            --radius-inner-x: 330px;
            --radius-inner-y: 160px;
            --radius-mid-x: 390px;
            --radius-mid-y: 175px;
            --radius-outer-x: 450px;
            --radius-outer-y: 190px;
            --badge-scale: 0.7;
          }
        }

        .orbit-badge {
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          transform-origin: center center;
          will-change: transform;
          scale: var(--badge-scale, 0.95);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03), 0 0 10px var(--glow-color);
          transition: scale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease !important;
        }

        .orbit-badge:hover {
          animation-play-state: paused !important;
          scale: calc(var(--badge-scale, 0.95) * 1.08) !important;
          box-shadow: 0 12px 35px -5px var(--glow-color), 0 0 20px var(--glow-color) !important;
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
