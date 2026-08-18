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
    // Inner Orbit: R = 190px, speed = 25s, clockwise
    { text: "Local SEO", icon: Icons.Search, orbit: "inner", angle: 0, speed: 25, direction: "cw", color: "text-blue-600 bg-blue-50 border-blue-100" },
    { text: "SaaS SEO", icon: Icons.Layers, orbit: "inner", angle: 120, speed: 25, direction: "cw", color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { text: "Ecommerce SEO", icon: Icons.ShoppingBag, orbit: "inner", angle: 240, speed: 25, direction: "cw", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    
    // Middle Orbit: R = 290px, speed = 35s, counter-clockwise
    { text: "WordPress", icon: Icons.Code, orbit: "mid", angle: 45, speed: 35, direction: "ccw", color: "text-sky-600 bg-sky-50 border-sky-100" },
    { text: "Shopify", icon: Icons.Store, orbit: "mid", angle: 165, speed: 35, direction: "ccw", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
    { text: "Web Design & Dev", icon: Icons.Monitor, orbit: "mid", angle: 285, speed: 35, direction: "ccw", color: "text-purple-600 bg-purple-50 border-purple-100" },
    
    // Outer Orbit: R = 395px, speed = 45s, clockwise
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

  const countries = [
    { name: "USA", flag: "/Flag emoji/United States.svg" },
    { name: "UK", flag: "/Flag emoji/United Kingdom.svg" },
    { name: "Canada", flag: "/Flag emoji/Canada.svg" },
    { name: "Australia", flag: "/Flag emoji/Australia.svg" },
    { name: "UAE", flag: "/Flag emoji/UAE.svg" },
    { name: "Ireland", flag: "/Flag emoji/Ireland.svg" },
    { name: "Bangladesh", flag: "/Flag emoji/Bangladesh.svg" },
  ];

  // Stagger wrapper for entry animations
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
    <section className="relative overflow-hidden bg-transparent pt-4 pb-0 lg:pt-6 lg:pb-0 flex flex-col justify-between min-h-[580px] sm:min-h-[640px] lg:h-[720px]">
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

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10 flex-1 flex flex-col justify-start pt-10 sm:pt-12 lg:pt-16">
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
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50/90 px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold text-neutral-600 shadow-xs mb-4 pointer-events-auto max-w-[92vw]"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate">{data.heroTagline || "Available for new projects · Based in Dhaka, Bangladesh"}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.15] sm:leading-[1.1] mb-4 pointer-events-auto"
          >
            {data.heroTitle ? (
              data.heroTitle.includes("beyond borders") ? (
                <>
                  Grow your business<br />
                  <span className="text-primary italic font-medium">beyond borders.</span>
                </>
              ) : (
                data.heroTitle
              )
            ) : (
              <>
                Grow your business<br />
                <span className="text-primary italic font-medium">beyond borders.</span>
              </>
            )}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-xs sm:text-base md:text-lg text-neutral-500 leading-relaxed max-w-2xl mb-5 pointer-events-auto px-2"
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
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-7 sm:px-8 py-3.5 sm:py-4 font-sans text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {data.heroPrimaryCtaText || "Start a Project"} <Icons.ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={data.heroSecondaryCtaLink || "#services"}
              className="flex w-full sm:w-auto items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 px-7 sm:px-8 py-3.5 sm:py-4 font-sans text-sm font-semibold text-neutral-700 shadow-sm transition-all"
            >
              {data.heroSecondaryCtaText || "Explore Services"}
            </a>
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

      {/* Rotating Marquee Banner */}
      <div className="relative mt-auto border-y border-neutral-100 bg-transparent py-5 overflow-hidden">
        <div className="flex w-[200%] animate-marquee">
          {/* Double list to create seamless infinite scroll loop */}
          {[...countries, ...countries, ...countries, ...countries].map((country, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-2.5 mx-12 shrink-0 select-none"
            >
              <div className="relative h-4 w-6 overflow-hidden rounded border border-neutral-200">
                <Image
                  src={country.flag}
                  alt={country.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-sans text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                {country.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scoped CSS Inject for Orbit Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --radius-inner-x: 430px;
          --radius-inner-y: 250px;
          --radius-mid-x: 530px;
          --radius-mid-y: 265px;
          --radius-outer-x: 630px;
          --radius-outer-y: 278px;
          --badge-scale: 1;
        }

        @media (max-width: 1400px) {
          :root {
            --radius-inner-x: 390px;
            --radius-inner-y: 240px;
            --radius-mid-x: 480px;
            --radius-mid-y: 255px;
            --radius-outer-x: 570px;
            --radius-outer-y: 268px;
            --badge-scale: 0.9;
          }
        }

        @media (max-width: 1200px) {
          :root {
            --radius-inner-x: 350px;
            --radius-inner-y: 230px;
            --radius-mid-x: 430px;
            --radius-mid-y: 245px;
            --radius-outer-x: 510px;
            --radius-outer-y: 258px;
            --badge-scale: 0.8;
          }
        }

        @media (max-width: 991px) {
          :root {
            --radius-inner-x: 300px;
            --radius-inner-y: 220px;
            --radius-mid-x: 370px;
            --radius-mid-y: 235px;
            --radius-outer-x: 440px;
            --radius-outer-y: 248px;
            --badge-scale: 0.7;
          }
        }

        .orbit-badge {
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          transform-origin: center center;
          will-change: transform;
          scale: var(--badge-scale, 1);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03), 0 0 10px var(--glow-color);
          transition: scale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease !important;
        }

        .orbit-badge:hover {
          animation-play-state: paused !important;
          scale: calc(var(--badge-scale, 1) * 1.08) !important;
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
