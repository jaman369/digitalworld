"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, TrendingUp, Users, ShieldCheck } from "lucide-react";
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
    <section className="py-16 lg:py-24 bg-white relative z-10 border-b border-neutral-100 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-1.5 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-4">
            {data.metricsEyebrow || "10 — Results / Metrics"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            {data.metricsTitle || "Measurable Impact by the Numbers"}
          </h2>
        </div>

        {/* 4 Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-neutral-50/90 rounded-2xl border border-neutral-200/80 p-8 text-center flex flex-col items-center hover:shadow-md transition-all duration-300 hover:bg-white"
              >
                <div className={`p-3 rounded-xl border mb-4 ${metric.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900 mb-2">
                  {metric.value}
                </span>
                <h4 className="font-sans text-sm font-bold text-neutral-800 mb-1">
                  {metric.label}
                </h4>
                <p className="font-sans text-xs text-neutral-400">
                  {metric.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
