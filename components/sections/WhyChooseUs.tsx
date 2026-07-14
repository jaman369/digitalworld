"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WhyChooseUs() {
  const cards = [
    {
      title: "Data-driven strategies",
      description: "No assumptions. We build our growth campaigns based on hard competitor analytics and real user intent metrics.",
      emoji: "/Emoji/bar_chart.png",
    },
    {
      title: "5+ years of experience",
      description: "Having navigated through search engine algorithm core updates, we know what drives sustainable ranking gains.",
      emoji: "/Emoji/trophy.png",
    },
    {
      title: "High ROI campaigns",
      description: "Every dollar you invest is optimized to target buyers at the bottom of the funnel, minimizing waste.",
      emoji: "/Emoji/moneybag.png",
    },
    {
      title: "Custom solutions",
      description: "We don't do pre-packaged cookie-cutter services. Every site is analyzed to get a bespoke roadmap.",
      emoji: "/Emoji/gear.png",
    },
    {
      title: "24/7 dedicated support",
      description: "Clear, direct communication channels. We act as an extension of your team, responding within hours.",
      emoji: "/Emoji/speech_balloon.png",
    },
    {
      title: "Transparent reporting",
      description: "Understand exactly what you are paying for with simplified keyword progression and traffic conversion dashboards.",
      emoji: "/Emoji/memo.png",
    },
  ];

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
    <section className="py-20 lg:py-32 bg-neutral-50 relative z-10 border-b border-neutral-100">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            Why Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
            Why choose Digital World
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-500 leading-relaxed">
            We partner with brands to build robust organic funnels that consistently generate revenue, not just vanity clicks.
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
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-premium hover:border-primary/20"
              >
                {/* 3D Emoji Icon Circle */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50 shadow-sm border border-neutral-150 p-2.5 mb-6 relative">
                  <Image
                    src={card.emoji}
                    alt={card.title}
                    width={26}
                    height={26}
                    className="object-contain"
                  />
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
