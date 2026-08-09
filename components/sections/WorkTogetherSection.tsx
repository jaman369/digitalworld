"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function WorkTogetherSection() {
  return (
    <section className="relative bg-[#09112B] text-white py-20 lg:py-28 overflow-hidden z-10">
      
      {/* Background Vertical Circuit / Fiber Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="5%" y1="0" x2="5%" y2="100%" stroke="url(#lineGlow)" strokeWidth="1" />
          <line x1="12%" y1="0" x2="12%" y2="100%" stroke="url(#lineGlow)" strokeWidth="1.5" />
          <line x1="22%" y1="0" x2="22%" y2="100%" stroke="url(#lineGlow)" strokeWidth="1" />
          <line x1="45%" y1="0" x2="45%" y2="100%" stroke="url(#lineGlow)" strokeWidth="1.5" />
          <line x1="65%" y1="0" x2="65%" y2="100%" stroke="url(#lineGlow)" strokeWidth="1" />
          <line x1="78%" y1="0" x2="78%" y2="100%" stroke="url(#lineGlow)" strokeWidth="1" />
          <line x1="88%" y1="0" x2="88%" y2="100%" stroke="url(#lineGlow)" strokeWidth="1.5" />
          <line x1="95%" y1="0" x2="95%" y2="100%" stroke="url(#lineGlow)" strokeWidth="1" />

          {/* Glowing Nodes / Dots */}
          <circle cx="12%" cy="30%" r="3" fill="#60A5FA" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="45%" cy="75%" r="4" fill="#3B82F6" />
          <circle cx="78%" cy="20%" r="3" fill="#60A5FA" />
          <circle cx="88%" cy="60%" r="4" fill="#93C5FD" className="animate-ping" style={{ animationDuration: '4s' }} />
          <circle cx="95%" cy="40%" r="3" fill="#3B82F6" />
        </svg>
      </div>

      <div className="container mx-auto max-w-7xl px-0 sm:px-6 relative z-10">
        <div className="relative flex flex-col lg:flex-row items-center justify-between min-h-[460px]">
          
          {/* Left Side: Curved White Card Container */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[58%] bg-white text-neutral-900 rounded-r-[3rem] lg:rounded-r-[14rem] p-8 sm:p-12 lg:p-16 shadow-2xl relative z-20"
          >
            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-none">
              <span className="text-[#FF6B4A]">Let&apos;s work </span>
              <span className="text-[#FF5252]">together</span>
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-xs sm:text-sm text-neutral-500 max-w-md leading-relaxed mb-6 font-medium">
              Do you know what it takes to grow your business online? Do you want to?
            </p>

            {/* Phone & Email Info */}
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#FF5252] shrink-0" />
                <a href="tel:8001234567" className="font-sans text-xl sm:text-2xl font-bold text-[#1E293B] hover:text-[#FF5252] transition-colors">
                  800-123-4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                <a href="mailto:INFO@EXAMPLE.COM" className="font-sans text-xs font-bold text-neutral-400 hover:text-neutral-700 tracking-wider uppercase transition-colors">
                  INFO@EXAMPLE.COM
                </a>
              </div>
            </div>

            {/* GET IN TOUCH Button */}
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF6B4A] to-[#FF4858] text-white font-sans text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Side: 3D Isometric Smartphone & Dashboard Graphics */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[42%] relative flex items-center justify-center p-6 lg:p-0 mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center">
              
              <svg 
                viewBox="0 0 500 400" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-2xl select-none"
              >
                <defs>
                  <linearGradient id="phoneBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F8FAFC" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>
                  <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EEF2FF" />
                    <stop offset="100%" stopColor="#E0E7FF" />
                  </linearGradient>
                  <linearGradient id="cardOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF7A00" />
                    <stop offset="100%" stopColor="#FF4D00" />
                  </linearGradient>
                  <linearGradient id="cardCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#0284C7" />
                  </linearGradient>
                  <filter id="phoneShadow" x="-10%" y="-10%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="20" stdDeviation="24" floodColor="#020617" floodOpacity="0.5" />
                  </filter>
                </defs>

                {/* 3D Isometric Smartphone Body */}
                <g filter="url(#phoneShadow)">
                  {/* Phone Base Shadow Plate */}
                  <path d="M 120 220 L 320 340 L 460 220 L 260 100 Z" fill="url(#phoneBody)" rx="24" />
                  {/* Side Thickness */}
                  <path d="M 120 220 L 320 340 L 320 355 L 120 235 Z" fill="#CBD5E1" />
                  <path d="M 460 220 L 320 340 L 320 355 L 460 235 Z" fill="#94A3B8" />

                  {/* Glass Screen */}
                  <path d="M 135 215 L 315 325 L 445 215 L 265 105 Z" fill="url(#screenGrad)" />
                  
                  {/* Screen Content Graphics Grid */}
                  {/* Grid Lines on Screen */}
                  <path d="M 170 195 L 290 270 M 210 170 L 330 245 M 250 145 L 370 220" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* UI App Elements inside Screen */}
                  {/* Row List Items */}
                  <path d="M 330 260 L 400 215" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 320 275 L 380 235" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 310 290 L 360 255" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
                </g>

                {/* Floating Isometric Card 1: Analytics Area Chart (Orange) */}
                <g filter="url(#phoneShadow)" className="animate-bounce" style={{ animationDuration: '5s' }}>
                  <path d="M 180 150 L 330 240 L 330 160 L 180 70 Z" fill="#FFFFFF" />
                  <path d="M 195 140 Q 240 90 270 120 T 315 100 L 315 150 L 195 140 Z" fill="url(#cardOrange)" opacity="0.85" />
                  <path d="M 195 140 Q 240 90 270 120 T 315 100" stroke="#FFD600" strokeWidth="3" fill="none" />
                </g>

                {/* Floating Isometric Card 2: Calendar / Grid Badge (Cyan) */}
                <g filter="url(#phoneShadow)">
                  <path d="M 280 100 L 390 165 L 390 105 L 280 40 Z" fill="url(#cardCyan)" />
                  {/* Grid dots */}
                  <circle cx="310" cy="80" r="3" fill="#FFFFFF" />
                  <circle cx="330" cy="92" r="3" fill="#FFFFFF" />
                  <circle cx="350" cy="104" r="3" fill="#FFFFFF" />
                  <circle cx="310" cy="98" r="3" fill="#FFFFFF" />
                  <circle cx="330" cy="110" r="3" fill="#FFFFFF" />
                  <circle cx="350" cy="122" r="3" fill="#FFFFFF" />
                </g>

                {/* Floating Isometric Notification Badge (Top Red) */}
                <g filter="url(#phoneShadow)">
                  <path d="M 250 60 L 320 100 L 320 70 L 250 30 Z" fill="#EF4444" />
                  <path d="M 265 55 L 305 78" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                </g>

              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
