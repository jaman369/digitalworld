"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function WorkTogetherSection() {
  return (
    <section className="relative bg-[#091432] text-white py-16 lg:py-24 overflow-hidden z-10">
      
      {/* Background Vertical Circuit / Fiber Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGlowVert" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="60%" stopColor="#60A5FA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          <line x1="3%" y1="0" x2="3%" y2="100%" stroke="url(#lineGlowVert)" strokeWidth="1" />
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="url(#lineGlowVert)" strokeWidth="1.5" />
          <line x1="25%" y1="0" x2="25%" y2="100%" stroke="url(#lineGlowVert)" strokeWidth="1" />
          <line x1="45%" y1="0" x2="45%" y2="100%" stroke="url(#lineGlowVert)" strokeWidth="1.5" />
          <line x1="64%" y1="0" x2="64%" y2="100%" stroke="url(#lineGlowVert)" strokeWidth="1" />
          <line x1="77%" y1="0" x2="77%" y2="100%" stroke="url(#lineGlowVert)" strokeWidth="1.5" />
          <line x1="87%" y1="0" x2="87%" y2="100%" stroke="url(#lineGlowVert)" strokeWidth="1" />
          <line x1="96%" y1="0" x2="96%" y2="100%" stroke="url(#lineGlowVert)" strokeWidth="1.5" />

          {/* Glowing Nodes / Dots */}
          <circle cx="10%" cy="35%" r="3.5" fill="#60A5FA" className="animate-pulse" />
          <circle cx="25%" cy="80%" r="4" fill="#3B82F6" />
          <circle cx="45%" cy="65%" r="3" fill="#60A5FA" />
          <circle cx="77%" cy="25%" r="4.5" fill="#93C5FD" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="87%" cy="70%" r="3" fill="#3B82F6" />
          <circle cx="96%" cy="45%" r="4" fill="#60A5FA" />
        </svg>
      </div>

      {/* Full-width Organic White Wave Layer on Left */}
      <div className="absolute top-0 left-0 bottom-0 w-full lg:w-[62%] pointer-events-none z-10">
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="none"
          className="w-full h-full text-white fill-current drop-shadow-xl"
        >
          {/* Smooth Fluid Curve matching Image 2 */}
          <path d="M 0,0 L 520,0 C 620,120 540,280 440,380 C 340,480 320,540 0,600 Z" />
        </svg>
      </div>

      <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">
          
          {/* Left Side Content inside White Wave */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 text-neutral-900 py-6 lg:py-10 max-w-lg"
          >
            {/* Main Headline on 2 lines */}
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.08] mb-4">
              <span className="text-[#FF7A59] block">Let&apos;s work</span>
              <span className="text-[#FF4858] block">together</span>
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6 font-medium max-w-sm">
              Do you know what it takes to grow your business online? Do you want to?
            </p>

            {/* Phone & Email Info */}
            <div className="flex flex-col gap-1.5 mb-7">
              <a 
                href="tel:8001234567" 
                className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1E293B] hover:text-[#FF4858] transition-colors tracking-tight"
              >
                800-123-4567
              </a>
              <a 
                href="mailto:INFO@EXAMPLE.COM" 
                className="font-sans text-[11px] font-bold text-[#64748B] hover:text-[#1E293B] tracking-[0.15em] uppercase transition-colors"
              >
                INFO@EXAMPLE.COM
              </a>
            </div>

            {/* GET IN TOUCH Action Button */}
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#FF7A59] to-[#FF4858] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Intricate 3D Isometric Smartphone & Dashboard Graphics */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center py-4 lg:py-0"
          >
            <div className="relative w-full max-w-[540px] aspect-[1.25/1] flex items-center justify-center">
              
              <svg 
                viewBox="0 0 600 480" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-2xl select-none"
              >
                <defs>
                  <linearGradient id="phoneFrame" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>
                  <linearGradient id="phoneScreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F1F5F9" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>
                  <linearGradient id="darkCard" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#312E81" />
                    <stop offset="100%" stopColor="#1E1B4B" />
                  </linearGradient>
                  <linearGradient id="yellowArea" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFC72C" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FF7A00" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="cyanWidget" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#0891B2" />
                  </linearGradient>
                  <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#091432" floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* 3D Isometric Smartphone Base */}
                <g filter="url(#cardShadow)">
                  {/* Outer Frame Top Face */}
                  <path d="M 180 280 L 420 420 L 580 280 L 340 140 Z" fill="url(#phoneFrame)" />
                  {/* Left Side Edge */}
                  <path d="M 180 280 L 420 420 L 420 435 L 180 295 Z" fill="#CBD5E1" />
                  {/* Right Side Edge */}
                  <path d="M 580 280 L 420 420 L 420 435 L 580 295 Z" fill="#94A3B8" />

                  {/* Glass Screen */}
                  <path d="M 198 275 L 415 402 L 562 275 L 345 148 Z" fill="url(#phoneScreen)" />

                  {/* Speaker & Sensor Notch */}
                  <path d="M 330 160 L 360 178" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                </g>

                {/* Floating 3D Card 1: Dark Indigo Dashboard (Left Bottom) */}
                <g filter="url(#cardShadow)" className="animate-pulse" style={{ animationDuration: '4s' }}>
                  <path d="M 120 220 L 290 320 L 400 245 L 230 145 Z" fill="url(#darkCard)" />
                  {/* Line Chart graphics inside dark card */}
                  <path d="M 150 215 L 190 190 L 230 225 L 280 180 L 330 210 L 370 175" stroke="#818CF8" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <circle cx="280" cy="180" r="4" fill="#A5B4FC" />
                  {/* Bar charts inside dark card */}
                  <path d="M 160 240 L 175 249 L 175 225 L 160 216 Z" fill="#6366F1" />
                  <path d="M 190 257 L 205 266 L 205 230 L 190 221 Z" fill="#818CF8" />
                  <path d="M 220 274 L 235 283 L 235 235 L 220 226 Z" fill="#A5B4FC" />
                </g>

                {/* Floating 3D Card 2: White Area Chart Card (Center Top) */}
                <g filter="url(#cardShadow)">
                  <path d="M 210 160 L 380 260 L 490 175 L 320 75 Z" fill="#FFFFFF" />
                  {/* Area Chart Gradient */}
                  <path d="M 230 150 Q 280 90 320 130 T 450 110 L 450 165 L 230 150 Z" fill="url(#yellowArea)" />
                  <path d="M 230 150 Q 280 90 320 130 T 450 110" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                  {/* Red Speech Bubble Badge on top of Card 2 */}
                  <g filter="url(#cardShadow)">
                    <path d="M 330 75 L 430 135 L 430 95 L 330 35 Z" fill="#FF3B5C" />
                    {/* Text lines in badge */}
                    <path d="M 350 65 L 400 95" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 350 78 L 385 99" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </g>

                {/* Floating 3D Card 3: Cyan Calendar / Grid Widget (Right Top) */}
                <g filter="url(#cardShadow)">
                  <path d="M 360 110 L 490 190 L 570 130 L 440 50 Z" fill="url(#cyanWidget)" />
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
