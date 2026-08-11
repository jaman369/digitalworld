"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";

interface ServiceExtraSectionsProps {
  categorySlug?: string;
}

export default function ServiceExtraSections({ categorySlug = "seo" }: ServiceExtraSectionsProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const whyUsCards = [
    {
      icon: "📊",
      title: "Results, Not Reports",
      desc: "We obsess over one metric: your revenue. Every action we take is tied to measurable business outcomes — not vanity metrics.",
    },
    {
      icon: "🚀",
      title: "No Long-Term Lock-ins",
      desc: "Month-to-month engagements available. We earn your trust with results — not 12-month contracts. Confident enough to work that way.",
    },
    {
      icon: "🌍",
      title: "Global Experience",
      desc: "11 countries, dozens of industries. We understand how search behaviour, competition, and algorithm nuances differ across markets.",
    },
    {
      icon: "🤝",
      title: "Direct Access",
      desc: "You work directly with Kamrujjaman — no junior account managers, no handoffs. Expert eyes on your campaign, always.",
    },
    {
      icon: "🔍",
      title: "Transparent Process",
      desc: "Full access to our work, tools, and data. You own everything we create — content, links, strategies. Nothing is withheld.",
    },
    {
      icon: "⚡",
      title: "Fast Communication",
      desc: "Reach us via Email, WhatsApp, or LinkedIn. Responses within hours, weekly updates guaranteed — across all 11 time zones we serve.",
    },
  ];

  const testimonials = [
    {
      stars: 5,
      quote: "Digital World doubled our organic traffic in just 4 months. The SEO strategy was precisely tailored to our e-commerce niche — best investment we've made.",
      author: "Sarah M.",
      location: "🇺🇸 New York, USA · E-Commerce Store",
    },
    {
      stars: 5,
      quote: "We went from page 4 to #1 in Google Maps within 90 days. The local SEO work was methodical and the communication was excellent throughout.",
      author: "Michael R.",
      location: "🇦🇺 Melbourne, Australia · HVAC Business",
    },
    {
      stars: 5,
      quote: "The SaaS content strategy brought us 38 inbound demo requests per month organically. We scaled without increasing ad spend. Incredible ROI.",
      author: "Clara O.",
      location: "🇮🇪 Dublin, Ireland · SaaS Startup",
    },
  ];

  return (
    <div className="bg-[#090A0C] text-white">
      {/* 1. WHY DIGITAL WORLD SECTION */}
      <section className="py-24 lg:py-32 border-t border-neutral-900 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          
          {/* Eyebrow & Title */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 px-4 py-1.5 text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              WHY DIGITAL WORLD
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Why 120+ clients choose us.
            </h2>
          </div>

          {/* 6 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {whyUsCards.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#12141A]/80 border border-neutral-800/70 rounded-2xl p-8 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col group"
              >
                {/* Icon Container */}
                <div className="h-12 w-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-2xl mb-6 group-hover:scale-105 transition-transform">
                  <span>{item.icon}</span>
                </div>

                {/* Card Title */}
                <h3 className="font-sans text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. SIMPLE, TRANSPARENT PRICING SECTION */}
      <section className="py-24 lg:py-32 border-t border-neutral-900 relative overflow-hidden bg-[#08090C]">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,118,255,0.06)_0%,transparent_70%)] pointer-events-none" />

        {/* Background Watermark Text */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 font-serif text-[120px] sm:text-[200px] font-bold text-white/[0.015] pointer-events-none select-none tracking-widest uppercase z-0">
          Pricing
        </div>

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 px-4 py-1.5 text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              PRICING
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Simple, transparent pricing for every stage.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
              Choose a plan that fits your goals. No hidden fees, no long-term contracts — cancel anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-12">
            
            {/* Card 1: Basic */}
            <div className="bg-[#101218]/90 border border-neutral-800/80 rounded-3xl p-8 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-md">
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-4">
                  Basic
                </span>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-white">$299</span>
                  <span className="text-sm font-semibold text-neutral-400">/m</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed mb-8">
                  For small businesses ready to establish a strong online presence.
                </p>

                <div className="h-px bg-neutral-800/80 w-full mb-8" />

                <ul className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-300 mb-8">
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Keyword research (10 keywords)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>On-page SEO setup (up to 3 pages)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Google Business Profile optimization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Monthly performance report</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Email support</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`/contact?plan=basic&service=${categorySlug}`}
                className="w-full inline-flex items-center justify-center rounded-full bg-white hover:bg-neutral-100 px-6 py-3.5 text-xs font-bold text-neutral-900 transition-all shadow-sm"
              >
                Choose Plan
              </Link>
            </div>

            {/* Card 2: Accelerate (MOST POPULAR) */}
            <div className="bg-[#121624] border-2 border-[#0076FF] rounded-3xl p-8 flex flex-col justify-between relative shadow-[0_0_50px_rgba(0,118,255,0.18)] lg:-translate-y-2">
              
              {/* Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0076FF] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                MOST POPULAR
              </div>

              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-4">
                  Accelerate
                </span>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-white">$1,299</span>
                  <span className="text-sm font-semibold text-neutral-400">/m</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed mb-8">
                  For growing brands that need a full-funnel digital strategy and bigger reach.
                </p>

                <div className="h-px bg-blue-900/40 w-full mb-8" />

                <ul className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-200 mb-8">
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>Advanced SEO & content strategy</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>Paid ads (Google & Meta)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>Social media + email campaigns</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>Bi-weekly strategy calls</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`/contact?plan=accelerate&service=${categorySlug}`}
                className="w-full inline-flex items-center justify-center rounded-full bg-[#0076FF] hover:bg-[#0066DD] px-6 py-3.5 text-xs font-bold text-white transition-all shadow-md"
              >
                Choose Plan
              </Link>
            </div>

            {/* Card 3: Enterprise */}
            <div className="bg-[#101218]/90 border border-neutral-800/80 rounded-3xl p-8 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-md">
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-4">
                  Enterprise
                </span>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-white">Custom</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed mb-8">
                  For established brands targeting international markets with serious ROI goals.
                </p>

                <div className="h-px bg-neutral-800/80 w-full mb-8" />

                <ul className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-300 mb-8">
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Everything in Accelerate</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Custom web & e-commerce builds</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Dedicated account strategist</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Multi-market localization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Priority 24/7 support</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`/contact?plan=enterprise&service=${categorySlug}`}
                className="w-full inline-flex items-center justify-center rounded-full bg-white hover:bg-neutral-100 px-6 py-3.5 text-xs font-bold text-neutral-900 transition-all shadow-sm"
              >
                Choose Plan
              </Link>
            </div>

          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-3 text-xs font-semibold text-neutral-400">
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${billingCycle === "yearly" ? "bg-primary" : "bg-neutral-800"}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${billingCycle === "yearly" ? "translate-x-4" : "translate-x-0"}`} />
              </div>
              <span className={billingCycle === "yearly" ? "text-white" : "text-neutral-400"}>Yearly (Save 15%)</span>
            </button>
          </div>

        </div>
      </section>

      {/* 3. CLIENT STORIES / TESTIMONIALS SECTION */}
      <section className="py-24 lg:py-32 border-t border-neutral-900 relative overflow-hidden bg-[#090A0C]">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 px-4 py-1.5 text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              CLIENT STORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Trusted by businesses worldwide.
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#12141A]/90 border border-neutral-800/80 rounded-2xl p-8 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 shadow-md"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400 text-sm mb-6">
                    {Array.from({ length: t.stars }).map((_, sidx) => (
                      <Icons.Star key={sidx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed italic mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="border-t border-neutral-800/80 pt-4">
                  <h4 className="font-sans font-bold text-sm text-white mb-1">
                    {t.author}
                  </h4>
                  <p className="font-sans text-[11px] text-neutral-400">
                    {t.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
