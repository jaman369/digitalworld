"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

export default function Hero() {
  const floatingBadges = [
    { text: "Local SEO", icon: Icons.Search, x: "-35%", y: "-80px", color: "text-blue-600 bg-blue-50 border-blue-100" },
    { text: "Ecommerce SEO", icon: Icons.ShoppingBag, x: "32%", y: "-100px", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { text: "SaaS SEO", icon: Icons.Layers, x: "-38%", y: "40px", color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { text: "Web Design & Dev", icon: Icons.Monitor, x: "38%", y: "60px", color: "text-purple-600 bg-purple-50 border-purple-100" },
    { text: "WordPress", icon: Icons.Code, x: "-24%", y: "160px", color: "text-sky-600 bg-sky-50 border-sky-100" },
    { text: "Shopify", icon: Icons.Store, x: "24%", y: "200px", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
    { text: "Google Ads", icon: Icons.TrendingUp, x: "-32%", y: "-200px", color: "text-amber-600 bg-amber-50 border-amber-100" },
    { text: "Facebook Ads", icon: Icons.Users, x: "28%", y: "-220px", color: "text-blue-700 bg-blue-50 border-blue-100" },
    { text: "Content Marketing", icon: Icons.PenTool, x: "-10%", y: "260px", color: "text-rose-600 bg-rose-50 border-rose-100" },
    { text: "Email Marketing", icon: Icons.Mail, x: "12%", y: "-280px", color: "text-violet-600 bg-violet-50 border-violet-100" },
  ];

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
    <section className="relative overflow-hidden bg-white py-20 lg:py-32 flex flex-col justify-center min-h-[calc(100vh-80px)]">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,118,255,0.05)_0%,transparent_60%)]" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10 flex-1 flex flex-col justify-center">
        {/* Main Content Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center flex flex-col items-center"
        >
          {/* Eyebrow Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs font-semibold text-neutral-600 shadow-sm mb-8"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for new projects · Based in Dhaka, Bangladesh
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1] mb-6"
          >
            Grow your business<br />
            <span className="text-primary italic font-medium">beyond borders.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-lg text-neutral-500 leading-relaxed max-w-2xl mb-10"
          >
            Digital World is a full-service digital marketing agency helping businesses in the USA, UK, Canada, UAE, Australia & beyond dominate search, ads, and the web — led by Kamrujjaman Mufti.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full sm:w-auto"
          >
            <Link
              href="/contact"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-8 py-4 font-sans text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Start a Project <Icons.ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#services"
              className="flex w-full sm:w-auto items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 px-8 py-4 font-sans text-sm font-semibold text-neutral-700 shadow-sm transition-all"
            >
              Explore Services
            </a>
          </motion.div>

          {/* Mobile Badge Cloud */}
          <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl md:hidden mb-12">
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

        {/* Desktop Absolute Floating Badges */}
        <div className="absolute inset-0 pointer-events-none hidden md:block select-none overflow-hidden max-w-7xl mx-auto w-full h-full">
          {floatingBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 0.85,
                  scale: 1,
                  y: [0, -12, 0],
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 4 + (idx % 3) * 1.2,
                    ease: "easeInOut",
                  },
                  opacity: { duration: 1, delay: idx * 0.1 },
                  scale: { duration: 1, delay: idx * 0.1 },
                }}
                className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-premium cursor-default ${badge.color}`}
                style={{
                  marginLeft: badge.x,
                  marginTop: badge.y,
                }}
              >
                <Icon className="h-4 w-4" />
                {badge.text}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Rotating Marquee Banner */}
      <div className="relative mt-auto border-y border-neutral-100 bg-neutral-50 py-5 overflow-hidden">
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
    </section>
  );
}
