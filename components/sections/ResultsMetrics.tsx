"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, TrendingUp, Users, ShieldCheck, PieChart, Sparkles } from "lucide-react";
import { CloudHomepageData } from "@/types";

const metrics = [
  {
    id: "01",
    value: "10M+",
    label: "Organic Visits Generated",
    subtext: "Across SEO & Content Funnels",
    icon: TrendingUp,
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    id: "02",
    value: "98.4%",
    label: "Client Retention Rate",
    subtext: "Based on 3+ Year Retainers",
    icon: ShieldCheck,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    id: "03",
    value: "5.8x",
    label: "Average Campaign ROAS",
    subtext: "For Paid Search & Social Ads",
    icon: Award,
    color: "text-amber-600 bg-amber-50 border-amber-100",
  },
  {
    id: "04",
    value: "450k+",
    label: "Qualified Leads Delivered",
    subtext: "Directly into Client CRMs",
    icon: Users,
    color: "text-purple-600 bg-purple-50 border-purple-100",
  },
];

export default function ResultsMetrics() {
  const [data, setData] = useState<CloudHomepageData>({
    metricsEyebrow: "10 — Results / Metrics",
    metricsTitle: "Measurable Impact by the Numbers",
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

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white relative z-10 border-b border-neutral-100 overflow-hidden">
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-blue-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-purple-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-1.5 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {data.metricsEyebrow || "10 — Results / Metrics"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-[1.15]">
            {data.metricsTitle || "Measurable Impact by the Numbers"}
          </h2>
        </div>

        {/* 2-Column Split Layout: Graph Image Left, Metric Cards Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 3D Pie/Graph Showcase with Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md lg:max-w-none flex items-center justify-center p-6 rounded-3xl bg-white/70 border border-neutral-100 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-sm group">
              {/* Radial ambient glow behind 3D pie chart */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-blue-500/10 via-teal-500/10 to-indigo-500/10 blur-2xl -z-10 group-hover:scale-110 transition-transform duration-700" />

              {/* 3D Graph Image 26.png */}
              <Image
                src="/images/26.png"
                alt="Growth Distribution Graph Chart"
                width={480}
                height={480}
                priority
                className="w-full h-auto max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-[1.03]"
              />

              {/* Floating Badge 1: Top Right */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-2 sm:right-4 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl px-3.5 py-2 shadow-lg flex items-center gap-2"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="font-sans text-xs font-bold text-neutral-800">75% Market Share</span>
              </motion.div>

              {/* Floating Badge 2: Bottom Left */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-4 left-2 sm:left-4 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl px-3.5 py-2 shadow-lg flex items-center gap-2"
              >
                <PieChart className="w-4 h-4 text-emerald-500" />
                <span className="font-sans text-xs font-bold text-neutral-800">Data-Driven ROI</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: 2x2 Metric Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl border border-neutral-100 p-6 sm:p-7 flex flex-col items-start justify-between shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-blue-200/80 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between w-full mb-4">
                    <div className={`p-3 rounded-xl border transition-transform duration-300 group-hover:scale-110 ${metric.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-neutral-300 group-hover:text-blue-500 transition-colors">
                      {metric.id}
                    </span>
                  </div>

                  <div>
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900 block mb-1 tracking-tight">
                      {metric.value}
                    </span>
                    <h4 className="font-sans text-sm sm:text-base font-bold text-neutral-800 mb-1">
                      {metric.label}
                    </h4>
                    <p className="font-sans text-xs text-neutral-400">
                      {metric.subtext}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

