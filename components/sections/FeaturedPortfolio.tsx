"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Users, Target } from "lucide-react";

import Image from "next/image";

const caseStudies = [
  {
    id: "01",
    client: "Nexus Global Logistics",
    category: "International SEO & Supply Chain CRM",
    title: "+340% Organic Traffic Growth in 6 Months",
    description: "Expanded organic footprint across 8 target countries with custom multilingual SEO structure and lead routing.",
    image: "/images/16.png",
    results: [
      { label: "Organic Traffic", value: "+340%", icon: TrendingUp },
      { label: "Qualified Leads", value: "4.2x Growth", icon: Users },
      { label: "Cost Per Lead", value: "-45% Lower", icon: Target },
    ],
    slug: "nexus-global",
  },
  {
    id: "02",
    client: "Apex AI Automation",
    category: "PPC & CRO Audit",
    title: "10x Lead Volume with Optimized Performance Max",
    description: "Restructured Google Ads campaigns and redesigned landing page funnel to maximize buyer conversion rates.",
    image: "/images/15.png",
    results: [
      { label: "Monthly Leads", value: "1,250+", icon: Users },
      { label: "Ad ROAS", value: "5.8x Return", icon: TrendingUp },
      { label: "Conversion Rate", value: "8.4%", icon: Target },
    ],
    slug: "apex-ai",
  },
];

export default function FeaturedPortfolio() {
  return (
    <section className="py-20 lg:py-28 bg-[#f8fafc] relative z-10 border-b border-neutral-100 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4">
              09 — Featured Portfolio / Case Studies
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
              Real Client Growth Stories
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <span>View All Case Studies</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Case Studies Stack */}
        <div className="flex flex-col gap-12 lg:gap-16">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Project Visual Area (Left) */}
              <div className="lg:col-span-6 relative bg-gradient-to-tr from-neutral-100 to-neutral-50 p-8 sm:p-12 flex items-center justify-center min-h-[300px]">
                <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-md border border-white">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover select-none hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Project Results Area (Right) */}
              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">
                    {study.client} — {study.category}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-4 leading-snug">
                    {study.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed mb-8">
                    {study.description}
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 border-t border-neutral-100 pt-6">
                  {study.results.map((res, rIdx) => {
                    const ResIcon = res.icon;
                    return (
                      <div key={rIdx} className="flex flex-col">
                        <div className="flex items-center gap-1 text-indigo-600 mb-1">
                          <ResIcon className="w-3.5 h-3.5" />
                          <span className="font-sans text-xs font-semibold text-neutral-400">
                            {res.label}
                          </span>
                        </div>
                        <span className="font-sans text-lg sm:text-xl font-bold text-neutral-900">
                          {res.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
