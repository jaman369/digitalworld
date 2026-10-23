"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

export default function FounderSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#f8f9fc] via-white to-[#f8f9fc] relative z-10 border-b border-neutral-100 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Photo with Floating Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Decorative Frame Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600/20 via-sky-400/20 to-indigo-600/20 rounded-3xl blur-xl opacity-70" />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden border border-neutral-200/80 bg-white shadow-2xl aspect-[4/5]">
                <Image
                  src="/images/23.png"
                  alt="Kamrujjaman Mufti - Founder & Digital Marketing Strategist"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 450px"
                  priority
                />
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center font-bold">
                  <Icons.Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-serif font-bold text-lg text-neutral-900 block leading-none">
                    6+ Years
                  </span>
                  <span className="font-sans text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
                    Hands-On Experience
                  </span>
                </div>
              </div>

              {/* Floating Country Badge */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2">
                <Icons.Globe className="w-4 h-4 text-emerald-500" />
                <span className="font-sans text-xs font-bold text-neutral-800">
                  11 Countries Served
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Copy & Value Bullets */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-6 self-start">
              Meet your strategist
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-neutral-900 tracking-tight leading-[1.2] mb-6">
              Led by Kamrujjaman Mufti, <br className="hidden sm:inline" />
              Digital Marketing Strategist
            </h2>

            <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed mb-8">
              Digital World was founded by Kamrujjaman Mufti, a digital marketer with 6+ years of hands-on experience across SEO, PPC, web development, content and AI automation. From Dhaka, Bangladesh, he and his team help businesses in the USA, UK, Canada, UAE, Australia and other markets grow with strategies that are practical, measurable and honest.
            </p>

            {/* 3 Value Bullets */}
            <div className="flex flex-col gap-3.5 mb-10">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Icons.Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="font-sans text-sm sm:text-base font-semibold text-neutral-800">
                  Senior-led projects, no handoffs to juniors
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Icons.Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="font-sans text-sm sm:text-base font-semibold text-neutral-800">
                  11 countries served worldwide
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Icons.Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="font-sans text-sm sm:text-base font-semibold text-neutral-800">
                  Direct access on WhatsApp and email
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-8 py-4 font-sans text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Talk to Kamrujjaman <Icons.ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/8801798667820"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 px-6 py-4 font-sans text-sm font-semibold text-neutral-700 transition-all hover:scale-[1.02]"
              >
                <Icons.MessageSquare className="h-4 w-4 text-emerald-600" />
                WhatsApp Direct
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
