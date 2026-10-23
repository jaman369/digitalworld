"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { testimonialsData } from "@/data/testimonials";
import { CloudHomepageData } from "@/types";

export default function Testimonials() {
  const [data, setData] = useState<CloudHomepageData>({
    testimonialsEyebrow: "Reviews",
    testimonialsTitle: "What Our Clients Say About Working With Us",
    testimonialsSubtitle: "Feedback from businesses we help grow.",
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
            testimonialsEyebrow: hp.testimonialsEyebrow || "Reviews",
            testimonialsTitle: hp.testimonialsTitle || "What Our Clients Say About Working With Us",
            testimonialsSubtitle: hp.testimonialsSubtitle || "Feedback from businesses we help grow.",
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
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-transparent relative z-10 border-b border-neutral-100">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            {data.testimonialsEyebrow || "Reviews"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-4">
            {data.testimonialsTitle || "What Our Clients Say About Working With Us"}
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed">
            {data.testimonialsSubtitle || "Feedback from businesses we help grow."}
          </p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonialsData.map((test) => (
            <motion.div
              key={test.id}
              variants={cardVariants}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white p-8 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1"
            >
              <div>
                {/* Star Ratings */}
                <div className="flex gap-1 mb-6">
                  {[...Array(test.rating)].map((_, i) => (
                    <Icons.Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-sans text-neutral-700 leading-relaxed mb-8 italic text-sm sm:text-base">
                  &ldquo;{test.content}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3.5 pt-6 border-t border-neutral-100">
                {/* Initials Avatar */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-primary font-bold text-sm border border-blue-100 shrink-0 shadow-2xs">
                  {test.name.split(" ").map(n => n[0]).join("")}
                </div>
                
                <div>
                  <h3 className="font-sans font-bold text-sm text-neutral-900 leading-tight">
                    {test.name}
                  </h3>
                  <span className="font-sans text-xs text-neutral-500 block">
                    {test.role} · <strong className="text-neutral-700 font-semibold">{test.company}</strong>
                  </span>
                  
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="relative h-3 w-4.5 overflow-hidden rounded-[2px] border border-neutral-200 shrink-0">
                      <Image
                        src={test.flagPath}
                        alt="Country flag"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-sans text-[11px] text-neutral-400 font-medium">
                      {test.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
