"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/services";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 top-[80px] z-40 bg-black/10 backdrop-blur-xs" 
            onClick={onClose}
          />
          
          {/* Menu Drawer Container - Same 3-Column Format Optimized for All Laptop & PC Screens */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full z-50 w-full border-b border-neutral-200 bg-white shadow-2xl max-h-[calc(100vh-85px)] overflow-y-auto"
            onMouseLeave={onClose}
          >
            <div className="container mx-auto max-w-7xl px-6 py-5">
              {/* 3 Main Columns Layout (Matches Original Preferred Format) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4 items-start">
                {servicesData.map((category) => {
                  // Get Lucide Icon dynamically
                  const Icon = (Icons[category.iconName as keyof typeof Icons] || Icons.HelpCircle) as React.ComponentType<{ className?: string }>;

                  return (
                    <div 
                      key={category.id} 
                      className="group flex flex-col gap-2 rounded-xl p-3.5 bg-neutral-50/70 hover:bg-blue-50/40 border border-neutral-200/70 hover:border-blue-200 transition-all"
                    >
                      {/* Category Header */}
                      <div className="flex items-center justify-between border-b border-neutral-200/60 pb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100/80 text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white shrink-0">
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <Link 
                            href={`/services/${category.slug}`}
                            className="font-sans font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-blue-600 transition-colors leading-tight"
                            onClick={onClose}
                          >
                            {category.title}
                          </Link>
                        </div>

                        <Link
                          href={`/services/${category.slug}`}
                          className="text-[11px] font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5"
                          onClick={onClose}
                        >
                          View All <Icons.ChevronRight className="h-3 w-3" />
                        </Link>
                      </div>

                      {/* Sub Items - 2 Sub-Columns Grid for Compact Height */}
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-1 pt-0.5">
                        {category.subItems.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`/services/${category.slug}#${sub.slug}`}
                              className="font-sans text-[11px] font-medium text-neutral-600 hover:text-blue-600 flex items-center gap-1 transition-colors leading-snug py-0.5 group/item"
                              onClick={onClose}
                            >
                              <Icons.ChevronRight className="h-3 w-3 text-neutral-300 group-hover/item:text-blue-600 shrink-0 transition-transform group-hover/item:translate-x-0.5" />
                              <span className="truncate">{sub.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
