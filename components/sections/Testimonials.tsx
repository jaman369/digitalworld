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
    testimonialsTitle: "Client Success Stories",
    testimonialsSubtitle: "See how we help businesses globally increase organic traffic footprint, lower acquisition cost metrics, and scale stores.",
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
    <section className="py-20 lg:py-32 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f172a] relative z-10 text-white">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6">
            {data.testimonialsEyebrow || "Reviews"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            {data.testimonialsTitle || "Client Success Stories"}
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed">
            {data.testimonialsSubtitle || "See how we help businesses globally increase organic traffic footprint, lower acquisition cost metrics, and scale stores."}
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
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-8 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1"
            >
              <div>
                {/* Star Ratings */}
                <div className="flex gap-1 mb-6">
                  {[...Array(test.rating)].map((_, i) => (
                    <Icons.Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-sans text-slate-200 leading-relaxed mb-8 italic text-sm sm:text-base">
                  &ldquo;{test.content}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3.5 pt-6 border-t border-white/10">
                {/* Portrait Placeholder Avatar */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-sm border border-indigo-500/30 shrink-0">
                  {test.name[0]}
                </div>
                
                <div>
                  <h4 className="font-sans font-bold text-sm text-white leading-tight">
                    {test.name}
                  </h4>
                  
                  <div className="flex items-center gap-2 mt-1">
                    {/* Country Flag */}
                    <div className="relative h-3 w-4.5 overflow-hidden rounded-sm border border-white/20 shrink-0">
                      <Image
                        src={test.flagPath}
                        alt="Country flag"
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <span className="font-sans text-xs text-slate-400 font-medium">
                      {test.location} · <span className="text-slate-300 font-semibold">{test.company}</span>
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
