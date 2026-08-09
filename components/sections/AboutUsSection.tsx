"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, ShieldCheck } from "lucide-react";

export default function AboutUsSection() {
  return (
    <section className="py-20 lg:py-32 bg-white relative z-10 overflow-hidden">
      {/* Background soft wavy shape background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-neutral-50 to-transparent" />
        <div className="absolute -bottom-10 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Isometric 3D Analytics Illustration */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center">
              
              {/* Soft background glow */}
              <div className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-2xl -z-10" />

              {/* 3D Isometric Dashboard Graphics Canvas */}
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <svg
                  viewBox="0 0 600 450"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-xl select-none"
                >
                  <defs>
                    <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E1B4B" />
                      <stop offset="100%" stopColor="#312E81" />
                    </linearGradient>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#EC4899" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="barGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                    <linearGradient id="barGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
                      <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0F172A" floodOpacity="0.15" />
                    </filter>
                  </defs>

                  {/* Isometric Base Stand */}
                  <path d="M120 280 L300 370 L480 280 L300 190 Z" fill="#E2E8F0" />
                  <path d="M120 280 L300 370 L300 385 L120 295 Z" fill="#CBD5E1" />
                  <path d="M480 280 L300 370 L300 385 L480 295 Z" fill="#94A3B8" />

                  {/* Main Isometric Dashboard Platform */}
                  <g filter="url(#shadow)">
                    {/* Top Face */}
                    <path d="M 140 240 L 300 320 L 460 240 L 300 160 Z" fill="url(#baseGradient)" />
                    {/* Left Thickness */}
                    <path d="M 140 240 L 300 320 L 300 332 L 140 252 Z" fill="#1E1B4B" />
                    {/* Right Thickness */}
                    <path d="M 460 240 L 300 320 L 300 332 L 460 252 Z" fill="#0F172A" />
                  </g>

                  {/* Screen Content UI Elements */}
                  {/* Top Bar */}
                  <path d="M 170 215 L 300 280 L 430 215 L 300 150 Z" fill="#2E1065" opacity="0.4" />
                  
                  {/* Area Chart Fill */}
                  <path d="M 180 230 Q 230 190 280 220 T 380 180 L 420 200 L 300 260 L 180 230 Z" fill="url(#chartGradient)" />

                  {/* Isometric Bar Chart Blocks */}
                  {/* Bar 1 */}
                  <path d="M 210 215 L 225 222.5 L 225 180 L 210 172.5 Z" fill="url(#barGrad1)" />
                  <path d="M 225 222.5 L 240 215 L 240 172.5 L 225 180 Z" fill="#2563EB" />
                  <path d="M 210 172.5 L 225 180 L 240 172.5 L 225 165 Z" fill="#60A5FA" />

                  {/* Bar 2 */}
                  <path d="M 250 235 L 265 242.5 L 265 170 L 250 162.5 Z" fill="url(#barGrad2)" />
                  <path d="M 265 242.5 L 280 235 L 280 162.5 L 265 170 Z" fill="#EA580C" />
                  <path d="M 250 162.5 L 265 170 L 280 162.5 L 265 155 Z" fill="#FBBF24" />

                  {/* Bar 3 */}
                  <path d="M 290 255 L 305 262.5 L 305 160 L 290 152.5 Z" fill="#8B5CF6" />
                  <path d="M 305 262.5 L 320 255 L 320 152.5 L 305 160 Z" fill="#7C3AED" />
                  <path d="M 290 152.5 L 305 160 L 320 152.5 L 305 145 Z" fill="#A78BFA" />

                  {/* Bar 4 */}
                  <path d="M 330 275 L 345 282.5 L 345 210 L 330 202.5 Z" fill="#10B981" />
                  <path d="M 345 282.5 L 360 275 L 360 202.5 L 345 210 Z" fill="#059669" />
                  <path d="M 330 202.5 L 345 210 L 360 202.5 L 345 195 Z" fill="#34D399" />

                  {/* Floating Analytics Card 1 (Left top) */}
                  <g filter="url(#shadow)" className="animate-bounce" style={{ animationDuration: '4s' }}>
                    <path d="M 80 140 L 190 195 L 190 140 L 80 85 Z" fill="#FFFFFF" rx="8" />
                    <circle cx="115" cy="120" r="14" fill="#EEF2FF" />
                    <path d="M 110 120 L 115 115 L 122 122" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
                    <rect x="135" y="112" width="40" height="6" rx="3" fill="#6366F1" />
                    <rect x="135" y="124" width="25" height="4" rx="2" fill="#94A3B8" />
                  </g>

                  {/* Floating Pie Chart Card 2 (Right top) */}
                  <g filter="url(#shadow)">
                    <path d="M 400 120 L 510 175 L 510 120 L 400 65 Z" fill="#FFFFFF" />
                    <circle cx="455" cy="115" r="18" fill="#F43F5E" />
                    <path d="M 455 115 L 455 97 A 18 18 0 0 1 473 115 Z" fill="#FB7185" />
                    <rect x="430" y="145" width="50" height="5" rx="2.5" fill="#E2E8F0" />
                  </g>

                  {/* Isometric People Figures */}
                  {/* Left Character (Female standing next to tablet) */}
                  <g>
                    {/* Head */}
                    <circle cx="160" cy="270" r="10" fill="#F43F5E" />
                    {/* Hair */}
                    <path d="M 152 265 C 150 250, 168 250, 168 265 C 168 275, 152 275, 152 265 Z" fill="#BE123C" />
                    {/* Body */}
                    <path d="M 154 280 L 166 280 L 170 320 L 150 320 Z" fill="#E11D48" />
                    {/* Legs */}
                    <rect x="153" y="320" width="5" height="30" fill="#1E1B4B" />
                    <rect x="162" y="320" width="5" height="30" fill="#1E1B4B" />
                  </g>

                  {/* Right Character (Male working on desktop screen) */}
                  <g>
                    {/* Head */}
                    <circle cx="430" cy="290" r="10" fill="#FBBF24" />
                    {/* Hair */}
                    <path d="M 422 286 C 420 275, 438 275, 438 286 Z" fill="#B45309" />
                    {/* Body */}
                    <path d="M 422 300 L 438 300 L 442 335 L 418 335 Z" fill="#2563EB" />
                    {/* Legs */}
                    <rect x="422" y="335" width="6" height="30" fill="#F97316" />
                    <rect x="432" y="335" width="6" height="30" fill="#F97316" />
                  </g>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text & Content */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Sub-heading / Eyebrow */}
            <span className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-[0.25em] mb-4">
              ABOUT US
            </span>

            {/* Main Section Title */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-neutral-900 tracking-tight leading-[1.2] mb-6">
              Boosts Your Website Traffic!
            </h2>

            {/* Paragraph 1 */}
            <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed mb-4">
              Ad nec unum copiosae. Sea ex everti labores, ad option iuvaret qui muva. We specialize in strategic data-driven campaigns designed to deliver high-converting organic and paid traffic directly to your business.
            </p>

            {/* Paragraph 2 */}
            <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed mb-8">
              Ea pro tibique comprehensam, sed ea verear numquam molestie. Nam te omittam comprehensam. Ne nam nonumy putent fuisset, reque fabulas usu ne. Ex vel populo meam. Eos ne delenit admodum. Our end-to-end framework guarantees transparent ROI and sustainable growth.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">High Growth ROI</h4>
                  <p className="text-[11px] text-neutral-500">Compounding traffic</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Proven Expertise</h4>
                  <p className="text-[11px] text-neutral-500">Dedicated specialists</p>
                </div>
              </div>
            </div>

            {/* Outline Button */}
            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-indigo-600/40 text-indigo-600 font-sans text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <span>About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
