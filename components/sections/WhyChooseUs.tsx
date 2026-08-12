"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { CloudHomepageData } from "@/types";

export default function WhyChooseUs() {
  const [data, setData] = useState<CloudHomepageData>({
    whyUsEyebrow: "Why Us",
    whyUsTitle: "Why choose Digital World",
    whyUsSubtitle: "We partner with brands to build robust organic funnels that consistently generate revenue, not just vanity clicks.",
    whyUsCards: [
      { title: "Data-driven strategies", description: "No assumptions. We build our growth campaigns based on hard competitor analytics and real user intent metrics.", iconName: "BarChart3" },
      { title: "5+ years of experience", description: "Having navigated through search engine algorithm core updates, we know what drives sustainable ranking gains.", iconName: "Trophy" },
      { title: "High ROI campaigns", description: "Every dollar you invest is optimized to target buyers at the bottom of the funnel, minimizing waste.", iconName: "TrendingUp" },
      { title: "Custom solutions", description: "We don't do pre-packaged cookie-cutter services. Every site is analyzed to get a bespoke roadmap.", iconName: "Settings" },
      { title: "24/7 dedicated support", description: "Clear, direct communication channels. We act as an extension of your team, responding within hours.", iconName: "MessageSquare" },
      { title: "Transparent reporting", description: "Understand exactly what you are paying for with simplified keyword progression and traffic conversion dashboards.", iconName: "FileText" },
    ],
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cards = data.whyUsCards && data.whyUsCards.length > 0
    ? data.whyUsCards
    : [
        { title: "Data-driven strategies", description: "No assumptions. We build our growth campaigns based on hard competitor analytics and real user intent metrics.", iconName: "BarChart3" },
        { title: "5+ years of experience", description: "Having navigated through search engine algorithm core updates, we know what drives sustainable ranking gains.", iconName: "Trophy" },
        { title: "High ROI campaigns", description: "Every dollar you invest is optimized to target buyers at the bottom of the funnel, minimizing waste.", iconName: "TrendingUp" },
        { title: "Custom solutions", description: "We don't do pre-packaged cookie-cutter services. Every site is analyzed to get a bespoke roadmap.", iconName: "Settings" },
        { title: "24/7 dedicated support", description: "Clear, direct communication channels. We act as an extension of your team, responding within hours.", iconName: "MessageSquare" },
        { title: "Transparent reporting", description: "Understand exactly what you are paying for with simplified keyword progression and traffic conversion dashboards.", iconName: "FileText" },
      ];

  return (
    <section className="pt-[85px] pb-20 lg:pb-32 bg-transparent relative z-10 border-b border-neutral-100">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            {data.whyUsEyebrow || "Why Us"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
            {data.whyUsTitle || "Why choose Digital World"}
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-500 leading-relaxed">
            {data.whyUsSubtitle || "We partner with brands to build robust organic funnels that consistently generate revenue, not just vanity clicks."}
          </p>
        </div>

        {/* Grid List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cards.map((card, idx) => {
            const Icon = (Icons[(card.iconName || "Sparkles") as keyof typeof Icons] || Icons.Sparkles) as React.ComponentType<{ className?: string }>;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-premium hover:border-primary/20"
              >
                {/* Icon Circle */}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary mb-6">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Title */}
                <h3 className="font-sans font-bold text-lg text-neutral-900 mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm text-neutral-500 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
