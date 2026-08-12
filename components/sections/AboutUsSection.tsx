"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, ShieldCheck } from "lucide-react";
import { CloudAboutData } from "@/types";

export default function AboutUsSection() {
  const [aboutData, setAboutData] = useState<CloudAboutData>({
    name: "Kamrujjaman Mufti",
    title: "Digital Marketing Expert & Web Developer",
    bioParagraph1: "We specialize in strategic data-driven campaigns designed to deliver high-converting organic and paid traffic directly to your business.",
    bioParagraph2: "Our end-to-end framework guarantees transparent ROI and sustainable growth across all digital channels.",
    imagePath: "/images/about-graphic.png",
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/about");
        if (res.ok) {
          const data = await res.json();
          setAboutData((prev) => ({ ...prev, ...data }));
        }
      } catch {}
    }
    load();
  }, []);

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
          
          {/* Left Column: User Uploaded Image 17 */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-xl lg:max-w-2xl flex items-center justify-center">
              {/* Soft background glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-3xl -z-10" />

              {/* Image 17 */}
              <img
                src="/images/17.png"
                alt={`About Us - ${aboutData.name || "Digital World"}`}
                className="w-full h-auto max-w-[580px] sm:max-w-[640px] lg:max-w-[680px] object-contain drop-shadow-2xl select-none hover:scale-[1.02] transition-transform duration-500"
              />
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
              {aboutData.name ? `${aboutData.name} - ${aboutData.title || "Digital Growth Expert"}` : "Boosts Your Website Traffic!"}
            </h2>

            {/* Paragraph 1 */}
            <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed mb-4">
              {aboutData.bioParagraph1 || "We specialize in strategic data-driven campaigns designed to deliver high-converting organic and paid traffic directly to your business."}
            </p>

            {/* Paragraph 2 */}
            <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed mb-8">
              {aboutData.bioParagraph2 || "Our end-to-end framework guarantees transparent ROI and sustainable growth across all digital channels."}
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

