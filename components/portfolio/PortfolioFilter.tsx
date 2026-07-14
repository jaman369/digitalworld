"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioItem } from "@/types";
import PortfolioCard from "./PortfolioCard";

interface PortfolioFilterProps {
  items: PortfolioItem[];
}

type FilterCategory = "ALL" | "SEO" | "PPC" | "WEB" | "CONTENT" | "AI";

export default function PortfolioFilter({ items }: PortfolioFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("ALL");

  const filterButtons = [
    { label: "All Projects", category: "ALL" as FilterCategory },
    { label: "SEO / Search", category: "SEO" as FilterCategory },
    { label: "PPC / Bidding", category: "PPC" as FilterCategory },
    { label: "Web Design & Dev", category: "WEB" as FilterCategory },
    { label: "Content & PR", category: "CONTENT" as FilterCategory },
    { label: "AI Automation", category: "AI" as FilterCategory },
  ];

  const getFilteredItems = () => {
    if (activeFilter === "ALL") return items;
    
    // Normalize mapping for categories
    return items.filter((item) => {
      const type = item.serviceType.toUpperCase();
      if (activeFilter === "WEB") return type === "WEB" || type.includes("DEV");
      return type === activeFilter;
    });
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="flex flex-col gap-12">
      {/* Filters List */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {filterButtons.map((btn) => (
          <button
            key={btn.category}
            onClick={() => setActiveFilter(btn.category)}
            className={`rounded-full px-6 py-2.5 font-sans text-xs font-bold transition-all border outline-none ${
              activeFilter === btn.category
                ? "bg-primary text-white border-primary shadow-sm hover:scale-[1.01]"
                : "bg-white text-neutral-500 border-neutral-200 hover:text-primary hover:border-primary/20"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Grid Container */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Zero State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-neutral-200">
          <p className="font-sans text-neutral-400 font-medium">
            No projects found matching the criteria.
          </p>
        </div>
      )}
    </div>
  );
}
