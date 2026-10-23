"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { CloudHomepageData } from "@/types";

const canonicalWhyUsCards = [
  {
    title: "Data-driven strategies",
    description: "Every decision is backed by keyword data, competitor research and real performance numbers, never guesswork.",
    iconName: "BarChart3",
  },
  {
    title: "AI-powered execution",
    description: "We use AI automation and AI tools to work faster and test more ideas, and we pass the savings on to you.",
    iconName: "Cpu",
  },
  {
    title: "6+ years of hands-on experience",
    description: "Your project is led by a senior practitioner who has run SEO, PPC, web and content projects for clients in 11 countries.",
    iconName: "Award",
  },
  {
    title: "One team, every channel",
    description: "SEO, ads, web, content, automation and video work together under one strategy, so nothing falls through the cracks.",
    iconName: "Layers",
  },
  {
    title: "Transparent reporting",
    description: "Clear dashboards show what you pay for and what it returns: traffic, leads, conversions and ROI.",
    iconName: "FileText",
  },
  {
    title: "Fast, direct support",
    description: "You talk to the people doing the work. Expect a reply within 24 hours.",
    iconName: "MessageSquare",
  },
];

export default function WhyChooseUs() {
  const [data, setData] = useState<CloudHomepageData>({
    whyUsEyebrow: "Why us",
    whyUsTitle: "Why Growing Businesses Choose Digital World as Their Digital Marketing Partner",
    whyUsSubtitle: "We are built for businesses that want results, not reports full of vanity metrics.",
    whyUsCards: canonicalWhyUsCards,
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/homepage");
        if (res.ok) {
          const hp = await res.json();
          setData((prev) => ({
            ...prev,
            ...hp,
            whyUsEyebrow: hp.whyUsEyebrow || "Why us",
            whyUsTitle: hp.whyUsTitle || "Why Growing Businesses Choose Digital World as Their Digital Marketing Partner",
            whyUsSubtitle: hp.whyUsSubtitle || "We are built for businesses that want results, not reports full of vanity metrics.",
            whyUsCards: canonicalWhyUsCards,
          }));
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

  return (
    <section className="pt-16 pb-14 lg:pt-20 lg:pb-20 bg-transparent relative z-10 border-b border-neutral-100">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            {data.whyUsEyebrow || "Why us"}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
            {data.whyUsTitle || "Why Growing Businesses Choose Digital World as Their Digital Marketing Partner"}
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed">
            {data.whyUsSubtitle || "We are built for businesses that want results, not reports full of vanity metrics."}
          </p>
        </div>

        {/* Grid List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          {canonicalWhyUsCards.map((card, idx) => {
            const Icon = (Icons[card.iconName as keyof typeof Icons] || Icons.Sparkles) as React.ComponentType<{ className?: string }>;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="flex flex-col rounded-2xl border border-neutral-200/90 bg-white p-7 lg:p-8 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1"
              >
                {/* Icon Circle */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-primary mb-5 shadow-xs">
                  <Icon className="h-6 w-6 stroke-[2]" />
                </div>

                {/* Title */}
                <h3 className="font-sans font-bold text-lg text-neutral-900 mb-2.5">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm text-neutral-600 leading-relaxed">
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
