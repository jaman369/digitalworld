"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PortfolioItem } from "@/types";

interface PortfolioCardProps {
  item: PortfolioItem;
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45 }}
      className="group flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-premium hover:border-primary/20"
    >
      {/* Case Study Image Wrapper */}
      <div className="relative w-full aspect-[3/2] overflow-hidden bg-neutral-100 border-b border-neutral-100">
        <Image
          src={item.image}
          alt={`${item.client} project screenshot`}
          fill
          sizes="(max-w-768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Result Stat Floating Overlay */}
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
          {item.resultStat}
        </div>
      </div>

      {/* Case Study Metadata */}
      <div className="p-6 lg:p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="font-sans text-[10px] font-bold text-primary uppercase tracking-widest bg-primary-light px-2.5 py-1 rounded-full">
            {item.serviceType}
          </span>
          <span className="text-neutral-300 text-xs">•</span>
          <span className="font-sans text-xs text-neutral-400 font-semibold uppercase tracking-wider">
            {item.industry}
          </span>
        </div>

        <h3 className="font-sans font-bold text-lg text-neutral-900 mb-3 group-hover:text-primary transition-colors">
          {item.client}
        </h3>

        <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-6 flex-1">
          {item.description}
        </p>

        {/* Deliverable Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-100 mt-auto">
            {item.tags.map((tag, idx) => (
              <span
                key={idx}
                className="font-sans text-[10px] font-semibold text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
