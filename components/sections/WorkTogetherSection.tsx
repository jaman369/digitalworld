"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function WorkTogetherSection() {
  return (
    <section className="relative bg-[#091238] text-white py-14 lg:py-20 overflow-hidden z-10">
      
      {/* ── BACKGROUND DECORATIVE TECH ELEMENTS ── */}
      {/* Floating Specks / Color Dots in background */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {/* Tiny color specks matching reference */}
        <div className="absolute top-[28%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#06B6D4] opacity-80" />
        <div className="absolute top-[56%] left-[6%] w-2 h-2 rounded-full bg-[#FF5E62] opacity-80" />
        <div className="absolute top-[48%] left-[34%] w-1.5 h-1.5 rounded-full bg-[#FF5E62] opacity-70" />
        <div className="absolute top-[22%] right-[18%] w-1.5 h-1.5 rounded-full bg-[#818CF8] opacity-80" />
        <div className="absolute top-[48%] right-[19%] w-1.5 h-1.5 rounded-full bg-[#FBBF24] opacity-90" />
        <div className="absolute top-[53%] right-[38%] w-1.5 h-1.5 rounded-full bg-[#FF5E62] opacity-80" />
      </div>

      {/* Vertical Fiber / Circuit Lines in Dark Navy Area */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="glowVertLine" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.1" />
              <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Vertical Lines */}
          <line x1="2.5%" y1="0" x2="2.5%" y2="100%" stroke="url(#glowVertLine)" strokeWidth="1.5" />
          <line x1="9%" y1="0" x2="9%" y2="100%" stroke="url(#glowVertLine)" strokeWidth="1.5" />
          <line x1="22%" y1="0" x2="22%" y2="100%" stroke="url(#glowVertLine)" strokeWidth="1" />
          <line x1="28.5%" y1="0" x2="28.5%" y2="100%" stroke="url(#glowVertLine)" strokeWidth="1.5" />
          <line x1="41.5%" y1="0" x2="41.5%" y2="100%" stroke="url(#glowVertLine)" strokeWidth="1" />
          <line x1="63.5%" y1="0" x2="63.5%" y2="100%" stroke="url(#glowVertLine)" strokeWidth="1.5" />
          <line x1="77%" y1="0" x2="77%" y2="100%" stroke="url(#glowVertLine)" strokeWidth="1" />
          <line x1="87.5%" y1="0" x2="87.5%" y2="100%" stroke="url(#glowVertLine)" strokeWidth="1.5" />
          <line x1="97%" y1="0" x2="97%" y2="100%" stroke="url(#glowVertLine)" strokeWidth="1.5" />

          {/* Glowing Node Dots */}
          <circle cx="2.5%" cy="68%" r="4" fill="#3B82F6" />
          <circle cx="9%" cy="78%" r="4" fill="#60A5FA" className="animate-pulse" />
          <circle cx="22%" cy="82%" r="3.5" fill="#3B82F6" />
          <circle cx="28.5%" cy="75%" r="4" fill="#60A5FA" />
          <circle cx="41.5%" cy="84%" r="3.5" fill="#3B82F6" />
          <circle cx="63.5%" cy="92%" r="4" fill="#3B82F6" />
          <circle cx="77%" cy="78%" r="3.5" fill="#60A5FA" />
          <circle cx="87.5%" cy="92%" r="4" fill="#3B82F6" />
          <circle cx="97%" cy="68%" r="4.5" fill="#60A5FA" className="animate-ping" style={{ animationDuration: '4s' }} />

          {/* Floating Rounded Tech Squares in Navy background */}
          <rect x="41.5%" y="83%" width="22" height="22" rx="6" fill="#1E3A8A" opacity="0.6" />
          <rect x="80%" y="72%" width="26" height="26" rx="7" fill="#1E3A8A" opacity="0.5" />
          <rect x="87.5%" y="60%" width="18" height="18" rx="5" fill="#1D4ED8" opacity="0.4" />
        </svg>
      </div>

      {/* ── EXACT FLUID ORGANIC WHITE WAVE OVERLAY ── */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <svg
          viewBox="0 0 1440 540"
          preserveAspectRatio="none"
          className="w-full h-full text-white fill-current"
        >
          {/* Main White Wave flowing from top-left to middle */}
          <path d="M 0,0 L 740,0 C 840,80 760,210 650,290 C 520,380 420,440 0,540 Z" />
          
          {/* Right Top Soft White Dip Curve */}
          <path d="M 1160,0 C 1240,95 1350,105 1440,25 L 1440,0 Z" />
        </svg>
      </div>

      <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">
          
          {/* ── LEFT CONTENT AREA ── */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 text-neutral-900 py-6 lg:py-10 max-w-lg"
          >
            {/* Large Gradient Heading */}
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] mb-5">
              <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FF7A59] to-[#FFA07A] bg-clip-text text-transparent block">
                Let&apos;s work
              </span>
              <span className="bg-gradient-to-r from-[#FF5E62] to-[#FF9966] bg-clip-text text-transparent block">
                together
              </span>
            </h2>

            {/* Short Paragraph */}
            <p className="font-sans text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6 font-medium max-w-[360px]">
              Do you know what it takes to grow your business online? Do you want to?
            </p>

            {/* Phone Number */}
            <div className="font-sans text-2xl sm:text-[1.75rem] font-extrabold text-[#1E293B] tracking-tight mb-1">
              <a href="tel:8001234567" className="hover:text-[#FF5E62] transition-colors">
                800-123-4567
              </a>
            </div>

            {/* Email Address */}
            <div className="font-sans text-[11px] font-bold text-[#64748B] tracking-[0.15em] uppercase mb-8">
              <a href="mailto:INFO@EXAMPLE.COM" className="hover:text-[#1E293B] transition-colors">
                INFO@EXAMPLE.COM
              </a>
            </div>

            {/* Orange/Pink Gradient GET IN TOUCH Button */}
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md bg-gradient-to-r from-[#FF5E62] to-[#FF9966] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* ── RIGHT VISUAL: 3D ISOMETRIC ILLUSTRATION ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center py-4 lg:py-0"
          >
            <div className="relative w-full max-w-[560px] aspect-[1.25/1] flex items-center justify-center">
              
              <svg 
                viewBox="0 0 600 480" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-2xl select-none"
              >
                <defs>
                  <linearGradient id="phoneBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>
                  <linearGradient id="screenGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F1F5F9" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>
                  <linearGradient id="darkPurpleCard" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#312E81" />
                    <stop offset="100%" stopColor="#1E1B4B" />
                  </linearGradient>
                  <linearGradient id="yellowAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFC72C" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FF7A00" stopOpacity="0.25" />
                  </linearGradient>
                  <linearGradient id="cyanWidgetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#0891B2" />
                  </linearGradient>
                  <filter id="isoShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="18" stdDeviation="22" floodColor="#080E29" floodOpacity="0.45" />
                  </filter>
                </defs>

                {/* 3D Isometric Smartphone Base */}
                <g filter="url(#isoShadow)">
                  {/* Phone Top Face */}
                  <path d="M 180 280 L 420 420 L 580 280 L 340 140 Z" fill="url(#phoneBodyGrad)" />
                  {/* Left Side Thickness Edge */}
                  <path d="M 180 280 L 420 420 L 420 435 L 180 295 Z" fill="#CBD5E1" />
                  {/* Right Side Thickness Edge */}
                  <path d="M 580 280 L 420 420 L 420 435 L 580 295 Z" fill="#94A3B8" />

                  {/* Glass Screen */}
                  <path d="M 198 275 L 415 402 L 562 275 L 345 148 Z" fill="url(#screenGlassGrad)" />

                  {/* Speaker Notch */}
                  <path d="M 330 160 L 360 178" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                </g>

                {/* Floating Card 1: Dark Purple Dashboard Card (Bottom Left) */}
                <g filter="url(#isoShadow)">
                  <path d="M 120 220 L 290 320 L 400 245 L 230 145 Z" fill="url(#darkPurpleCard)" />
                  {/* Line Chart inside Card 1 */}
                  <path d="M 150 215 L 190 190 L 230 225 L 280 180 L 330 210 L 370 175" stroke="#818CF8" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <circle cx="280" cy="180" r="4" fill="#A5B4FC" />
                  {/* Bar charts inside Card 1 */}
                  <path d="M 160 240 L 175 249 L 175 225 L 160 216 Z" fill="#6366F1" />
                  <path d="M 190 257 L 205 266 L 205 230 L 190 221 Z" fill="#818CF8" />
                  <path d="M 220 274 L 235 283 L 235 235 L 220 226 Z" fill="#A5B4FC" />
                </g>

                {/* Floating Card 2: White Area Chart Card (Center Top) */}
                <g filter="url(#isoShadow)">
                  <path d="M 210 160 L 380 260 L 490 175 L 320 75 Z" fill="#FFFFFF" />
                  {/* Area Chart Gradient Fill */}
                  <path d="M 230 150 Q 280 90 320 130 T 450 110 L 450 165 L 230 150 Z" fill="url(#yellowAreaGrad)" />
                  <path d="M 230 150 Q 280 90 320 130 T 450 110" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                  {/* Red Speech Bubble Notification Badge */}
                  <g filter="url(#isoShadow)">
                    <path d="M 330 75 L 430 135 L 430 95 L 330 35 Z" fill="#FF3B5C" />
                    <path d="M 350 65 L 400 95" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 350 78 L 385 99" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </g>

                {/* Floating Card 3: Cyan Calendar / Grid Widget (Right Top) */}
                <g filter="url(#isoShadow)">
                  <path d="M 360 110 L 490 190 L 570 130 L 440 50 Z" fill="url(#cyanWidgetGrad)" />
                  {/* Grid Dots */}
                  {Array.from({ length: 4 }).map((_, r) =>
                    Array.from({ length: 5 }).map((_, c) => (
                      <circle
                        key={`c-${r}-${c}`}
                        cx={390 + c * 24 + r * 14}
                        cy={100 + r * 16 - c * 4}
                        r="3"
                        fill="#FFFFFF"
                        opacity="0.9"
                      />
                    ))
                  )}
                  {/* Settings Gear Icon */}
                  <circle cx="510" cy="100" r="12" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
                </g>

              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
